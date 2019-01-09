<template>
  <section>
    <div class="uk-section pad-nuevo">

      <!--<div v-if="boton_top">
        <div class="icon-bar">
          <a href="" class="uk-icon-button uk-margin-small-right" uk-totop uk-scroll></a>
        </div>

      </div>-->

      <transition name="bounce">
        <div v-if="show" class="icon-bar">
          <a href="" class="uk-icon-button uk-margin-small-right" uk-totop uk-scroll></a>
        </div>
      </transition>

      <div class="uk-container uk-container-center uk-text-center">
        <form class="uk-form-stacked">
          <div class="uk-margin">
            <div class="uk-text-center">
              <ul class="grid pad-ul">
                <li>

                  <a href="" @click.prevent="showCartelera" class="uk-button uk-button-primary tm-button" v-on:click="setActive('todas')" :class="{ active: isActive('todas') }">
                    Todas
                  </a>







                <!--  <a href="" @click.prevent="showCartelera" class="uk-button uk-button-primary tm-button all-button" v-on:click="setActive('todas')" :class="{ active: isActive('todas') }">
                    Todas
                  </a>

                  <a href="" @click.prevent="showCartelera" class="uk-button uk-button-primary tm-button" v-bind:style = "categoria_estilo" v-on:mouseover = "categoria_change_color" v-on:mouseout = "categoria_original_color">
                    Todas
                  </a>-->



                </li>
                <li v-for="(item, index) in categorias"
                  :key="index">
                    <a href="" @click.prevent="showPorCategoria(item.area)" class="uk-button uk-button-primary tm-button" v-on:click="setActive(item.area)" :class="{ active: isActive(item.area) }">
                      {{ item.area }} <span class="uk-badge badge-background">{{ item.ocurrence }}</span>
                    </a>

                </li>

                <!--<li v-for="(item, index) in categorias"
                  :key="index">
                    <a href="" @click.prevent="showPorCategoria(item.area)" class="uk-button uk-button-primary tm-button" :style="{ background: item.color + '!important' }" v-on:click="setActive(item.area)" :class="{ active: isActive(item.area) }">
                      {{ item.area }} <span class="uk-badge badge-background" :style="{ color: item.color + '!important' }">{{ item.ocurrence }}</span>
                    </a>

                    <a href="" @click.prevent="showPorCategoria(item.area)" class="uk-button uk-button-primary tm-button" v-bind:style = "categoria_estilo" v-on:mouseover = "categoria_change_color" v-on:mouseout = "categoria_original_color">
                      {{ item.area }} <span class="uk-badge badge-background" :style="{ color: item.color + '!important' }">{{ item.ocurrence }}</span>
                    </a>



                </li>-->
              </ul>
            </div>
          </div>
        </form>

        <form class="uk-form-stacked">
          <div class="uk-margin">
            <!--<label class="uk-form-label uk-text-large" for="form-stacked-text">Encuentra tu actividad preferida:</label>-->
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
                :key="index"
                >
                  <card-right v-if="(index % 2) === 0" :actividad="item"></card-right>
                  <card-left v-else :actividad="item"></card-left>
                </div>
              </div>

              <div class="pad-top">
                <div v-if="cartelera_boton">
                  <button class="uk-button-x uk-button-secondary uk-button-large" @click.prevent="cargarCartelera">Cargar más actividades</button>
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
                  <button class="uk-button-x uk-button-secondary uk-button-large" @click.prevent="cargarCarteleraBusqueda">Cargar más actividades</button>
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
                >
                  <card-right v-if="(index % 2) === 0" :actividad="item"></card-right>
                  <card-left v-else :actividad="item"></card-left>
                </div>
              </div>

              <div class="pad-top">
                <div v-if="por_categoria_boton">
                  <button class="uk-button-x uk-button-secondary uk-button-large" @click.prevent="cargarPorCategoria(por_categoria[0].area)">Cargar más actividades</button>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <!--<p class="uk-text-small uk-text-muted uk-text-left">{{filtered_porcategoria_total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in filtered_busqueda_porcategoria"
                :key="index"
                @click.prevent="goToActividad(item)">
                  <card-right v-if="(index % 2) === 0" :actividad="item" class="cursor"></card-right>
                  <card-left v-else :actividad="item" class="cursor"></card-left>
                </div>
              </div>-->
            <p class="uk-text-small uk-text-muted uk-text-left">{{filtered_porcategoria_total}} actividades encontradas.</p>
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m"
                v-for="(item, index) in filtered_busqueda_porcategoria"
                :key="index"
                >
                  <card-right v-if="(index % 2) === 0" :actividad="item"></card-right>
                  <card-left v-else :actividad="item"></card-left>
                </div>
              </div>
              
              <div class="pad-top">
                <div v-if="porcategoria_boton_filtered">
                  <button class="uk-button-x uk-button-secondary uk-button-large" @click.prevent="cargarPorCategoriaBusqueda">Cargar más actividades</button>
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
      show: false,
      activeItem: 'todas',
      /*nose: {
        color: "red !important"
      }*/
      /*categoria_estilo : {
        color:"#333 !important",
        background: "transparent !important",
        border: "1px solid #333 !important"
      },*/
      /*estilo : {
        color:"red !important",
        background: "transparent !important",
        border: "1px solid red !important"
      } ,*/

      //nose: ''
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
    handleScroll (event) {
      if(window.scrollY > 300){
        this.show = true
        //console.log("Pasaste la posicion 300 del scroll" + window.scrollY);
      }else{
        this.show = false;
      }
      //console.log("Pasaste la posicion 300 del scroll" + window.scrollY);
    },
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
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem
      //this.nose.color = "green !important"
      /*this.estilo.background = "#333 !important";
      this.estilo.color = "white !important";*/
    },
    /*categoria_change_color : function() {
      this.categoria_estilo.background = "#333 !important";
      this.categoria_estilo.color = "white !important";
      this.categoria_estilo.border = "1px solid white !important";
    },
    categoria_original_color : function() {
      this.categoria_estilo.background = "transparent !important";
      this.categoria_estilo.color = "#333 !important";
      this.categoria_estilo.border = "1px solid #333 !important";
    }*/
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
    padding: 0 20px;
    
    font-size: 14px;

    /*font-size: 24px;*/
    line-height: 42px;
    /*text-align: center;
    text-decoration: none;
    transition: .1s ease-in-out;
    transition-property: color,background-color,background-position,border-color,box-shadow;
    background-origin: border-box;*/
    border-radius: 500px;
    letter-spacing: 1px !important;
    transition: .1s ease-in-out;
    transition-property: color,background-color,border-color,box-shadow;

 background: #a0a0a0 !important;
    color: #fafafa !important;

/*background: transparent !important;
    color: #a0a0a0 !important;
    border: 1px solid #a0a0a0 !important;*/

    /*background: transparent !important;
    color: #333 !important;
    border: 1px solid #333 !important;

    transition: .1s ease-in-out;
    transition-property: color,background-color,border-color,box-shadow;*/

  /*border-radius: 500px; 
  font-weight: bold;
  font-size: 150%;*/


}
.tm-button span.badge-background {
  background: #fafafa !important;
  color: #a0a0a0 !important;

  /*background: #a0a0a0 !important;
  color: #fafafa !important;*/

  font-weight: bold;
  vertical-align: text-top;
  /*height: 24px;
  width: 24px;*/
}
.tm-button:hover {
background: #333 !important;
  color: white !important;
  border: 1px solid white !important;
    
      /*background: transparent !important;
  color: white !important;
  border: 1px solid white !important;*/

  transition: .1s ease-in-out;
  transition-property: color,background-color,border-color,box-shadow;

  /*border-radius: 500px; 
  font-weight: bold;
  font-size: 150%;*/


}
.tm-button:hover span.badge-background {
background: #fafafa !important;
  color: #333 !important;
    
      /*background: transparent !important;
  color: white !important;
  border: 1px solid white !important;*/

  transition: .1s ease-in-out;
  transition-property: color,background-color,border-color,box-shadow;

  /*border-radius: 500px; 
  font-weight: bold;
  font-size: 150%;*/


}

.tm-button.active {
  background: #333 !important;
  color: white !important;
  border: 1px solid white !important;
}

.tm-button.active span.badge-background {
background: #fafafa !important;
  color: #333 !important;
}

.badge-background {
  /*background: white !important;
  font-weight: bold;
  font-size: 100%;
  background: #a0a0a0 !important;
  font-weight: bold;*/
}
.all-button {
  background: #333 !important;
}
.uk-input:focus, .uk-select:focus, .uk-textarea:focus {
    border-color: #19b868 !important;
}
/*
.active{
  background-color:red;
}ejemplo*/

.icon-bar {
  position: fixed;
  /*top: 50%;*/
  bottom: 10%;
  /*-webkit-transform: translateY(-10%);
  -ms-transform: translateY(-10%);
  transform: translateY(-10%);*/
  z-index: 6;
  /*margin-left: 20px;*/
      right: 20px;
}

.icon-bar a {
  /*display: block;
  text-align: center;
  padding: 40px;*/
  transition: all 0.3s ease;
  /*color: white;*/
  font-size: 20px;
      background-color: #333;
    color: #fff;
}

.icon-bar a:hover {

      background-color: #151515;

}
/*.icon-bar a:hover {
  background-color: #000;
}*/

/*.facebook {
  background: #3B5998;
  color: white;
}

.twitter {
  background: #55ACEE;
  color: white;
}

.google {
  background: #dd4b39;
  color: white;
}

.linkedin {
  background: #007bb5;
  color: white;
}*/
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
.uk-icon-button {
  width: 60px !important;
  height: 60px !important;
}
.estilo-nuevo {
  background: black !important;
}
.uk-button-x {
  margin: 0;
    border: none;
    overflow: visible;
    font: inherit;
    color: inherit;
    text-transform: none;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    -webkit-transition: .1s ease-in-out;
    transition: .1s ease-in-out;
    -webkit-transition-property: color,background-color,border-color;
    transition-property: color,background-color,border-color;

    /*margin: 0;
    border: none;
    overflow: visible;
    font: inherit;
    color: inherit;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 20px;
    vertical-align: middle;*/
    padding: 0 20px;
    font-size: 14px;
    line-height: 42px;
    /*text-align: center;
    text-decoration: none;
    transition: .1s ease-in-out;
    transition-property: color,background-color,background-position,border-color,box-shadow;
    background-origin: border-box;*/
    border-radius: 500px;
    letter-spacing: 1px !important;
}
.uk-button-secondary {
    background: #a0a0a0 !important;
    color: #fafafa !important;

    /*background-color: #333;*/
}
.uk-button-secondary:hover {
      background: #333 !important;
    color: #fafafa !important;
    /*background-color: #151515;*/
}
.pad-ul {
  padding-left: 0 !important;
}
.pad-nuevo {
  padding: 20px 0px !important;
}
</style>