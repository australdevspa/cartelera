import axios from 'axios';
import moment from 'moment';
moment.locale('es')

const API_URL_EXPO = 'https://engrane.ml/ccpm-api/public/api'

// metodo correspondiente a la vista de la visita guiada

function existeSlug(slug){
    return axios.get(`${API_URL_EXPO}/exposiciones`)
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
}

function getExposicion(slug){
    return axios.get(`${API_URL_EXPO}/exposiciones`)
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


export {
    existeSlug,
    getExposicion
}