import axios from 'axios';
import { Endpoint } from '@/services/endpoints'
import { setParametros } from '@/services/parametros'
const moment = require('moment');
require('moment/locale/es');
moment.locale('es');

function getSalas(){
    return axios.get(`${Endpoint}/salas`)
    .then(function (response) {
        var salas = []
        for (var i = 0; i < response.data.length ; i++) {
            if (getSalaActividades(response.data[i].lugar) == true){
                response.data[i].numero_de_actividades = '3'
            }
            salas.push(response.data[i]);
        }
        return salas;
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
            x++
        }
        return false
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//metodo que obtiene todos los datos correspondientes a la cartelera
function getProgrmacion(){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {

    //actividades hoy
    var flags = []
    var categorias = {}
    for(var i = 0; i < response.data.length; i++){
        if(flags[response.data[i].sala_id]) continue
        flags[response.data[i].sala_id] = true

        //si es que no posee ningun color asignado, le entregamos uno por defecto
        if(response.data[i].area_color == null){
            response.data[i].area_color = "#734525"
        }

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

    //actividades proximas
    var flags1 = []
    var categorias1 = {}
    for(var i = 0; i < response.data.length; i++){
        if(flags1[response.data[i].sala_id]) continue
        flags1[response.data[i].sala_id] = true

        //si es que no posee ningun color asignado, le entregamos uno por defecto
        if(response.data[i].area_color == null){
            response.data[i].area_color = "#734525"
        }

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
                            //return nro
                    }else{
                        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
                            nro+=0 
                            //return nro
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

    var final = {
                    hoy: categorias,
                    proximo: categorias1
                }

    return final;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

export {
    getSalas,
    getProgrmacion
}