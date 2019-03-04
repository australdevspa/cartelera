import Vue from 'vue'
import Router from 'vue-router'
import InicioView from '@/views/Inicio'
import CarteleraView from '@/views/Cartelera'
import EventoView from '@/views/Evento'
import VisitaGuiadaView from '@/views/VisitaGuiada'
import CamaraView from '@/views/Camara'
import ObrasView from '@/views/Obras'
import ObraView from '@/views/Obra'
import MenuView from '@/components/DiegoRivera/Menu'
import Piso1View from '@/components/DiegoRivera/Piso1'
import Piso2View from '@/components/DiegoRivera/Piso2'
import Piso3View from '@/components/DiegoRivera/Piso3'
import Piso4View from '@/components/DiegoRivera/Piso4'
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
      path: '/espacios',
      name: 'VisitaGuiada',
      component: VisitaGuiadaView,
      children: [
        {
          path: ':visitaguiada',
          components: {
            default: CamaraView,
            helper0: MenuView,
            helper1: Piso1View,
            helper2: Piso2View,
            helper3: Piso3View,
            helper4: Piso4View
          }
        },
      ]
    },
    {
      path: '/cartelera/:slug/detalle',
      name: 'Obras',
      component: ObrasView
    },
    {
      path: '/cartelera/:slug/detalle/:id',
      name: 'Obra',
      component: ObraView
    },
  ],
  mode: 'history',
})
