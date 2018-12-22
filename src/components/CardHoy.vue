<template>
  <div class="carta-hoy">
    <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-3@s">
          Hoy <br> {{carta.horario}}
        </div>
        <div class="uk-width-expand@s">
          {{carta.nombre}}
        </div>
    </div>
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
.carta-hoy {
  background-color: #666;
  padding: 10px;
  color: white;
  text-align: center;
}
</style>