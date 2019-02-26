<template>
  <section>
    <div class="uk-section espacios-pad">
      <div class="uk-container uk-container-center uk-text-center pad-evento">
        <ul class="uk-breadcrumb">
          <a href="javascript:window.history.back();" class="uk-button boton-secundario boton-pequeño"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
        </ul>
            
        <form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">
              Programación para hoy, {{fecha}} y las próximas 4 semanas.
            </label>
            <div class="simbologia"><div class="color-hoy"/>Actividades para hoy</div>
            <div class="simbologia"><div class="color-prox"/>Actividades próximas</div>
          </div>
        </form>

        <div v-if="loading">
          <div class="pad-spinner-view uk-text-center">
            <div uk-spinner="ratio: 4"/>
          </div>
        </div>
        <div v-else>
          <!--<div class="espacios-visible-note espacios-oculto-note">
            <div class="uk-child-width-expand@s uk-text-center" uk-grid >
              <div>
                <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                  <div class="uk-width-1@m"
                    v-for="(itemm, indexx) in programacion.hoy"
                    :key="indexx">
                    <div v-for="(item, index) in salas"
                      :key="index">
                      <CardSala v-if="item.id === indexx"
                        :sala="item" class="uk-box-shadow-medium"></CardSala>
                    </div>
                  </div> 
                </div>
              </div>
              <div>
                <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid> 
                  <div class="uk-width-1@m"
                    v-for="(itemm, indexx) in programacion.proximo"
                    :key="indexx">
                    <div v-for="(item, index) in salas"
                      :key="index">
                      <CardSalaProx v-if="item.id === indexx" :sala="item" class="uk-box-shadow-medium"></CardSalaProx>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>-->

          <!--<div class="espacios-visible-movil espacios-oculto-movil">   
            <div class="uk-child-width-expand@s uk-text-center" uk-grid >
              <div>
                <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                  <div class="uk-width-1@m"
                    v-for="(itemm, indexx) in programacion.hoy"
                    :key="indexx">
                    <div v-for="(item, index) in salas"
                      :key="index">
                      <CardSala v-if="item.id === indexx"
                        :sala="item" class="uk-box-shadow-medium"></CardSala>
                    </div>
                  </div> 
                  <div class="uk-width-1@m"
                    v-for="(itemm, indexx) in programacion.proximo"
                    :key="indexx">
                    <div v-for="(item, index) in salas"
                      :key="index">
                      <CardSalaProx v-if="item.id === indexx" :sala="item" class="uk-box-shadow-medium"></CardSalaProx>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->

          <div class="espacios-visible-note espacios-oculto-note">
            <div class="uk-child-width-expand@s uk-text-center" uk-grid >
              <div>
                <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                  <div class="uk-width-1@m" v-for="(item, index) in programacion.programa" :key="index">
                    <div v-for="(item_s, index_s) in salas" :key="index_s">
                      <Sala v-if="item_s.id === index && index%2 === 0" :sala="item_s" :programacion="item" class="uk-box-shadow-medium"></Sala>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid> 
                  <div class="uk-width-1@m" v-for="(item, index) in programacion.programa" :key="index">
                    <div v-for="(item_s, index_s) in salas" :key="index_s">
                      <Sala v-if="item_s.id === index && index%2 !== 0" :sala="item_s" :programacion="item" class="uk-box-shadow-medium"></Sala>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="espacios-visible-movil espacios-oculto-movil">  
            <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
              <div class="uk-width-1-2@m" v-for="(item, index) in programacion.programa" :key="index">
                <div v-for="(item_s, index_s) in salas" :key="index_s">
                  <Sala v-if="item_s.id === index" :sala="item_s" :programacion="item" class="uk-box-shadow-medium"></Sala>
                </div>
              </div>
            </div> 
          </div>


         

<!--<div class="visible-note oculto-note">
 <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m" v-for="(item, index) in programacion.programa" :key="index">
                  <div v-for="(item_s, index_s) in salas" :key="index_s">
                    <Sala v-if="item_s.id === index" :sala="item_s" :programacion="item" class="uk-box-shadow-medium"></Sala>
                  </div>
                </div>
              </div>
            </div>
      </div>

      <div class="visible-movil oculto-movil">
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m" v-for="(item, index) in programacion.programa" :key="index">
                  <div v-for="(item_s, index_s) in salas" :key="index_s">
                    <Sala v-if="item_s.id === index" :sala="item_s" :programacion="item" class="uk-box-shadow-medium"></Sala>
                  </div>
                </div>
              </div>
            </div>
      </div>-->

           <!-- <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1-2@m" v-for="(item, index) in programacion.programa" :key="index">
                  <div v-for="(item_s, index_s) in salas" :key="index_s">
                    <Sala v-if="item_s.id === index" :sala="item_s" :programacion="item" class="uk-box-shadow-medium"></Sala>
                  </div>
                </div>
              </div>
            </div>-->

          <!--<div class="espacios-pad-boton">
            <button @click.prevent="readBeacon" id="btn-search-devices" class="uk-button boton-secundario">Activar Scanner Beacon</button>
          </div>-->

          <div class="espacios-pad-boton">
            <div v-if="show">
              <router-link :to="{ path: '/espacios'}" @click.native="estadoFalse" class="uk-button boton-secundario">Desactivar Scanner QR</router-link>
              <router-view></router-view>
            </div>
            <div v-else>
              <router-link v-scroll-to="'#abajo'" :to="{ path: '/espacios/camara'}" @click.native="estadoTrue" class="uk-button boton-secundario">Activar Scanner QR</router-link>
            </div>
          </div>

        </div>
        <div id="abajo"></div>
      </div>
    </div>
  </section>
</template>

<script>
import Sala from '@/components/Sala'
//import CardSala from '@/components/CardSala'
//import CardSalaProx from '@/components/CardSalaProx'
const moment = require('moment');
require('moment/locale/es');
//import push from 'push.js'

export default {
  name: 'VisitaGuiadaView',
  components: {
    Sala,
    //CardSala,
    //CardSalaProx
  },
  data() {
    return {
      show: false,
      loading: true
    }
  },
  created () {
    this.$store.dispatch('loadSalas')
    this.$store.dispatch('loadProgramacion')
      .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      })
  },
  /*mounted(){
    document.addEventListener("DOMContentLoaded", function(){
      push.Permission.request();
    });
  },*/
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
    programacion() {
      return this.$store.state.programacion;
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
    /*readBeacon(){
      let options = {};
      options.acceptAllDevices = true

      console.log('Requesting Bluetooth Device...');
      console.log('with ' + JSON.stringify(options));
      navigator.bluetooth.requestDevice(options)
      .then(device => {
        console.log('> Name:             ' + device.name);
        console.log('> Id:               ' + device.id);
        console.log('> Connected:        ' + device.gatt.connected);

        for(var i = 0; i < this.salas.length; i++){
          if(device.name == salas[i].ble_id){
            this.notificacionName(device.name, device.id, salas[i].sala)
          }
        }
      })
      .catch(error => {
        console.log('Argh! ' + error);
      });
    },
    notificacionName(x,y,z){
      push.create("Titulo de la Notificación",
      {
        body: "El dispositivo "+x+", con id "+y+" pertenece a la sala "+z,
        icon: "",
        timeout: 15000,//5 segundos
        vibrate: [100, 100, 100],
        onClick: function(){
          alert('click en la notification');
        }
      });
    }*/
  }
}
</script>