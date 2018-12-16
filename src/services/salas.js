import axios from 'axios';
import moment from 'moment';
moment.locale('es')

//const API_URL_SALAS = 'https://engrane.ml/ccpm-api/public/api'
const API_URL_SALAS = 'https://api-ccpm.engrane.ml/api'
// metodo correspondiente a la vista de la visita guiada

function getSalas(){
    return axios.get(`${API_URL_SALAS}/salas`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

export {
    getSalas
}