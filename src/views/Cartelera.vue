<template>
  <section>
    <div class="uk-section uk-section-muted">
      <div class="uk-container uk-container-center uk-text-center">
        <form class="uk-form-stacked">
          <!-- falta el spinner y el href filtrando por categoria y mas diseño -->
          <div class="uk-margin">
            <div class="uk-text-center">
              <ul class="grid">
                <li>
                  <a href="" @click.prevent="cargarCartelera" class="uk-button uk-button-primary tm-button all-button">
                    All
                  </a>
                </li>
                <li v-for="(item, index) in categorias"
                  :key="index">
                    <a href="" @click.prevent="cargarCategoria(item.area)" class="uk-button uk-button-primary tm-button" :style="{ background: item.color + '!important' }">
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
            <p class="uk-text-small uk-text-muted uk-text-left">{{actividadesTotal}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in actividades"
                :key="index"
                @click.prevent="goToActividad(item)">
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>

              <div class="pad-top">
                <div v-if="actividadesBoton">
                  <button class="uk-button uk-button-secondary" @click.prevent="masActividades">Cargar más actividades</button>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <div v-if="totalBusqueda == 0">
              <p class="uk-text-small uk-text-muted uk-text-left">No se encontraron actividades.</p>
            </div>
            <div v-else-if="totalBusqueda == 1">
              <p class="uk-text-small uk-text-muted uk-text-left">{{totalBusqueda}} actividad encontrada.</p>
            </div>
            <div v-else>
              <p class="uk-text-small uk-text-muted uk-text-left">{{totalBusqueda}} actividades encontradas.</p>
            </div>

            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in busqueda"
                :key="index"
                @click.prevent="goToActividad(item)">
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>

              <div class="pad-top" v-if="contadorBusqueda < totalBusqueda">
                <button class="uk-button uk-button-secondary" id="moreBusqueda" @click.prevent="mostrarMasActividadesBusqueda">Cargar más actividades</button>
              </div>
            </div>
          </div>

        </div>
        <div v-else-if="estado === true">

          <div v-if="filter === ''">
            <p class="uk-text-small uk-text-muted uk-text-left">{{totalxcategoriaActividades}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in xcategoria"
                :key="index"
                @click.prevent="goToActividad(item)">
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>

              <div class="pad-top">
                <div v-if="xcategoriaBoton">
                  <button class="uk-button uk-button-secondary" @click.prevent="masActividadesxCategoria">Cargar más actividades</button>
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
      filter: '',
      //area: ''
    }
  },
  created () {
    this.$store.dispatch('loadCategorias')
    this.$store.dispatch('loadTotal')

this.$store.dispatch('loadTest')
    //this.$store.dispatch('loadxCategoriaTotal')

    if(this.actividadesInicio === 0){
      this.$store.dispatch('loadCartelera');
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


    test() {
      return this.$store.state.test;
    },


    estado() {
      return this.$store.state.estado;
    },
    actividadesTotal() {
      return this.$store.state.carteleraTotal;
    },
    actividades() {
      return this.$store.state.cartelera;
    },
    actividadesInicio() {
      return this.$store.state.carteleraInicio;
    },
    actividadesFin() {
      return this.$store.state.carteleraFin;
    },
    actividadesBoton() {
      return this.$store.state.carteleraBoton;
    },

    totalxcategoriaActividades() {
      return this.$store.state.xcategoriaTotal;
    },
    xcategoria() {
      return this.$store.state.xcategoria;
    },
    xcategoriaInicio() {
      return this.$store.state.xcategoriaInicio;
    },
    xcategoriaFin() {
      return this.$store.state.xcategoriaFin;
    },
    xcategoriaBoton() {
      return this.$store.state.xcategoriaBoton;
    },
    xcategoriaArea() {
      return this.$store.state.xcategoriaArea;
    },


    busqueda() {
      return this.$store.state.busqueda;
    },
    totalBusqueda() {
      return this.$store.state.totalBusqueda;
    },
    contadorBusqueda() {
      return this.$store.state.contadorBusqueda;
    }
  },
  methods: {
    prevenirEnter: function(e){ },
    masActividades () {
      this.$store.dispatch('loadCartelera')
      this.$store.dispatch('loadTest1')
    },
    cargarCartelera () {
      this.$store.dispatch('loadCarteleraReset');
      this.$store.dispatch('loadxCategoriaReset');
      this.$store.dispatch('loadCartelera')
    },
    masActividadesxCategoria () {
      this.$store.dispatch('loadxCategoria', this.xcategoriaArea)
    },
    cargarCategoria (x) {
      this.$store.dispatch('loadxCategoriaArea', x);
      this.$store.dispatch('loadCarteleraReset');
      this.$store.dispatch('loadxCategoriaReset');
      this.$store.dispatch('loadxCategoria', x)
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