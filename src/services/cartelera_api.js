import axios from 'axios';
import moment from 'moment';
moment.locale('es')

const API_URL = 'https://engrane.ml/ccpm-api/public/api'

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

        x.cuanto_falta = cuantoFalta(x.fecha_ini)
        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')

    }else{
        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')

        x.cuanto_falta = cuantoFalta(x.fecha_ini)
        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')
    }
}

// funciones momentjs
function cuantoFalta(fecha_evento) {
    var fecha_actual = moment.utc();
    var fecha_del_evento = moment.utc(fecha_evento);
    var diferencia = fecha_del_evento.diff(fecha_actual, 'days');

    if(diferencia == 0){
        return 'Hoy'
    }else if(diferencia == 1){
        return 'Falta '+ diferencia +' día'
    }else{
        return 'Faltan '+ diferencia +' días'
    }
}

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

export {
    getDataCartelera,
    getEvento
}