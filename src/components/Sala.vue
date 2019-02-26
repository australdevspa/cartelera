<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header uk-background-cover uk-background-top-center border" :style="{ 'background': 'linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(200, 200, 200, 0.3)), url(' + sala.rutaimg + ')' }">
      <div v-if="sala.piso !== null" class="uk-card-badge-left uk-label" :style="{ background: '#19b868 !important', fontWeight: 900 }">
        Piso {{sala.piso}}
      </div>
      <div class="uk-grid-small uk-flex-middle" uk-grid>
        <div class="uk-width-expand margen">
          <h3 class="uk-card-title uk-margin-remove-bottom sala-estilo sala-titulo">{{sala.sala}}</h3>
          <p class="uk-margin-remove-top sala-estilo">{{sala.centro}}</p>
        </div>
      </div>
    </div>
    <div class="uk-card-body">
        <div class="pad-hoy" v-for="(item, index) in programacion.actualmente.eventos" :key="index">
            <CardProx :carta="item"></CardProx>
        </div>
        <div class="pad-hoy" v-for="(item, index) in programacion.proximamente.eventos" :key="index">
            <CardProx :carta="item"></CardProx>
        </div>
    </div>
  </div>
</template>

<script>
import CardHoy from '@/components/CardHoy'
import CardProx from '@/components/CardProx'

export default {
    name: 'Sala',
    components: {
        CardHoy,
        CardProx 
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

<style scoped>
.pad-hoy {
  padding: 2px !important; 
}
.uk-card-badge-left {
    position: absolute;
    top: 10px;
    left: 10px; 
    z-index: 1;
}
.uk-margin-remove-bottom {
    margin-bottom: 0!important;
}
.uk-margin-remove-top {
    margin-top: 0!important;
}
.margen {
  margin: 25px !important;
}
.sala-estilo {
  color: white !important;
  margin: 10px !important;
}
.sala-titulo {
  font-size: 24px !important;
}
.border {
  border-bottom-color: black !important;
}
.uk-card-body {
  background: black;
  padding: 10px !important;
}
</style>