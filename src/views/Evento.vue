<template>
    <section>
        <div class="uk-container uk-container-center pad-top">
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.nombre }}</h3>
                            <p class="uk-text-meta uk-margin-remove-top">Publicado: {{ evento.creado_el }} / Fecha inicio: {{ evento.fecha_inicio_formato }}.</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body uk-text-center">
                    <p>{{ evento.contenido }}</p>
                </div>
                <div class="uk-card-body uk-text-center">
                    <img :src="evento.attachments[0].guid"/>
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
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  created () {
    this.$store.dispatch('loadEvento', this.$route.params.id);
    //this.evento = this.$route.params.id
  },
  computed:
  {
    evento() {
      return this.$store.state.evento[0];
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
</style>
