<template>
    <section>
        <div v-if="loading">
            <div class="pad-bottom uk-section-muted">
                <div uk-spinner="ratio: 4" class="uk-position-center uk-overlay" />
            </div>
        </div>

        <div v-else class="uk-container uk-container-center pad-top">
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.nombre }}</h3>
                            <p class="uk-text-meta uk-margin-remove-top">Publicado: {{ evento.creado_el }} / Fecha inicio: {{ evento.fecha_inicio_formato }}.</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body uk-text-center video" v-html= evento.contenido></div>
                <div class="uk-card-body uk-text-center">
                    <img :src="evento.thumbnail"/>
                </div>
                <div class="uk-card-footer">
                    <p class="uk-text-meta uk-margin-remove-top">Lugar: {{ evento.lugar }}.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'EventoView',
  data() {
    return {
        item: [],
        loading: false
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  created () {
    this.loading = true
    if(this.$route.params.evento === undefined){
        var str = window.location.pathname;
        var last = str.substring(str.lastIndexOf("/") + 1, str.length);
        this.$store.dispatch('loadEvento', last)
            .then(response => {
                this.loading = false
            })
            .catch(error => {
                this.loading = true
            })
    }else{
        this.item = this.$route.params.evento;
        this.loading = false;
    }
    //this.evento = this.$route.params.id
  },
  computed:
  {
    evento() {
        if(this.$route.params.evento === undefined){
            return this.$store.state.evento[0];
        }else{
            return this.item;
        }
    },
    /*evento() {
        return this.$route.params.evento
    }*/
  }
}
</script>

<style scoped>
.pad-top {
  margin-top: 30px !important;
  margin-bottom: 30px !important;
}
.pad-bottom {
  padding-bottom: 500px;
}
.video >>> iframe {
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>
