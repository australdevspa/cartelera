<template>
  <section>
    <div class="uk-section pad-views">
      <transition name="bounce">
        <div v-if="show" class="icono-totop">
          <a href="" class="uk-icon-button uk-margin-small-right" uk-totop uk-scroll></a>
        </div>
      </transition>

      <div class="uk-container uk-container-center uk-text-center">
        <form class="uk-form-stacked">
          <div class="uk-margin">
            <div class="uk-text-center">
              <ul class="grid pad-ul-categorias">
                <li>
                  <a href="" @click.prevent="showCartelera" class="uk-button boton-secundario" :class="{ active: isActiveTodas() }">
                    Todas
                  </a>
                </li>
                <li v-for="(item, index) in categorias"
                  :key="index">
                    <a href="" @click.prevent="showPorCategoria(item.area)" class="uk-button boton-secundario" :class="{ active: isActive(item.area) }">
                      {{ item.area }} <span class="uk-badge badge-background">{{ item.ocurrence }}</span>
                    </a>
                </li>
              </ul>
            </div>
          </div>
        </form>

        <form class="uk-form-stacked">
          <div class="uk-margin">
            <div class="uk-form-controls">
              <input class="uk-input" 
                id="form-stacked-text" 
                type="text" 
                v-model="filter"
                placeholder="Buscar actividad"
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
                :key="index">
                  <card-right v-if="(index % 2) === 0" :actividad="item"></card-right>
                  <card-left v-else :actividad="item"></card-left>
                </div>
              </div>
              <div class="pad-top">
                <div v-if="cartelera_boton">
                  <button class="uk-button boton-secundario" @click.prevent="cargarCartelera">Cargar más actividades</button>
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
                :key="index">
                  <card-right v-if="(index % 2) === 0" :actividad="item"></card-right>
                  <card-left v-else :actividad="item"></card-left>
                </div>
              </div> 
              <div class="pad-top">
                <div v-if="cartelera_boton_filtered">
                  <button class="uk-button boton-secundario" @click.prevent="cargarCarteleraBusqueda">Cargar más actividades</button>
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
                :key="index">
                  <card-right v-if="(index % 2) === 0" :actividad="item"></card-right>
                  <card-left v-else :actividad="item"></card-left>
                </div>
              </div>
              <div class="pad-top">
                <div v-if="por_categoria_boton">
                  <button class="uk-button boton-secundario" @click.prevent="cargarPorCategoria(por_categoria[0].area)">Cargar más actividades</button>
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
                :key="index">
                  <card-right v-if="(index % 2) === 0" :actividad="item"></card-right>
                  <card-left v-else :actividad="item"></card-left>
                </div>
              </div>
              <div class="pad-top">
                <div v-if="porcategoria_boton_filtered">
                  <button class="uk-button boton-secundario" @click.prevent="cargarPorCategoriaBusqueda">Cargar más actividades</button>
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
import { setParametros } from '@/services/parametros'

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
      show: false,
      //activeItem: 'todas'
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
    cartelera_categoria_activa() {
      return this.$store.state.cartelera_categoria_activa;
    },
    /*filtered_busqueda() {
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
    },*/
    filtered_busqueda() {
      if(this.filter === ''){
        this.limit = 10
      }
      var resultado = []
      for (var propiedad in this.$store.state.data_cartelera.categorias) {
        var ejemplo = resultado.concat(this.$store.state.data_cartelera.categorias[propiedad].eventos)
        resultado = ejemplo
      }
      const filteredPokemon = (this.filter === '') ? resultado : resultado.filter(item => {
        const itemName = item.nombre.toLowerCase()
        return itemName.includes(this.filter.toLowerCase())
      })
      this.filtered_total =  Object.keys(filteredPokemon).length;
      if(this.limit < this.filtered_total){
        this.cartelera_boton_filtered = true
      }else{
        this.cartelera_boton_filtered = false
      }
      for (var i = 0; i < this.filtered_total ; i++) {
        setParametros(filteredPokemon[i])
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
      for (var i = 0; i < this.filtered_porcategoria_total ; i++) {
        setParametros(filteredPokemon[i])
      }
      return filteredPokemon.slice(0, this.limit_porcategoria)
    }
  },
  methods: {
    setParametros,
    handleScroll (event) {
      if(window.scrollY > 300){
        this.show = true
      }else{
        this.show = false;
      }
    },
    prevenirEnter: function(e){ },
    showCartelera () {
      this.filter = ''
      this.$store.dispatch('loadEstadoFalse')
    },
    cargarCartelera () {
      this.$store.dispatch('loadMasActividades');
    },
    showPorCategoria (x) {
      this.limit_porcategoria = 10
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
    },
    isActiveTodas: function () {
      return this.estado === false
    },
    isActive: function (menuItem) {
      return this.estado === true && this.cartelera_categoria_activa === menuItem
      //return this.activeItem === menuItem
    },
    /*setActive: function (menuItem) {
      this.activeItem = menuItem
    },*/
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
.icono-totop {
  position: fixed;
  bottom: 10%;
  z-index: 6;
  right: 20px;
}
.icono-totop a {
  transition: all 0.3s ease;
  font-size: 20px;
  background-color: #333;
  color: #fff;
  border: 1px solid #a0a0a0;
}
.icono-totop a:hover {
  background-color: #151515;
}
.uk-icon-button {
  width: 60px !important;
  height: 60px !important;
}
.pad-ul-categorias {
  padding-left: 0 !important;
}
.pad-top {
  margin-top: 30px !important;
}
.grid li {
  display: inline-block;
  padding: 5px 5px;
}
.uk-input:focus, .uk-select:focus, .uk-textarea:focus {
    border-color: #19b868 !important;
}
</style>