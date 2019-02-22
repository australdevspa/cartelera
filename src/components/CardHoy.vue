<template>
  <div class="card-hoy">
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
            10:00 a<br>20:00 hrs
          </div>
        </div>
        <div v-else>
          {{carta.horario}}
        </div>
      </div>
      <div class="uk-width-expand">
        <div class="cursor card-hoy-titulo" @click.prevent="goToActividad(carta)">{{carta.nombre}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'CardHoy',
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