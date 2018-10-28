import Vue from 'vue';
import Vuex from 'vuex';
import {    
    getCarousel,
    getCategorias,
    getCartelera,
    getPorCategoria,
    getBusqueda,
    getEvento
} from '@/services/api'

Vue.use(Vuex);

const state = {
    //state correspondiente a la vista de Inicio
    carousel: [],
    //state correspondientes a la vista de la Cartelera
    categorias: [],

    estado: false,

    cartelera: [],
    cartelera_inicio: 0,
    cartelera_tamaño: 10,
    cartelera_boton: false,

    por_categoria: [],
    por_categoria_inicio: 0,
    por_categoria_tamaño: 10,
    por_categoria_boton: false,

    busqueda: [],

    //state correspondiente a la vista Evento
    evento: []
};

const getters = {

};

const actions = {
    //actions correspondiente a la vista de Inicio
    loadCarousel(context) {
        return getCarousel()
            .then(carousel => context.commit('updateCarousel', carousel));
    },
    //actions correspondiente a la vista de la Cartelera
    loadCategorias(context) {
        return getCategorias()
            .then(categorias => context.commit('updateCategorias', categorias));
    },

    loadEstadoFalse(context) {
        context.commit('updateEstadoFalse')
    },
    
    loadEstadoTrue(context) {
        context.commit('updateEstadoTrue')
    },

    loadCartelera(context) {
        return getCartelera(state.cartelera_inicio, state.cartelera_tamaño)
            .then(cartelera => context.commit('updateCartelera', cartelera));
    },

    loadPorCategoria(context, area) {
        return getPorCategoria(state.por_categoria_inicio, state.por_categoria_tamaño, area)
            .then(por_categoria => context.commit('updatePorCategoria', por_categoria));
    },

    loadResetPorCategoria(context) {
        context.commit('updateResetPorCategoria')
    },

    loadBusqueda(context, texto) {
        return getBusqueda(texto)
            .then(busqueda => context.commit('updateBusqueda', busqueda));
    },

    loadResetBusqueda(context) {
        context.commit('updateResetBusqueda')
    },

    //actions correspondiente a la vista Evento
    loadEvento(context, slug) {
        return getEvento(slug)
            .then(evento => context.commit('updateEvento', evento));
    },

};

const mutations = {
    //mutations correspondiente a la vista de Inicio
    updateCarousel(state, carousel) {
        state.carousel = carousel;
    },
    //mutations correspondiente a la vista de la Cartelera
    updateCategorias(state, categorias) {
        state.categorias = categorias;
    },

    updateEstadoFalse(state) {
        state.estado = false;
    },

    updateEstadoTrue(state) {
        state.estado = true;
    },

    updateCartelera(state, cartelera) {
        state.estado = false;
        if(state.cartelera_inicio === 0){
            state.cartelera = cartelera;
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.cartelera_tamaño >= state.cartelera[0].total){
                state.cartelera_inicio = state.cartelera[0].total;
                state.cartelera_boton = false;
            }else{
                state.cartelera_inicio = state.cartelera_inicio + state.cartelera_tamaño;
                state.cartelera_boton = true;
            }
        }else{
            cartelera.forEach(function (value, key) {
                state.cartelera[0].resultado.push(value);
            });
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.cartelera_inicio + state.cartelera_tamaño >= state.cartelera[0].total){
                state.cartelera_inicio = state.cartelera[0].total;
                state.cartelera_boton = false;
            }else{
                state.cartelera_inicio = state.cartelera_inicio + state.cartelera_tamaño;
                state.cartelera_boton = true;
            }
        }
    },

    updatePorCategoria(state, por_categoria) {
        state.estado = true;
        //state.por_categoria_area = por_categoria[0].area;
        if(state.por_categoria_inicio === 0){
            state.por_categoria = por_categoria;
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.por_categoria_tamaño >= state.por_categoria[0].total){
                state.por_categoria_inicio = state.por_categoria[0].total;
                state.por_categoria_boton = false;
            }else{
                state.por_categoria_inicio = state.por_categoria_inicio + state.por_categoria_tamaño;
                state.por_categoria_boton = true;
            }
        }else{
            por_categoria.forEach(function (value, key) {
                state.por_categoria[0].resultado.push(value);
            });
            // la suma del inicio y el tamaño, supera al total desabilita boton
            if(state.por_categoria_inicio + state.por_categoria_tamaño >= state.por_categoria[0].total){
                state.por_categoria_inicio = state.por_categoria[0].total;
                state.por_categoria_boton = false;
            }else{
                state.por_categoria_inicio = state.por_categoria_inicio + state.por_categoria_tamaño;
                state.por_categoria_boton = true;
            }
        }
    },

    updateResetPorCategoria(state) {
        state.por_categoria = []
        state.por_categoria_inicio = 0
        state.por_categoria_boton = false
    },
    
    updateBusqueda(state, busqueda) {
        state.busqueda = busqueda;
    },

    updateResetBusqueda(state) {
        state.busqueda = [];
    },

    //mutations correspondiente a la vista Evento
    updateEvento(state, evento) {
        state.evento = evento;
    },

}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;