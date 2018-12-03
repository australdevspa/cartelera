<template>
  <section>
    <div class="uk-section uk-section-muted">
      <div class="uk-container uk-container-center uk-text-center">
        
        <form class="uk-form-stacked">
          <div class="uk-margin">
            <div class="uk-text-center">
              <ul class="grid">
                <li>
                  <a href="" @click.prevent="showCartelera" class="uk-button uk-button-primary tm-button all-button">
                    Todas
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
        </form>

        <form class="uk-form-stacked">
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

        <div v-if="estado === false">
          <div v-if="filter === ''">
            <p class="uk-text-small uk-text-muted uk-text-left">{{cartelera_total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in cartelera"
                :key="index"
                @click.prevent="goToActividad(item)">
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
            <p class="uk-text-small uk-text-muted uk-text-left">{{filtered_total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in filtered_busqueda"
                :key="index"
                @click.prevent="goToActividad(item)">
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>
              
              <div class="pad-top">
                <div v-if="cartelera_boton_filtered">
                  <button class="uk-button uk-button-secondary" @click.prevent="cargarCarteleraBusqueda">Cargar más actividades</button>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <div v-else-if="estado === true">
          <div v-if="filter === ''">
            <p class="uk-text-small uk-text-muted uk-text-left">{{por_categoria_total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in por_categoria"
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

          <div v-else>
            <p class="uk-text-small uk-text-muted uk-text-left">{{filtered_porcategoria_total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in filtered_busqueda_porcategoria"
                :key="index"
                @click.prevent="goToActividad(item)">
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>
              
              <div class="pad-top">
                <div v-if="porcategoria_boton_filtered">
                  <button class="uk-button uk-button-secondary" @click.prevent="cargarPorCategoriaBusqueda">Cargar más actividades</button>
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
      limit: 10,
      filtered_total: 0,
      cartelera_boton_filtered: false,
      limit_porcategoria: 10,
      filtered_porcategoria_total: 0,
      porcategoria_boton_filtered: false,
      //activeBtn:''
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
    cartelera_total(){
      return this.$store.state.cartelera_total;
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
    por_categoria_total(){
      return this.$store.state.por_categoria_total;
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
    filtered_busqueda() {
      if(this.filter === ''){
        this.limit = 10
      }
      const filteredPokemon = (this.filter === '') ? this.$store.state.data_cartelera.cartelera : this.$store.state.data_cartelera.cartelera.filter(item => {
        const itemName = item.nombre.toLowerCase()
        return itemName.includes(this.filter.toLowerCase())
      })
      this.filtered_total =  Object.keys(filteredPokemon).length;
      if(this.limit < this.filtered_total){
        this.cartelera_boton_filtered = true
      }else{
        this.cartelera_boton_filtered = false
      }
      return filteredPokemon.slice(0, this.limit)
    },
    filtered_busqueda_porcategoria() {
      if(this.filter === ''){
        this.limit_porcategoria = 10
      }
      const filteredPokemon = (this.filter === '') ? this.$store.state.data_cartelera.categorias[this.por_categoria[0].area].eventos : this.$store.state.data_cartelera.categorias[this.por_categoria[0].area].eventos.filter(item => {
        const itemName = item.nombre.toLowerCase()
        return itemName.includes(this.filter.toLowerCase())
      })
      this.filtered_porcategoria_total =  Object.keys(filteredPokemon).length;
      if(this.limit_porcategoria < this.filtered_porcategoria_total){
        this.porcategoria_boton_filtered = true
      }else{
        this.porcategoria_boton_filtered = false
      }
      return filteredPokemon.slice(0, this.limit_porcategoria)
    }
  },
  methods: {
    prevenirEnter: function(e){ },
    showCartelera () {
      this.filter = ''
      this.$store.dispatch('loadEstadoFalse')
    },
    cargarCartelera () {
      this.$store.dispatch('loadCartelera')
    },
    showPorCategoria (x) {
      this.filter = ''
      this.$store.dispatch('loadPorCategoria', x)
    },
    cargarPorCategoria (x) {
      this.$store.dispatch('loadMasPorCategoria', x)
    },
    cargarCarteleraBusqueda () {
      this.limit += this.limit
    },
    cargarPorCategoriaBusqueda () {
      this.limit_porcategoria += this.limit_porcategoria
    },
    goToActividad (actividad) {
      this.$router.push({
        params: {
          id: actividad.slug,
          evento: actividad
        },
        name: 'Evento'
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
/*
.active{
  background-color:red;
}*/
</style>