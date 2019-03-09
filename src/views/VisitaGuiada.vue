<template>
  <section>
    <div class="uk-section espacios-pad">
      <div class="uk-container uk-container-center uk-text-center pad-evento">
        <div>

          <div v-if="this.floor !== 0">
            <a href="#" class="tamaño-botones-espacios uk-align-left uk-button boton-secundario boton-pequeño" @click.prevent="cargarPiso(0)"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
          </div>
          <div v-else>
            <a href="javascript:window.history.back();" class="tamaño-botones-espacios uk-align-left uk-button boton-secundario boton-pequeño"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
          </div>

          <div class="uk-align-right">
            <div v-if="camara_encendida">
              <a href="#" class="tamaño-botones-espacios uk-button boton-secundario" @click.prevent="apagarCamara()">Desactivar Scanner QR</a>
            </div>
            <div v-else>
              <a href="#" v-scroll-to="'#abajo'" class="tamaño-botones-espacios uk-button boton-secundario" @click.prevent="encenderCamara()">Activar Scanner QR</a>
            </div>
          </div>
        </div>

        <div class="x">

          <div v-if="camara_encendida">
            <router-view class="y"></router-view>
            <div id="abajo"></div>
          </div>

          <form class="uk-form-stacked ">
            <div class="uk-margin">
              <label class="uk-form-label uk-text-large">
                Explora Nuestra Casa del Arte Diego Rivera
              </label>
            </div>
          </form>

          <div v-if="loading">
            <div class="pad-spinner-view uk-text-center">
              <div uk-spinner="ratio: 4"/>
            </div>
          </div>
          <div v-else>
            <div id="arriba"></div>
            
            <div v-if="this.floor === 0">
              <router-view name="helper0"></router-view>
            </div>
            <div v-else-if="this.floor === '1'">
              <router-view name="helper1"></router-view>
            </div>
            <div v-else-if="this.floor === '2'">
              <router-view name="helper2"></router-view>
            </div>
            <div v-else-if="this.floor === '3'">
              <router-view name="helper3"></router-view>
            </div>
            <div v-else-if="this.floor === '4'">
              <router-view name="helper4"></router-view>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VisitaGuiadaView',
  data() {
    return {
      camara_encendida: false,
      loading: true,
    }
  },
  created () {
    this.$store.dispatch('loadSalas')
    this.$store.dispatch('loadProgramacion')
      .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      }) 
  },
  computed: {
    floor() {
      return this.$store.state.piso;
    }
  },
  methods: {
    encenderCamara() {
      this.camara_encendida = true
    },
    apagarCamara() {
      this.camara_encendida = false
    },
    cargarPiso(x) {
      this.$store.dispatch('loadPiso', x);
    }
  }
}
</script>

<style scoped>
.x {
  padding-top: 80px !important;
}
.y {
  padding-bottom: 80px !important;
}
@media only screen and (max-width: 480px) {
  .tamaño-botones-espacios {
    padding: 0 calc(-4px + 2vw) !important;
  }
}
@media only screen and (max-width: 375px) {
  .tamaño-botones-espacios{
    font-size: calc(5px + 2vw) !important;
  }
}
.uk-align-right {
    margin-left: 0px !important;
}
.uk-align-left {
  margin-right: 0px !important;
}
</style>