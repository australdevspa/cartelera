<template>
  <!--<div class="uk-card uk-card-secondary uk-card-hover uk-card-body padd">
    <h5>{{carta.horario}} - {{carta.nombre}}</h5>
  </div>-->
  <!--<div class="padd">
    <div class="uk-grid-divider uk-text-center" uk-grid>

      <div class="uk-width-1-3@s">
          <div class="uk-card uk-card-default uk-card-body">1-3</div>
      </div>
          <div class="uk-width-expand@s">
        <div class="uk-card uk-card-default uk-card-body">Expand</div>
    </div>

    </div>

    <h5>{{carta.horario}} | {{carta.nombre}}</h5>
  </div>-->
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
/*.padd{
  margin: 5px;
  background-color: white;
  padding: 5px;
}
.padd h5 {
  margin-bottom: 0px !important;
}*/
.carta-hoy {
  background-color: #666;
  padding: 10px;
  color: white;
  text-align: center;
}
</style>