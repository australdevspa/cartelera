<template>
  <section>
    <div class="uk-section uk-section-muted">
      <div class="uk-container uk-container-center uk-text-center">
        <form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">Visita Guiada</label>
          </div>
        </form>

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
                <CardSala :sala="item"></CardSala>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
          <div class="uk-width-1-2@m"
          v-for="(item, index) in salas"
          :key="index">
          <CardSala :sala="item"></CardSala>
          </div>
        </div>-->

        <div class="padCamaraButton">
          <div v-if="show">
            <router-link :to="{ path: '/visitaguiada'}" @click.native="estadoFalse" class="uk-button uk-button-secondary">Desactivar Scanner QR</router-link>
          </div>
          <div v-else>
            <router-link :to="{ path: '/visitaguiada/camara'}" @click.native="estadoTrue" class="uk-button uk-button-secondary">Activar Scanner QR</router-link>
          </div>
          <router-view></router-view>
        </div>

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
      show: false
    }
  },
  created () {
    this.$store.dispatch('loadSalas')
    this.$store.dispatch('loadExposiciones')
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
.padCamaraButton{
  margin-top: 50px;
}
</style>