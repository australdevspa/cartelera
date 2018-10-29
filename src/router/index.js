import Vue from 'vue'
import Router from 'vue-router'
import InicioView from '@/views/Inicio'
import CarteleraView from '@/views/Cartelera'
import EventoView from '@/views/Evento'
import VisitaGuiadaView from '@/views/VisitaGuiada'
import ExpoView from '@/views/Expo'
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
      component: EventoView
    },
    {
      path: '/visitaguiada',
      name: 'VisitaGuiada',
      component: VisitaGuiadaView
    },
    {
      path: '/exposicion/:id',
      name: 'Expo',
      component: ExpoView
    },
  ],
  mode: 'history',
})
