<template>
  <div id="app">
    <section slot="contenido">
      <div uk-sticky="" show-on-up="" animation="uk-animation-slide-top" cls-active="uk-navbar-sticky" sel-target=".uk-navbar-container" class="uk-sticky uk-sticky-fixed" style="position: fixed; top: 0px; width: 1066px;">
        <div class="uk-navbar-container uk-navbar-sticky">
          <div class="uk-container uk-container-expand">
              <nav class="uk-navbar" uk-navbar="{&quot;align&quot;:&quot;left&quot;,&quot;boundary&quot;:&quot;!.uk-navbar-container&quot;,&quot;dropbar&quot;:true,&quot;dropbar-anchor&quot;:&quot;!.uk-navbar-container&quot;,&quot;dropbar-mode&quot;:&quot;slide&quot;}">
                <div class="uk-navbar-left">
                  <router-link class="uk-navbar-item uk-logo" to="/">
                    <img src="../static/img/icons_ccpm/logo-ccpm-160x81.png" class="tamaño_logo uk-margin-small-right" v-on:click="setActive('')" :class="{ active: isActive('') }">
                  </router-link>
                </div>
                <div class="uk-navbar-center">                               
                  <div class="uk-navbar-item">
                    <router-link to="/cartelera" class="tamaño uk-button-x uk-button-secondary uk-button-large" v-on:click="setActive('cartelera')" :class="{ active: isActive('cartelera') }">Cartelera</router-link>
                  </div>
                </div>  
                <div class="uk-navbar-right">  
                  <div class="uk-navbar-item">
                    <router-link to="/espacios" class="tamaño uk-button-x uk-button-secondary uk-button-large" v-on:click="setActive('espacios')" :class="{ active: isActive('espacios') }">Espacios</router-link>
                  </div>                
                  <!--<ul class="uk-navbar-nav_item">
                    <li><router-link to="/espacios" class="uk-button uk-button-secondary uk-button-large" v-on:click="setActive('espacios')" :class="{ active: isActive('espacios') }">Espacios</router-link></li>
                  </ul>-->
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
  background: #f8f8f8;
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
  background: #19b868;
}
.uk-navbar-item>a.router-link-active {
      background: #19b868 !important;
    color: white !important;
}
.pad-spinner {
  padding-top: 25%;
  padding-bottom: 25%;
}
.box {
  background: #fafafa;
  box-shadow: inset 0 2px 5px 0 rgba(30,30,30,.09);
}
.uk-button-x {
  margin: 0;
  font-weight: bold !important;
    border: none;
    overflow: visible;
    font: inherit;
    color: inherit;
    text-transform: none;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-transition: .1s ease-in-out;
    transition: .1s ease-in-out;
    -webkit-transition-property: color,background-color,border-color;
    transition-property: color,background-color,border-color;

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
    border-radius: 5px;
    letter-spacing: 1px !important;
    box-shadow: 0 2px 10px 0 rgba(30,30,30,.09);
}
.uk-button-secondary {
    background: white !important;
    color: #19b868 !important;

    /*background-color: #333;*/
}
.uk-button-secondary:hover {
      background: #19b868 !important;
    color: white !important;

    /*background-color: #151515;*/
}
@media only screen and (max-width: 480px) {
  .tamaño {
    font-size: calc(4px + 2vw) !important;
    padding: 0 calc(4px + 2vw) !important;
  }
  .tamaño_logo {
    height: calc(40px + 2vw) !important;
  }
}
</style>