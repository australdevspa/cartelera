<template>
  <div class="uk-section uk-section-muted cartelera-footer">
    <div class="uk-container uk-container-center uk-text-center">
      <div class="uk-panel">
        <p class="uk-text-small text-footer">
          <a href="https://www.culturapuertomontt.cl" class="a-footer" target="_blank">culturapuertomontt.cl</a> / Teléfono: 652482638
          <br>
          <br>
          <a href="https://www.facebook.com/culturaptomontt" class="uk-margin-small-right uk-icon a-footer" uk-icon="icon: facebook; ratio: 1.6" target="_blank"></a>
          <a href="https://twitter.com/culturaptomontt" class="uk-margin-small-right uk-icon a-footer" uk-icon="icon: twitter; ratio: 1.6" target="_blank"></a>
          <a href="https://www.instagram.com/culturapuertomontt/" class="uk-margin-small-right uk-icon a-footer" uk-icon="icon: instagram; ratio: 1.6" target="_blank"></a>
          <a href="https://www.flickr.com/photos/culturapuertomontt/sets/" class="uk-margin-small-right uk-icon a-footer" uk-icon="icon: flickr; ratio: 1.6" target="_blank"></a>
          <a href="https://www.youtube.com/channel/UCDlH1MHCO9PKRwn4o4fNcpw" class="uk-margin-small-right uk-icon a-footer" uk-icon="icon: youtube; ratio: 1.6" target="_blank"></a>
          <br>
          <br>
          Copyright © 2018 Cartelera.
          <br>
          Puerto Montt, Chile.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.cartelera-footer { 
  padding: 40px 0px 50px 0px !important; 
}
@media (min-width: 700px) {
  .cartelera-footer { 
    padding: 70px 0px 80px 0px !important; 
  }
}
.a-footer:link {
  color: #999 !important;
  text-decoration:none;
}
.a-footer:visited {
  color: #999 !important;
}
.a-footer:hover {
  color: #666 !important;
}
.a-footer:active {
  color: #666 !important;
}
.text-footer {
  color: #999 !important;
}
</style>
