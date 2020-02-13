<template>
  <div id="app">
    <section slot="contenido">
      <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
        <div class="uk-navbar-container uk-navbar-sticky">
          <div class="uk-container uk-container-expand">
            <nav class="uk-navbar" uk-navbar="{&quot;align&quot;:&quot;left&quot;,&quot;boundary&quot;:&quot;!.uk-navbar-container&quot;,&quot;dropbar&quot;:true,&quot;dropbar-anchor&quot;:&quot;!.uk-navbar-container&quot;,&quot;dropbar-mode&quot;:&quot;slide&quot;}">
              <div class="uk-navbar-left">
                <router-link class="uk-navbar-item uk-logo" to="/">
                  <img src="../static/img/icons_ccpm/logo-ccpm-160x81.png" alt="CCPM" class="tamaño-logo uk-margin-small-right">
                </router-link>
              </div>
              <div class="uk-navbar-center">                               
                <div class="uk-navbar-item">
                  <router-link to="/cartelera" class="tamaño-boton-principal boton-principal uk-button-large">Cartelera</router-link>
                </div>
              </div>  
              <div class="uk-navbar-right">  
                <div class="uk-navbar-item">
                  <router-link to="/espacios/visitaguiada" class="tamaño-boton-principal boton-principal uk-button-large">Espacios</router-link>
                </div>
              </div>  
            </nav>
          </div>
        </div>
      </div>
      <div v-if="loading">
        <div class="pad-spinner-view uk-text-center">
          <div uk-spinner="ratio: 4"/>
        </div>
      </div>
      <router-view v-else class="box"/>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Footer
  },
  data() {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
    this.$store.dispatch('loadDataCartelera')
      .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      })
  },
  computed: {
    data_cartelera() {
      return this.$store.state.data_cartelera;
    }
  }
}
</script>