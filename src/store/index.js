import Vue from 'vue';
import Vuex from 'vuex';
import { setParametros } from '@/services/parametros'
import {   
    getDataCartelera,
    getSegmentoActividades,
    getEvento,
    getDetalle,

    getDetalleX
} from '@/services/cartelera'
import {
    getTraduction
} from '@/services/traduction'
import {
    existeSlug,
    existeSlugActividades,
    getExposicion,
    getExposiciones
} from '@/services/exposiciones_api'
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
    primera_carga: true,

    translate: [],
    estado_traduccion: false,

    //state correspondiente a la vista de la Visita Guiada
    existe_slug: false,
    expo: [],




    salas: [],
    ejemplo: [],

    exposiciones: [],


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

    //actions correspondiente a la vista Evento
    loadEvento(context, slug) {
        return getEvento(slug)
            .then(evento => context.commit('updateEvento', evento));
    },

    loadDetalle(context, id) {
        return getDetalle(id)
            .then(detalle => context.commit('updateDetalle', detalle));
    },

    loadTranslate(context, id) {
        return getTraduction(id)
            .then(translate => context.commit('updateTranslate', translate));
    },

    loadTrue(context) {
        context.commit('updateTrue')
    },

    loadFalse(context) {
        context.commit('updateFalse')
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




    loadDetalleX(context, {a, b}) {
        return getDetalleX(a, b)
            .then(detallex => context.commit('updateDetalleX', detallex));
    },

    loadResetEvento(context) {
        context.commit('updateResetEvento')
    },

    loadPrimeraCarga(context) {
        context.commit('updatePrimeraCarga')
    },
};

const mutations = {
    //mutations correspondiente a la vista App
    updateDataCartelera(state, data_cartelera) {
        state.data_cartelera = data_cartelera;
        
        if(state.carousel_tamaño >= state.data_cartelera.cartelera_total){
            state.carousel_tamaño = state.data_cartelera.cartelera_total;
        }
        //slider
        var ex = data_cartelera.expo.slice(0, 6);
        if(ex.length == 6){
            state.carousel = ex;
        }else{
            var ac = data_cartelera.cartelera.slice(0, 6 - ex.length);
            state.carousel = ex.concat(ac);
        }

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

    //mutations correspondiente a la vista Evento
    updateEvento(state, evento) {
        state.evento = evento;
    },

    updateDetalle(state, detalle) {
        state.detalle = detalle;
    },

    updateTranslate(state, translate) {
        state.translate = translate;
    },

    updateTrue(state) {
        state.estado_traduccion = true;
    },

    updateFalse(state) {
        state.estado_traduccion = false;
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



    updateSalas(state, salas) {
        state.salas = salas;
    },
    updateEjemplo(state, ejemplo) {
        state.ejemplo = ejemplo;
    },

    updateExposiciones(state, exposiciones) {
        state.exposiciones = exposiciones;
    },




    updateDetalleX(state, detallex) {
        state.detallex = detallex;
    },

    updateResetEvento(state) {
        state.evento = [];
    },

    updatePrimeraCarga(state) {
        state.primera_carga = false;
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