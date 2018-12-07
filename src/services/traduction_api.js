import axios from 'axios';

const API_URL = 'https://engrane.ml/ccpm-api/public/api'

//metodo que obtiene todos los datos correspondientes a la cartelera
function getTraduction(id){
    return axios.get(`${API_URL}/translate-actividad?id=`+id)
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