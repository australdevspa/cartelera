import axios from 'axios';
import {   
    Endpoint
} from '@/services/endpoints'

function getSalas(){
    return axios.get(`${Endpoint}/salas`)
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