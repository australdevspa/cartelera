<template>
    <section>
        <div class="uk-container uk-container-center pad-top">
            <ul class="uk-breadcrumb">
                <li><router-link to="/cartelera" class="text-translate a-translate"><span uk-icon="chevron-left"></span>Volver atrás</router-link></li>
            </ul>
            <div class="uk-card uk-card-default">

                <div v-if="estado_traduccion === false">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.nombre }}</h3>
                                
                                <div v-if="loading_detalles">
                                    <div class="uk-text-center">
                                        <div uk-spinner="ratio: 2"/>
                                    </div>
                                </div>
                                <div v-else>
                                    <Detalles :actividad="evento" :actividad_translate="translate"></Detalles>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body uk-text-center data" v-html= evento.contenido></div>
                    <div class="uk-card-body uk-text-center">
                        <img :src="evento.thumbnail"/>
                    </div>
                </div>

                <div v-if="estado_traduccion === true">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">

                                <h3 class="uk-card-title uk-margin-remove-bottom" v-html= translate.title_en></h3>
                              
                                <Detalles :actividad="evento" :actividad_translate="translate"></Detalles>

                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body uk-text-center data" v-html= translate.note_en ></div>
                    <div class="uk-card-body uk-text-center">
                        <img :src="evento.thumbnail"/>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>
import Detalles from '@/components/Detalles'

export default {
  name: 'EventoView',
  components: {
    Detalles
  },
  data() {
    return {
        loading_detalles: true,
        item: []
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  created () {
    this.$store.dispatch('loadFalse')
    if(this.$route.params.evento === undefined){
        /*cuando se recarga la url*/
        var str = window.location.pathname;
        var last = str.substring(str.lastIndexOf("/") + 1, str.length);
        this.$store.dispatch('loadEvento', last)
            .then(response => {
                this.$store.dispatch('loadTranslate', this.$store.state.evento[0].id)
                    .then(response => {
                        this.loading_detalles = false;
                    })
                    .catch(error => {
                        this.loading_detalles= true;
                    })
            })
            .catch(error => {
            })  
    }else{
        /*cuando viene desde la cartelera*/
        this.item = this.$route.params.evento;
        this.$store.dispatch('loadTranslate', this.$route.params.evento.id)
            .then(response => {
                this.loading_detalles = false;
            })
            .catch(error => {
                this.loading_detalles= true;
            })
    }
  },
  computed:
  {
    estado_traduccion() {
         return this.$store.state.estado_traduccion;
    },
    evento() {
        if(this.$route.params.evento === undefined){
            return this.$store.state.evento[0];
        }else{
            return this.item;
        }
    },
    translate() {
        return this.$store.state.translate[0];
    }
  }
}
</script>

<style scoped>
/* The ribbons */

.corner-ribbon{
          width: 10px;
      height: 10px;
      border-top: 100px solid #333;
      border-left: 100px solid transparent;
      position: absolute;


  /*width: 200px;
  background: #e43;
  position: absolute;
  top: 25px;
  left: -50px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 1px;
  color: #f0f0f0;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);*/
}
.corner-ribbon>p{


  top: -80px;
  left: -50px;
  position: absolute;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  /*width: 200px;
  background: #e43;
  position: absolute;
  top: 25px;
  left: -50px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 1px;
  color: #f0f0f0;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);*/
}
/* Custom styles */



.corner-ribbon.shadow{
  box-shadow: 0 0 3px rgba(0,0,0,.3);
}

/* Different positions */


.corner-ribbon.top-right{
    right: 0;
 /* top: 25px;
  right: -50px;
  left: auto;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);*/
}


/*.arrow-right {
      width: 0;
      height: 0;
      border-top: 100px solid #333;
      border-left: 100px solid transparent;
      position: absolute;
      float: right;
}

/*.arrow-right {
	width: 0; 
	height: 0; 
	border-bottom: 80px solid transparent;

	border-left: 80px solid #444;
  margin-left: 0;
  position: absolute;
  top: 0;
}*/

/*.arrow-right::after {
  background-color: transparent;
  box-shadow: 0 6px 6px 1px black;
  content: "";
  display: block;
  height: 0px;
  left: -102px;
  position: absolute;
  top: 39px;
  width: 115px;

  
  -webkit-transform: rotate(-45deg);
}*/

/*.arrow-right span {
  color: #000;
  font-family: sans-serif;
  font-size: 1.005em;
  left: 28px;
  top: 78px;
  /*position: absolute;*/
  /*width: 80px;
  float: right;
}*/


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
.data >>> p {
  text-align: justify !important;
}
.data >>> em {
  color: #666 !important;
}
.a-translate:link {
  color: #999 !important;
  text-decoration:none;
}
.a-translate:visited {
  color: #999 !important;
}
.a-translate:hover {
  color: #666 !important;
}
.a-translate:active {
  color: #666 !important;
}
.text-translate {
  color: #999 !important;
}
</style>
