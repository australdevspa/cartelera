import Vue from 'vue';
import Vuex from 'vuex';
import { setParametros } from '@/services/parametros'
import {   
    getDataCartelera,

    getEvento,
    getDetalle,
    getDetalleX,
    getSegmentoActividades,
   
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
    cartelera_categoria_activa: '',

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
    //actions correspondiente a la vista App
    loadDataCartelera(context) {
        return getDataCartelera()
            .then(data_cartelera => context.commit('updateDataCartelera', data_cartelera));
    },

    //actions correspondiente a la vista Cartelera
    loadMasActividades(context) {
        return getSegmentoActividades(state.cartelera_tamaño, state.cartelera_inicio)
        .then(cartelera => context.commit('updateMasActividades', cartelera))
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


    //load viejo trae segmento de actividades ya cargadas
    /*loadCartelera(context) {
        context.commit('updateCartelera');
    },*/
   
    /*loadActividades(context) {
        return getSegmentoActividades(state.cartelera_tamaño, state.cartelera_inicio)
        .then(cartelera => context.commit('updateActividades', cartelera))
    },*/









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
    //mutations correspondiente a la vista App
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

    //mutations correspondiente a la vista Cartelera
    updateMasActividades(state, cartelera) {
        if(state.cartelera_inicio !== 0){
            cartelera.resultados.forEach(function (value, key) {
                state.cartelera.push(value);
            });
            if(state.cartelera_inicio + state.cartelera_tamaño >= state.data_cartelera.cartelera_total){
                state.cartelera_inicio = state.data_cartelera.cartelera_total;
                state.cartelera_boton = false;
            }else{
                state.cartelera_inicio = state.cartelera_inicio + state.cartelera_tamaño;
                state.cartelera_boton = true;
            }
        }
    },

    updatePorCategoria(state, area) {
        state.estado = true;
        if(state.por_categoria_inicio === 0){
            //state.por_categoria = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_tamaño);
            var extracto = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_tamaño);
            extracto.forEach(function (value, key) {
                setParametros(value)
                state.por_categoria.push(value);
            });
            
            state.por_categoria_total = state.categorias[area].ocurrence;
            state.cartelera_categoria_activa = area;
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

            //state.por_categoria = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_tamaño);
            var extracto = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_tamaño);
            extracto.forEach(function (value, key) {
                setParametros(value)
                state.por_categoria.push(value);
            });
            state.por_categoria_total = state.categorias[area].ocurrence;
            state.cartelera_categoria_activa = area;
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
        var extracto = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_inicio+state.por_categoria_tamaño);
        if(state.por_categoria_inicio !== 0){
            extracto.forEach(function (value, key) {
                setParametros(value)
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

    updateEstadoFalse(state) {
        state.estado = false;
    },

    updateEstadoTrue(state) {
        state.estado = true;
    },


    //update viejo trae segmento de actividades ya cargadas
    /*updateCartelera(state) {
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
    },*/



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



    /*updatePorCategoria(state, area) {
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
    },*/


    /*updateMasPorCategoria(state, area) {
        //state.estado = true;
        //state.por_categoria_area = por_categoria[0].area;
        //var extracto = state.categorias[area].eventos.slice(state.por_categoria_inicio, state.por_categoria_inicio+state.por_categoria_tamaño);
        
        if(state.por_categoria_inicio !== 0){
            area.forEach(function (value, key) {





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
    },*/










  

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