<template>
  <div class="carta-hoy">
    <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
                  <!--<div class="uk-width-auto">
                <img class="uk-border-circle" width="40" height="40" src="images/avatar.jpg">
            </div>
            <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom">Title</h3>
                <p class="uk-text-meta uk-margin-remove-top"><time datetime="2016-04-01T19:00">April 01, 2016</time></p>
            </div>-->

                              <div class="uk-width-auto">
                               {{carta.horario}}
            </div>
            <div class="uk-width-expand">
              <div class="cursor titulo" @click.prevent="goToActividad(carta)">{{carta.nombre}}</div>
            </div>


        <!--<div class="uk-width-1-3@s">
          Hoy <br> {{carta.horario}}
        </div>
        <div class="uk-width-expand@s">
          <div class="cursor titulo" @click.prevent="goToActividad(carta)">{{carta.nombre}}</div>
        </div>-->
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
}
</script>

<style scoped>
.carta-hoy {
  /*background-color: #f8f8f8;
  padding: 30px;
  color: #333;
  text-align: center;
  border-radius: 5px;
  border: solid 2px #f8f8f8;*/

    background-color: #19b868;
  padding: 10px;
  color: white;
  text-align: center;
  border-radius: 5px;
  /*border: solid 2px #f8f8f8;*/
      font-weight: 900;
}
.titulo:hover {
  color: black;
}
.cursor {
    cursor:pointer;
}
</style>