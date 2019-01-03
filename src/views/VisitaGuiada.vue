<template>
  <section>
    <div class="uk-section">
      <div class="uk-container uk-container-center uk-text-center">
        <!--<form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">Espacios</label>
          </div>
        </form>-->
        <div v-if="loading">
          <div class="pad-spinner uk-text-center">
            <div uk-spinner="ratio: 4"/>
          </div>
        </div>
        <div v-else>
          <div class="uk-child-width-expand@s uk-text-center" uk-grid >
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1@m"
                  v-for="(item, index) in salas.slice(0,this.mitad)"
                  :key="index">
                  <CardSala :sala="item"></CardSala>
                </div>
              </div>
            </div>
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1@m"
                  v-for="(item, index) in salas.slice(this.mitad,this.salas.length)"
                  :key="index">
                  <CardSala :sala="item" class="uk-box-shadow-medium"></CardSala>
                </div>
              </div>
            </div>
          </div>

          <div class="padCamaraButton">
            <div v-if="show">
              <router-link :to="{ path: '/espacios'}" @click.native="estadoFalse" class="uk-button uk-button-secondary uk-button-large">Desactivar Scanner QR</router-link>
              <router-view></router-view>
            </div>
            <div v-else>
              <router-link v-scroll-to="'#abajo'" :to="{ path: '/espacios/camara'}" @click.native="estadoTrue" class="uk-button uk-button-secondary uk-button-large">Activar Scanner QR</router-link>
            </div>
          </div>
        </div>

        <div id="abajo"></div>
      </div>
    </div>
  </section>
</template>

<script>
import CardSala from '@/components/CardSala'

export default {
  name: 'VisitaGuiadaView',
  components: {
    CardSala
  },
  data() {
    return {
      show: false,
      loading: true
    }
  },
  created () {
    this.$store.dispatch('loadSalas')
    this.$store.dispatch('loadExposiciones')
          .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      })
  },
  computed: {
    salas() {
      return this.$store.state.salas;
    },
    filtro() {
        return this.$store.state.salas.filter((item) => item.id.includes("360"));
    },
    exposiciones() {
      return this.$store.state.exposiciones;
    },
    mitad() {
      var x = this.$store.state.salas.length%2;
      if(x == 0){
        return this.$store.state.salas.length/2;
      }else{
        var y = this.$store.state.salas.length;
        return (y/2)-0.5
      }
    },
  },
  methods: {
    estadoTrue () {
      this.show = true;
    },
    estadoFalse () {
      this.show = false;
    }
  }
}
</script>

<style scoped>
.pad-spinner {
  padding-top: 25%;
  padding-bottom: 25%;
}
.padCamaraButton{
  margin-top: 50px;
}
.uk-button-primary {
    background-color: #19b868;
    color: #fff !important;
    border: 1px solid transparent;
    background-image: linear-gradient(100deg,#A8DB5B 0,#19b868 35%,#4EC1B2 100%);
}
.uk-button {
    /*margin: 0;
    border: none;
    overflow: visible;
    font: inherit;
    color: inherit;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 20px;
    vertical-align: middle;*/
    padding: 0 20px;
    font-size: 14px;
    line-height: 42px;
    /*text-align: center;
    text-decoration: none;
    transition: .1s ease-in-out;
    transition-property: color,background-color,background-position,border-color,box-shadow;
    background-origin: border-box;*/
    border-radius: 500px;
    letter-spacing: 1px !important;
}
.uk-button-secondary {
    background: #a0a0a0 !important;
    color: #fafafa !important;

    /*background-color: #333;*/
}
.uk-button-secondary:hover {
      background: #333 !important;
    color: #fafafa !important;
    /*background-color: #151515;*/
}
.uk-button-primary:hover {
    background-color: #A8DB5B;
    color: #fff;
    border-color: transparent;
    background-image: linear-gradient(100deg,#76C602 0,#19b868 35%,#00A28E 100%);
    box-shadow: 0 8px 50px -6px rgba(84,84,120,.26);
}
</style>