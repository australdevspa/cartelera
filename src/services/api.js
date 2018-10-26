import axios from 'axios';
import moment from 'moment';
moment.locale('es')

const API_URL = 'https://www.culturapuertomontt.cl/inicio/wp-json/cartelera/v1'

//Asignacion y modificacion de parametros a los objetos de la api

function setParametros(x){
    if(x.attachments == null){
        x.attachments = '[{"guid" : "https://www.audiovisualstudio.es/wp-content/uploads/2016/08/alquiler-de-equipos-para-eventos-ganar-dinero.jpg"}]'
        
        var attachments = x.attachments
        var json_attachments = JSON.parse(attachments);
        x.attachments = json_attachments

        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
    }else{
        var attachments = x.attachments
        var json_attachments = JSON.parse(attachments);
        x.attachments = json_attachments

        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
    }
}

//metodo correspondiente a la vista de Inicio

function getCarousel(){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var x = 0
        var y = []
        while(x < 5){
            setParametros(response.data[x])
            y.push(response.data[x])
            x++
        }
        return y;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//metodos correspondientes a la vista de la Cartelera

function getCategorias(){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var flags = []
        var categorias = []
        for(var i = 0; i < response.data.length; i++){
            if(flags[response.data[i].area]) continue
            flags[response.data[i].area] = true

            categorias.push(
                {
                    area: response.data[i].area, 
                    color: response.data[i].area_color, 
                    ocurrence : nro_ocurrencias(response.data[i].area)
                }
            )

            function nro_ocurrencias(value){
                var nro = 0
                for(var i = 0; i < response.data.length; i++){
                    if(response.data[i].area === value)
                        nro+=1 
                }
                return nro
            }
        }
        return categorias;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

function getCartelera(inicio, tamaño){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var response_length = Object.keys(response.data).length
        if(inicio == 0){
            if(tamaño > response_length){
                tamaño = response_length;
                var final = []
                var x = inicio
                while(x < tamaño){
                    setParametros(response.data[x])
                    x++
                }
                final.push(
                    {
                        resultado: response.data.slice(inicio, tamaño),
                        total: response_length
                    }
                )
                return final
            }else{
                var final = []
                var x = inicio
                while(x < tamaño){
                    setParametros(response.data[x])
                    x++
                }
                final.push(
                    {
                        resultado: response.data.slice(inicio, tamaño),
                        total: response_length
                    }
                )
                return final
            }
        }else{
            if(inicio + tamaño > response_length){
                tamaño = response_length;
                var x = inicio
                while(x < tamaño){
                    setParametros(response.data[x])
                    x++
                }
                return response.data.slice(inicio, tamaño)
            }else{
                var x = inicio
                while(x < inicio + tamaño){
                    setParametros(response.data[x])
                    x++
                }
                return response.data.slice(inicio, inicio + tamaño)
            }
        }
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

function getPorCategoria(inicio, tamaño, area){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var por_categoria = []
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].area === area) {
                por_categoria.push(response.data[i]);
            }
        }

        var response_length = Object.keys(por_categoria).length
        if(inicio == 0){
            if(tamaño > response_length){
                tamaño = response_length;
                var final = []
                var x = inicio
                while(x < tamaño){
                    setParametros(por_categoria[x])
                    x++
                }
                final.push(
                    {
                        resultado: por_categoria.slice(inicio, tamaño),
                        total: response_length,
                        area: area
                    }
                )
                return final
            }else{
                var final = []
                var x = inicio
                while(x < tamaño){
                    setParametros(por_categoria[x])
                    x++
                }
                final.push(
                    {
                        resultado: por_categoria.slice(inicio, tamaño),
                        total: response_length,
                        area: area
                    }
                )
                return final
            }
        }else{
            if(inicio + tamaño > response_length){
                tamaño = response_length;
                var x = inicio
                while(x < tamaño){
                    setParametros(por_categoria[x])
                    x++
                }
                return por_categoria.slice(inicio, tamaño)
            }else{
                var x = inicio
                while(x < inicio + tamaño){
                    setParametros(por_categoria[x])
                    x++
                }
                return por_categoria.slice(inicio, inicio + tamaño)
            }
        }
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

//metodo correspondiente a la vista de Evento

/*function getEvento(id){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var evento = []
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].id === id) {
                evento.push(response.data[i]);
            }
        }
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/

export {
    getCarousel,
    getCategorias,
    getCartelera,
    getPorCategoria
    //getEvento
}