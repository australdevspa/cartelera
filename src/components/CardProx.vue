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
                              <div v-if="carta.horario === 'horario indefinido'">
                                <div v-if="dia === 'sabado'">
                                  11:00 a<br> 19:00 hrs
                                </div>
                                <div v-else-if="dia === 'domingo'">
                                
                                </div>
                                <div v-else>
                                  10:00 a<br> 20:00 hrs
                                </div>
                              </div>
                              <div v-else>
                                  {{carta.cuanto_moment}}
                                  <br>
                                {{carta.horario}}
                              </div>
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
import moment from 'moment';

export default {
  name: 'CardProx',
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

<style scoped>
.carta-hoy {
  /*background-color: #f8f8f8;
  padding: 30px;
  color: #333;
  text-align: center;
  border-radius: 5px;
  border: solid 2px #f8f8f8;*/

    background-color: rebeccapurple;
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