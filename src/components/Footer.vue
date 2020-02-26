<template>
  <div class="uk-section cartelera-footer">
    <div class="uk-container uk-container-center uk-text-center">
      <div class="uk-panel">
        <p class="uk-text-small text-footer">
          <a v-if="is_not_totem" href="https://www.culturapuertomontt.cl" class="a-footer" target="_blank">culturapuertomontt.cl</a>
          <span v-else>culturapuertomontt.cl</span>
           / Teléfono: 652482638
          <br>
          <br v-if="is_not_totem">
          <a v-if="is_not_totem" class="icono-boton uk-icon uk-margin-small-right" href="https://www.facebook.com/culturaptomontt" aria-label="Facebook" uk-icon="icon: facebook;" target="_blank"></a>
          <a v-if="is_not_totem" class="icono-boton uk-icon uk-margin-small-right" href="https://twitter.com/culturaptomontt" aria-label="Twitter" uk-icon="icon: twitter;" target="_blank"></a>
          <a v-if="is_not_totem" class="icono-boton uk-icon uk-margin-small-right" href="https://www.instagram.com/culturapuertomontt/" aria-label="Instagram" uk-icon="icon: instagram;" target="_blank"></a>
          <a v-if="is_not_totem" class="icono-boton uk-icon uk-margin-small-right" href="https://www.flickr.com/photos/culturapuertomontt/sets/" aria-label="Flickr" uk-icon="icon: flickr;" target="_blank"></a>
          <a v-if="is_not_totem" class="icono-boton uk-icon" href="https://www.youtube.com/channel/UCDlH1MHCO9PKRwn4o4fNcpw" aria-label="Youtube" uk-icon="icon: youtube;" target="_blank"></a>
          <br v-if="is_not_totem">
          <br>
          Copyright © {{year}} Cartelera.
          <br>
          Puerto Montt, Chile.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const moment = require('moment');
require('moment/locale/es');

export default {
  name: 'Footer',
  data() {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    year() {
      moment.locale('es');
      return moment().format('YYYY')
    },
    is_not_totem() {
      if(this.window.width >= 720 && this.window.height >= 1112){
        return false
      }else{
        return true
      }
    },
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  }
}
</script>