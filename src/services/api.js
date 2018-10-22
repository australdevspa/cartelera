import axios from 'axios';
import moment from 'moment';
moment.locale('es')

const API_URL = 'https://www.culturapuertomontt.cl/inicio/wp-json/cartelera/v1'

function setParametros(x){
    if(x.attachments == null){
        x.attachments = '[{"guid" : "https://cdn.gbposters.com/media/catalog/product/cache/1/image/737x938/9df78eab33525d08d6e5fb8d27136e95/p/o/pokemon-charmander-face-collector-print-1.23.jpg"}]'
        
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

function getTotal(){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        return Object.keys(response.data).length
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

function getCartelera(inicio, fin){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var x = inicio
        while(x < fin){
            setParametros(response.data[x])
            x++
        }
        return response.data.slice(inicio, fin)
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

function getxcategoria(inicio, fin){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var categoria = []
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].area === "Cine") {
                categoria.push(response.data[i]);
            }
        }
        var x = inicio
        while(x < fin){
            setParametros(categoria[x])
            x++
        }
        return categoria.slice(inicio, fin)
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

function getxcategoriaTotal(){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var categoria = []
        for (var i = 0; i < response.data.length ; i++) {
            if (response.data[i].area === "Cine") {
                categoria.push(response.data[i]);
            }
        }
        return Object.keys(categoria).length
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}


//Object.keys(response.data).length
/*function getCartelera(){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var x = 0
        var y = []
        while(x < 10){
            
            /*if(response.data[x].attachments.length <= 0){
                response.data[x].attachments.push({guid: 'https://cdn.gbposters.com/media/catalog/product/cache/1/image/737x938/9df78eab33525d08d6e5fb8d27136e95/p/o/pokemon-charmander-face-collector-print-1.23.jpg'})
            }
            response.data[x].fecha_inicio_formato = moment(response.data[x].fecha_ini).format('DD/MM/YYYY')
            response.data[x].fecha_inicio_formato_day = moment(response.data[x].fecha_ini).format('DD')
            response.data[x].fecha_inicio_formato_month = moment(response.data[x].fecha_ini).format('MMMM')
            response.data[x].fecha_inicio_formato_year = moment(response.data[x].fecha_ini).format('YYYY')
            *///y.push(this.setParametros(response, x))
   /*         y.push(response.data[x])
            x++
        }
        return y;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/



//const API_URL = 'http://localhost/api-ccpm/public/index.php/api'

function horasDias(horas){
    var cont = 1;
    var resultado = horas - 24;
    while(resultado > 24){
        resultado = resultado - 24;
        cont++;
    }
    if(cont == 1)
        return cont + " día";
    return cont + " días";
    
}

function duracionEvento(from_date, end_date){
    var fromDate = moment.utc(from_date);
    var toDate = moment.utc(end_date);

    var hourDiff = toDate.diff(fromDate,'hours');
    var minuteDiff = toDate.diff(fromDate,'minutes');

    var hourDuration = Math.floor(minuteDiff/60);
    var minuteDuration = minuteDiff % 60;

    if(hourDuration == 0){
        return minuteDuration+ " minutos";
    }else{
        if(hourDuration == 1){
            if(minuteDuration == 0){
                return hourDuration+ " hora";
            }else{
                return hourDuration+ " hora con " +minuteDuration+ " minutos";
            }
        }else{
            if(hourDuration < 24){
                if(minuteDuration == 0){
                    return hourDuration+ " horas";
                }else{
                    return hourDuration+ " horas con " +minuteDuration+ " minutos";
                }
            }else{
                return horasDias(hourDuration);
            }
        }
    }
}

function getProximasActividades(){
    return axios.get(`${API_URL}/slide`)
    .then(function (response) {
        response.data.forEach(element => {
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

function getSegmentoActividades(limite, inicio){
    return axios.get(`${API_URL}/actividades/limit=`+limite+`&offset=`+inicio)
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

/*function getCarousel(){
    return axios.get(`${API_URL}/cartelera-ccpm`)
    .then(function (response) {
        var x = 0
        var y = []
        while(x < 5){
            /*if(response.data[x].attachments == null){
                response.data[x].attachments = '[{"guid" : "https://cdn.gbposters.com/media/catalog/product/cache/1/image/737x938/9df78eab33525d08d6e5fb8d27136e95/p/o/pokemon-charmander-face-collector-print-1.23.jpg"}]'
                
                var attachments = response.data[x].attachments
                var json_attachments = JSON.parse(attachments);
                response.data[x].attachments = json_attachments

                response.data[x].fecha_inicio_formato = moment(response.data[x].fecha_ini).format('DD/MM/YYYY')
                response.data[x].fecha_inicio_formato_day = moment(response.data[x].fecha_ini).format('DD')
                response.data[x].fecha_inicio_formato_month = moment(response.data[x].fecha_ini).format('MMMM')
                response.data[x].fecha_inicio_formato_year = moment(response.data[x].fecha_ini).format('YYYY')
            }else{
                var attachments = response.data[x].attachments
                var json_attachments = JSON.parse(attachments);
                response.data[x].attachments = json_attachments

                response.data[x].fecha_inicio_formato = moment(response.data[x].fecha_ini).format('DD/MM/YYYY')
                response.data[x].fecha_inicio_formato_day = moment(response.data[x].fecha_ini).format('DD')
                response.data[x].fecha_inicio_formato_month = moment(response.data[x].fecha_ini).format('MMMM')
                response.data[x].fecha_inicio_formato_year = moment(response.data[x].fecha_ini).format('YYYY')
            }*/
  //          y.push(setParametros(response.data[x]))
            //y.push(response.data[x])
    /*        x++
        }
        return y;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}

/*function getCategorias(){
    return axios.get(`${API_URL}/categorias`)
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}*/

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

function getActividades(){
    return axios.get(`${API_URL}/cartelera`)
    .then(function (response) {
        response.data.forEach(element => {
            if(element.RutaImg==null){
                element.RutaImg = 'https://instagram.fpmc1-1.fna.fbcdn.net/vp/62e7efa2ab7b169f89e5cfdd144f13a3/5B4D39AE/t51.2885-15/e35/26303153_1993871283961664_3279091338745741312_n.jpg';
            } 
            element.cuantoFalta = moment(element.Fecha_ini).fromNow() //falta implementar
            element.fechaLAnzamiento = moment(element.Creado_El).fromNow()
            element.duracion = duracionEvento(element.Fecha_ini, element.Fecha_fin)
            element.fecha_inicio_formato = moment(element.Fecha_ini).format('DD/MM/YYYY')
        });
        return response.data;
    })
    .catch(function (error) {
        return 'An error occured..' + error;
    })
}



export {
    getCarousel,
    getCategorias,
    getTotal,
    getCartelera,
    getxcategoria,
    getxcategoriaTotal,

    getProximasActividades,
    getSegmentoActividades,
    getBusquedaActividades,
    getBusquedaCategoria
}