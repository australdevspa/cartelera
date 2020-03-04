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
        
        <form style="padding-top: 20px" @submit="checkForm" method="post" action="https://www.culturapuertomontt.cl/inicio/?na=s" target="iframeSuscribcion">
          <input type="hidden" name="nlang" value="">
          <input type="hidden" name="nr" value="page">
          <div class="uk-margin">
            <input class="uk-input uk-width-1-2" type="text" placeholder="Nombre" name="nn" v-model="nameSus">
          </div>
          <div class="uk-margin">
            <input class="uk-input uk-width-1-2" type="text" placeholder="Correo Electrónico" name="ne" v-model="emailSus">
          </div>
          <div class="tnp-field tnp-field-button"><input class="boton-suscripcion" type="submit" value="Suscríbete" href="#modal-sus" uk-toggle></div>
        </form>

      </div>

      <div id="modal-sus" class="uk-flex-top" uk-modal="bg-close: false;">
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button class="uk-modal-close-default" type="button" uk-close></button>

          <div v-if="errors.length">
            <h2 class="suscripcion-titulo-modal">Suscripción a Boletines</h2>
            <p class="suscripcion-txt"><b>Por favor, corrija los siguientes errores:</b></p>
            <ul>
              <li class="error" v-for="error in errors">{{ error }}</li>
            </ul>
          </div>

          <div v-if="this.errors.length == 0" >
            <h2 class="suscripcion-titulo-modal">Suscripción a Boletines</h2>
            <div v-if="!aprobado">
              <p class="suscripcion-txt loading"><b>Enviando solicitud de Suscripción</b></p>
              
              <div uk-slider="center: true; autoplay: true;">
                <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
                  <ul class="uk-slider-items uk-child-width-1@s uk-grid">
                    <li>
                      <div class="uk-card uk-card-secondary" style="height: 100%; background-color: #706F6F !important;">
                        <div class="uk-card-body">
                          <h1 class="uk-heading-bullet">Mantente Informado</h1>
                          <p>Recibe de forma oportuna la información de nuestra programación semanal de actividades culturales (un mensaje a la semana).</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="uk-card uk-card-secondary" style="height: 100%; background-color: #706F6F !important;">
                        <div class="uk-card-body">
                          <h1 class="uk-heading-bullet">Datos Confidenciales</h1>
                          <p>Los datos que se sistematicen por esta vía, NO serán compartidos a terceros ni utilizados con otro fin.</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="uk-card uk-card-secondary" style="height: 100%; background-color: #706F6F !important;">
                        <div class="uk-card-body">
                          <h1 class="uk-heading-bullet">Información Detallada</h1>
                          <p>El boletín trae información detallada de cada evento (fecha, horario, título, protagonista, link al sitio web, precio, sala e imagen).</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="uk-card uk-card-secondary" style="height: 100%; background-color: #706F6F !important;">
                        <div class="uk-card-body">
                          <h1 class="uk-heading-bullet">Cancelar Suscripción</h1>
                          <p>Podrás borrarte en cualquier momento desde un enlace en el mismo boletín o escribiendo a audiencias@culturapuertomontt.cl.</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
                  <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
                </div>
                <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
              </div>

            </div>
            <p v-if="aprobado" class="suscripcion-txt-success"><b>Te has suscrito con éxito al boletín. Recibirás un correo electrónico de confirmación en unos minutos. Por favor, haz clic en el enlace para confirmar tu suscripción. Si el correo electrónico tarda más de 15 minutos en aparecer, revisa tu carpeta de spam.</b></p>
          </div>

        </div>
      </div>
    </div>

    <iframe src="" name="iframeSuscribcion" @load="iframeLoad"></iframe>
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
      emailSus: null,
      aprobado: false,
      time: 0
    }
  },
  computed: {
    actividades() {
      return this.$store.state.carousel;
    }
  },
  methods: {
    iframeLoad(e) {
      this.time = e.timeStamp
      if (e.timeStamp < 500000) {
        this.aprobado = true;
        this.nameSus = null;
        this.emailSus = null;
      }else{
        this.errors = [];
        this.errors.push('Se ha sobrepasado el tiempo de envío de la solicitud de Suscripción. Por favor intente nuevamente.');
      }
    },
    checkForm: function (e) {
      this.aprobado = false;
      this.errors = [];
      if (this.nameSus && this.emailSus) {
        return true;
      }

      this.errors = [];

      if (!this.nameSus) {
        this.errors.push('El nombre es obligatorio.');
      }
      if (!this.emailSus) {
        this.errors.push('El Correo Electrónico es obligatorio.');
      }
      e.preventDefault();
    }
  }
}
</script>

<style scoped>
iframe {
  height: 0;
  width: 0;
}
.suscripcion-titulo-modal {
  font-weight: 900;
  color: #333333;
  margin: 0px 0px 0px 0px !important;
  display: inline !important;
}
.error {
  color: red;
}
.suscripcion-txt {
  font-size: 20px;
  margin: 20px 0 20px 0;
}
.suscripcion-txt-success {
  font-size: 20px;
  color: green;
  margin: 20px 0 20px 0;
}
.loading:after {
  content: ' .';
  animation: dots 1s steps(5, end) infinite;}

@keyframes dots {
  0%, 20% {
    color: white;
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 white;}
  40% {
    color: black;
    text-shadow:
      .25em 0 0 white,
      .5em 0 0 white;}
  60% {
    text-shadow:
      .25em 0 0 black,
      .5em 0 0 white;}
  80%, 100% {
    text-shadow:
      .25em 0 0 black,
      .5em 0 0 black;}}
</style>