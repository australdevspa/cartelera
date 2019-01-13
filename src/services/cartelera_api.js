import axios from 'axios';
import moment from 'moment';
moment.locale('es')
import {   
    Endpoint
} from '@/services/endpoints'

//metodo que obtiene todos los datos correspondientes a la cartelera
function getDataCartelera(){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {
        
        //categorias
        var flags = []
        var categorias = {}
        for(var i = 0; i < response.data.length; i++){
            if(flags[response.data[i].area]) continue
            flags[response.data[i].area] = true

            //si es que no posee ningun color asignado, le entregamos uno por defecto
            if(response.data[i].area_color == null){
                response.data[i].area_color = "#1e87f0"
            }

            categorias[response.data[i].area] = {
                                                    area: response.data[i].area, 
                                                    color: response.data[i].area_color, 
                                                    ocurrence : nro_ocurrencias(response.data[i].area),
                                                    eventos: cartelera_ocurrencias(response.data[i].area)
                                                }

            function nro_ocurrencias(value){
                var nro = 0
                for(var i = 0; i < response.data.length; i++){
                    if(response.data[i].area === value)
                        nro+=1 
                }
                return nro
            }

            function cartelera_ocurrencias(value){
                var eventos = []
                for(var i = 0; i < response.data.length; i++){
                    if(response.data[i].area === value)
                        eventos.push(response.data[i]) 
                }
                return eventos
            }
        }
        var categorias_total = Object.keys(categorias).length

        //cartelera
        var cartelera_total = Object.keys(response.data).length
        var x = 0
        var cartelera = []
        while(x < cartelera_total){
            setParametros(response.data[x])
            /*setAttachments(response.data[x], response.data[x].id)*/
            cartelera.push(response.data[x])
            x++
        }

        var final = {
                        cartelera: cartelera,
                        cartelera_total: cartelera_total,
                        categorias: categorias,
                        categorias_total: categorias_total

                    }

        return final;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//Asignacion y modificacion de parametros a los objetos de la api
function setParametros(x){
    moment.locale('es')
    if(x.thumbnail == null){
        x.thumbnail = "../static/img/default/evento_default.jpg"

        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')

        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')

        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')

        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.horario = horario(x.fecha_ini, x.fecha_fin)

        x.entrada = precio(x.valor);

        x.donde = donde(x.lugar);
        
        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);

        x.trozo = acortar(x.nombre);
        x.trozo_card = acortarCard(x.nombre);

        x.cuanto_falta = cuantoFalta(x.diff)
        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        //x.cuanto_falta = cuantoFalta(x.fecha_ini)
    }else{
        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
        
        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')
        
        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')

        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.horario = horario(x.fecha_ini, x.fecha_fin)

        x.entrada = precio(x.valor);

        x.donde = donde(x.lugar);

        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);
        
        x.trozo = acortar(x.nombre);
        x.trozo_card = acortarCard(x.nombre);
        
        x.cuanto_falta = cuantoFalta(x.diff);
        /*x.moment = moment().add(1, 'd').calendar();
        x.moment_x = moment(x.fecha_ini).endOf('days').fromNow();
        x.moment_y = moment("2019-01-05").startOf('days').fromNow();*/

        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        //x.cuanto_falta = cuantoFalta(x.fecha_ini)
    }
    if(x.area_color == null){
        x.area_color = "#1e87f0"
    }
}

/*function setAttachments(x, id){
    return axios.get(`${Endpoint}/attachments-actividad?id=`+id)
    .then(function (response) {
        x.images = response.data[0];
        return x.images;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/

function fecha_rango(inicio, fin) {
    var fecha_actual = moment().format('DD/MM/YYYY')
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        return fecha_inicio;
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) == true){
            return fecha_actual;
        }else{
            return fecha_inicio;
        }
    }
}

function horario(inicio, fin) {
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        var hora_inicio = moment(inicio).format('HH:mm')
        //var hora_fin = moment(fin).format('HH:mm')

        return hora_inicio + " hrs";
    }else{
        return "horario indefinido";
    }
}

function precio(valor) {
    if(valor == "0.-"){
        return "liberada";
    }else{
        return "$" + valor;
    }
}

function donde(lugar) {
    var casa = "Casa del Arte Diego Rivera"
    if(lugar == "Sala Teatro Diego Rivera"){
        return "Sala Teatro - " + casa;
    }else{
        return lugar + " - " + casa;
    }
}

function diaSemana(inicio, fin) {
    moment.locale('es')
    var fecha_actual = moment()
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        return moment(inicio).format('dddd');
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) == true){
            return moment(inicio).format('dddd');
        }else{
            return moment(inicio).format('dddd');
        }
    }
    //return moment(fecha).format('dddd');
    /*
// What day of the week is it?
var day = "2018-12-16 13:30:00" // 5
console.log( moment.weekdays[day] ); // Friday
console.log( moment().weekday(0) );
// What is the current month name?
console.log( moment().weekday() ); 

console.log( moment(day).format('dddd') ); 
    //return moment.weekdays[fecha]; */
}

function acortar(titulo) {
    if(titulo.length > 33){
        var extracto = titulo.substring(0, 33);
        var n = extracto.lastIndexOf(" ");
        var nuevoExtracto = titulo.substring(0, n);
        return nuevoExtracto + " ...";
    }else{
        return titulo;
    }
}

function acortarCard(titulo) {
    if(titulo.length > 53){
        var extracto = titulo.substring(0, 53);
        var n = extracto.lastIndexOf(" ");
        var nuevoExtracto = titulo.substring(0, n);
        return nuevoExtracto + " ...";
    }else{
        return titulo;
    }
}

// funciones momentjs
function cuantoFalta(diferencia) {
    if(diferencia == 0){
        return 'Hoy'
    }else if(diferencia == 1){
        return 'En '+ diferencia +' día'
    }else{
        return 'En '+ diferencia +' días'
    }
}

function cuantoMoment(date) {
    
    // get from-now for this date
    //var fromNow = moment( date ).fromNow();

    moment.updateLocale('es', {
        calendar : {
            lastDay : '[Ayer]',
            sameDay : '[Hoy]',
            /*sameDay: function (now) {
                if (this.isBefore(now)) {
                  return '[Will Happen Today]';
                } else {
                  return '[Happened Today]';
                }},*/
            nextDay : '[Mañana]',
            lastWeek : '[Pasado] dddd',
            nextWeek : '[Próximo] dddd',
            //sameElse : 'DD/MM/YYYY',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });
    
    /*moment.updateLocale('fr', {
        calendar : {
            lastDay : '[Hier]',
            sameDay : '[Aujourd’hui] L',
            nextDay : '[Demain]',
            lastWeek : 'll',
            nextWeek : 'll',
            sameElse : 'll'
        }
    });*/
    /*var date = moment().startOf('day');
    return date;*/
    //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          return date.locale('es').calendar();
    //return date.locale('es').calendar();
    //var today2 = moment().startOf('day');
    //return today2.locale('es').calendar();

    return moment(date).startOf('days').locale('es').calendar();
    //console.log(today2.locale('fr').calendar());
}

function cuantoMomentEn(date) {
    
    //var fromNow = moment( date ).lang("en").fromNow();

    moment.updateLocale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            /*sameDay: function (now) {
                if (this.isBefore(now)) {
                  return '[Will Happen Today]';
                } else {
                  return '[Happened Today]';
                }},*/
            nextDay : '[Tomorrow]',
            lastWeek : '[Last] dddd',
            nextWeek : '[Next] dddd',
            //sameElse : 'DD/MM/YYYY',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });

    return moment(date).startOf('days').locale('en').calendar();
}

// funciones momentjs
/*function cuantoFalta(fecha_evento) {
    var fecha_actual = moment.utc();
    var fecha_del_evento = moment.utc(fecha_evento);
    var diferencia = fecha_del_evento.diff(fecha_actual, 'days');

    if(diferencia == 0){
        return 'Hoy'
    }else if(diferencia == 1){
        return 'En '+ diferencia +' día'
    }else{
        return 'En '+ diferencia +' días'
    }
}*/

/*function cuantoFalta(fecha_evento) {
    //var now = moment(new Date()); //todays date
    //var fecha_actual = moment.utc();
    var fecha_del_evento = moment.utc(fecha_evento);
    //var diferencia = fecha_del_evento.diff(fecha_actual, 'days');

    return fecha_del_evento.fromNow()

    /*if(diferencia == 0){
        return 'Hoy'
    }else if(diferencia == 1){
        return 'Falta '+ diferencia +' día'
    }else{
        return 'Faltan '+ diferencia +' días'
    }*/
//}

//metodo correspondiente a la vista de Evento

function getEvento(id){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {
        var evento = []
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].slug === id) {
                setParametros(response.data[i])
                evento.push(response.data[i]);
                return evento;
            }
        }
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

/*oobtener detalles de las actividades*/
function getDetalle(id){
    return axios.get(`${Endpoint}/detalle-actividad?id=`+id)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

/*oobtener detalles de las actividades*/
function getDetalleX(id, x){
    return axios.get(`${Endpoint}/detalle-actividad?id=`+id)
    .then(function (response) {
        var evento = []
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].id === x) {
                evento.push(response.data[i]);
                //return evento;
            }/*else{
                return response.data;
            }*/
        }
        return evento;
        //return id + x;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

export {
    getDataCartelera,
    getEvento,
    getDetalle,
    getDetalleX
}