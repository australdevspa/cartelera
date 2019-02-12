import axios from 'axios';
import moment from 'moment';
moment.locale('es')
import {   
    Endpoint
} from '@/services/endpoints'


import {   
    dale
} from '@/services/dale_color'

import dc from 'dale_color';

function getSalas(){
    return axios.get(`${Endpoint}/salas`)
    .then(function (response) {
        var expo = []
        for (var i = 0; i < response.data.length ; i++) {
            if (getSalaActividades(response.data[i].lugar) == true){
                response.data[i].numero_de_actividades = '3'
            }
            
            expo.push(response.data[i]);
        }
        return expo;
        //return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//metodo que obtiene todos los datos correspondientes a la cartelera
function getSalaActividades(sala_id){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {

        var cartelera_total = Object.keys(response.data).length
        var x = 0
        while(x < cartelera_total){
            if(response.data[x].lugar == sala_id){
                response.data[x].date_i = moment(response.data[x].fecha_ini).format('DD/MM/YYYY')

                if(response.data[x].date_i == moment().format('DD/MM/YYYY')){
                    return true
                }
            }

            //setParametros(response.data[x])
            /*setAttachments(response.data[x], response.data[x].id)*/
            //cartelera.push(response.data[x])
            x++
        }

        return false

        /*var final = {
                        cartelera: cartelera,
                        cartelera_total: cartelera_total,
                        categorias: categorias,
                        categorias_total: categorias_total

                    }

        return final;*/
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//metodo que obtiene todos los datos correspondientes a la cartelera
function getEjemplo(){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {
        
        //categorias
//categorias
var flags = []
var categorias = {}
for(var i = 0; i < response.data.length; i++){
    if(flags[response.data[i].sala_id]) continue
    flags[response.data[i].sala_id] = true

    //si es que no posee ningun color asignado, le entregamos uno por defecto

if(nro_ocurrencias(response.data[i].sala_id) != 0){
    categorias[response.data[i].sala_id] = {
        area: response.data[i].sala_id,  
        ocurrence : nro_ocurrencias(response.data[i].sala_id),
        eventos: cartelera_ocurrencias(response.data[i].sala_id)
    }
}


    function nro_ocurrencias(value){
        var nro = 0
        for(var i = 0; i < response.data.length; i++){
            if(response.data[i].sala_id === value){

                

                var fecha_actual = moment().format('YYYY-MM-DD')
                var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                var fecha_fin = moment(response.data[i].fecha_fin).format('YYYY-MM-DD')

                if(fecha_actual === fecha_inicio){
                    nro+=1 
                }else{
                    if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                        nro+=1 
                    }
                }
            }

        }
        return nro
    }
//hoy
    function cartelera_ocurrencias(value){
        var eventos = []
        for(var i = 0; i < response.data.length; i++){

            if(response.data[i].sala_id === value){
                var fecha_actual = moment().format('YYYY-MM-DD')
                var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                var fecha_fin = moment(response.data[i].fecha_fin).format('YYYY-MM-DD')
    
                if(fecha_actual === fecha_inicio){
                    setParametros(response.data[i])
                    eventos.push(response.data[i]) 
                }else{
                    if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                      setParametros(response.data[i])
                        eventos.push(response.data[i]) 
                    }
                }
                
            }
        }
        return eventos
    }
}


var flags1 = []
var categorias1 = {}
for(var i = 0; i < response.data.length; i++){
    if(flags1[response.data[i].sala_id]) continue
    flags1[response.data[i].sala_id] = true

    //si es que no posee ningun color asignado, le entregamos uno por defecto

    if(nro_ocurrencias1(response.data[i].sala_id) != 0){
    categorias1[response.data[i].sala_id] = {
                                            area: response.data[i].sala_id,  
                                            ocurrence : nro_ocurrencias1(response.data[i].sala_id),
                                            eventos: cartelera_ocurrencias1(response.data[i].sala_id)
                                        }
                                    }

    function nro_ocurrencias1(value){
        var nro = 0
        for(var i = 0; i < response.data.length; i++){
            if(response.data[i].sala_id === value){


                var fecha_actual = moment().format('YYYY-MM-DD')
                var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                var fecha_fin = moment(response.data[i].fecha_fin).format('YYYY-MM-DD')

                var dos_semanas = moment(fecha_actual, "YYYY-MM-DD").add('days', 28);

                if(fecha_actual === fecha_inicio){
                    nro+=0 
                    //return cero apenas encuentre una actividad el dia actual
                        return nro
                }else{
                    if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                        nro+=0 
                        return nro
                    }else{
                        if(moment(fecha_inicio).isBetween(fecha_actual, dos_semanas) === true){
                            nro+=1
                        }
                    }
                }
            }

        }
        return nro
    }
//proximo
    function cartelera_ocurrencias1(value){
        var eventos = []
        for(var i = 0; i < response.data.length; i++){
            if(response.data[i].sala_id === value){
                var fecha_actual = moment().format('YYYY-MM-DD')
                var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                var fecha_fin = moment(response.data[i].fecha_fin).format('YYYY-MM-DD')

                var dos_semanas = moment(fecha_actual, "YYYY-MM-DD").add('days', 28);

                if(fecha_actual === fecha_inicio){
                     
                }else{
                    if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                        
                    }else{
                        if(moment(fecha_inicio).isBetween(fecha_actual, dos_semanas) === true){
                            setParametros(response.data[i])
                            eventos.push(response.data[i]) 
                        }
                    }
                }
            }
                
        }
        return eventos
    }
}



var flags2 = []
var categorias2 = {}
for(var i = 0; i < response.data.length; i++){
    if(flags2[response.data[i].sala_id]) continue
    flags2[response.data[i].sala_id] = true

    //si es que no posee ningun color asignado, le entregamos uno por defecto

    if(nro_ocurrencias2(response.data[i].sala_id) == 0){
    categorias2[response.data[i].sala_id] = {
                                            area: response.data[i].sala_id,  
                                            ocurrence : nro_ocurrencias2(response.data[i].sala_id),
                                            eventos: cartelera_ocurrencias2(response.data[i].sala_id)
                                        }
                                    }

    function nro_ocurrencias2(value){
        var nro = 0
        for(var i = 0; i < response.data.length; i++){
            if(response.data[i].sala_id === value){

                var fecha_actual = moment().format('YYYY-MM-DD')
                var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                var fecha_fin = moment(response.data[i].fecha_fin).format('YYYY-MM-DD')

                var dos_semanas = moment(fecha_actual, "YYYY-MM-DD").add('days', 28);


                if(fecha_actual === fecha_inicio){
                    nro+=1 
                }else{
                    if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                        nro+=1 
                    }else{
                        if(moment(fecha_inicio).isBetween(fecha_actual, dos_semanas) === true){
                            nro+=1
                        }else{
                            nro+=0
                        }
                    }
                }
            }

        }
        return nro
    }

    function cartelera_ocurrencias2(value){
        var eventos = []
        for(var i = 0; i < response.data.length; i++){
            if(response.data[i].sala_id === value){
                var fecha_actual = moment().format('YYYY-MM-DD')
                var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                var fecha_fin = moment(response.data[i].fecha_fin).format('YYYY-MM-DD')

                var dos_semanas = moment(fecha_actual, "YYYY-MM-DD").add('days', 28);

                if(fecha_actual === fecha_inicio){
                     
                }else{
                    if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                        
                    }else{
                        if(moment(fecha_inicio).isBetween(fecha_actual, dos_semanas) === true){
                            
                        }else{
                            eventos.push(response.data[i]) 
                        }
                    }
                }
            }
        }
        return eventos
    }
}



        var final = {
                        hoy: categorias,
                        proximo: categorias1,
                        cero: categorias2
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
        x.horario = horario(x.fecha_ini, x.fecha_fin)
        /*x.thumbnail = "../static/img/default/evento_default.jpg"

        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')

        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')

        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')

        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.horario = horario(x.fecha_ini, x.fecha_fin)

        //x.entrada = precio(x.valor);

        x.donde = donde(x.lugar);
        
        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);

        //x.trozo = acortar(x.nombre);
        //x.trozo_card = acortarCard(x.nombre);

        x.cuanto_falta = cuantoFalta(x.diff)
        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        //x.cuanto_falta = cuantoFalta(x.fecha_ini)

        //x.color_claro = lighten(x.area_color,30);
        //x.color_oscuro = darken(x.area_color,30);

        x.dale = dale(x.area_color);
        x.colorOpuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
        //x.unque = fechas_proximas();*/
    }else{
        x.horario = horario(x.fecha_ini, x.fecha_fin)
        /*x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
        
        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')
        
        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')

        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.horario = horario(x.fecha_ini, x.fecha_fin)

        //x.entrada = precio(x.valor);

        x.donde = donde(x.lugar);

        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);
        
        //x.trozo = acortar(x.nombre);
        //x.trozo_card = acortarCard(x.nombre);
        
        x.cuanto_falta = cuantoFalta(x.diff);
        /*x.moment = moment().add(1, 'd').calendar();
        x.moment_x = moment(x.fecha_ini).endOf('days').fromNow();
        x.moment_y = moment("2019-01-05").startOf('days').fromNow();*/

       /* x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        //x.cuanto_falta = cuantoFalta(x.fecha_ini)

        /*x.color_claro = lighten('#23B19D',20);
        x.color_oscuro = darken('#23B19D',20);*/
        //x.color_claro = lighten(x.area_color,30);
        //x.color_oscuro = darken(x.area_color,30);

        /*x.dale = dale(x.area_color);
        x.colorOpuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
        //x.unque = fechas_proximas();*/
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


/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
const addLight = function(color, amount){
    let cc = parseInt(color,16) + amount;
    let c = (cc > 255) ? 255 : (cc);
    c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
    return c;
  }
  
  /* const hexToRGB = (color) => {
    color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
    let colorRGB = [color.substring(0,2)]
  } */
  
  /* Aclara un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
  const lighten = (color, amount)=> {
    color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
    amount = parseInt((255*amount)/100);
    return color = `#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`;
  }
/* Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo */
const subtractLight = function(color, amount){
  let cc = parseInt(color,16) - amount;
  let c = (cc < 0) ? 0 : (cc);
  c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
}

/* Oscurece un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
const darken = (color, amount) =>{
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  amount = parseInt((255*amount)/100);
  return color = `#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`;
}

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

function colorOpuesto(color) {
    var opuesto = dc.armonias.opuesto(color)
    if(dc.validaciones.isClaro(opuesto, 177) == true){
        var masOscuro = dc.brillo.oscurecer(opuesto, 50)
        return masOscuro
    }else{
        return opuesto
    }
}

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

    /*var day = new_date.format('DD');
    var month = new_date.format('MM');
    var year = new_date.format('YYYY');

    return day + '.' + month + '.' + year;*/
    return moment(dos_semanas).format('DD/MM/YYYY');
}

function fechas_proximas() {
    /*var hoy = moment().format('YYYY-MM-DD')
    var dossemanas = moment(new Date()).add(14,'days')
    
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
    }*/
    startdate = "20.03.2014";
var new_date = moment(startdate, "DD-MM-YYYY").add('days', 5);

var day = new_date.format('DD');
var month = new_date.format('MM');
var year = new_date.format('YYYY');

return "cc";
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
  
        if(valor == "0.-" || valor == "0"){
            return "liberada";
        }else if(valor.indexOf(".-") != -1){
            return "$" + valor.substr(0, valor.indexOf(".-"))
        }else {
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


export {
    getSalas,
    getEjemplo
}