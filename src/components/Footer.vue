<template>
  <div class="uk-section cartelera-footer">
    <div class="uk-container uk-container-center uk-text-center">
      <div class="uk-panel">
        <p class="uk-text-small text-footer">
          <a href="https://www.culturapuertomontt.cl" class="a-footer" target="_blank">culturapuertomontt.cl</a> / Teléfono: 652482638
          <br>
          <br>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://www.facebook.com/culturaptomontt" uk-icon="icon: facebook;" target="_blank"></a>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://twitter.com/culturaptomontt" uk-icon="icon: twitter;" target="_blank"></a>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://www.instagram.com/culturapuertomontt/" uk-icon="icon: instagram;" target="_blank"></a>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://www.flickr.com/photos/culturapuertomontt/sets/" uk-icon="icon: flickr;" target="_blank"></a>
          <a class="icono-boton uk-icon" href="https://www.youtube.com/channel/UCDlH1MHCO9PKRwn4o4fNcpw" uk-icon="icon: youtube;" target="_blank"></a>
          <br>
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
moment.locale('es');

export default {
  name: 'Footer',
  computed: {
    year() {
      return moment().format('YYYY')
    },
  }
}
</script>