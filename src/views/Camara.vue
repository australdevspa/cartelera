<template>
  <div>
        <div class="pad-top">
          <QrcodeReader
            :paused="paused"
            @decode="onDecode"
            @init="onInit">
            <div v-show="paused" class="validation-layer">

              <!-- <div class="decoded-content">{{ content }}</div> --> 

              <div class="validation-notice">
                <div v-if="validating">
                  Buscando actividad o exposición ...
                </div>

                <div v-else-if="isValid || isValidActividad" class="text-success">
                  <!-- Código QR válido. -->
                </div>

                <div v-else class="text-danger">
                  No se ha encontrado una actividad o exposición asociada a este código QR, por favor intente una vez más.
                </div>
              </div>

            </div>
            <LoadingIndicator v-show="loading" />
          </QrcodeReader>
        </div>

        <!-- modal de acceso a exposición-->
        <div id="modal-acceso-expo" uk-modal>
          <div class="uk-modal-dialog">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
              <h2 class="uk-modal-title">Acceder a contenido descriptivo de la Exposición</h2>
            </div>
            <div class="uk-modal-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="uk-modal-footer uk-text-right">
              <!--<button class="uk-button uk-button-default uk-modal-close" type="button">Cancelar</button>
              <router-link :to="{name: 'Expo', params: { id: this.content } }" class="uk-button uk-button-primary uk-modal-close">Acceder</router-link>-->
            
              <button class="uk-button-x uk-button-secondary uk-button-large uk-modal-close" type="button" @click.prevent="setFalseExpo">Cancelar</button>
              <router-link :to="{name: 'Expo', params: { id: this.content } }" class="uk-button-x uk-button-secondary uk-button-large uk-modal-close">Acceder</router-link>
            </div>
          </div>
        </div>

        <div id="modal-acceso-actividad" uk-modal>
          <div class="uk-modal-dialog">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
              <h2 class="uk-modal-title">Acceder a contenido descriptivo de la Actividad</h2>
            </div>
            <div class="uk-modal-body">
              <p>Lorems ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="uk-modal-footer uk-text-right">
              <button class="uk-button-x uk-button-secondary uk-button-large uk-modal-close" type="button" @click.prevent="setFalseActividad">Cancelar</button>
              <router-link :to="{name: 'Evento', params: { id: this.content } }" class="uk-button-x uk-button-secondary uk-button-large uk-modal-close">Acceder</router-link>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import InitHandler from '@/mixins/InitHandler'

export default {
  name: 'Camara',
  components: { 
    QrcodeReader
  },
  mixins: [ InitHandler ],
  data () {
    return {
      isValid: false,
      isValidActividad: false,
      validating: false,
      paused: false,
      content: null
    }
  },
computed:
  {
    existe_el_slug() {
      return this.$store.state.existe_slug;
    },
  },
  methods: {
    async onDecode (content) {
      this.content = content
      this.pauseCamera()
      this.validating = true
      this.isValid = await this.validate(content)

      if(this.isValid == true){
        UIkit.modal('#modal-acceso-expo').show();
        //UIkit.modal('#modal-acceso-expo').hide();
          /*  UIkit.modal.dialog(`
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h2 class="uk-modal-title">Acceder a contenido descriptivo</h2>
        </div>
        <div class="uk-modal-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="uk-modal-footer uk-text-right">
        <a data-v-3c6e6ddc href="/exposicion/`+this.content+`" class="uk-button uk-button-primary">Acceder</a>
        <router-link to="/">Inicio</router-link>
        <a data-v-3c6e6ddc="" href="/exposicion/`+this.content+`" class="uk-button uk-button-primary">Acceder</a>
        <a data-v-7ba5bd90="" href="/" class="router-link-active">Inicio</a>
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancelar</button>
            <a class="uk-button uk-button-primary" href="/exposicion/`+this.content+`">Acceder</a>
        </div>`)*/
      }else{

      this.isValidActividad = await this.validateActividad(content)

      if(this.isValidActividad == true){
        UIkit.modal('#modal-acceso-actividad').show();
      }

      }

      this.validating = false
      window.setTimeout(() => {
        this.unPauseCamera()
      }, 2000)
    },
    pauseCamera () {
      this.paused = true
    },
    unPauseCamera () {
      this.paused = false
    },
    validate (content) {
      this.$store.dispatch('loadExisteSlug', content)
      return new Promise(resolve => {
        window.setTimeout(() => { // pretend it's taking really long
          if (this.existe_el_slug === true){
          //if (content.startsWith('https')) {
            this.$store.dispatch('loadResetExisteSlug')
            resolve(true)
          } else {
            resolve(false)
          }
        }, 3000)
      })
    },
    validateActividad (content) {
      this.$store.dispatch('loadExisteSlugActividades', content)
      return new Promise(resolve => {
        window.setTimeout(() => { // pretend it's taking really long
          if (this.existe_el_slug === true){
          //if (content.startsWith('https')) {
            this.$store.dispatch('loadResetExisteSlug')
            resolve(true)
          } else {
            resolve(false)
          }
        }, 3000)
      })
    },
    setFalseExpo () {
      this.isValid = false;
      UIkit.modal('#modal-acceso-expo').hide();
    },
    setFalseActividad () {
      this.isValidActividad = false;
      UIkit.modal('#modal-acceso-actividad').hide();
    },
  }
}
</script>

<style scoped>
.validation-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .9);
  text-align: center;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-notice {
  font-weight: bold;
  font-size: 1.4rem;
}
.pad-top {
  margin-top: 30px !important;
}

.uk-button-x {
  margin: 0;
  font-weight: bold !important;
    border: none;
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

    /*margin: 0;
    border: none;
    overflow: visible;
    font: inherit;
    color: inherit;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 20px;
    vertical-align: middle;*/
    padding: 0 20px;
    font-size: 14px;
    line-height: 42px;
    /*text-align: center;
    text-decoration: none;
    transition: .1s ease-in-out;
    transition-property: color,background-color,background-position,border-color,box-shadow;
    background-origin: border-box;*/
    border-radius: 5px;
    letter-spacing: 1px !important;
    box-shadow: 0 2px 10px 0 rgba(30,30,30,.09);
}
.uk-button-secondary {
    background: white !important;
    color: #19b868 !important;

    /*background-color: #333;*/
}
.uk-button-secondary:hover {
      background: #19b868 !important;
    color: white !important;

    /*background-color: #151515;*/
}
</style>