<template>
  <div class="uk-card uk-card-default uk-card-body">
    <h2>{{sala.sala}}</h2>
    <p>{{sala.centro}}</p>

    <div  v-for="(it, index) in filtro_por_actividades"
      :key="index"
      @click.prevent="goToActividad(it)">
      <div v-if="sala.id === it.sala_id">
        <CardHoy :carta="it" class="cursor"></CardHoy>
      </div>
    </div>

    <div  v-for="(it, index) in filtro_por_exposiciones"
      :key="index"
      @click.prevent="goToActividad(it)">
      <div v-if="sala.sala === it.sala">
        <CardHoy :carta="it" class="cursor"></CardHoy>
      </div>
    </div>

  </div>
</template>

<script>
import CardHoy from '@/components/CardHoy'
import moment from 'moment';
moment.locale('es')

export default {
  name: 'CardSala',
  components: {
    CardHoy  
  },
  props: {
    sala: {
      type: Object,
      required: true
    }
  },
  computed: {
    filtro_por_actividades() {
      var fecha_hoy = moment().format('DD/MM/YYYY');
      return this.$store.state.data_cartelera.cartelera.filter((item) => item.fecha_rango.includes(fecha_hoy));
    },
    filtro_por_exposiciones() {
      var fecha_hoy = moment().format('DD/MM/YYYY');
      return this.$store.state.exposiciones.filter((item) => item.fecha_rango.includes(fecha_hoy));
    },
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
    }
  },
}
</script>

<style scoped>

</style>