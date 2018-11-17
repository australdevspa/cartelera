<template>
  <section class="principal uk-section-muted">
    <div class="uk-position-relative uk-visible-toggle uk-light visible-note oculto-note" uk-slideshow="animation: fade; autoplay: true">
      <ul class="uk-slideshow-items">
        <li v-for="(item, index) in actividades"
          :key="index">
          <img :src="item.thumbnail" alt="" uk-cover
          style="
              max-width: none;
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);">
          <div class="uk-overlay uk-overlay-primary uk-position-right uk-text-center uk-transition-slide-right uk-width-medium">
            <h1 >{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}}</h1>
            <h3 class="uk-margin-remove">{{item.nombre}}</h3>
            <p class="uk-margin-remove">{{item.lugar}}</p>
          </div>
        </li>
      </ul>
      <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
    </div>
    
    <div class="uk-position-relative uk-visible-toggle uk-light visible-movil oculto-movil" uk-slideshow="ratio: 3:4; animation: fade; autoplay: true">
      <ul class="uk-slideshow-items">
        <li v-for="(item, index) in actividades"
          :key="index">
          <img :src="item.thumbnail" alt="" uk-cover>
          <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
            <h1 >{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}}</h1>
            <h3 class="uk-margin-remove">{{item.nombre}}</h3>
            <p class="uk-margin-remove">{{item.lugar}}</p>
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
</style>