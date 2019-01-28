<template>
  <section class="principal">
    <div class="cuadro">
    <!--<div class="cuadro">
      <div class="uk-position-relative uk-visible-toggle uk-light visible-note oculto-note" uk-slideshow="animation: fade; autoplay: true;">
        <ul class="uk-slideshow-items">
          <li v-for="(item, index) in actividades"
            :key="index">
            <img :src="item.thumbnail" alt="" uk-cover>
            <div class="uk-overlay uk-overlay-primary uk-position-right uk-text-left uk-transition-slide-right uk-width-medium">
              <p class="estilo-slider estilo-slider-h4 mar-bottom">{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}} - {{item.horario}}</p>
              <hr class="uk-divider-small mar-20">
              <p class="estilo-slider estilo-slider-h1 mar-30 titulo">{{item.nombre}}</p>
              <hr class="uk-divider-small mar-20">
              <p class="estilo-slider estilo-slider-h4 mar-20">Entrada {{item.entrada}}</p>
              <p class="estilo-slider estilo-slider-h4 mar-top">{{item.donde}}</p>
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
          <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-left uk-transition-slide-bottom">
            <p class="estilo-slider estilo-slider-h4 mar-bottom">{{item.fecha_inicio_formato_day}} de {{item.fecha_inicio_formato_month}} {{item.horario}}</p>
            <hr class="uk-divider-small mar-20">
            <p class="estilo-slider estilo-slider-h1 mar-30 titulo">{{item.nombre}}</p>
            <hr class="uk-divider-small mar-20">
            <p class="estilo-slider estilo-slider-h4 mar-20">Entrada {{item.entrada}}</p>
            <p class="estilo-slider estilo-slider-h4 mar-top">{{item.donde}}</p>
          </div>
        </li>
      </ul>
      <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
      <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>
    </div>-->


      <div uk-slider="center: true">

    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">

        <ul class="uk-slider-items uk-child-width-1@s uk-grid">
            <li v-for="(item, index) in actividades"
                :key="index">
                              
                  <card-inicio :actividad="item"></card-inicio>
                 
            </li>
            <!--<li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/dark.jpg" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/light.jpg" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/photo2.jpg" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>
            <li>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-media-top">
                        <img src="images/photo3.jpg" alt="">
                    </div>
                    <div class="uk-card-body">
                        <h3 class="uk-card-title">Headline</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                </div>
            </li>-->
            
        </ul>

        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

    </div>

    <!--<ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>-->
      </div>
</div>


  </section>
</template>

<script>
import CardInicio from '@/components/CardInicio'
export default {
  name: 'InicioView',
  components: {
    CardInicio,
  },
  computed:
  {
    actividades() {
      return this.$store.state.carousel;
    }
  }
}
</script>

<style scoped>
.uk-grid>* {
     padding-left: 0px; 
}
.principal {
  position: relative;
      background: #333;
}
.cuadro {
  /*background: #fafafa !important;*/
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
    /*font-size: 42px;
    font-size: 34px;*/
    font-size: 28px;
  }
  .estilo-slider-h4 {
    /*font-size: 20px;*/
    font-size: 19px;
  }
  .mar-bottom {
    margin-bottom: 12px !important;
  }
  .mar-20 {
    margin-top: 12px !important;
    margin-bottom: 12px !important;
  }
  .mar-30 {
    /*margin-top: 25px !important;
    margin-bottom: 25px !important;*/
    margin-top: 20px !important;
    margin-bottom: 20px !important;
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
    /*font-size: calc(6px + 3vw);
    font-size: calc(-2px + 3vw);*/
    font-size: calc(4px + 2vw);
  }
  .estilo-slider-h4 {
    font-size: calc(16px + 0.25vw);
  }
  .mar-bottom {
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-20 {
    margin-top: calc(0px + 1vw) !important;
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-30 {
    margin-top: calc(8px + 1vw) !important;
    margin-bottom: calc(8px + 1vw) !important;
        /*margin-top: calc(13px + 1vw) !important;
    margin-bottom: calc(13px + 1vw) !important;*/
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
    /*margin-top: calc(13px + 1vw) !important;
    margin-bottom: calc(13px + 1vw) !important;*/
    margin-top: calc(8px + 1vw) !important;
    margin-bottom: calc(8px + 1vw) !important;
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
.titulo {
  color: rgb(255, 255, 0);
}
</style>