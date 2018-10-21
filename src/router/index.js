import Vue from 'vue'
import Router from 'vue-router'
import InicioView from '@/views/Inicio'
import CarteleraView from '@/views/Cartelera'

import ActividadesView from '@/views/Actividades'
import ActividadView from '@/views/Actividad'
import CategoriasView from '@/views/Categorias'
import VisitaGuiadaView from '@/views/VisitaGuiada'
import MapasView from '@/views/Mapas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: InicioView
    },
    {
      path: '/cartelera',
      name: 'Cartelera',
      component: CarteleraView
    },

    {
      path: '/actividades',
      name: 'Actividades',
      component: ActividadesView
    },
    {
      path: '/actividades/:id',
      name: 'Actividad',
      component: ActividadView
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: CategoriasView
    },
    {
      path: '/visitaguiada',
      name: 'VisitaGuiada',
      component: VisitaGuiadaView
    },
    {
      path: '/mapas',
      name: 'Mapas',
      component: MapasView
    }
  ],
  mode: 'history',
})
