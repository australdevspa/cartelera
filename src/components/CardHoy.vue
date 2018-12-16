<template>
  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body padd">
    <h5>{{carta.horario}} - {{carta.nombre}}</h5>
  </div>
</template>

<script>
export default {
  name: 'CardHoy',
  props: {
    carta: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.padd{
  margin: 5px;
}
</style>