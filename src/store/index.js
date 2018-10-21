import Vue from 'vue';
import Vuex from 'vuex';
import {    
    getCarousel,
    getCategorias, 
    getTotal,
    getCartelera,

    getProximasActividades, 
    getSegmentoActividades, 
    getBusquedaActividades, 
    getBusquedaCategoria
} from '@/services/api'

Vue.use(Vuex);

const state = {
    proximasActividades: [],
    actividades: [],
    contadorActividades: 0,
    limiteActividades: 10,
    totalActividades: 0,
    
    busqueda: [],
    contadorBusqueda: 0,
    limiteBusqueda: 10,
    totalBusqueda: 0,
    //categorias: [],
    busquedaCategoria: [],
    contadorBusquedaCategoria: 0,
    limiteBusquedaCategoria: 10,
    totalBusquedaCategoria: 0,

    //state correspondiente a la vista de Inicio
    carousel: [],
    //state correspondientes a la vista de la Cartelera
    categorias: [],

    carteleraTotal: 0,
    cartelera: [],
    carteleraInicio: 0,
    carteleraFin: 0,
    carteleraLimite: 10,
    carteleraBoton: false

};

const getters = {

};

const actions = {
    loadProximasActividades(context) {
        return getProximasActividades()
            .then(proximasActividades => context.commit('updateProximasActividades', proximasActividades))
            .then(function() {
                document.querySelector('.uk-spinner').style.display = 'none';
            });
    },
    loadActividades(context) {
        return getSegmentoActividades(state.limiteActividades, state.contadorActividades)
            .then(actividades => context.commit('updateActividades', actividades))
            .then(function() {
                document.getElementById("more").disabled = false;
            });
    },
    loadBusquedaActividades(context, filter) {
        return getBusquedaActividades(filter, state.limiteBusqueda, 0)
            .then(busqueda => context.commit('updateBusquedaActividades', busqueda))
            .then(function() {
                document.getElementById("moreBusqueda").disabled = false;
            });
    },
    loadMasBusquedaActividades(context, filter) {
        return getBusquedaActividades(filter, state.limiteBusqueda, state.contadorBusqueda)
            .then(busqueda => context.commit('updateMasBusqueda', busqueda))
            .then(function() {
                document.getElementById("moreBusqueda").disabled = false;
            });
    },
    loadBusquedaReset(context) {
        context.commit('updateBusquedaReset')
    },
    /*loadCategorias(context) {
        return getCategorias()
            .then(categorias => context.commit('updateCategorias', categorias));
    },*/
    loadBusquedaCategoria(context, select) {
        return getBusquedaCategoria(select, state.limiteBusquedaCategoria, 0)
            .then(busquedaCategoria => context.commit('updateBusquedaCategoria', busquedaCategoria))
    },
    loadMasBusquedaCategoria(context, select) {
        return getBusquedaCategoria(select, state.limiteBusquedaCategoria, state.contadorBusquedaCategoria)
            .then(busquedaCategoria => context.commit('updateMasBusquedaCategoria', busquedaCategoria))
            .then(function() {
                document.getElementById("moreCategoria").disabled = false;
            });
    },
    loadBusquedaCategoriaReset(context) {
        context.commit('updateBusquedaCategoriaReset')
    },

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
    async loadTotal ({ commit }) {
        commit('updateTotal', await getTotal())
    },
    async loadCartelera ({ dispatch, commit }) {
        await dispatch('loadTotal') // wait for `loadTotal` to finish
        if(state.carteleraInicio == 0){
            if(state.carteleraLimite > state.carteleraTotal){
                state.carteleraFin = state.carteleraTotal;
                //state.carteraBoton = false;
            }else{
                state.carteleraFin = state.carteleraLimite;
                //state.carteraBoton = true;
            }
        }
        commit('updateCartelera', await getCartelera(state.carteleraInicio, state.carteleraFin))
    }
};

const mutations = {
    updateProximasActividades(state, proximasActividades) {
        state.proximasActividades = proximasActividades;
    },
    updateActividades(state, actividades) {
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
    },
    updateBusquedaActividades(state, busqueda) {
        state.totalBusqueda = busqueda.total;
        state.busqueda = busqueda.resultados;
        state.contadorBusqueda = 10;
    },
    updateMasBusqueda(state, busqueda) {
        busqueda.resultados.forEach(function (value, key) {
            state.busqueda.push(value);
        });
        state.contadorBusqueda = state.contadorBusqueda + 10;
    },
    updateBusquedaReset(state) {
        state.busqueda = []
        state.contadorBusqueda = 0
        state.limiteBusqueda = 10
        state.totalBusqueda = 0
    },
    /*updateCategorias(state, categorias) {
        state.categorias = categorias;
    },*/
    updateBusquedaCategoria(state, busquedaCategoria) {
        state.totalBusquedaCategoria = busquedaCategoria.total;
        state.busquedaCategoria = busquedaCategoria.resultados;
        state.contadorBusquedaCategoria = 10;
    },
    updateMasBusquedaCategoria(state, busquedaCategoria) {
        busquedaCategoria.resultados.forEach(function (value, key) {
            state.busquedaCategoria.push(value);
        });
        state.contadorBusquedaCategoria = state.contadorBusquedaCategoria + 10;
    },
    updateBusquedaCategoriaReset(state) {
        state.busquedaCategoria = []
        state.contadorBusquedaCategoria = 0
        state.limiteBusquedaCategoria = 10
        state.totalBusquedaCategoria = 0
    },

    //mutations correspondiente a la vista de Inicio
    updateCarousel(state, carousel) {
        state.carousel = carousel;
    },
    //mutations correspondiente a la vista de la Cartelera
    updateCategorias(state, categorias) {
        state.categorias = categorias;
    },
    updateTotal(state, carteleraTotal) {
        state.carteleraTotal = carteleraTotal;
    },
    updateCartelera(state, cartelera) {
        if(state.carteleraInicio === 0){
            state.cartelera = cartelera;
            // Inicio y Fin iguales se desabilita boton
            if(state.carteleraFin === state.carteleraTotal){
                state.carteleraInicio = state.carteleraFin;
                state.carteleraBoton = false;
            }else{
                // Fin igual al total de elementos
                if(state.carteleraFin + state.carteleraLimite > state.carteleraTotal){
                    state.carteleraFin = state.carteleraTotal;
                    state.carteleraInicio = state.carteleraInicio + state.carteleraLimite;
                    state.carteleraBoton = true;
                }else{
                    // Inicio y Fin diferentes
                    state.carteleraFin = state.carteleraFin + state.carteleraLimite;
                    state.carteleraInicio = state.carteleraInicio + state.carteleraLimite;
                    state.carteleraBoton = true;
                }
            }
        }else{
            cartelera.forEach(function (value, key) {
                state.cartelera.push(value);
            });
            // Inicio y Fin iguales se desabilita boton
            if(state.carteleraFin === state.carteleraTotal){
                state.carteleraInicio = state.carteleraFin;
                state.carteleraBoton = false;
            }else{
                // Fin igual al total de elementos
                if(state.carteleraFin + state.carteleraLimite > state.carteleraTotal){
                    state.carteleraFin = state.carteleraTotal;
                    state.carteleraInicio = state.carteleraInicio + state.carteleraLimite;
                    state.carteleraBoton = true;
                }else{
                    // Inicio y Fin diferentes
                    state.carteleraFin = state.carteleraFin + state.carteleraLimite;
                    state.carteleraInicio = state.carteleraInicio + state.carteleraLimite;
                    state.carteleraBoton = true;
                }
            }
        }
    }
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;