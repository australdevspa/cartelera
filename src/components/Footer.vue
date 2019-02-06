<template>
  <div class="uk-section cartelera-footer">
    <div class="uk-container uk-container-center uk-text-center">
      <div class="uk-panel">
        <p class="uk-text-small text-footer">
          <a href="https://www.culturapuertomontt.cl" class="a-footer" target="_blank">culturapuertomontt.cl</a> / Teléfono: 652482638
          <br>
          <br>
          <a class="uk-icon-button uk-icon uk-margin-small-right" href="https://www.facebook.com/culturaptomontt" uk-icon="icon: facebook;"></a>
          <a class="uk-icon-button uk-icon uk-margin-small-right" href="https://twitter.com/culturaptomontt" uk-icon="icon: twitter;"></a>
          <a class="uk-icon-button uk-icon uk-margin-small-right" href="https://www.instagram.com/culturapuertomontt/" uk-icon="icon: instagram;"></a>
          <a class="uk-icon-button uk-icon uk-margin-small-right" href="https://www.flickr.com/photos/culturapuertomontt/sets/" uk-icon="icon: flickr;"></a>
          <a class="uk-icon-button uk-icon" href="https://www.youtube.com/channel/UCDlH1MHCO9PKRwn4o4fNcpw" uk-icon="icon: youtube;"></a>
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
import moment from 'moment';

export default {
  name: 'Footer',
  computed: {
    year() {
      moment.locale('es')
      return moment().format('YYYY')
    },
  }
}
</script>

<style scoped>
.cartelera-footer { 
  padding: 40px 0px 50px 0px !important; 
  background-color: #19b868;
  background-image: linear-gradient(135deg,#A8DB5B 0,#76C602 30%,#00A28E 70%,#A7E1DA 100%);
}
@media (min-width: 700px) {
  .cartelera-footer { 
    padding: 70px 0px 80px 0px !important; 
  }
}
.text-footer {
  color: #fff !important;
}
.a-footer:link {
  color: #fff !important;
}
.a-footer:visited {
  color: #fff !important;
}
.a-footer:hover {
  /*color: #D2EEA8 !important;
  transition: .1s ease-in-out;
  transition-property: color,background-color,border-color,box-shadow;*/
}
.a-footer:active {
  /*color: #D2EEA8 !important;*/
}
.uk-icon-button {
  background: transparent;
  color: white;
  border: 1px solid white;
  width: 40px;
  height: 40px;
  transition: .1s ease-in-out;
  transition-property: color,background-color,border-color,box-shadow;
}
.uk-icon-button:hover {
  background-color: #fff;
  color: #19b868;
  border-color: rgba(255,255,255,.7);
}
</style>
