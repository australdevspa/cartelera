import Vue from 'vue';
import Vuex from 'vuex';
import {   
    getDataCartelera,
    getEvento,
    getDetalle,
    getDetalleX,
    getSegmentoActividades
} from '@/services/cartelera_api'
import {
    existeSlug,
    existeSlugActividades,
    getExposicion,
    getExposiciones
} from '@/services/exposiciones_api'
import {
    getTraduction
} from '@/services/traduction_api'
import {
    getSalas,
    getEjemplo
} from '@/services/salas'


import moment from 'moment';
moment.locale('es')
import dc from 'dale_color';


Vue.use(Vuex);

const state = {
    //state correspondiente a la App
    data_cartelera: [],

    //state correspondiente a la vista de Inicio
    carousel: [],
    carousel_inicio: 0,
    carousel_tamaño: 5,

    //state correspondientes a la vista de la Cartelera
    categorias: [],

    estado: false,

    cartelera: [],
    cartelera_total: 0,
    cartelera_inicio: 0,
    cartelera_tamaño: 10,
    cartelera_boton: false,

    por_categoria: [],
    por_categoria_total: 0,
    por_categoria_inicio: 0,
    por_categoria_tamaño: 10,
    por_categoria_boton: false,

    //state correspondiente a la vista Evento
    evento: [],

    //state correspondiente a la vista de la Visita Guiada
    existe_slug: false,
    expo: [],

    translate: [],

    salas: [],
    ejemplo: [],

    exposiciones: [],

    estado_traduccion: false,

    detalle: [],
    detallex: []
};

const actions = {
    loadDataCartelera(context) {
        return getDataCartelera()
            .then(data_cartelera => context.commit('updateDataCartelera', data_cartelera));
    },
//load viejo trae segmento de actividades ya cargadas
    loadCartelera(context) {
        context.commit('updateCartelera');
    },
   
//load nuevo trae segmento de actividades
    loadActividades(context) {
        return getSegmentoActividades(state.cartelera_tamaño, state.cartelera_inicio)
        .then(cartelera => context.commit('updateActividades', cartelera))

        /*return getSegmentoActividades(state.limiteActividades, state.contadorActividades)
            .then(actividades => context.commit('updateActividades', actividades))*/
    
    },



    loadPorCategoria(context, area) {
        context.commit('updatePorCategoria', area);
    },

    loadMasPorCategoria(context, area) {
        context.commit('updateMasPorCategoria', area);
    },

    loadEstadoFalse(context) {
        context.commit('updateEstadoFalse')
    },

    loadEstadoTrue(context) {
        context.commit('updateEstadoTrue')
    },

    //actions correspondiente a la vista Evento
    loadEvento(context, slug) {
        return getEvento(slug)
            .then(evento => context.commit('updateEvento', evento));
    },

    //actions correspondiente a la vista de la Visita Guiada
    loadExisteSlug(context, slug) {
        return existeSlug(slug)
            .then(existe_slug => context.commit('updateExisteSlug', existe_slug));
    },

    loadExisteSlugActividades(context, slug) {
        return existeSlugActividades(slug)
            .then(existe_slug => context.commit('updateExisteSlugActividades', existe_slug));
    },

    loadResetExisteSlug(context) {
        context.commit('updateResetExisteSlug')
    },

    loadExpo(context, slug) {
        return getExposicion(slug)
            .then(expo => context.commit('updateExpo', expo));
    },

    loadTranslate(context, id) {
        return getTraduction(id)
            .then(translate => context.commit('updateTranslate', translate));
    },

    loadSalas(context) {
        return getSalas()
            .then(salas => context.commit('updateSalas', salas));
    },
    loadEjemplo(context) {
        return getEjemplo()
            .then(ejemplo => context.commit('updateEjemplo', ejemplo));
    },

    loadExposiciones(context) {
        return getExposiciones()
            .then(exposiciones => context.commit('updateExposiciones', exposiciones));
    },

    loadTrue(context) {
        context.commit('updateTrue')
    },

    loadFalse(context) {
        context.commit('updateFalse')
    },

    loadDetalle(context, id) {
        return getDetalle(id)
            .then(detalle => context.commit('updateDetalle', detalle));
    },
    loadDetalleX(context, {a, b}) {
        return getDetalleX(a, b)
            .then(detallex => context.commit('updateDetalleX', detallex));
    },

    loadResetEvento(context) {
        context.commit('updateResetEvento')
    },
};

const mutations = {
    updateDataCartelera(state, data_cartelera) {
        state.data_cartelera = data_cartelera;
        
        if(state.carousel_tamaño >= state.data_cartelera.cartelera_total){
            state.carousel_tamaño = state.data_cartelera.cartelera_total;
        }
        state.carousel = data_cartelera.cartelera.slice(state.carousel_inicio, state.carousel_tamaño);

        state.categorias = data_cartelera.categorias;
        //state.estado = false;
        if(state.cartelera_inicio === 0){
            state.cartelera = data_cartelera.cartelera.slice(state.cartelera_inicio, state.cartelera_tamaño);
            state.cartelera_total = data_cartelera.cartelera_total;
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.cartelera_tamaño >= state.data_cartelera.cartelera_total){
                state.cartelera_inicio = state.data_cartelera.cartelera_total;
                state.cartelera_boton = false;
            }else{
                state.cartelera_inicio = state.cartelera_inicio + state.cartelera_tamaño;
                state.cartelera_boton = true;
            }
        }
    },
    //update viejo trae segmento de actividades ya cargadas
    updateCartelera(state) {
        //state.estado = false;
        var extracto = state.data_cartelera.cartelera.slice(state.cartelera_inicio, state.cartelera_inicio+state.cartelera_tamaño);
        if(state.cartelera_inicio !== 0){
            extracto.forEach(function (value, key) {
                state.cartelera.push(value);
            });
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.cartelera_inicio + state.cartelera_tamaño >= state.data_cartelera.cartelera_total){
                state.cartelera_inicio = state.data_cartelera.cartelera_total;
                state.cartelera_boton = false;
            }else{
                state.cartelera_inicio = state.cartelera_inicio + state.cartelera_tamaño;
                state.cartelera_boton = true;
            }
        }
    },

    //update nuevo trae segmento de actividades
    updateActividades(state, cartelera) {
        if(state.cartelera_inicio !== 0){
            cartelera.resultados.forEach(function (value, key) {
                state.cartelera.push(value);
            });
            //state.cartelera_inicio = state.cartelera_inicio + 10;

            if(state.cartelera_inicio + state.cartelera_tamaño >= state.data_cartelera.cartelera_total){
                state.cartelera_inicio = state.data_cartelera.cartelera_total;
                state.cartelera_boton = false;
            }else{
                state.cartelera_inicio = state.cartelera_inicio + state.cartelera_tamaño;
                state.cartelera_boton = true;
            }
            //state.actividades = actividades.resultados;
            //state.contadorActividades = state.contadorActividades + 10;
        }
        //state.totalActividades = actividades.total;
        
        /*if(state.cartelera_inicio === 0){
            //state.actividades = actividades.resultados;
            //state.contadorActividades = state.contadorActividades + 10;
        }else{
            cartelera.resultados.forEach(function (value, key) {
                state.cartelera.push(value);
            });
            state.cartelera_inicio = state.cartelera_inicio + 10;
        }*/
    },


    /*updateActividades(state, actividades) {
        state.totalActividades = actividades.total;
        if(state.contadorActividades === 0){
            state.actividades = actividades.resultados;
            state.contadorActividades = state.contadorActividades + 10;
        }else{
            actividades.resultados.forEach(function (value, key) {
                state.actividades.push(value);
            });
            state.contadorActividades = state.contadorActividades + 10;
        }
    },*/

    updatePorCategoria(state, area) {
        state.estado = true;
        if(state.por_categoria_inicio === 0){
            state.por_categoria = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_tamaño);
            state.por_categoria_total = state.categorias[area].ocurrence;
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.por_categoria_tamaño >= state.por_categoria_total){
                state.por_categoria_inicio = state.por_categoria_total;
                state.por_categoria_boton = false;
            }else{
                state.por_categoria_inicio = state.por_categoria_inicio + state.por_categoria_tamaño;
                state.por_categoria_boton = true;
            }
        }else if(state.por_categoria_inicio !== 0 && area === state.por_categoria[0].area){    
            state.estado = true;
        }else if(state.por_categoria_inicio !== 0 && area !== state.por_categoria[0].area){
            //reset por_categoria
            state.por_categoria = []
            state.por_categoria_total = 0
            state.por_categoria_inicio = 0
            state.por_categoria_boton = false

            state.por_categoria = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_tamaño);
            state.por_categoria_total = state.categorias[area].ocurrence;
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.por_categoria_tamaño >= state.por_categoria_total){
                state.por_categoria_inicio = state.por_categoria_total;
                state.por_categoria_boton = false;
            }else{
                state.por_categoria_inicio = state.por_categoria_inicio + state.por_categoria_tamaño;
                state.por_categoria_boton = true;
            }
        }
    },

    updateMasPorCategoria(state, area) {
        //state.estado = true;
        //state.por_categoria_area = por_categoria[0].area;
        var extracto = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_inicio+state.por_categoria_tamaño);
        if(state.por_categoria_inicio !== 0){
            extracto.forEach(function (value, key) {




                
                //value.hola = "nose"
                
                state.por_categoria.push(value);
            });
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.por_categoria_inicio + state.por_categoria_tamaño >= state.por_categoria_total){
                state.por_categoria_inicio = state.por_categoria_total;
                state.por_categoria_boton = false;
            }else{
                state.por_categoria_inicio = state.por_categoria_inicio + state.por_categoria_tamaño;
                state.por_categoria_boton = true;
            }
        }
    },






//Asignacion y modificacion de parametros a los objetos de la api
 setParametros(x){
    moment.locale('es')
    if(x.thumbnail == null){
        x.thumbnail = "../static/img/default/evento_default.jpg"

        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')

        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')

        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')

        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.horario = horario(x.fecha_ini, x.fecha_fin)

        x.entrada = precio(x.valor);

        x.donde = donde(x.lugar);
        
        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);

        x.trozo = acortar(x.nombre);
        x.trozo_card = acortarCard(x.nombre);

        x.cuanto_falta = cuantoFalta(x.diff)
        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        //x.cuanto_falta = cuantoFalta(x.fecha_ini)

        x.color_claro = lighten(x.area_color,30);
        x.color_oscuro = darken(x.area_color,30);

        x.dale = dale(x.area_color);
        x.colorOpuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
        //x.unque = fechas_proximas();
    }else{
        x.fecha_inicio_formato = moment(x.fecha_ini).format('DD/MM/YYYY')
        x.fecha_inicio_formato_day = moment(x.fecha_ini).format('DD')
        x.fecha_inicio_formato_month = moment(x.fecha_ini).format('MMMM')
        x.fecha_inicio_formato_year = moment(x.fecha_ini).format('YYYY')
        
        x.fecha_fin_formato = moment(x.fecha_fin).format('DD/MM/YYYY')
        
        x.fecha_publicacion = moment(x.creado_el).format('DD/MM/YYYY')

        x.fecha_rango = fecha_rango(x.fecha_ini, x.fecha_fin)

        x.horario = horario(x.fecha_ini, x.fecha_fin)

        x.entrada = precio(x.valor);

        x.donde = donde(x.lugar);

        x.dia_semana = diaSemana(x.fecha_ini, x.fecha_fin);
        
        x.trozo = acortar(x.nombre);
        x.trozo_card = acortarCard(x.nombre);
        
        x.cuanto_falta = cuantoFalta(x.diff);
        /*x.moment = moment().add(1, 'd').calendar();
        x.moment_x = moment(x.fecha_ini).endOf('days').fromNow();
        x.moment_y = moment("2019-01-05").startOf('days').fromNow();*/

        x.cuanto_moment = cuantoMoment(x.fecha_ini);
        x.cuanto_moment_en = cuantoMomentEn(x.fecha_ini);
        //x.cuanto_falta = cuantoFalta(x.fecha_ini)

        /*x.color_claro = lighten('#23B19D',20);
        x.color_oscuro = darken('#23B19D',20);*/
        x.color_claro = lighten(x.area_color,30);
        x.color_oscuro = darken(x.area_color,30);

        x.dale = dale(x.area_color);
        x.colorOpuesto = colorOpuesto(x.color_claro);

        x.w = w(x.fecha_ini);
        //x.unque = fechas_proximas();
    }
    if(x.area_color == null){
        x.area_color = "#1e87f0"
    }
},



fecha_rango(inicio, fin) {
    var fecha_actual = moment().format('YYYY-MM-DD')
    var fecha_inicio = moment(inicio).format('YYYY-MM-DD')
    var fecha_fin = moment(fin).format('YYYY-MM-DD')
    
    if(fecha_inicio === fecha_fin){
        return moment(inicio).format('DD/MM/YYYY');
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
            return moment(fecha_actual).format('DD/MM/YYYY');
        }else{
            return moment(inicio).format('DD/MM/YYYY');
        }
    }
},

 colorOpuesto(color) {
    var opuesto = dc.armonias.opuesto(color)
    if(dc.validaciones.isClaro(opuesto, 177) == true){
        var masOscuro = dc.brillo.oscurecer(opuesto, 50)
        return masOscuro
    }else{
        return opuesto
    }
},

 w(inicio) {
    var hoy = moment().format('YYYY-MM-DD')
    var dos_semanas = moment(hoy, "YYYY-MM-DD").add('days', 28);
    
    var fecha_inicio = moment(inicio).format('YYYY-MM-DD')

    if(fecha_inicio === hoy){
        return "hoy";
    }else{
        if(moment(fecha_inicio).isBetween(hoy, dos_semanas) === true){
            return "4 semanas";
        }else{
            return "no";
        }
    }

    /*var day = new_date.format('DD');
    var month = new_date.format('MM');
    var year = new_date.format('YYYY');

    return day + '.' + month + '.' + year;*/
    return moment(dos_semanas).format('DD/MM/YYYY');
}

,fechas_proximas() {
    /*var hoy = moment().format('YYYY-MM-DD')
    var dossemanas = moment(new Date()).add(14,'days')
    
    var fecha_actual = moment().format('YYYY-MM-DD')
    var fecha_inicio = moment(inicio).format('YYYY-MM-DD')
    var fecha_fin = moment(fin).format('YYYY-MM-DD')
    
    if(fecha_inicio === fecha_fin){
        return moment(inicio).format('DD/MM/YYYY');
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) === true){
            return moment(fecha_actual).format('DD/MM/YYYY');
        }else{
            return moment(inicio).format('DD/MM/YYYY');
        }
    }*/
    startdate = "20.03.2014";
var new_date = moment(startdate, "DD-MM-YYYY").add('days', 5);

var day = new_date.format('DD');
var month = new_date.format('MM');
var year = new_date.format('YYYY');

return "cc";
}

,horario(inicio, fin) {
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        var hora_inicio = moment(inicio).format('HH:mm')
        //var hora_fin = moment(fin).format('HH:mm')

        return hora_inicio + " hrs";
    }else{
        return "horario indefinido";
    }
}

, precio(valor) {
    if(valor == "0.-" || valor == "0"){
        return "liberada";
    }else if(valor.indexOf(".-") != -1){
        return "$" + valor.substr(0, valor.indexOf(".-"))
    }else {
        return "$" + valor;
    }
}

, donde(lugar) {
    var casa = "Casa del Arte Diego Rivera"
    if(lugar == "Sala Teatro Diego Rivera"){
        return "Sala Teatro - " + casa;
    }else{
        return lugar + " - " + casa;
    }
}

,diaSemana(inicio, fin) {
    moment.locale('es')
    var fecha_actual = moment()
    var fecha_inicio = moment(inicio).format('DD/MM/YYYY')
    var fecha_fin = moment(fin).format('DD/MM/YYYY')
    if(fecha_inicio == fecha_fin){
        return moment(inicio).format('dddd');
    }else{
        if(moment(fecha_actual).isBetween(fecha_inicio, fecha_fin) == true){
            return moment(inicio).format('dddd');
        }else{
            return moment(inicio).format('dddd');
        }
    }
    //return moment(fecha).format('dddd');
    /*
// What day of the week is it?
var day = "2018-12-16 13:30:00" // 5
console.log( moment.weekdays[day] ); // Friday
console.log( moment().weekday(0) );
// What is the current month name?
console.log( moment().weekday() ); 

console.log( moment(day).format('dddd') ); 
    //return moment.weekdays[fecha]; */
}

, acortar(titulo) {
    if(titulo.length > 33){
        var extracto = titulo.substring(0, 33);
        var n = extracto.lastIndexOf(" ");
        var nuevoExtracto = titulo.substring(0, n);
        return nuevoExtracto + " ...";
    }else{
        return titulo;
    }
}

, acortarCard(titulo) {
    if(titulo.length > 53){
        var extracto = titulo.substring(0, 53);
        var n = extracto.lastIndexOf(" ");
        var nuevoExtracto = titulo.substring(0, n);
        return nuevoExtracto + " ...";
    }else{
        return titulo;
    }
}

// funciones momentjs
, cuantoFalta(diferencia) {
    if(diferencia == 0){
        return 'Hoy'
    }else if(diferencia == 1){
        return 'En '+ diferencia +' día'
    }else{
        return 'En '+ diferencia +' días'
    }
}

, cuantoMoment(date) {
    
    // get from-now for this date
    //var fromNow = moment( date ).fromNow();

    moment.updateLocale('es', {
        calendar : {
            lastDay : '[Ayer]',
            sameDay : '[Hoy]',
            /*sameDay: function (now) {
                if (this.isBefore(now)) {
                  return '[Will Happen Today]';
                } else {
                  return '[Happened Today]';
                }},*/
            nextDay : '[Mañana]',
            lastWeek : '[Pasado] dddd',
            nextWeek : '[Próximo] dddd',
            //sameElse : 'DD/MM/YYYY',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });
    
    /*moment.updateLocale('fr', {
        calendar : {
            lastDay : '[Hier]',
            sameDay : '[Aujourd’hui] L',
            nextDay : '[Demain]',
            lastWeek : 'll',
            nextWeek : 'll',
            sameElse : 'll'
        }
    });*/
    /*var date = moment().startOf('day');
    return date;*/
    //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          return date.locale('es').calendar();
    //return date.locale('es').calendar();
    //var today2 = moment().startOf('day');
    //return today2.locale('es').calendar();

    return moment(date).startOf('days').locale('es').calendar();
    //console.log(today2.locale('fr').calendar());
}

,cuantoMomentEn(date) {
    
    //var fromNow = moment( date ).lang("en").fromNow();

    moment.updateLocale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            /*sameDay: function (now) {
                if (this.isBefore(now)) {
                  return '[Will Happen Today]';
                } else {
                  return '[Happened Today]';
                }},*/
            nextDay : '[Tomorrow]',
            lastWeek : '[Last] dddd',
            nextWeek : '[Next] dddd',
            //sameElse : 'DD/MM/YYYY',
            sameElse: function () {
                var fromNow = moment( date ).fromNow();
                return "[" + fromNow + "]";
            }
        }
    });

    return moment(date).startOf('days').locale('en').calendar();
},





    updateEstadoFalse(state) {
        state.estado = false;
    },

    updateEstadoTrue(state) {
        state.estado = true;
    },

    //mutations correspondiente a la vista Evento
    updateEvento(state, evento) {
        state.evento = evento;
    },

    //mutations correspondiente a la vista de la Visita Guiada
    updateExisteSlug(state, existe_slug) {
        state.existe_slug = existe_slug;
    },

    updateExisteSlugActividades(state, existe_slug) {
        state.existe_slug = existe_slug;
    },

    updateResetExisteSlug(state) {
        state.existe_slug = false;
    },

    updateExpo(state, expo) {
        state.expo = expo;
    },

    updateTranslate(state, translate) {
        state.translate = translate;
    },

    updateSalas(state, salas) {
        state.salas = salas;
    },
    updateEjemplo(state, ejemplo) {
        state.ejemplo = ejemplo;
    },

    updateExposiciones(state, exposiciones) {
        state.exposiciones = exposiciones;
    },

    updateTrue(state) {
        state.estado_traduccion = true;
    },

    updateFalse(state) {
        state.estado_traduccion = false;
    },

    updateDetalle(state, detalle) {
        state.detalle = detalle;
    },
    updateDetalleX(state, detallex) {
        state.detallex = detallex;
    },

    updateResetEvento(state) {
        state.evento = [];
    },
}

const getters = {

};

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;