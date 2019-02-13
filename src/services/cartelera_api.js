import axios from 'axios';
import moment from 'moment';
moment.locale('es')
import {   
    Endpoint
} from '@/services/endpoints'
import dc from 'dale_color';

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
        //categorias total
        var categorias_total = Object.keys(categorias).length

        //cartelera total
        var cartelera_total = Object.keys(response.data).length
        //cartelera
        var x = 0
        var cartelera = []
        while(x < 10){
            setParametros(response.data[x])
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

// https://api.culturapuertomontt.cl/api/actividades/limit=1&offset=0
function getSegmentoActividades(limite, inicio){
    return axios.get(`${Endpoint}/actividades/limit=`+limite+`&offset=`+inicio)
    .then(function (response) {
        response.data.resultados.forEach(element => {
            setParametros(element)
        });
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

// https://api.culturapuertomontt.cl/api/actividades/limit=1&offset=0
function get1(limite, inicio, arr){
    var extracto = arr.slice(inicio, limite);
    var expo = []
    for (var i = 0; i < extracto.length ; i++) {
        setParametros(i)
        /*response.data[i].fecha_inicio_formato = moment(response.data[i].fecha_ini).format('DD/MM/YYYY')
        response.data[i].fecha_publicacion = moment(response.data[i].creado_el).format('DD/MM/YYYY')
        response.data[i].fecha_rango = fecha_rango(response.data[i].fecha_ini, response.data[i].fecha_fin)
        response.data[i].sala = sala(response.data[i].lugar)*/
        expo.push(i);
    }
    return expo;

    /*extracto.resultados.forEach(element => {
        setParametros(element)
    });
    return extracto;*/
    //a
    //var extracto = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_inicio+state.por_categoria_tamaño);


    /*return axios.get(`${Endpoint}/actividades/limit=`+limite+`&offset=`+inicio)
    .then(function (response) {
        
        response.data.resultados.forEach(element => {
            setParametros(element)
        });
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })*/
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
        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);
        x.entrada = precio(x.valor);
        x.donde = donde(x.lugar);

        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        x.horario = horario(x.fecha_ini, x.fecha_fin)

        x.color_claro = dc.brillo.aclarar(x.area_color, 30)
        x.color_oscuro = dc.brillo.oscurecer(x.area_color, 30) 
        x.color_opuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
    }else{
        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')
        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)
        
        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);
        x.entrada = precio(x.valor);
        x.donde = donde(x.lugar);

        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        x.horario = horario(x.fecha_ini, x.fecha_fin)

        x.color_claro = dc.brillo.aclarar(x.area_color, 30)
        x.color_oscuro = dc.brillo.oscurecer(x.area_color, 30) 
        x.color_opuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
    }
    if(x.area_color == null){
        x.area_color = "#1e87f0"
    }
}

/*se utiliza para determinar si una exposicion se encuentra dentro del rango de su realizacion*/
function fecha_rango(inicio, fin) {
    var fecha_actual = moment().format('YYYY-MM-DD')
    var fecha_inicio = moment(inicio).format('YYYY-MM-DD')
    var fecha_fin = moment(fin).format('YYYY-MM-DD')
    
    if(fecha_inicio === fecha_fin){
        return moment(inicio).format('DD/MM/YYYY');
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
            return moment(fecha_actual).format('DD/MM/YYYY');
        }else{
            return moment(inicio).format('DD/MM/YYYY');
        }
    }
}

/*se utiliza en el calendario de los cards */
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
}

/*se utiliza en los cards*/
function precio(valor) {
    if(valor == "0.-" || valor == "0"){
        return "liberada";
    }else if(valor.indexOf(".-") != -1){
        return "$" + valor.substr(0, valor.indexOf(".-"))
    }else {
        return "$" + valor;
    }
}

/*se utiliza en los cards*/
function donde(lugar) {
    var casa = "Casa del Arte Diego Rivera"
    if(lugar == "Sala Teatro Diego Rivera"){
        return "Sala Teatro - " + casa;
    }else{
        return lugar + " - " + casa;
    }
}

/*se utiliza en el ribbon*/
function cuantoMoment(date) {
    moment.updateLocale('es', {
        calendar : {
            lastDay : '[Ayer]',
            sameDay : '[Hoy]',
            nextDay : '[Mañana]',
            lastWeek : '[Pasado] dddd',
            nextWeek : '[Próximo] dddd',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });
    return moment(date).startOf('days').locale('es').calendar();
}

/*se utiliza en el ribbon*/
function cuantoMomentEn(date) {
    moment.updateLocale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[Last] dddd',
            nextWeek : '[Next] dddd',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });
    return moment(date).startOf('days').locale('en').calendar();
}

/*se utiliza en el ribbon */
function horario(inicio, fin) {
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        var hora_inicio = moment(inicio).format('HH:mm')
        return hora_inicio + " hrs";
    }else{
        return "horario indefinido";
    }
}

/*se utiliza en el slider*/
function colorOpuesto(color) {
    var opuesto = dc.armonias.opuesto(color)
    if(dc.validaciones.isClaro(opuesto, 177) == true){
        var masOscuro = dc.brillo.oscurecer(opuesto, 50)
        return masOscuro
    }else{
        return opuesto
    }
}

/*se utiliza para determinar si una actividad se encuentra dentro de un determinado rango*/
function w(inicio) {
    var hoy = moment().format('YYYY-MM-DD')
    var dos_semanas = moment(hoy, "YYYY-MM-DD").add('days', 28);
    
    var fecha_inicio = moment(inicio).format('YYYY-MM-DD')

    if(fecha_inicio === hoy){
        return "hoy";
    }else{
        if(moment(fecha_inicio).isBetween(hoy, dos_semanas) === true){
            return "4 semanas";
        }else{
            return "no";
        }
    }
}












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
    getDetalleX,
    getSegmentoActividades,
    get1,
    setParametros
}