<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header uk-background-cover uk-background-top-center sala-border" :style="{ 'background': 'linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(200, 200, 200, 0.3)), url(' + sala.rutaimg + ')' }">
      <div v-if="sala.piso !== null" class="sala-badge uk-label" :style="{ background: '#19b868 !important', fontWeight: 900 }">
        Piso {{sala.piso}}
      </div>
      <div class="uk-grid-small uk-flex-middle" uk-grid>
        <div class="uk-width-expand sala-head">
          <h3 class="uk-card-title">{{sala.sala}}</h3>
          <p>{{sala.centro}}</p>
        </div>
      </div>
    </div>
    <div class="uk-card-body sala-body">
        <div class="sala-pad-act" v-for="(item, index) in programacion.actualmente.eventos" :key="index">
            <ActividadHoy :carta="item"></ActividadHoy>
        </div>
        <div class="sala-pad-act" v-for="(item, index) in programacion.proximamente.eventos" :key="index">
            <ActividadProx :carta="item"></ActividadProx>
        </div>
    </div>
  </div>
</template>

<script>
import ActividadHoy from '@/components/ActividadHoy'
import ActividadProx from '@/components/ActividadProx'

export default {
    name: 'Sala',
    components: {
        ActividadHoy,
        ActividadProx 
    },
    props: {
        sala: {
            type: Object,
            required: true
        },
        programacion: {
            type: Object,
            required: true
        }
    },
}
</script>