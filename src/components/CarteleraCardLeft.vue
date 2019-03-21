<template>
  <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-card-hover parent" uk-grid>
    <div class="uk-card-media-left uk-cover-container">
      <div v-if="actividad.fecha_rango === fechahoy && actividad.horario === 'horario indefinido'">
        <div v-if="dia === 'sabado'">
          <h4 class="card-left-ribbon">Hoy<br> 11:00 a 19:00 hrs</h4>
        </div>
        <div v-else-if="dia === 'domingo'">
          <h4 class="card-left-ribbon">Mañana Lunes<br> 10:00 a 20:00 hrs</h4>
        </div>
        <div v-else>
          <h4 class="card-left-ribbon">Hoy<br> 10:00 a 20:00 hrs</h4>
        </div>
      </div>
      <div v-else-if="actividad.fecha_rango !== fechahoy && actividad.horario === 'horario indefinido'">
        <div v-if="dia === 'sabado'">
          <h4 class="card-left-ribbon">{{ actividad.cuanto_moment }}<br> 11:00 a 19:00 hrs</h4>
        </div>
        <div v-else-if="dia === 'domingo'">
          <h4 class="card-left-ribbon">Mañana Lunes<br> 10:00 a 20:00 hrs</h4>
        </div>
        <div v-else>
          <h4 class="card-left-ribbon">{{ actividad.cuanto_moment }}<br> 10:00 a 20:00 hrs</h4>
        </div>
      </div>
      <div v-else>
        <h4 class="card-left-ribbon">{{ actividad.cuanto_moment }}<br>{{actividad.horario}}</h4>
      </div>
      <img :src="actividad.thumbnail" :alt="actividad.nombre" class="cartelera-card-img"
        style="
          max-width: none;
          position: absolute;
          left: 50%;
          top: 50%;
          -webkit-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
          -webkit-filter: blur(4px);
          filter: blur(4px);
          opacity: 0.8;
          ">
      <img v-if="actividad.dim_mayor === 'alto'" :src="actividad.thumbnail" :alt="actividad.nombre"
        style="
            max-height: 100%;
            object-fit: scale-down;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            -webkit-filter: drop-shadow(0 0 40px #000000);
            filter: drop-shadow(0 0 40px #000000);
        ">
      <img v-if="actividad.dim_mayor === 'ancho'" :src="actividad.thumbnail" :alt="actividad.nombre"
        style="
            max-width: 100%;
            object-fit: scale-down;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
            -webkit-filter: drop-shadow(0 0 40px #000000);
            filter: drop-shadow(0 0 40px #000000);
        ">
      <canvas width="600" height="300"></canvas>
    </div>
    <div>
      <div class="uk-card-body uk-text-right">
        <div class="uk-card-badge uk-label" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
          {{ actividad.area }}
        </div>

        <div class="visible-note oculto-note">
          <div class="date centro">
              <span class="month">{{actividad.dia_semana}}</span>
              <h1 class="day">{{actividad.fecha_inicio_formato_day}}</h1>
              <span class="month">{{actividad.fecha_inicio_formato_month}}</span>
          </div>
          <h3 @click.prevent="goToActividad(actividad)" class="uk-card-title card-titulo cursor"> {{ actividad.nombre }}</h3>
          <div class="card-info" :style="{ 'border-right': '10px solid' + actividad.area_color }">
            <div class="uk-label" :style="{ background: '#333 !important', fontWeight: 900 }">
              Entrada {{actividad.entrada}}
            </div>
            <div class="uk-label" :style="{ background: '#333 !important', fontWeight: 900 }">
              <span uk-icon="icon: location"></span> {{actividad.donde}}
            </div>
          </div>
        </div>

        <div class="visible-movil oculto-movil">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 @click.prevent="goToActividad(actividad)" class="uk-card-title card-titulo-movil card-titulo cursor"> {{ actividad.nombre }}</h3>
            </div>
            <div class="uk-width-auto">
              <div class="date">
                <span class="month">{{actividad.dia_semana}}</span>
                <h1 class="day">{{actividad.fecha_inicio_formato_day}}</h1>
                <span class="month">{{actividad.fecha_inicio_formato_month}}</span>
              </div>
            </div>
          </div>
          <div class="card-info" :style="{ 'border-right': '10px solid' + actividad.area_color }">
            <div class="uk-label" :style="{ background: '#333 !important', fontWeight: 900 }">
              Entrada {{actividad.entrada}}
            </div>
            <div class="uk-label" :style="{ background: '#333 !important', fontWeight: 900 }">
              <span uk-icon="icon: location"></span> {{actividad.donde}}
            </div>
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
  name: 'CardLeft',
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
      moment.locale('es');
      return moment().format('dddd');
    },
    fechahoy() {
      moment.locale('es');
      return moment().format('DD/MM/YYYY');
    },
  },
}
</script>