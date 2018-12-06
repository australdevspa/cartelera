<template>
  <section class="principal uk-section-muted">
    <div class="cuadro">
      <div class="uk-position-relative uk-visible-toggle uk-light visible-note oculto-note" uk-slideshow="animation: fade; autoplay: true;">
        <ul class="uk-slideshow-items">
          <li v-for="(item, index) in actividades"
            :key="index">
            <img :src="item.thumbnail" alt="" uk-cover>
            <div class="uk-overlay uk-overlay-primary uk-position-right uk-text-center uk-transition-slide-right uk-width-medium">
              <p class="estilo-slider estilo-slider-h1 mar-bottom">{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}}</p>
              <p class="estilo-slider estilo-slider-h4 mar-20">{{item.horario}}</p>
              <hr class="uk-divider-small mar-20">
              <p class="estilo-slider estilo-slider-h1 mar-30">"{{item.trozo}}"</p>
              <hr class="uk-divider-small mar-20">
              <p class="estilo-slider estilo-slider-h4 mar-20">Entrada: {{item.entrada}}</p>
              <p class="estilo-slider estilo-slider-h4 mar-top">{{item.lugar}}</p>
              <!--<h1 >{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}}</h1>-->
              <!--<h4 >Horario: {{item.horario}}</h4>
              <hr class="uk-divider-small">
              <h2 >"{{item.nombre}}"</h2>
              <hr class="uk-divider-small">
              <h4 >Entrada: {{item.entrada}}</h4>
              <p class="uk-margin-remove">{{item.lugar}}</p>-->
            </div>
          </li>
        </ul>
        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
      </div>
    </div>
    
    <div class="uk-position-relative uk-visible-toggle uk-light visible-movil oculto-movil" uk-slideshow="ratio: 3:4; animation: fade; autoplay: true">
      <ul class="uk-slideshow-items">
        <li v-for="(item, index) in actividades"
          :key="index">
          <img :src="item.thumbnail" alt="" uk-cover>
          <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
            <!--<p class="estilo-slider estilo-slider-h1">{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}}</p>
            <p class="estilo-slider estilo-slider-h4">Horario: {{item.horario}}</p>-->

            <!--<h1 >{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}}</h1>
            --><!--<h3 class="uk-margin-remove">{{item.nombre}}</h3>
            <p class="uk-margin-remove">{{item.lugar}}</p>-->
            <p class="estilo-slider estilo-slider-h1 mar-bottom">{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}} | {{item.horario}}</p>
            <hr class="uk-divider-small mar-20">
            <p class="estilo-slider estilo-slider-h1 mar-30">"{{item.trozo}}"</p>
            <hr class="uk-divider-small mar-20">
            <p class="estilo-slider estilo-slider-h4 mar-20">Entrada: {{item.entrada}}</p>
            <p class="estilo-slider estilo-slider-h4 mar-top">{{item.lugar}}</p>
          </div>
        </li>
      </ul>
      <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InicioView',
  computed:
  {
    actividades() {
      return this.$store.state.carousel;
    }
  }
}
</script>

<style scoped>
.principal {
  position: relative;
}
.oculto-note {
  display: none;
  visibility: hidden;
}
.visible-movil {
  display: block;
  visibility: visible;
}
@media only screen and (min-width: 700px) {
  .visible-note {
    display: block;
    visibility: visible;
  }
  .oculto-movil {
    display: none;
    visibility: hidden;
  }
}
@media only screen and (min-width: 1200px) {
  .estilo-slider-h1 {
    font-size: 42px;
  }
  .estilo-slider-h4 {
    font-size: 20px;
  }
  .mar-bottom {
    margin-bottom: 12px !important;
  }
  .mar-20 {
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }
  .mar-30 {
    margin-top: 25px !important;
    margin-bottom: 25px !important;
  }
  .mar-top {
    margin-top: 12px !important;
  }
  .cuadro {
    width: 1200px;
    margin: 0 auto;
  }
}
@media only screen and (max-width: 1199px) {
  .estilo-slider-h1 {
    font-size: calc(6px + 3vw);
  }
  .estilo-slider-h4 {
    font-size: calc(17px + 0.25vw);
  }
  .mar-bottom {
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-20 {
    margin-top: calc(0px + 1vw) !important;
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-30 {
    margin-top: calc(13px + 1vw) !important;
    margin-bottom: calc(13px + 1vw) !important;
  }
  .mar-top {
    margin-top: calc(0px + 1vw) !important;
  }
}
@media only screen and (max-width: 699px) {
  .estilo-slider-h1 {
    font-size: calc(12px + 2.5vw);
  }
  .estilo-slider-h4 {
    font-size: calc(14px + 0.5vw);
  }
  .mar-bottom {
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-20 {
    margin-top: calc(0px + 1vw) !important;
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-30 {
    margin-top: calc(13px + 1vw) !important;
    margin-bottom: calc(13px + 1vw) !important;
  }
  .mar-top {
    margin-top: calc(0px + 1vw) !important;
  }
}
img {
  max-width: none !important;
  position: absolute !important;
  left: 50% !important;
  top: 50% !important;
  -webkit-transform: translate(-50%,-50%) !important;
  transform: translate(-50%,-50%) !important;
}
.estilo-slider {
  color: white;
  font-weight: 700;
}
</style>