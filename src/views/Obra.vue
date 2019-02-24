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
      <div class="uk-card uk-card-default parent">
        <div class="uk-card-header">
          <div class="uk-text-left" uk-grid>
            <div class="uk-width-expand@m">
              <h3 class="uk-card-title uk-margin-remove-bottom pad-derecha">{{ evento.titulo }}</h3>
              <ul class="barra-botones">
                <li>
                  <a v-if="evento.video_url !== null" class="boton-principal-pequeño" href="#modal-media-video" uk-toggle>Video</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="uk-card-body uk-text-center data">{{evento.descripcion}}</div>
        <div class="uk-card-body uk-text-center">
          <div class="uk-child-width-1-3@m" uk-grid uk-lightbox="animation: slide">
            <div>
              <a class="uk-inline" :href="evento.RutaImgLow">
                <img :src="evento.RutaImgLow" alt="">
              </a>
            </div>
          </div>
        </div>
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
  </section>
</template>

<script>
export default {
  name: 'ObrasView',
  data() {
    return {
      loading_evento: true,
      item: []
    }
  },
  created () {
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
  computed: {
    evento() {
      if(this.$route.params.evento === undefined){
        return this.$store.state.detallex[0];
      }else{
        return this.item;
      }
    },
        /*node() {
        return this.$store.state.detallex;
    }*/
  },
  methods: {
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
</style>