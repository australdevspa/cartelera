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
                  Buscando actividad ...
                </div>

                <div v-else-if="isValid" class="text-success">
                  <!-- Código QR válido. -->
                </div> 

                <div v-else class="text-danger">
                  No existe una actividad asociada a este código QR en la aplicación.
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
              <h2 class="uk-modal-title">Acceder a contenido descriptivo</h2>
            </div>
            <div class="uk-modal-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div class="uk-modal-footer uk-text-right">
              <button class="uk-button uk-button-default uk-modal-close" type="button">Cancelar</button>
              <router-link :to="{name: 'Expo', params: { id: this.content } }" class="uk-button uk-button-primary uk-modal-close">Acceder</router-link>
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
    }
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
</style>