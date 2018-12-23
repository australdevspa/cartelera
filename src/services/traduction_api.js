import axios from 'axios';
import {   
    Endpoint
} from '@/services/endpoints'

function getTraduction(id){
    return axios.get(`${Endpoint}/translate-actividad?id=`+id)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

export {
    getTraduction
}