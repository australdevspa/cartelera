<template>
  <section>
    <div class="uk-section uk-section-muted">
      <div class="uk-container uk-container-center uk-text-center">
        <form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large" for="form-stacked-select">Selecciona tu categoria preferida:</label>
            <div class="uk-form-controls">
              <select class="uk-select" id="form-stacked-select" v-model="select">
                <option v-for="categoria in categorias"
                  :key="categoria.id">
                  {{categoria.area}}
                </option>
              </select>
            </div>
          </div>
        </form>

        <div v-if="select !== ''">
          <div v-if="totalBusquedaCategoria == 0">
            <div class="pad-bottom">
              <p class="uk-text-small uk-text-muted uk-text-left">No se encontraron actividades.</p>
            </div>
          </div>
          <div v-else-if="totalBusquedaCategoria == 1">
            <p class="uk-text-small uk-text-muted uk-text-left">{{totalBusquedaCategoria}} actividad encontrada.</p>
          </div>
          <div v-else>
            <p class="uk-text-small uk-text-muted uk-text-left">{{totalBusquedaCategoria}} actividades encontradas.</p>
          </div>
          
          <div class="pad-top">
            <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
              <div class="uk-width-1-2@m"
              v-for="(item, index) in busquedaCategoria"
              :key="index"
              @click.prevent="goToActividad(item)">
                <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                <card-left v-else :actividad="item" class="cursor"></card-left>
              </div>
            </div>

            <div class="pad-top" v-if="contadorBusquedaCategoria < totalBusquedaCategoria">
              <button class="uk-button uk-button-secondary" id="moreCategoria" @click.prevent="mostrarMasActividadesBusquedaCategoria">Cargar más actividades</button>
            </div>
          </div>
  
        </div>
        <div v-else>
          <div class="pad-bottom">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//import ActividadCard from '@/components/ActividadCard'
import CardRight from '@/components/CardRight'
import CardLeft from '@/components/CardLeft'
import _ from 'lodash'
export default {
  name: 'CategoriasView',
  data() {
    return {
      select: '',
    }
  },
  created () {
    this.$store.dispatch('loadCategorias');
    this.$store.dispatch('loadBusquedaCategoriaReset');
  },
  watch: {
    select: function (newFilter, oldFilter) {
      this.getBusquedaCategoria()
    },
  },
  computed: {
    categorias() {
      return this.$store.state.categorias;
    },
    busquedaCategoria() {
      return this.$store.state.busquedaCategoria;
    },
    totalBusquedaCategoria() {
      return this.$store.state.totalBusquedaCategoria;
    },
    contadorBusquedaCategoria() {
      return this.$store.state.contadorBusquedaCategoria;
    },
  },
  methods: {
    getBusquedaCategoria: _.debounce(
      function () {
        if (this.select !== '') {
          this.$store.dispatch('loadBusquedaCategoria', this.select);
        }
      },
    ),
    mostrarMasActividadesBusquedaCategoria () {
      document.getElementById("moreCategoria").disabled = true;
      this.$store.dispatch('loadMasBusquedaCategoria', this.select);
    },
    goToActividad (actividad) {
      this.$router.push({
        params: {
          id: actividad.id,
          actividad: actividad
        },
        name: 'Actividad'
      })
    }
  },
  components: {
    //ActividadCard,
    CardRight,
    CardLeft
  }
}
</script>

<style scoped>
.pad-top {
  margin-top: 30px !important;
}
.pad-bottom {
  padding-bottom: 300px;
}
.cursor {
    cursor:pointer;
}
</style>