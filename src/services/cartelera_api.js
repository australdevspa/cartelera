import axios from 'axios';
import moment from 'moment';
moment.locale('es')

const API_URL = 'https://api-ccpm.engrane.ml/api'

//metodo que obtiene todos los datos correspondientes a la cartelera
function getDataCartelera(){
    return axios.get(`${API_URL}/actividades`)
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

        x.trozo = acortar(x.nombre);
        x.trozo_card = acortarCard(x.nombre);

        x.cuanto_falta = cuantoFalta(x.diff)
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

        x.trozo = acortar(x.nombre);
        x.trozo_card = acortarCard(x.nombre);
        
        x.cuanto_falta = cuantoFalta(x.diff)
        //x.cuanto_falta = cuantoFalta(x.fecha_ini)
    }
    if(x.area_color == null){
        x.area_color = "#1e87f0"
    }
}

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
        return "Gratis";
    }else{
        return "$" + valor;
    }
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
    return axios.get(`${API_URL}/actividades`)
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

function getSalasz(){
    return axios.get(`${API_URL}/salas`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

export {
    getDataCartelera,
    getEvento
}