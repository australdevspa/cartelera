import Vue from 'vue';
import Vuex from 'vuex';
import {    
    getCarousel,
    getCategorias,
    getCartelera,
    getPorCategoria
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

    /*
    busqueda: [],
    contadorBusqueda: 0,
    limiteBusqueda: 10,
    totalBusqueda: 0,
    //categorias: [],
    busquedaCategoria: [],
    contadorBusquedaCategoria: 0,
    limiteBusquedaCategoria: 10,
    totalBusquedaCategoria: 0,*/
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

/*
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
    /*loadBusquedaCategoria(context, select) {
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
    },*/





   /* loadCartelera(context) {
        if(state.cartelera_inicio == 0){
            if(state.cartelera_limite > state.cartelera_total){
                state.cartelera_fin = state.cartelera_total;
            }else{
                state.cartelera_fin = state.cartelera_limite;
            }
        }
        return getCartelera(0, 7)
            .then(cartelera => context.commit('updatenomas', cartelera));
    },


    load(context) {
        return getCartelera(0, 5)
            .then(hola => context.commit('updateTest', hola))
    },







    loadCartelerax ({ dispatch, commit }) {
        //await dispatch('loadTotal') // wait for `loadTotal` to finish
        if(state.acartelera_inicio == 0){
            if(state.acartelera_limite > state.acartelera_total){
                state.acartelera_fin = state.acartelera_total;
            }else{
                state.acartelera_fin = state.acartelera_limite;
            }
        }
        commit('updateCartelerax', getCartelera(state.acartelera_inicio, state.acartelera_fin))
    },
    loadTest(context) {
        return getCartelera(0, 5)
            .then(test => context.commit('updateTest', test))
    },
    loadTest1(context) {
        return getCartelera(5, 10)
            .then(test => context.commit('updateTest', test))
    },

    loadhola(context) {
        return getCartelera(0, 5)
            .then(hola => context.commit('updateTesthola', hola))
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
        commit('updateCarteleravieja', await getCarteleravieja(state.carteleraInicio, state.carteleraFin))
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
    },*/
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

/*
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
    /*updateBusquedaCategoria(state, busquedaCategoria) {
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
*/
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

export default store;