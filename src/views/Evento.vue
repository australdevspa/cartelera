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
      <div class="uk-card evento-card parent">

        <div v-if="estado_traduccion === false">
          <div v-if="evento.fecha_rango === fechahoy && evento.horario === 'horario indefinido'">  
            <div v-if="dia === 'sabado'">
              <h4 class="evento-ribbon">Hoy<br> 11:00 a 19:00 hrs</h4>
            </div>
            <div v-else-if="dia === 'domingo'">
              <h4 class="evento-ribbon">Mañana Lunes<br> 10:00 a 20:00 hrs</h4>
            </div>
            <div v-else>
              <h4 class="evento-ribbon">Hoy<br> 10:00 a 20:00 hrs</h4>
            </div>
          </div>
          <div v-else-if="evento.fecha_rango !== fechahoy && evento.horario === 'horario indefinido'">
            <div v-if="dia === 'sabado'">
              <h4 class="evento-ribbon">{{ evento.cuanto_moment }}<br> 11:00 a 19:00 hrs</h4>
            </div>
            <div v-else-if="dia === 'domingo'">
              <h4 class="evento-ribbon">Mañana Lunes<br> 10:00 a 20:00 hrs</h4>
            </div>
            <div v-else>
              <h4 class="evento-ribbon">{{ evento.cuanto_moment }}<br> 10:00 a 20:00 hrs</h4>
            </div>
          </div>
          <div v-else>
            <h4 class="evento-ribbon">{{ evento.cuanto_moment }}<br>{{evento.horario}}</h4>
          </div>

          <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom evento-titulo">{{ evento.nombre }}</h3>
                                
                <div v-if="loading_detalles">
                  <div class="uk-text-center">
                    <div uk-spinner="ratio: 2"/>
                  </div>
                </div>
                <div v-else>
                  <Detalles :detalle="detalle" :actividad="evento" :actividad_translate="translate"></Detalles>
                </div>

              </div>
            </div>
          </div>
          <div class="uk-card-body uk-text-center data-html" v-html= translate.note_es></div>
          <div class="uk-card-body uk-text-center">
            <img :src="evento.thumbnail"/>
          </div>
        </div>

        <div v-if="estado_traduccion === true">
          <div v-if="evento.fecha_rango === fechahoy && evento.horario === 'horario indefinido'">
            <div v-if="dia === 'sabado'">
              <h4 class="evento-ribbon">Today<br> 11:00 to 19:00 hrs</h4>
            </div>
            <div v-else-if="dia === 'domingo'">
              <h4 class="evento-ribbon">Tomorrow Monday<br> 10:00 a 20:00 hrs</h4>
            </div>
            <div v-else>
              <h4 class="evento-ribbon">Today<br> 10:00 to 20:00 hrs</h4>
            </div>
          </div>
          <div v-else-if="evento.fecha_rango !== fechahoy && evento.horario === 'horario indefinido'">
            <div v-if="dia === 'sabado'">
              <h4 class="evento-ribbon">{{ evento.cuanto_moment_en }}<br> 11:00 to 19:00 hrs</h4>
            </div>
            <div v-else-if="dia === 'domingo'">
              <h4 class="evento-ribbon">Tomorrow Monday<br> 10:00 a 20:00 hrs</h4>
            </div>
            <div v-else>
              <h4 class="evento-ribbon">{{ evento.cuanto_moment_en }}<br> 10:00 to 20:00 hrs</h4>
            </div>
          </div>
          <div v-else>
            <h4 class="evento-ribbon">{{ evento.cuanto_moment_en }}<br>{{evento.horario}}</h4>
          </div>

          <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
              <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom evento-titulo" v-html= translate.title_en></h3>
                <Detalles :detalle="detalle" :actividad="evento" :actividad_translate="translate"></Detalles>
              </div>
            </div>
          </div>
          <div class="uk-card-body uk-text-center data-html" v-html= translate.note_en ></div>
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
const moment = require('moment');
require('moment/locale/es');

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
      loading_boton_obras: true
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
            
            this.$store.dispatch('loadPrimeraCarga')
    }else{
        /*cuando viene desde la cartelera*/
        if(this.$store.state.primera_carga === true){
          this.item = this.$route.params.evento;

          this.$store.dispatch('loadDetalle', this.$route.params.evento.id)
              .then(response => {
                  this.loading_evento = false;
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

              this.$store.dispatch('loadPrimeraCarga')
          
        }else{
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
    }
  },
  computed: {
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
      moment.locale('es');
      return moment().format('dddd');
    },
    fechahoy() {
      moment.locale('es');
      return moment().format('DD/MM/YYYY');
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
.data-html >>> iframe {
  max-width: 100% !important;
  max-height: 100% !important;
  display: block !important;
  margin: 0 auto !important;
}
.data-html >>> p {
  text-align: justify !important;
}
.data-html >>> em {
  color: #666 !important;
}
.data-html >>> li {
  list-style: none !important;
}
</style>