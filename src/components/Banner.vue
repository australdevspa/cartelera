<template>
  <div class="banner">
    <div class="uk-container uk-container-center uk-text-center">
        <h2 class="banner-titulo-1">Explora nuestras salas <router-link to="/espacios" class="boton-banner"><span class="uk-margin-small-right" uk-icon="arrow-right"></span></router-link></h2>
        
        
        <!--<button class="boton-banner vertical-center">Large button</button>-->

        <!--<div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
            <div>
                <div class="uk-background-muted banner-container">
                    <div class="vertical-center">
                        <h2 class="banner-titulo-1">Visita nuestras salas</h2>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-background-secondary uk-light  banner-container">
                    <div class="vertical-center">
                        <p>I am vertically centered.</p>
                    </div>
                </div>
            </div>
        </div>-->

      <!--<div class="uk-panel">
           <h2 class="banner-titulo-1">Visita nuestras salas</h2>
        <button class="uk-button uk-button-default uk-button-large">Large button</button>

        <p class="uk-text-small text-footer">
 <h2 class="banner-titulo-1">Visita nuestras salas</h2>
        <button class="uk-button uk-button-default uk-button-large">Large button</button>
            Visita nuestros espacios
            <br>
          <br>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://www.facebook.com/culturaptomontt" uk-icon="icon: facebook;" target="_blank"></a>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://twitter.com/culturaptomontt" uk-icon="icon: twitter;" target="_blank"></a>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://www.instagram.com/culturapuertomontt/" uk-icon="icon: instagram;" target="_blank"></a>
          <a class="icono-boton uk-icon uk-margin-small-right" href="https://www.flickr.com/photos/culturapuertomontt/sets/" uk-icon="icon: flickr;" target="_blank"></a>
          <a class="icono-boton uk-icon" href="https://www.youtube.com/channel/UCDlH1MHCO9PKRwn4o4fNcpw" uk-icon="icon: youtube;" target="_blank"></a>
        </p>
      </div>-->

    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>
.banner {
    padding: 30px 0;
    background: #28B9A1;
}
/*.banner-container {
    height: 100px;
    position: relative;
}*/

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.banner-titulo-1 {
  font-weight: 900;
  color: white;
  margin: 0px 0px 0px 0px !important;
  display: inline !important;
}
.boton-banner {
  margin: 0px 10px;
  font-weight: bold !important;
  border: 2px solid white;
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
  padding: 0 20px;
  font-size: 14px;
  line-height: 42px;
  border-radius: 500px;
  letter-spacing: 1px !important;
  box-shadow: 0 5px 10px 0 rgba(30,30,30,.09);
  background: transparent !important;
  color: white !important;
}
.boton-banner:hover {
  background: white !important;
  color: #28B9A1 !important;
  text-decoration:none;
}
</style>