<template>
  <section class="main-slider">
    <div class="cuadro-slider">
      <div uk-slider="center: true; animation: fade; autoplay: true;">
        <div class="uk-position-relative uk-visible-toggle uk-light sin-margin" tabindex="-1">
          <ul class="uk-slider-items uk-child-width-1@s uk-grid sin-padding">
            <li v-for="(item, index) in actividades" :key="index">
              <slider :actividad="item"></slider>
            </li>
          </ul>
          <a class="uk-position-center-left uk-position-small uk-hidden-hover" aria-label="Anterior" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
          <a class="uk-position-center-right uk-position-small uk-hidden-hover" aria-label="Siguiente" href="#" uk-slidenav-next uk-slider-item="next"></a>
        </div>
      </div>
    </div>
    <Banner></Banner>
    <div class="suscripcion">
      <div class="uk-container uk-container-center uk-text-center">
        <h2 class="suscripcion-titulo">Boletines</h2>
        <p>Anótate para recibir de forma oportuna la información de nuestra programación semanal de actividades culturales (un mensaje a la semana).</p>
        
        <form style="padding-top: 20px" @submit="checkForm" method="post" action="https://www.culturapuertomontt.cl/inicio/?na=s" onsubmit="return newsletter_check(this)" target="iframeSuscribcion">
          <input type="hidden" name="nlang" value="">
          <input type="hidden" name="nr" value="page">
          <div class="uk-margin">
            <input class="uk-input uk-width-1-2" type="text" placeholder="Nombre y apellidos" name="nn" v-model="nameSus">
          </div>
          <div class="uk-margin">
            <input class="uk-input uk-width-1-2" type="email" placeholder="Correo electrónico" name="ne" v-model="emailSus">
          </div>
          <div class="tnp-field tnp-field-button"><input class="tnp-submit" type="submit" value="Suscríbete" href="#modal-sus" uk-toggle></div>
          <!--<div class="tnp-field tnp-field-button"><input class="tnp-submit" type="submit" value="Suscríbete" href="#modal-sus" uk-toggle></div>-->
          <!--<button class="boton-suscripcion" aria-label="Suscripción" type="submit" value="Suscríbete" href="#modal-sus" uk-toggle>Suscríbete</button>-->
        </form>

      </div>

      <div id="modal-sus" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button class="uk-modal-close-default" type="button" uk-close></button>

          <p v-if="errors.length">
            <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>

          <iframe src="" name="iframeSuscribcion"></iframe>
        </div>
      </div>
    </div>

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
  data() {
    return {
      errors: [],
      nameSus: null,
      emailSus: null
    }
  },
  computed: {
    actividades() {
      return this.$store.state.carousel;
    }
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      if (this.nameSus && this.emailSus) {
        return true;
      }

      this.errors = [];

      if (!this.nameSus) {
        this.errors.push('El nombre es obligatorio.');
      }
      if (!this.emailSus) {
        this.errors.push('La edad es obligatoria.');
      }

      e.preventDefault();
    }
  }
}
</script>