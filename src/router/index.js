import Vue from 'vue'
import Router from 'vue-router'
import InicioView from '@/views/Inicio'
import CarteleraView from '@/views/Cartelera'
import EventoView from '@/views/Evento'
import VisitaGuiadaView from '@/views/VisitaGuiada'


import ActividadesView from '@/views/Actividades'
import ActividadView from '@/views/Actividad'


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
      path: '/cartelera/:id',
      name: 'Evento',
      props: true,
      component: EventoView
    },
    {
      path: '/visitaguiada',
      name: 'VisitaGuiada',
      component: VisitaGuiadaView
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
    }
  ],
  mode: 'history',
})
