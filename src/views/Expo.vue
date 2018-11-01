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
                            <h3 class="uk-card-title uk-margin-remove-bottom">{{expo.nombre}}</h3>
                            <p class="uk-text-meta uk-margin-remove-top">Publicado: {{expo.fecha_publicacion}} / Fecha inicio: {{expo.fecha_inicio_formato}}.</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body uk-text-center">{{expo.contenido}}</div>
                <div class="uk-card-footer">
                    <p class="uk-text-meta uk-margin-remove-top">Lugar: {{expo.lugar}}.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'ExpoView',
  data() {
    return {
        loading: false
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  created () {
    this.loading = true
      
    var str = window.location.pathname;
    var last = str.substring(str.lastIndexOf("/") + 1, str.length);
    this.$store.dispatch('loadExpo', last)
        .then(response => {
            this.loading = false
        })
        .catch(error => {
            this.loading = true
        })
  },
  computed:
  {
    expo() {
        return this.$store.state.expo[0];
    }
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
</style>
