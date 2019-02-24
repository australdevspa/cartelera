import axios from 'axios';
import moment from 'moment';
moment.locale('es')
import { Endpoint } from '@/services/endpoints'

/*function existeSlug(slug){
    return axios.get(`${Endpoint}/exposiciones`)
    .then(function (response) {
        var existe = false
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].slug === slug) {
                existe = true;
            }
        }
        return existe;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/
/*
function existeSlugActividades(slug){
    return axios.get(`${Endpoint}/actividades`)
    .then(function (response) {
        var existe = false
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].slug === slug) {
                existe = true;
            }
        }
        return existe;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/

function getExposicion(slug){
    return axios.get(`${Endpoint}/exposiciones`)
    .then(function (response) {
        var expo = []
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].slug === slug) {
                response.data[i].fecha_inicio_formato = moment(response.data[i].fecha_ini).format('DD/MM/YYYY')
                response.data[i].fecha_publicacion = moment(response.data[i].creado_el).format('DD/MM/YYYY')
                expo.push(response.data[i]);
            }
        }
        return expo;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

/*function getExposiciones(){
    return axios.get(`${Endpoint}/exposiciones`)
    .then(function (response) {
        var expo = []
        for (var i = 0; i < response.data.length ; i++) {
            response.data[i].fecha_inicio_formato = moment(response.data[i].fecha_ini).format('DD/MM/YYYY')
            response.data[i].fecha_publicacion = moment(response.data[i].creado_el).format('DD/MM/YYYY')
            response.data[i].fecha_rango = fecha_rango(response.data[i].fecha_ini, response.data[i].fecha_fin)
            response.data[i].sala = sala(response.data[i].lugar)
            expo.push(response.data[i]);
        }
        return expo;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/
/*
function fecha_rango(inicio, fin) {
    var fecha_actual = moment()
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        return fecha_inicio;
    }else{
        if(moment(fecha_actual).isBetween(inicio, fin) == true){
            return moment().format('DD/MM/YYYY');
        }else{
            return fecha_inicio;
        }
    }
}*/
/*
function sala(lugar) {
    if(lugar != null){
        var n = lugar.lastIndexOf(" -");
        var nuevoExtracto = lugar.substring(0, n);
        return nuevoExtracto;
    }else{
        return "Sala Desconocida"
    }
}*/

export {
    //existeSlug,
    //existeSlugActividades,
    getExposicion,
    //getExposiciones
}