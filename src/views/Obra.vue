<template>
  <section>
    <div v-if="loading_evento">
      <div class="pad-spinner-view uk-text-center">
        <div uk-spinner="ratio: 4"/>
      </div>
    </div>
    <div v-else class="uk-container uk-container-center pad-evento">
      <ul class="uk-breadcrumb">
        <a href="javascript:window.history.back();" class="uk-button boton-secundario boton-pequeño"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
      </ul>
      
      <div v-if="estado_traduccion_obra === false">
        <div class="uk-card uk-card-default parent">
          <div class="uk-card-header">
            <div class="uk-text-left" uk-grid>
              <div class="uk-width-expand@m">
                <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.titulo }}</h3>
                
                <ul class="barra-botones">
                  <li>
                    <a v-if="evento.detalle_en !== null" href="" @click.prevent="ingles" class="boton-principal-pequeño">English Version</a>
                  </li>
                </ul>
                <div class="mar-div-detalles" v-if="evento.tts_es !== null">
                    <aplayer :music="{  title: 'Audio',
                                        artist: 'Español',
                                        src: ''+evento.tts_es,
                                        pic: '../static/img/default/cover.jpg'}"/>
                </div>

                <ul class="barra-botones">
                  <li>
                    <a v-if="evento.video_url !== null" class="boton-principal-pequeño" href="#modal-media-video" uk-toggle>Video</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="uk-flex uk-flex-center" uk-grid style="margin-top: 30px;">
            <div class="uk-width-1-2@m uk-flex-first">
              <div v-if="evento.RutaImgLow !== null" uk-grid uk-lightbox="animation: slide">
                <a class="uk-inline" :href="evento.RutaImgLow">
                  <img :src="evento.RutaImgLow" :alt="evento.titulo" style="padding: 10px 30px 10px 30px;">
                </a>
              </div>
            </div>
          </div>

          <div class="uk-card-body uk-text-center data">{{evento.descripcion}}</div>

          <div v-if="evento.video_url_yt !== null" style="padding: 30px 10px;">
            <iframe width="560" height="315" :src="evento.video_url_yt" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

          <div v-if="evento.video_url_tour !== null" style="padding: 30px 10px;">
            <iframe class="tour" width="100%" height="640" style="width: 100%; height: 640px; border: none; max-width: 100%;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen" scrolling="no" allowfullscreen="true" :src="evento.video_url_tour"></iframe>
          </div>

          <!--<div v-if="evento.video_url_yt !== null" style="padding: 30px 10px;">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/1roy4o4tqQM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

          <div v-if="evento.video_url_tour !== null" style="padding: 30px 10px;">
            <iframe class="tour" width="100%" height="640" style="width: 100%; height: 640px; border: none; max-width: 100%;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen" scrolling="no" allowfullscreen="true" src="https://kuula.co/share/collection/7l5Fk?fs=1&vr=0&thumbs=1&chromeless=0&logo=0"></iframe>
          </div>-->

          <!--<div class="uk-card-body uk-text-center">
            <div v-if="evento.RutaImgLow !== null" class="uk-child-width-1-3@m" uk-grid uk-lightbox="animation: slide">
              <div>
                <a class="uk-inline" :href="evento.RutaImgLow">
                  <img :src="evento.RutaImgLow" :alt="evento.titulo">
                </a>
              </div>
            </div>
          </div>-->

          <div id="modal-media-video" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
              <button class="uk-modal-close-outside" type="button" uk-close></button>
              <video width="720" height="576" controls playsinline uk-video>
                <source :src="evento.video_url" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
      </div>


      <div v-if="estado_traduccion_obra === true">
        <div class="uk-card uk-card-default parent">
          <div class="uk-card-header">
            <div class="uk-text-left" uk-grid>
              <div class="uk-width-expand@m">
                <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.title_en }}</h3>
                
                <ul class="barra-botones">
                  <li>
                    <a href="" @click.prevent="espanol" class="boton-principal-pequeño">Original Text</a>
                  </li>
                </ul>
                <div class="mar-div-detalles" v-if="evento.tts_en !== null">
                  <aplayer :music="{  title: 'Audio',
                                      artist: 'English',
                                      src: ''+evento.tts_en,
                                      pic: '../static/img/default/cover.jpg'}"/>
                </div>

                <ul class="barra-botones">
                  <li>
                    <a v-if="evento.video_url !== null" class="boton-principal-pequeño" href="#modal-media-video" uk-toggle>Video</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="uk-flex uk-flex-center" uk-grid style="margin-top: 30px;">
            <div class="uk-width-1-2@m uk-flex-first">
              <div v-if="evento.RutaImgLow !== null" uk-grid uk-lightbox="animation: slide">
                <a class="uk-inline" :href="evento.RutaImgLow">
                  <img :src="evento.RutaImgLow" :alt="evento.titulo" style="padding: 10px 30px 10px 30px;">
                </a>
              </div>
            </div>
          </div>

          <div class="uk-card-body uk-text-center data">{{evento.detalle_en}}</div>
          
          <div v-if="evento.video_url_yt !== null" style="padding: 30px 10px;">
            <iframe width="560" height="315" :src="evento.video_url_yt" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

          <div v-if="evento.video_url_tour !== null" style="padding: 30px 10px;">
            <iframe class="tour" width="100%" height="640" style="width: 100%; height: 640px; border: none; max-width: 100%;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen" scrolling="no" allowfullscreen="true" :src="evento.video_url_tour"></iframe>
          </div>

          <!--<div class="uk-card-body uk-text-center">
            <div v-if="evento.RutaImgLow !== null" class="uk-child-width-1-3@m" uk-grid uk-lightbox="animation: slide">
              <div>
                <a class="uk-inline" :href="evento.RutaImgLow">
                  <img :src="evento.RutaImgLow" :alt="evento.titulo">
                </a>
              </div>
            </div>
          </div>-->
          
          <div id="modal-media-video" class="uk-flex-top" uk-modal>
            <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
              <button class="uk-modal-close-outside" type="button" uk-close></button>
              <video width="720" height="576" controls playsinline uk-video>
                <source :src="evento.video_url" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
      </div>


    </div>
  </section>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name: 'ObrasView',
  components: {
    Aplayer
  },
  data() {
    return {
      loading_evento: true,
      item: []
    }
  },
  created () {
    this.$store.dispatch('loadObraFalse')
    //this.$store.dispatch('loadFalse')
    if(this.$route.params.evento === undefined){
        /*cuando se recarga la url*/
              var str = window.location.pathname;

        var url = str.split( '/' );
  
        var id_detalle = url[ url.length - 1 ]
        var detalle = url[ url.length - 2 ] 
        var slug = url[ url.length - 3 ] 

        //var str = window.location.pathname;
        //var last = str.substring(str.lastIndexOf("/") + 1, str.length);
        this.$store.dispatch('loadEvento', slug)
            .then(response => {
                //this.loading_evento = false;
                
                this.$store.dispatch('loadDetalleX', {a: this.$store.state.evento[0].id, b: id_detalle})
                    .then(response => {
                      this.loading_evento = false;
                        //this.loading_boton_obras = false;
                    })
                    .catch(error => {
                      this.loading_evento = true;
                       // this.loading_boton_obras= true;
                    })

                
            })
            .catch(error => {
              this.loading_evento = true;
                //this.loading_evento = true;
            })  
    }else{
        /*cuando viene desde la cartelera*/
        this.item = this.$route.params.evento;
        this.loading_evento = false;
       // this.loading_evento = false;
        /*this.loading_evento = false;

        this.$store.dispatch('loadDetalle', this.$route.params.evento.id)
            .then(response => {
                this.loading_boton_obras = false;
            })
            .catch(error => {
                this.loading_boton_obras= true;
            })

        this.$store.dispatch('loadTranslate', this.$route.params.evento.id)
            .then(response => {
                this.loading_detalles = false;
            })
            .catch(error => {
                this.loading_detalles= true;
            })*/
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  computed: {
    evento() {
      if(this.$route.params.evento === undefined){
        return this.$store.state.detallex[0];
      }else{
        return this.item;
      }
    },
    estado_traduccion_obra() {
      return this.$store.state.estado_traduccion_obra;
    }
        /*node() {
        return this.$store.state.detallex;
    }*/
  },
  methods: {
    ingles () {
      this.$store.dispatch('loadObraTrue')
    },
    espanol () {
      this.$store.dispatch('loadObraFalse')
    },
    goToObra (actividad) {
      this.$router.push({
        params: {
          id: actividad.id,
          evento: actividad
        },
        name: 'Obra'
      })
    },
  }
}
</script>

<style scoped>
video{
  max-width: 100% !important;
  max-height: 100% !important;
  display: block !important;
  margin: 0 auto !important;
}
.data >>> iframe {
  max-width: 100% !important;
  max-height: 100% !important;
  display: block !important;
  margin: 0 auto !important;
}
.data {
  text-align: justify !important;
}
.data >>> p {
  text-align: justify !important;
}
.data >>> em {
  color: #666 !important;
}
.pad-derecha {
  padding-right: 30%;
}
.uk-card-default {
  color: #333 !important;
}
.img-pad {
  margin-top: 20px;
  margin-bottom: 20px;
}
iframe {
  max-width: 100% !important;
  max-height: 100% !important;
  display: block !important;
  margin: 0 auto !important;
}
@media only screen and (max-width: 639px) {
  .tour {
    height: 540px !important;
  }
}
</style>