<template>
  <div class="carta-hoy">
    <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-3@s">
          Hoy <br> {{carta.horario}}
        </div>
        <div class="uk-width-expand@s">
          <div class="cursor titulo" @click.prevent="goToExpo(carta)">{{carta.nombre}}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardHoyExpo',
  props: {
    carta: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToExpo (expo) {
      this.$router.push({
        params: {
          id: expo.slug,
          evento: expo
        },
        name: 'Expo'
      })
    }
  },
}
</script>

<style scoped>
.carta-hoy {
  background-color: #19b868;
  padding: 10px;
  color: white;
  text-align: center;
}
.titulo:hover {
  color: black;
}
.cursor {
    cursor:pointer;
}
</style>