<template>
  <div class="card-prox">
    <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
      <div class="uk-width-auto">
        <div v-if="carta.horario === 'horario indefinido'">
          <div v-if="dia === 'sabado'">
            11:00 a<br>19:00 hrs
          </div>
          <div v-else-if="dia === 'domingo'">
            Mañana Lunes<br>10:00 a<br>20:00 hrs
          </div>
          <div v-else>
            10:00 a<br> 20:00 hrs
          </div>
        </div>
        <div v-else>
          {{carta.cuanto_moment}}<br>{{carta.horario}}
        </div>
      </div>
      <div class="uk-width-expand">
        <div class="cursor card-prox-titulo" @click.prevent="goToActividad(carta)">{{carta.nombre}}</div>
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
  },
}
</script>