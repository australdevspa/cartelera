<template>
  <section>
    <div class="uk-section uk-section-muted">
      <div class="uk-container uk-container-center uk-text-center">
        <form class="uk-form-stacked">
          <!-- falta el spinner -->
          <div class="uk-margin">
            <div class="uk-text-center">
              <ul class="grid">
                <li>
                  <a href="" @click.prevent="showCartelera" class="uk-button uk-button-primary tm-button all-button">
                    All
                  </a>
                </li>
                <li v-for="(item, index) in categorias"
                  :key="index">
                    <a href="" @click.prevent="showPorCategoria(item.area)" class="uk-button uk-button-primary tm-button" :style="{ background: item.color + '!important' }">
                      {{ item.area }} <span class="uk-badge badge-background" :style="{ color: item.color + '!important' }">{{ item.ocurrence }}</span>
                    </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- falta el implementar -->
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large" for="form-stacked-text">Encuentra tu actividad preferida:</label>
            <div class="uk-form-controls">
              <input class="uk-input" 
                id="form-stacked-text" 
                type="text" 
                v-model="filter"
                placeholder="Introduce el nombre de tu actividad"
                v-on:keydown.enter.prevent='prevenirEnter'>
            </div>
          </div>
        </form>

        <!-- listo, falta redireccionar a la actividad -->
        <div v-if="estado === false">

          <div v-if="filter === ''">
            <p class="uk-text-small uk-text-muted uk-text-left">{{cartelera[0].total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in cartelera[0].resultado"
                :key="index"
                >
                <router-link :to="{name: 'Evento', params: { id: item.id, evento: item } }">ejem</router-link>


    
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>

              <div class="pad-top">
                <div v-if="cartelera_boton">
                  <button class="uk-button uk-button-secondary" @click.prevent="cargarCartelera">Cargar más actividades</button>
                </div>
              </div>
            </div>
          </div>

          <div v-else>

          </div>

        </div>

        <div v-else-if="estado === true">

          <div v-if="filter === ''">
            <p class="uk-text-small uk-text-muted uk-text-left">{{por_categoria[0].total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in por_categoria[0].resultado"
                :key="index"
                @click.prevent="goToActividad(item)">
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>

              <div class="pad-top">
                <div v-if="por_categoria_boton">
                  <button class="uk-button uk-button-secondary" @click.prevent="cargarPorCategoria(por_categoria[0].area)">Cargar más actividades</button>
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>
    </div>
  </section>
</template>

<script>
import CardRight from '@/components/CardRight'
import CardLeft from '@/components/CardLeft'
import _ from 'lodash'

export default {
  name: 'CarteleraView',
  components: {
    CardRight,
    CardLeft
  },
  data() {
    return {
      filter: ''
    }
  },
  created () {
    this.$store.dispatch('loadCategorias')
    if(this.cartelera_inicio === 0){
      this.$store.dispatch('loadCartelera')
    }
  },
  watch: {
    filter: function (newFilter, oldFilter) {
      this.getBusqueda()
    }
  },
  computed:
  {
    categorias() {
      return this.$store.state.categorias;
    },
    estado() {
      return this.$store.state.estado;
    },

    cartelera() {
      return this.$store.state.cartelera;
    },
    cartelera_inicio() {
      return this.$store.state.cartelera_inicio;
    },
    cartelera_tamaño() {
      return this.$store.state.cartelera_tamaño;
    },
    cartelera_boton() {
      return this.$store.state.cartelera_boton;
    },

    por_categoria() {
      return this.$store.state.por_categoria;
    },
    por_categoria_inicio() {
      return this.$store.state.por_categoria_inicio;
    },
    por_categoria_tamaño() {
      return this.$store.state.por_categoria_tamaño;
    },
    por_categoria_boton() {
      return this.$store.state.por_categoria_boton;
    },


  /* 
    busqueda() {
      return this.$store.state.busqueda;
    },
    totalBusqueda() {
      return this.$store.state.totalBusqueda;
    },
    contadorBusqueda() {
      return this.$store.state.contadorBusqueda;
    }*/
  },
  methods: {
    prevenirEnter: function(e){ },
    showCartelera () {
      this.$store.dispatch('loadEstadoFalse')
    },
    cargarCartelera () {
      this.$store.dispatch('loadCartelera')
    },

    showPorCategoria (x) {
      if(Object.keys(this.por_categoria).length === 0){
        this.$store.dispatch('loadPorCategoria', x)
      }else if(this.por_categoria[0].area === x){
        this.$store.dispatch('loadEstadoTrue')
      }else{
        this.$store.dispatch('loadResetPorCategoria')
        this.$store.dispatch('loadPorCategoria', x)
      }
    },
    cargarPorCategoria (x) {
      this.$store.dispatch('loadPorCategoria', x)
    },
    getBusqueda: _.debounce(
      function () {
        if (this.filter !== '') {
          this.$store.dispatch('loadBusquedaActividades', this.filter);
        }else{
          this.$store.dispatch('loadBusquedaReset');
        }
      },
    ),
    mostrarMasActividadesBusqueda () {
      document.getElementById("moreBusqueda").disabled = true;
      this.$store.dispatch('loadMasBusquedaActividades', this.filter);
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
  }
}
</script>

<style scoped>
.pad-top {
  margin-top: 30px !important;
}
.cursor {
    cursor:pointer;
}
.grid li {
  display: inline-block;
  padding: 5px 5px;
}
.tm-button {
  border-radius: 500px; 
  font-weight: bold;
  font-size: 150%;
}
.badge-background {
  background: white !important;
  font-weight: bold;
  font-size: 100%;
}
.all-button {
  background: black !important;
}
</style>