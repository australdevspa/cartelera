<template>
  <section>
    <div class="uk-section pad-nuevo">
      <div class="uk-container uk-container-center uk-text-center pad-top">
                    <ul class="uk-breadcrumb">
                <a href="javascript:window.history.back();" class="uk-button-x uk-button-secondary uk-button-large"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
                 <!--<button class="uk-button-x uk-button-secondary uk-button-large"><span uk-icon="chevron-left" class="bold-icon"></span>Volver atrás</button>-->
                <!--<li><router-link to="/cartelera" class="text-translate a-translate"><span uk-icon="chevron-left"></span>Volver atrás</router-link></li>-->
            </ul>
            
        <form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">
              Programación para hoy, {{fecha}} y las próximas 4 semanas.
            </label>
            <div class="ayuda"><div class="pintura-hoy"/>Actividades para hoy</div>
            <div class="ayuda"><div class="pintura-prox"/>Actividades próximas</div>
<div class="ayuda"><div class="pintura-sin"/>Sin actividades programadas</div>
          </div>
        </form>

        <!--<form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">Espacios</label>
          </div>
        </form>-->
        <div v-if="loading">
          <div class="pad-spinner uk-text-center">
            <div uk-spinner="ratio: 4"/>
          </div>
        </div>
        <div v-else>
           <div class="visible-note oculto-note">
         
         <div class="uk-child-width-expand@s uk-text-center" uk-grid >
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                                             <div class="uk-width-1@m"
                  v-for="(itemm, indexx) in ejemplo.hoy"
                  :key="indexx">

                <div
                  v-for="(item, index) in salas"
                  :key="index">
 <CardSala v-if="item.id === indexx"
                  :sala="item" class="uk-box-shadow-medium"></CardSala>
                  </div>
                 
                
                </div> 
                <!--<div class="uk-width-1@m"
                  v-for="(item, index) in salas.slice(0,this.mitad)"
                  :key="index">
                  <CardSala    :sala="item"></CardSala>
                </div>-->
              </div>
            </div>
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid> 
                                <div class="uk-width-1@m"
                  v-for="(itemm, indexx) in ejemplo.proximo"
                  :key="indexx">

                <div
                  v-for="(item, index) in salas"
                  :key="index">


<CardSala v-if="item.id === indexx" :sala="item" class="uk-box-shadow-medium"></CardSala>
             

 
                  </div>
                 
                
                </div> 
                <!--<div class="uk-width-1@m"
                  v-for="(item, index) in salas.slice(this.mitad,this.salas.length)"
                  :key="index">
                  <CardSala :sala="item" class="uk-box-shadow-medium"></CardSala>
                </div>-->
              </div>
            </div>
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1@m"
                  v-for="(itemm, indexx) in ejemplo.cero"
                  :key="indexx">

                <div
                  v-for="(item, index) in salas"
                  :key="index">
 <CardSalaVacia v-if="item.id === indexx"
                  :sala="item" class="uk-box-shadow-medium"></CardSalaVacia>
                  </div>
                 
                
                </div>
              </div>
            </div>
          </div>

            </div>

            <div class="visible-movil oculto-movil">
         
<div class="uk-child-width-expand@s uk-text-center" uk-grid >
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                                             <div class="uk-width-1@m"
                  v-for="(itemm, indexx) in ejemplo.hoy"
                  :key="indexx">

                <div
                  v-for="(item, index) in salas"
                  :key="index">
 <CardSala v-if="item.id === indexx"
                  :sala="item" class="uk-box-shadow-medium"></CardSala>
                  </div>
                 
                
                </div> 



                         <div class="uk-width-1@m"
                  v-for="(itemm, indexx) in ejemplo.proximo"
                  :key="indexx">

                <div
                  v-for="(item, index) in salas"
                  :key="index">


<CardSala v-if="item.id === indexx" :sala="item" class="uk-box-shadow-medium"></CardSala>
             

 
                  </div>
                 
                
                </div> 

                <!--<div class="uk-width-1@m"
                  v-for="(item, index) in salas.slice(0,this.mitad)"
                  :key="index">
                  <CardSala    :sala="item"></CardSala>
                </div>-->
              </div>
            </div>
            



            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1@m"
                  v-for="(itemm, indexx) in ejemplo.cero"
                  :key="indexx">

                <div
                  v-for="(item, index) in salas"
                  :key="index">
 <CardSalaVacia v-if="item.id === indexx"
                  :sala="item" class="uk-box-shadow-medium"></CardSalaVacia>
                  </div>
                 
                
                </div>
              </div>
            </div>
          </div>
          
            </div>  



          <div class="padCamaraButton">
            <button @click.prevent="onButtonClick" id="btn-search-devices" class="uk-button uk-button-secondary uk-button-large">Activar Scanner BLE</button>
            <!--<input type="text" id="">-->
          </div>

          <div class="padCamaraButton">
            <div v-if="show">
              <router-link :to="{ path: '/espacios'}" @click.native="estadoFalse" class="uk-button uk-button-secondary uk-button-large">Desactivar Scanner QR</router-link>
              <router-view></router-view>
            </div>
            <div v-else>
              <router-link v-scroll-to="'#abajo'" :to="{ path: '/espacios/camara'}" @click.native="estadoTrue" class="uk-button uk-button-secondary uk-button-large">Activar Scanner QR</router-link>
            </div>
          </div>

        </div>

        <div id="abajo"></div>
      </div>
    </div>
  </section>
</template>

<script>
import CardSala from '@/components/CardSala'
import CardSalaVacia from '@/components/CardSalaVacia'
import moment from 'moment';
import { onButtonClick }  from '@/services/main_ble'

export default {
  name: 'VisitaGuiadaView',
  components: {
    CardSala,
    CardSalaVacia,
  },
  data() {
    return {
      show: false,
      loading: true,
      /*dia: moment.locale("es").format('D'),
      mes: moment.locale("es").format('MMMM'),
      dianame: moment.locale("es").format('dddd'),*/
    }
  },
  created () {
    this.$store.dispatch('loadSalas')
    this.$store.dispatch('loadEjemplo')
    this.$store.dispatch('loadExposiciones')
          .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      })
  },
  computed: {
    fecha() {
      moment.locale('es')
      var dianombre = moment().format('dddd')
      var dianumero = moment().format('D')
      var mesnombre = moment().format('MMMM')
      return dianombre +" "+ dianumero +" de "+ mesnombre
    },
    salas() {
      return this.$store.state.salas;
    },
        ejemplo() {
      return this.$store.state.ejemplo;
    },
    filtro() {
        return this.$store.state.salas.filter((item) => item.id.includes("360"));
    },
    exposiciones() {
      return this.$store.state.exposiciones;
    },
    mitad() {
      var x = this.$store.state.salas.length%2;
      if(x == 0){
        return this.$store.state.salas.length/2;
      }else{
        var y = this.$store.state.salas.length;
        return (y/2)-0.5
      }
    },
  },
  methods: {
    estadoTrue () {
      this.show = true;
    },
    estadoFalse () {
      this.show = false;
    },
    find(id){
        
        for(var i = 0; i < salas.length; i++){
            if(salas.id === id){
       
                      return salas[i]    
               
            }
        }
    },
    onButtonClick
  }
}
</script>

<style scoped>
.ayuda {
    display: inline-block;
     margin: 0 5px 0 5px;
     color: #999;
}
.pintura-hoy {
  width: 16px;
    height: 16px;
    border-radius: 500px;
    background: #19b868;
    display: inline-block;
    margin: 0 5px 0 5px;
}
.pintura-prox {
   width: 16px;
    height: 16px;
    border-radius: 500px;
    background: rebeccapurple;
    display: inline-block;
    margin: 0 5px 0 5px;
}
.pintura-sin {
   width: 16px;
    height: 16px;
    border-radius: 500px;
    background: #faa05a;
    display: inline-block;
    margin: 0 5px 0 5px;
}
.pad-nuevo {
  padding: 0px 0px !important;
}
.pad-spinner {
  padding-top: 25%;
  padding-bottom: 25%;
}
.padCamaraButton{
  margin-top: 50px;
}
.uk-button-primary {
    background-color: #19b868;
    color: #fff !important;
    border: 1px solid transparent;
    background-image: linear-gradient(100deg,#A8DB5B 0,#19b868 35%,#4EC1B2 100%);
}
.uk-button {
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
.uk-button-primary:hover {
    background-color: #A8DB5B;
    color: #fff;
    border-color: transparent;
    background-image: linear-gradient(100deg,#76C602 0,#19b868 35%,#00A28E 100%);
    box-shadow: 0 8px 50px -6px rgba(84,84,120,.26);
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
    padding: 0 10px;
    font-size: 10px;
    line-height: 42px;
    /*text-align: center;
    text-decoration: none;
    transition: .1s ease-in-out;
    transition-property: color,background-color,background-position,border-color,box-shadow;
    background-origin: border-box;*/
    border-radius: 500px;
    letter-spacing: 1px !important;
}
.bold-icon {
    color: #fafafa !important;
}
.pad-top {
  padding-top: 30px !important;
  padding-bottom: 30px !important;
}

.oculto-note {
  display: none;
  visibility: hidden;
}
.visible-movil {
  display: block;
  visibility: visible;
}
@media only screen and (min-width: 1000px) {
  .visible-note {
    display: block;
    visibility: visible;
  }
  .oculto-movil {
    display: none;
    visibility: hidden;
  }
}
</style>