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

/*
function getBusquedaActividades(texto, limite, inicio){
    return axios.get(`${API_URL}/busqueda/texto=`+texto+`&limit=`+limite+`&offset=`+inicio)
    .then(function (response) {
        response.data.resultados.forEach(element => {
            if(element.RutaImg==null){
                element.RutaImg = 'https://instagram.fpmc1-1.fna.fbcdn.net/vp/62e7efa2ab7b169f89e5cfdd144f13a3/5B4D39AE/t51.2885-15/e35/26303153_1993871283961664_3279091338745741312_n.jpg';
            } 
            element.cuantoFalta = moment(element.Fecha_ini).fromNow() //falta implementar
            element.fechaLAnzamiento = moment(element.Creado_El).fromNow()
            element.duracion = duracionEvento(element.Fecha_ini, element.Fecha_fin)
            element.fecha_inicio_formato = moment(element.Fecha_ini).format('DD/MM/YYYY')
            element.fecha_inicio_formato_day = moment(element.Fecha_ini).format('DD')
            element.fecha_inicio_formato_month = moment(element.Fecha_ini).format('MMMM')
            element.fecha_inicio_formato_year = moment(element.Fecha_ini).format('YYYY')
        });
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

/*
function getBusquedaCategoria(texto, limite, inicio){
    return axios.get(`${API_URL}/busquedaCategoria/texto=`+texto+`&limit=`+limite+`&offset=`+inicio)
    .then(function (response) {
        response.data.resultados.forEach(element => {
            if(element.RutaImg==null){
                element.RutaImg = 'https://instagram.fpmc1-1.fna.fbcdn.net/vp/62e7efa2ab7b169f89e5cfdd144f13a3/5B4D39AE/t51.2885-15/e35/26303153_1993871283961664_3279091338745741312_n.jpg';
            } 
            element.cuantoFalta = moment(element.Fecha_ini).fromNow() //falta implementar
            element.fechaLAnzamiento = moment(element.Creado_El).fromNow()
            element.duracion = duracionEvento(element.Fecha_ini, element.Fecha_fin)
            element.fecha_inicio_formato = moment(element.Fecha_ini).format('DD/MM/YYYY')
            element.fecha_inicio_formato_day = moment(element.Fecha_ini).format('DD')
            element.fecha_inicio_formato_month = moment(element.Fecha_ini).format('MMMM')
            element.fecha_inicio_formato_year = moment(element.Fecha_ini).format('YYYY')
        });
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}
*/

export {
    getCarousel,
    getCategorias,
    getCartelera,
    getPorCategoria
}