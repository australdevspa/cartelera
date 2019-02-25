<template>
  <section>
    <div class="uk-section pad-nuevo">
      <div class="uk-container uk-container-center uk-text-center pad-evento">
        <ul class="uk-breadcrumb">
          <a href="javascript:window.history.back();" class="uk-button-x uk-button-secondary uk-button-large"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
        </ul>
            
        <form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">
              Programación para hoy, {{fecha}} y las próximas 4 semanas.
            </label>
            <div class="ayuda"><div class="pintura-hoy"/>Actividades para hoy</div>
            <div class="ayuda"><div class="pintura-prox"/>Actividades próximas</div>
          </div>
        </form>

        <div v-if="loading">
          <div class="pad-spinner-view uk-text-center">
            <div uk-spinner="ratio: 4"/>
          </div>
        </div>
        <div v-else>
          <div class="visible-note oculto-note">
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
          </div>

          <div class="visible-movil oculto-movil">   
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
          </div>

          <!--<div class="padCamaraButton">
            <button @click.prevent="readBeacon" id="btn-search-devices" class="uk-button uk-button-secondary uk-button-large">Activar Scanner Beacon</button>
          </div>-->

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
import CardSalaProx from '@/components/CardSalaProx'
const moment = require('moment');
require('moment/locale/es');
//import push from 'push.js'

export default {
  name: 'VisitaGuiadaView',
  components: {
    CardSala,
    CardSalaProx
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
    padding: 0 20px;
    font-size: 14px;
    line-height: 42px;
    border-radius: 500px;
    letter-spacing: 1px !important;
}
.uk-button-secondary {
    background: #a0a0a0 !important;
    color: #fafafa !important;

}
.uk-button-secondary:hover {
      background: #333 !important;
    color: #fafafa !important;
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
    padding: 0 10px;
    font-size: 10px;
    line-height: 42px;
    border-radius: 500px;
    letter-spacing: 1px !important;
}
.bold-icon {
    color: #fafafa !important;
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