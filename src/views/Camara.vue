<template>
  <div>
    <div class="pad-camara">
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

            <div v-else-if="isValidActividad" class="text-success">
              <!-- Código QR válido. -->
            </div>

            <div v-else class="text-danger">
              No se ha encontrado una actividad asociada al código QR, por favor intente una vez más.
            </div>
          </div>

        </div>
        <LoadingIndicator v-show="loading" />
      </QrcodeReader>
    </div>

    <div id="modal-acceso-actividad" uk-modal>
      <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">Acceder al contenido de la Actividad</h2>
        </div>

        <div class="uk-modal-body">
          <div v-if="loading_modal_info">
            <div class="pad-spinner uk-text-center">
              <div uk-spinner="ratio: 4"/>
            </div>
          </div>
          <div v-else>
            <div v-if="load_evento.length != 0" >
              <h2 class="uk-modal-title">{{load_evento[0].nombre}}</h2>
              <div class="camara-modal">
                <p>{{ load_evento[0].fecha_inicio_formato }}</p>
                <p>{{ load_evento[0].donde }}</p>
                <p>Entrada {{ load_evento[0].entrada }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="tamaño-boton-principal boton-principal uk-button-large uk-modal-close" type="button" @click.prevent="setFalseActividad">Cancelar</button>
          <router-link :to="{name: 'Evento', params: { id: this.content } }" class="tamaño-boton-principal boton-principal uk-button-large uk-modal-close">Acceder</router-link>
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
      isValidActividad: false,
      validating: false,
      paused: false,
      content: null,
      loading_modal_info: true,
    }
  },
  computed: {
    existe_el_slug() {
      return this.$store.state.existe_slug;
    },
    load_evento() {
      return this.$store.state.evento;
    },
  },
  methods: {
    async onDecode (content) {
      if(content.lastIndexOf("/") === -1){
        this.content = content
        this.pauseCamera()
        this.validating = true
        
        this.isValidActividad = await this.validateActividad(content)
        if(this.isValidActividad == true){
          UIkit.modal('#modal-acceso-actividad').show();
        }
      }else{
        var n = content.lastIndexOf("/")
        var content_slug = content.slice(n+1, content.length);
        this.content = content_slug
        this.pauseCamera()
        this.validating = true

        this.isValidActividad = await this.validateActividad(content_slug)
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
    validateActividad (content) {
      this.$store.dispatch('loadResetEvento')
      this.$store.dispatch('loadExisteSlugActividades', content)
      return new Promise(resolve => {
        window.setTimeout(() => {
          if (this.existe_el_slug === true){
            this.$store.dispatch('loadEvento', content)
              .then(response => {
                  this.loading_modal_info = false;
              })
              .catch(error => {
                  this.loading_modal_info= true;
              })
            this.$store.dispatch('loadResetExisteSlug')
            resolve(true)
          }else{
            resolve(false)
          }
        }, 3000)
      })
    },
    setFalseActividad () {
      this.isValidActividad = false;
      UIkit.modal('#modal-acceso-actividad').hide();
    },
  }
}
</script>