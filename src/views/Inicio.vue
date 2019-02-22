<template>
  <section class="main-slider">
    <div class="cuadro-slider">
      <div uk-slider="center: true; animation: fade; autoplay: true;">
        <div class="uk-position-relative uk-visible-toggle uk-light " tabindex="-1">
          <ul class="uk-slider-items uk-child-width-1@s uk-grid sin-padding">
            <li v-for="(item, index) in actividades" :key="index">
              <slider :actividad="item"></slider>
            </li>
          </ul>
          <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
          <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
        </div>
      </div>
    </div>
    <Banner></Banner>
  </section>
</template>

<script>
import Slider from '@/components/Slider'
import Banner from '@/components/Banner'

export default {
  name: 'InicioView',
  components: {
    Slider,
    Banner
  },
  computed: {
    actividades() {
      return this.$store.state.carousel;
    }
  }
}
</script>