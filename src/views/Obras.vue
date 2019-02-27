<template>
  <section>
    <div class="uk-container uk-container-center uk-text-center pad-evento">
      <div v-if="loading_detalles">
        <div class="pad-spinner-view uk-text-center">
          <div uk-spinner="ratio: 4"/>
        </div>
      </div>
      <div v-else>
        <ul class="uk-breadcrumb">
          <a href="javascript:window.history.back();" class="uk-button boton-secundario boton-pequeño"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
        </ul>
        <form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">
              Listado de Obras
            </label>
          </div>
        </form>
        <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
          <div  class="uk-width-1-3@m"
            v-for="(item, index) in evento" :key="index">
            <div class="uk-alert-success uk-text-center" uk-alert>
              <h3 class="obra-titulo cursor" @click.prevent="goToObra(item)">{{item.titulo}}</h3>
              <p>{{item.descripcion}}</p>
              <img class="uk-border-circle" width="100" height="100" :src="item.RutaImgLow" :alt="item.titulo">
              <h3>{{item.autor}}</h3>
            </div>                
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
      loading_detalles: true,
      item: []
    }
  },
  created () {
    if(this.$route.params.detalle === undefined){
        /*cuando se recarga la url*/
        var str = window.location.pathname;
        var url = str.split( '/' );
        var detalle = url[ url.length - 1 ]
        var slug = url[ url.length - 2 ]
        this.$store.dispatch('loadEvento', slug)
            .then(response => {
                this.$store.dispatch('loadDetalle', this.$store.state.evento[0].id)
                    .then(response => {
                        this.loading_detalles = false;
                    })
                    .catch(error => {
                        this.loading_detalles= true;
                    })
            })
            .catch(error => {
                this.loading_detalles = true;
            })  
    }else{
        /*cuando viene desde la cartelera*/
        this.item = this.$route.params.detalle;
        this.loading_detalles = false;
    }
  },
  computed: {
    evento() {
      if(this.$route.params.detalle === undefined){
        return this.$store.state.detalle;
      }else{
        return this.item;
      }
    },
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
.uk-alert-success {
  color: #333 !important;
  background-color: #fafafa !important;
  /*text-align: justify !important;*/
  /*box-shadow: 0 2px 10px 0 rgba(30,30,30,.09);*/
}
.uk-alert {
  padding: 15px !important;
}
</style>