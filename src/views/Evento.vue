<template>
    <section>
        <div class="uk-container uk-container-center pad-top">
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
.pad-top {
  margin-top: 30px !important;
  margin-bottom: 30px !important;
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
</style>
