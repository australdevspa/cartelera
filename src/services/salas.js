import axios from 'axios';
import { Endpoint } from '@/services/endpoints'
import { setParametros } from '@/services/parametros'
const moment = require('moment');
require('moment/locale/es');
moment.locale('es');

function getSalas(){
    return axios.get(`${Endpoint}/salas`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//metodo que obtiene todos los datos correspondientes a la cartelera
function getProgrmacion(){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {

    //actividades actuales y proximas
    var flags = []
    var actividades = {}
    var actualmente = {}
    var proximamente = {}
    for(var i = 0; i < response.data.length; i++){
        if(flags[response.data[i].sala_id]) continue
        flags[response.data[i].sala_id] = true

        //si es que no posee ningun color asignado, le entregamos uno por defecto
        if(response.data[i].area_color == null){
            response.data[i].area_color = "#734525"
        }
        
        if((nro_ocurrencias_proximamente(response.data[i].sala_id) != 0 && response.data[i].sala_id != null) || (nro_ocurrencias_actualmente(response.data[i].sala_id) != 0 && response.data[i].sala_id != null)){
            actualmente = {
                area: response.data[i].sala_id,  
                ocurrence : nro_ocurrencias_actualmente(response.data[i].sala_id),
                eventos: actividades_ocurrencias_actualmente(response.data[i].sala_id)
            }

            proximamente = {                
                area: response.data[i].sala_id,  
                ocurrence : nro_ocurrencias_proximamente(response.data[i].sala_id),
                eventos: actividades_ocurrencias_proximamente(response.data[i].sala_id)
            }

            actividades[response.data[i].sala_id] = {
                actualmente,
                proximamente
            }
        }

        function nro_ocurrencias_actualmente(value){
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

        function actividades_ocurrencias_actualmente(value){
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

        function nro_ocurrencias_proximamente(value){
            var nro = 0
            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].sala_id === value){
                    var fecha_actual = moment().format('YYYY-MM-DD')
                    var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                    var dos_semanas = moment(fecha_actual, "YYYY-MM-DD").add('days', 28);

                    if(moment(fecha_inicio).isBetween(fecha_actual, dos_semanas) === true){
                        nro+=1
                        //limite 3 actividades proximamente
                        if(nro == 3){
                            return nro
                        }
                    }
                }
            }
            return nro
        }

        function actividades_ocurrencias_proximamente(value){
            var eventos = []
            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].sala_id === value){
                    var fecha_actual = moment().format('YYYY-MM-DD')
                    var fecha_inicio = moment(response.data[i].fecha_ini).format('YYYY-MM-DD')
                    var dos_semanas = moment(fecha_actual, "YYYY-MM-DD").add('days', 28);

                    if(moment(fecha_inicio).isBetween(fecha_actual, dos_semanas) === true){
                        setParametros(response.data[i])
                        eventos.push(response.data[i]) 
                        //limite 3 actividades proximamente
                        if(eventos.length == 3){
                            return eventos
                        }
                    }
                }     
            }
            return eventos
        }
    }

    var final = {
                    programa: actividades
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