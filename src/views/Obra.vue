<template>
  <section>
    <div v-if="loading_evento">
      <div class="pad-spinner uk-text-center">
        <div uk-spinner="ratio: 4"/>
      </div>
    </div>

        <div v-else class="uk-container uk-container-center pad-top">

          <ul class="uk-breadcrumb">
                <a href="javascript:window.history.back();" class="uk-button-x uk-button-secondary uk-button-large"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
                 <!--<button class="uk-button-x uk-button-secondary uk-button-large"><span uk-icon="chevron-left" class="bold-icon"></span>Volver atrás</button>-->
                <!--<li><router-link to="/cartelera" class="text-translate a-translate"><span uk-icon="chevron-left"></span>Volver atrás</router-link></li>-->
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
                  <!--<div v-if="evento.video_url !== null" class="uk-width-1-4@m">
                    <a class="uk-button uk-button-default" href="#modal-media-video" uk-toggle>Video</a>
                  </div>-->
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


                        <!--<img :src="evento.RutaImgLow"/>-->

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
/*import CardSala from '@/components/CardSala'
import moment from 'moment';*/

export default {
  name: 'ObrasView',
 
data() {
    return {
        loading_evento: true,
        item: [],

        /*loading_evento: true,
        loading_boton_obras: true,*/
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
  computed:
  {
    evento() {
        if(this.$route.params.evento === undefined){
            return this.$store.state.detallex[0];
            //return this.$store.state.evento[0];
        }else{
            return this.item;
        }
    },
    /*no() {
        return this.$store.state.evento;
    },*/
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
.pad-spinner {
  padding-top: 25%;
  padding-bottom: 25%;
}
.parent {
  overflow: hidden; /* required */
  /*width: 50%; /* for demo only */
  /*height: 250px /* some non-zero number */;
  /*margin: 25px auto; /* for demo only */
  /*border:1px solid grey; /* for demo only */
  /*position: relative; /* required  for demo*/
}

.ribbon {
  margin: 0;
  padding: 0;
  background: #19b868;
  color:white;
  /*padding:1em 0;*/
  padding:5px;
  position: absolute;
  top:0;
  right:0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;
  font-weight: bold;
  text-align: center;
}
.ribbon:before,
.ribbon:after {
  content: '';
  position: absolute;
  top:0;
  margin: 0 -1px; /* tweak */
  width: 150%;
  height: 100%;
  background: #19b868;
  /*box-shadow: 0 0 8px rgba(0,0,0,.3);*/
  
}
.ribbon:before {
  right:100%;
}

.ribbon:after {
  left:100%;
  
}




.pad-top {
  padding-top: 30px !important;
  padding-bottom: 30px !important;
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
.a-translate:link {
  color: #666 !important;
  text-decoration:none;
}
.a-translate:visited {
  color: #666 !important;
}
.a-translate:hover {
  color: #333 !important;
}
.a-translate:active {
  color: #333 !important;
}
.text-translate {
  color: #666 !important;
}
.pad-derecha {
 padding-right: 30%;
}
.uk-card-default {
    color: #333 !important;
}

.uk-button-x {
  margin: 0;
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
    padding: 0 10px;
    font-size: 10px;
    line-height: 42px;
    /*text-align: center;
    text-decoration: none;
    transition: .1s ease-in-out;
    transition-property: color,background-color,background-position,border-color,box-shadow;
    background-origin: border-box;*/
    border-radius: 500px;
    letter-spacing: 1px !important;
}
.uk-button-secondary {
    background: #a0a0a0 !important;
    color: #fafafa !important;

    /*background-color: #333;*/
}
.uk-button-secondary:hover {
      background: #333 !important;
    color: #fafafa !important;
    /*background-color: #151515;*/
}
.bold-icon {
    color: #fafafa !important;
}
@media only screen and (max-width: 500px) {
  .tamaño {
    font-size: 16px !important;
  }
}
</style>