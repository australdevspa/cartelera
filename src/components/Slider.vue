<template>
  <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin parent" uk-grid
    :style="{ background: actividad.color_oscuro + '!important', 
              background: '-webkit-linear-gradient(top,' +actividad.color_claro+', '+actividad.color_opuesto+') !important',
              background: '-moz-linear-gradient(top,' +actividad.color_claro+', '+actividad.color_opuesto+') !important',
              background: 'linear-gradient(to bottom,' +actividad.color_claro+', '+actividad.color_opuesto+') !important' }">
    <div class="uk-card-media-left uk-cover-container">
      <img v-if="actividad.dim_mayor === 'alto'" :src="actividad.thumbnail"  :alt="actividad.nombre"
            style=" 
                    max-height: 100%;
                    object-fit: scale-down;
                    z-index: 6;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    -webkit-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
            ">
      <img v-if="actividad.dim_mayor === 'ancho'" :src="actividad.thumbnail"  :alt="actividad.nombre"
            style=" 
                    max-width: 100%;
                    object-fit: scale-down;
                    z-index: 6;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    -webkit-transform: translate(-50%,-50%);
                    transform: translate(-50%,-50%);
            ">
      <canvas width="600" height="650" class="canvas-height"></canvas>
    </div>
      
    <div class="uk-card-body uk-text-left">

      <div class="visible-note oculto-note">
        <h1 class="slider-titulo-1">{{ actividad.area }}</h1>
        <div v-if="actividad.horario === 'horario indefinido'">
          <div v-if="dia === 'sabado'">
            <h2 class="slider-titulo-2">Hoy - 11:00 a 19:00 hrs</h2>
          </div>
          <div v-else-if="dia === 'domingo'">
            <h2 class="slider-titulo-2">Mañana Lunes - 10:00 a 20:00 hrs</h2>
          </div>
          <div v-else>
            <h2 class="slider-titulo-2">Hoy - 10:00 a 20:00 hrs</h2>
          </div>
        </div>
        <div v-else>
          <h2 class="slider-titulo-2">{{ actividad.cuanto_moment }} - {{actividad.horario}}</h2>
        </div>
        <hr class="slider-hr">
        <h1 @click.prevent="goToActividad(actividad)" class="slider-titulo-3 titulo cursor"> {{ actividad.nombre }}</h1>
        <hr class="slider-hr">
        <h2 class="slider-titulo-4">Entrada {{ actividad.entrada }}</h2>
        <h2 class="slider-ribbon slider-titulo-5">{{actividad.donde}}</h2>
      </div>

      <div class="visible-movil oculto-movil">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand">
            <h2 class="slider-titulo-1m">{{actividad.area}}</h2>
            <div v-if="actividad.horario === 'horario indefinido'">
              <div v-if="dia === 'sabado'">
                <h2 class="slider-titulo-2m">Hoy - 11:00 a 19:00 hrs</h2>
              </div>
              <div v-else-if="dia === 'domingo'">
                <h2 class="slider-titulo-2m">Mañana Lunes - 10:00 a 20:00 hrs</h2>
              </div>
              <div v-else>
                <h2 class="slider-titulo-2m">Hoy - 10:00 a 20:00 hrs</h2>
              </div>
            </div>
            <div v-else>
              <h2 class="slider-titulo-2m">{{ actividad.cuanto_moment }} - {{actividad.horario}}</h2>
            </div>
            <hr class="slider-hr">
            <h2 @click.prevent="goToActividad(actividad)" class="slider-titulo-3m cursor"> {{ actividad.nombre }}</h2>
            <hr class="slider-hr">
            <h3 class="slider-titulo-4m">Entrada {{ actividad.entrada }}</h3>
            <h3 class="slider-ribbon slider-titulo-5m">{{actividad.donde}}</h3>
          </div>
        </div>
      </div>  

    </div>
  </div>
</template>

<script>
const moment = require('moment');
require('moment/locale/es');

export default {
  name: 'Slider',
  props: {
    actividad: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToActividad (actividad) {
      this.$router.push({
        params: {
          id: actividad.slug,
          evento: actividad
        },
        name: 'Evento'
      })
    },
  },
  computed: {
    dia() {
      moment.locale('es')
      return moment().format('dddd')
    },
    fechahoy() {
      moment.locale('es')
      return moment().format('DD/MM/YYYY')
    },
  },
}
</script>

<style scoped>
.parent {
  overflow: hidden;
}
canvas {
  max-width: max-content !important;
}
@media only screen and (max-width: 1199px) {
.uk-child-width-1-2\@s>* {
    height: 650px;
  } 
}
@media only screen and (max-width: 639px) {
  .uk-child-width-1-2\@s>* {
    height: 350px;
  }
  .canvas-height {
    height: 420px !important;
  }
  .uk-card-body {
    padding: 4px 15px 4px 60px;;
  }
  .uk-grid-small>* {
    padding-left: 0px; 
  }
}
</style>