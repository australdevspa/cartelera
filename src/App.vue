<template>
  <div id="app">
    <section slot="contenido">
      <div uk-sticky="" show-on-up="" animation="uk-animation-slide-top" cls-active="uk-navbar-sticky" sel-target=".uk-navbar-container" class="uk-sticky uk-sticky-fixed" style="position: fixed; top: 0px; width: 1066px;">
        <div class="uk-navbar-container uk-navbar-sticky">
          <div class="uk-container uk-container-expand">
              <nav class="uk-navbar" uk-navbar="{&quot;align&quot;:&quot;left&quot;,&quot;boundary&quot;:&quot;!.uk-navbar-container&quot;,&quot;dropbar&quot;:true,&quot;dropbar-anchor&quot;:&quot;!.uk-navbar-container&quot;,&quot;dropbar-mode&quot;:&quot;slide&quot;}">
                <div class="uk-navbar-left">
                  <router-link class="uk-navbar-item uk-logo" to="/">
                    <img src="../static/img/icons_ccpm/logo-ccpm-160x81.png" class="uk-margin-small-right" v-on:click="setActive('')" :class="{ active: isActive('') }">
                  </router-link>
                </div>
                <div class="uk-navbar-right">                               
                  <ul class="uk-navbar-nav">
                    <li><router-link to="/cartelera" class="uk-button x-button" v-on:click="setActive('cartelera')" :class="{ active: isActive('cartelera') }">Cartelera</router-link></li>
                    <li><router-link to="/espacios" class="uk-button x-button" v-on:click="setActive('espacios')" :class="{ active: isActive('espacios') }">Espacios</router-link></li>
                  </ul>
                </div>  
              </nav>
          </div>
        </div>
        <!--<div class="uk-navbar-dropbar uk-navbar-dropbar-slide" style="height: 0px;"></div>-->
      </div><!--<div class="uk-sticky-placeholder" style="height: 106px; margin: 0px;"></div>-->
      <div v-if="loading">
        <div class="pad-spinner uk-text-center">
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
      loading: false,
      activeItem: '' 
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
  },
  methods: {
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem
    }
  }
}
</script>

<style scoped>
.uk-navbar-container {
  background: #fff;
  box-shadow: 0 2px 5px 0 rgba(30,30,30,.09);
}
.uk-navbar-sticky {
  box-shadow: 0 2px 5px 0 rgba(30,30,30,.09);
}
.x-button {
  color: #a0a0a0 !important;
  letter-spacing: 1px !important;
}
.x-button:hover {
  color: #333 !important;
}
.uk-navbar-nav>li>a.router-link-active {
  right: 0px;
  border-top: 2px solid #19b868;
  color: #333 !important;
}
.pad-spinner {
  padding-top: 25%;
  padding-bottom: 25%;
}
.box {
  background: #fafafa;
  box-shadow: inset 0 2px 5px 0 rgba(30,30,30,.09);
}
</style>