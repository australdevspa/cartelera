import Vue from 'vue';
import Vuex from 'vuex';
import { setParametros } from '@/services/parametros'
import {   
    getDataCartelera,
    getSegmentoActividades,
    getEvento,
    getDetalle,
    getDetalleX,
    existeSlugActividades,
} from '@/services/cartelera'
import {
    getTraduction
} from '@/services/traduction'
import {
    getSalas,
    getProgrmacion,
    getSalaEspecifica
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

    detalle: [],
    detallex: [],//Obra.vue

    translate: [],
    estado_traduccion: false,

    //state correspondiente a la vista de la Camara
    existe_slug: false,

    //state correspondiente a la vista de la VisitaGuiada
    salas: [],
    programacion: [],

    //DiegoRivera Pisos
    piso: 0,
    sala_especifica: [],

    //Obra
    estado_traduccion_obra: false
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

    loadDetalleX(context, {a, b}) {
        return getDetalleX(a, b)
            .then(detallex => context.commit('updateDetalleX', detallex));
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

    loadPrimeraCarga(context) {
        context.commit('updatePrimeraCarga')
    },

    //actions correspondiente a la vista Camara
    loadResetEvento(context) {
        context.commit('updateResetEvento')
    },

    loadExisteSlugActividades(context, slug) {
        return existeSlugActividades(slug)
            .then(existe_slug => context.commit('updateExisteSlugActividades', existe_slug));
    },

    loadResetExisteSlug(context) {
        context.commit('updateResetExisteSlug')
    },

    //actions correspondiente a la vista VisitaGuiada
    loadSalas(context) {
        return getSalas()
            .then(salas => context.commit('updateSalas', salas));
    },

    loadProgramacion(context) {
        return getProgrmacion()
            .then(programacion => context.commit('updateProgramacion', programacion));
    },

    //action cambiar piso
    loadPiso(context, piso_elegido) {
        context.commit('updatePiso', piso_elegido)
    },

    loadSalaEspecifica(context, id) {
        return getSalaEspecifica(id)
            .then(sala_especifica => context.commit('updateSalaEspecifica', sala_especifica));
    },

    //Obra
    loadObraTrue(context) {
        context.commit('updateObraTrue')
    },

    loadObraFalse(context) {
        context.commit('updateObraFalse')
    },
};

const mutations = {
    //mutations correspondiente a la vista App
    updateDataCartelera(state, data_cartelera) {
        state.data_cartelera = data_cartelera;
        
        if(state.carousel_tamaño >= state.data_cartelera.cartelera_total){
            state.carousel_tamaño = state.data_cartelera.cartelera_total;
        }
        
        //slider con exposiciones
        /*var ex = data_cartelera.expo.slice(0, 6);
        if(ex.length == 6){
            state.carousel = ex;
        }else{
            var ac = data_cartelera.cartelera.slice(0, 6 - ex.length);
            state.carousel = ex.concat(ac);
        }*/

        //slider sin exposiciones, solo las primeros 5 actividades
        var ac = data_cartelera.cartelera.slice(0, state.carousel_tamaño);
        state.carousel = ac;

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

    updateDetalleX(state, detallex) {
        state.detallex = detallex;
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

    updatePrimeraCarga(state) {
        state.primera_carga = false;
    },

    //mutations correspondiente a la vista Camara
    updateResetEvento(state) {
        state.evento = [];
    },

    updateExisteSlugActividades(state, existe_slug) {
        state.existe_slug = existe_slug;
    },

    updateResetExisteSlug(state) {
        state.existe_slug = false;
    },

    //mutations correspondiente a la vista VisitaGuiada
    updateSalas(state, salas) {
        state.salas = salas;
    },

    updateProgramacion(state, programacion) {
        state.programacion = programacion;
    },

    //mutation cambio de piso
    updatePiso(state, piso_elegido) {
        state.piso = piso_elegido;
    },

    updateSalaEspecifica(state, sala_especifica) {
        state.sala_especifica = sala_especifica;
    },

    //mutation estado traduccion Obra
    updateObraTrue(state) {
        state.estado_traduccion_obra = true;
    },

    updateObraFalse(state) {
        state.estado_traduccion_obra = false;
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