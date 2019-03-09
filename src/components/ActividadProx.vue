<template>
  <div class="card-prox">
    <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
      <div class="uk-width-auto">

        <div v-if="carta.horario === 'horario indefinido'">
          <div v-if="dia === 'sabado'">
            <div class="date-min centro">
              <span class="month">{{dia}}</span>
              <h1 class="day">{{dia_numero}}</h1>
              <span class="month">{{mes}}</span>
            </div>
            11:00 a<br>19:00 hrs
          </div>
          <div v-else-if="dia === 'domingo'">
            <div class="date-min centro">
              <span class="month">{{dia_masuno}}</span>
              <h1 class="day">{{dianumero_masuno}}</h1>
              <span class="month">{{mes_masuno}}</span>
            </div>
            10:00 a<br>20:00 hrs
          </div>
          <div v-else>
            <div class="date-min centro">
              <span class="month">{{dia}}</span>
              <h1 class="day">{{dia_numero}}</h1>
              <span class="month">{{mes}}</span>
            </div>
            10:00 a<br> 20:00 hrs
          </div>
        </div>
        <div v-else>
          <div class="date-min centro">
            <span class="month">{{carta.dia_semana}}</span>
            <h1 class="day">{{carta.fecha_inicio_formato_day}}</h1>
            <span class="month">{{carta.fecha_inicio_formato_month}}</span>
          </div>
          {{carta.horario}}
          <!--{{carta.cuanto_moment}}<br>{{carta.horario}}-->
        </div>
      </div>
      <div class="uk-width-expand">
        <div class="cursor card-prox-titulo uk-modal-close" @click.prevent="goToActividad(carta)">{{carta.nombre}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  const moment = require('moment');
  require('moment/locale/es');

  export default {
  name: 'ActividadProx',
  props: {
    carta: {
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
      var dianombre = moment().format('dddd')
      return dianombre;
    },
    mes() {
      moment.locale('es')
      var diames = moment().format('MMMM')
      return diames;
    },
    dia_numero() {
      moment.locale('es')
      var dianumero = moment().format('DD')
      return dianumero;
    },
    dia_masuno() {
      moment.locale('es')
      var hoy = moment().format('YYYY-MM-DD')
      var un_dia_mas = moment(hoy, "YYYY-MM-DD").add('days', 1);
      return un_dia_mas.format('dddd');
    },
    mes_masuno() {
      moment.locale('es')
      var hoy = moment().format('YYYY-MM-DD')
      var un_dia_mas = moment(hoy, "YYYY-MM-DD").add('days', 1);
      return un_dia_mas.format('MMMM');
    },
    dianumero_masuno() {
      moment.locale('es')
      var hoy = moment().format('YYYY-MM-DD')
      var un_dia_mas = moment(hoy, "YYYY-MM-DD").add('days', 1);
      return un_dia_mas.format('DD');
    }
  },
}
</script>