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

                <!--<h4 class="ribbon">{{evento.cuanto_falta}} <br> {{evento.horario}} </h4>-->
                <!--<h4 class="ribbon">{{evento.cuanto_moment}} <br> {{evento.horario}} </h4>-->

                <div v-if="estado_traduccion === false">

                    <!--<h4 class="ribbon tamaño">{{evento.cuanto_moment}} <br> {{evento.horario}} </h4>-->

<div v-if="evento.fecha_rango === fechahoy && evento.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h4 class="ribbon tamaño">Hoy<br> 11:00 a 19:00 hrs</h4>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h4 class="ribbon tamaño">Hoy<br> 10:00 a 20:00 hrs</h4>
    </div>
</div>
<div v-else-if="evento.fecha_rango !== fechahoy && evento.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h4 class="ribbon tamaño">{{ evento.cuanto_moment }}<br> 11:00 a 19:00 hrs</h4>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h4 class="ribbon tamaño">{{ evento.cuanto_moment }}<br> 10:00 a 20:00 hrs</h4>
    </div>
</div>
  <div v-else>
    <h4 class="ribbon tamaño">{{ evento.cuanto_moment }}<br>{{evento.horario}}</h4>
  </div>

                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom pad-derecha">{{ evento.nombre }}</h3>
                                
                                <div v-if="loading_detalles">
                                    <div class="uk-text-center">
                                        <div uk-spinner="ratio: 2"/>
                                    </div>
                                </div>
                                <div v-else>

                                    <!--<div class="uk-grid-divider uk-child-width-expand@s" uk-grid>-->
                                   
                                   
                                   
                                   <!-- <div class="uk-child-width-expand@s" uk-grid>
                                        <div class="uk-width-auto">
                                            <Detalles :actividad="evento" :actividad_translate="translate"></Detalles>
                                        </div>

                                        <div v-if="loading_boton_obras">
                                            <div class="uk-text-center">
                                                <div uk-spinner="ratio: 2"/>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div v-if="detalle.length !== 0">
                                                <div class="uk-width-expand">
                                                     <a @click.prevent="goToObras(evento, detalle)" class="uk-button-x uk-button-secondary uk-button-large">Obras</a>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                    </div>-->

                                    <Detalles :detalle="detalle" :actividad="evento" :actividad_translate="translate"></Detalles>
                                </div>

                                <!--<div v-if="loading_boton_obras">
                                    <div class="uk-text-center">
                                        <div uk-spinner="ratio: 2"/>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="detalle.length !== 0">
                                        <a class="uk-button-x uk-button-secondary uk-button-large">Obras</a>
                                    </div>
                                </div>-->

                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body uk-text-center data" v-html= translate.note_es></div>
                    <div class="uk-card-body uk-text-center">
                        <img :src="evento.thumbnail"/>
                    </div>
                </div>

                <div v-if="estado_traduccion === true">
                    <!--<h4 class="ribbon tamaño">{{evento.cuanto_moment_en}} <br> {{evento.horario}} </h4>-->

                    <div v-if="evento.fecha_rango === fechahoy && evento.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h4 class="ribbon tamaño">Today<br> 11:00 to 19:00 hrs</h4>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h4 class="ribbon tamaño">Today<br> 10:00 to 20:00 hrs</h4>
    </div>
</div>
<div v-else-if="evento.fecha_rango !== fechahoy && evento.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h4 class="ribbon tamaño">{{ evento.cuanto_moment_en }}<br> 11:00 to 19:00 hrs</h4>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h4 class="ribbon tamaño">{{ evento.cuanto_moment_en }}<br> 10:00 to 20:00 hrs</h4>
    </div>
</div>
  <div v-else>
    <h4 class="ribbon tamaño">{{ evento.cuanto_moment_en }}<br>{{evento.horario}}</h4>
  </div>


                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">

                                <h3 class="uk-card-title uk-margin-remove-bottom pad-derecha" v-html= translate.title_en></h3>
                              
                                <Detalles :detalle="detalle" :actividad="evento" :actividad_translate="translate"></Detalles>

                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body uk-text-center data" v-html= translate.note_en ></div>
                    <div class="uk-card-body uk-text-center">
                        <img :src="evento.thumbnail"/>
                    </div>
                </div>


                <!--<div v-if="detalle.length === 0">
                    <h4 class="ribbon tamaño">jojo</h4>
                </div>-->

                               <!-- <div v-if="loading_boton_obras">
                                    <div class="uk-text-center">
                                        <div uk-spinner="ratio: 2"/>
                                    </div>
                                </div>
                                <div v-else>
                                    <div v-if="detalle.length === 0">
                    <h4 class="ribbon tamaño">jojo</h4>
                </div>
                                </div>-->

            </div>
        </div>
    </section>
</template>

<script>
import Detalles from '@/components/Detalles'
import moment from 'moment';

export default {
  name: 'EventoView',
  components: {
    Detalles
  },
  data() {
    return {
        loading_detalles: true,
        item: [],
        loading_evento: true,
        loading_boton_obras: true,
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
                this.loading_evento = false;

                this.$store.dispatch('loadDetalle', this.$store.state.evento[0].id)
                    .then(response => {
                        this.loading_boton_obras = false;
                    })
                    .catch(error => {
                        this.loading_boton_obras= true;
                    })

                this.$store.dispatch('loadTranslate', this.$store.state.evento[0].id)
                    .then(response => {
                        this.loading_detalles = false;
                    })
                    .catch(error => {
                        this.loading_detalles= true;
                    })
            })
            .catch(error => {
                this.loading_evento = true;
            })  
    }else{
        /*cuando viene desde la cartelera*/
        this.item = this.$route.params.evento;
        this.loading_evento = false;

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
    },
    detalle() {
        return this.$store.state.detalle;
    },
        dia() {
      moment.locale('es')
      var dianombre = moment().format('dddd')
      return dianombre;
    },
        fechahoy() {
      moment.locale('es')
      var fechanombre = moment().format('DD/MM/YYYY')
      return fechanombre;
    },
  },
      methods: {
    goToObras (actividad, detail) {
      this.$router.push({
        params: {
            slug:actividad.slug,
          id: actividad.id,
          evento: actividad,
          detalle: detail

        },
        name: 'Obras'
      })
    },
  }
}
</script>

<style scoped>
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
