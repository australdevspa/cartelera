import axios from 'axios';
import {   
    Endpoint
} from '@/services/endpoints'

/*function getCovers(){
    return axios.get(`${Endpoint}/attachments-actividad?id=833`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/

function getCovers(id){
    return axios.get(`${Endpoint}/attachments-actividad?id=`+id)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

export {
    getCovers
}