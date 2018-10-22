import Vue from 'vue';
import Vuex from 'vuex';
import {    
    getCarousel,
    getCategorias, 
    getTotal,
    getCartelera,
    getxcategoria,
    getxcategoriaTotal,

    getProximasActividades, 
    getSegmentoActividades, 
    getBusquedaActividades, 
    getBusquedaCategoria,

    getCartelerax
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

    estado: false,

    acarteleraTotal: 0,
    acartelera: [],
    acarteleraInicio: 0,
    acarteleraFin: 0,
    acarteleraLimite: 10,
    acarteleraBoton: false,

    carteleraTotal: 0,
    cartelera: [],
    carteleraInicio: 0,
    carteleraFin: 0,
    carteleraLimite: 10,
    carteleraBoton: false,

    xcategoriaTotal: 0,
    xcategoria: [],
    xcategoriaInicio: 0,
    xcategoriaFin: 0,
    xcategoriaLimite: 10,
    xcategoriaBoton: false,
    xcategoriaArea: '',

    test: [],

};

const getters = {

};

const actions = {
    loadTest(context) {
        return getCartelerax(0, 5)
            .then(test => context.commit('updateTest', test))
    },
    loadTest1(context) {
        return getCartelerax(5, 10)
            .then(test => context.commit('updateTest', test))
    },
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
            }else{
                state.carteleraFin = state.carteleraLimite;
            }
        }
        commit('updateCartelera', await getCartelera(state.carteleraInicio, state.carteleraFin))
    },
    loadCarteleraReset(context) {
        context.commit('updateCarteleraReset')
    },
    loadxCategoriaArea(context, x) {
        context.commit('updatexCategoriaArea', x)
    },
    async loadxCategoriaTotal ({ commit }) {
        commit('updatexCategoriaTotal', await getxcategoriaTotal(state.xcategoriaArea))
    },
    async loadxCategoria ({ dispatch, commit }, x) {
        await dispatch('loadxCategoriaTotal') // wait for `loadTotal` to finish
        if(state.xcategoriaInicio == 0){
            if(state.xcategoriaLimite > state.xcategoriaTotal){
                state.xcategoriaFin = state.xcategoriaTotal;
            }else{
                state.xcategoriaFin = state.xcategoriaLimite;
            }
        }
        commit('updatexCategoria', await getxcategoria(state.xcategoriaInicio, state.xcategoriaFin, x))
    },
    loadxCategoriaReset(context) {
        context.commit('updatexCategoriaReset')
    },
};

const mutations = {
    updateTest(state, test) {
        
        if(state.carteleraInicio === 0){
            state.test = test;
            // Inicio y Fin iguales se desabilita boton
  
        }else{
            test.forEach(function (value, key) {
                state.test[0].resultado.push(value);
            });
            // Inicio y Fin iguales se desabilita boton
 
        }
    },
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
        state.estado = false;
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
    },
    updateCarteleraReset(state) {
        state.carteleraTotal = 0
        state.cartelera = []
        state.carteleraInicio = 0
        state.carteleraFin = 0
        //state.carteleraLimite = 10
        state.carteleraBoton = false
    },
    updatexCategoriaArea(state, xcategoriaArea) {
        state.xcategoriaArea = xcategoriaArea;
    },
    updatexCategoriaTotal(state, xcategoriaTotal) {
        state.xcategoriaTotal = xcategoriaTotal;
    },
    updatexCategoria(state, xcategoria) {
        state.estado = true;
        if(state.xcategoriaInicio === 0){
            state.xcategoria = xcategoria;
            // Inicio y Fin iguales se desabilita boton
            if(state.xcategoriaFin === state.xcategoriaTotal){
                state.xcategoriaInicio = state.xcategoriaFin;
                state.xcategoriaBoton = false;
            }else{
                // Fin igual al total de elementos
                if(state.xcategoriaFin + state.xcategoriaLimite > state.xcategoriaTotal){
                    state.xcategoriaFin = state.xcategoriaTotal;
                    state.xcategoriaInicio = state.xcategoriaInicio + state.xcategoriaLimite;
                    state.xcategoriaBoton = true;
                }else{
                    // Inicio y Fin diferentes
                    state.xcategoriaFin = state.xcategoriaFin + state.xcategoriaLimite;
                    state.xcategoriaInicio = state.xcategoriaInicio + state.xcategoriaLimite;
                    state.xcategoriaBoton = true;
                }
            }
        }else{
            xcategoria.forEach(function (value, key) {
                state.xcategoria.push(value);
            });
            // Inicio y Fin iguales se desabilita boton
            if(state.xcategoriaFin === state.xcategoriaTotal){
                state.xcategoriaInicio = state.xcategoriaFin;
                state.xcategoriaBoton = false;
            }else{
                // Fin igual al total de elementos
                if(state.xcategoriaFin + state.xcategoriaLimite > state.xcategoriaTotal){
                    state.xcategoriaFin = state.xcategoriaTotal;
                    state.xcategoriaInicio = state.xcategoriaInicio + state.xcategoriaLimite;
                    state.xcategoriaBoton = true;
                }else{
                    // Inicio y Fin diferentes
                    state.xcategoriaFin = state.xcategoriaFin + state.xcategoriaLimite;
                    state.xcategoriaInicio = state.xcategoriaInicio + state.xcategoriaLimite;
                    state.xcategoriaBoton = true;
                }
            }
        }
    },
    updatexCategoriaReset(state) {
        state.xcategoriaTotal = 0
        state.xcategoria = []
        state.xcategoriaInicio = 0
        state.xcategoriaFin = 0
        //xcategoriaLimite: 2,
        state.xcategoriaBoton = false
    },
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;