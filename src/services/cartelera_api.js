import axios from 'axios';
const moment = require('moment');
require('moment/locale/es');
moment.locale('es');

//import moment from 'moment';
//moment.locale('es')

import { Endpoint } from '@/services/endpoints'
import { setParametros } from '@/services/parametros'

//metodo que obtiene los datos iniciales de la aplicacion
function getDataCartelera(){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {



    //exposiciones hoy
    var flags1 = []
    var categorias1 = {}
    var expos1 = []
    for(var i = 0; i < response.data.length; i++){

        if(flags1[response.data[i].sala_id]) continue
        flags1[response.data[i].sala_id] = true

        //si es que no posee ningun color asignado, le entregamos uno por defecto
        if(response.data[i].area_color == null){
            response.data[i].area_color = "#734525"
        }

        if(nro_ocurrencias(response.data[i].sala_id) != 0){
            categorias1[response.data[i].sala_id] = {
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

                    
                    /*if(fecha_actual === fecha_inicio){
                        nro+=1 
                    }else{
                        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                            nro+=1 
                        }
                    }*/

                    if(fecha_actual !== fecha_inicio){
                        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                            nro+=1
                        }
                    }
                }
            }
            return nro
        }

        function cartelera_ocurrencias(value){
            var eventos = []
            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].sala_id === value){
                    var fecha_actual = moment().format('YYYY-MM-DD')
                    var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                    var fecha_fin = moment(response.data[i].fecha_fin).format('YYYY-MM-DD')
        
                    /*if(fecha_actual === fecha_inicio){
                        setParametros(response.data[i])
                        eventos.push(response.data[i]) 
                    }else{*/
                    if(fecha_actual !== fecha_inicio){
                        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                        setParametros(response.data[i])
                            eventos.push(response.data[i]) 
                            expos1.push(response.data[i])
                           
                        }
                    }
                    
                }
            }
            return eventos
        }
    }




        //categorias
        var flags = []
        var categorias = {}
        for(var i = 0; i < response.data.length; i++){
            if(flags[response.data[i].area]) continue
            flags[response.data[i].area] = true
            //si es que no posee ningun color asignado, le entregamos uno por defecto
            if(response.data[i].area_color == null){
                response.data[i].area_color = "#734525"
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
        if(cartelera_total < 10){
            while(x < cartelera_total){
                setParametros(response.data[x])
                cartelera.push(response.data[x])
                x++
            }
        }else{
            while(x < 10){
                setParametros(response.data[x])
                cartelera.push(response.data[x])
                x++
            }
        }

        var final = {
                        cartelera: cartelera,
                        cartelera_total: cartelera_total,
                        categorias: categorias,
                        categorias_total: categorias_total,
                        expo: expos1

                    }
        return final;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//metodo que obtiene segmentos de actividades
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
    getSegmentoActividades,
    
    getEvento,
    getDetalle,
    getDetalleX
}