<template>
  <section>
    
      <div class="uk-container uk-container-center uk-text-center pad-top">

        <div v-if="loading_detalles">
          <div class="pad-spinner uk-text-center">
            <div uk-spinner="ratio: 4"/>
          </div>
        </div>
        <div v-else>

            <ul class="uk-breadcrumb">
                <a href="javascript:window.history.back();" class="uk-button-x uk-button-secondary uk-button-large"><span uk-icon="chevron-left" class="bold-icon"></span> Volver atrás</a>
                 <!--<button class="uk-button-x uk-button-secondary uk-button-large"><span uk-icon="chevron-left" class="bold-icon"></span>Volver atrás</button>-->
                <!--<li><router-link to="/cartelera" class="text-translate a-translate"><span uk-icon="chevron-left"></span>Volver atrás</router-link></li>-->
            </ul>

        <form class="uk-form-stacked ">
          <div class="uk-margin">
            <label class="uk-form-label uk-text-large">
              Listado de Obras
            </label>
          </div>
        </form>

       
            <div class="pad-top">
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div 
                v-for="(item, index) in evento"
                :key="index"
                >
                  <div class="uk-alert-success" uk-alert>
                    <h3 class="obra-titulo cursor" @click.prevent="goToObra(item)">{{item.titulo}}</h3>
                      <p>{{item.descripcion}}</p>
                  </div>                
                
                </div>
              </div>
            </div>

        <!--<div v-if="loading">
          <div class="pad-spinner uk-text-center">
            <div uk-spinner="ratio: 4"/>
          </div>
        </div>
        <div v-else>
          <div class="uk-child-width-expand@s uk-text-center" uk-grid >
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1@m"
                  v-for="(item, index) in salas.slice(0,this.mitad)"
                  :key="index">
                  <CardSala :sala="item"></CardSala>
                </div>
              </div>
            </div>
            <div>
              <div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>  
                <div class="uk-width-1@m"
                  v-for="(item, index) in salas.slice(this.mitad,this.salas.length)"
                  :key="index">
                  <CardSala :sala="item" class="uk-box-shadow-medium"></CardSala>
                </div>
              </div>
            </div>
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

        <div id="abajo"></div>-->
        </div>
      </div>
    
  </section>
</template>

<script>
import CardObra from '@/components/CardObra'

export default {
  name: 'ObrasView',
    components: {
    CardObra,
  },
data() {
    return {
        loading_detalles: true,
        item: [],
        nose: [],
        /*loading_evento: true,
        loading_boton_obras: true,*/
    }
  },
  created () {
    //this.$store.dispatch('loadFalse')
    if(this.$route.params.detalle === undefined){
        /*cuando se recarga la url*/
        var str = window.location.pathname;

        var url = str.split( '/' );
        var detalle = url[ url.length - 1 ]
        var slug = url[ url.length - 2 ] 
/*console.log( url[ url.length - 1 ] ); // 2
console.log( url[ url.length - 2 ] );*/

        //var last = str.substring(str.lastIndexOf("/") + 1, str.length);
        this.$store.dispatch('loadEvento', slug)
            .then(response => {
                //this.loading_evento = false;

                this.$store.dispatch('loadDetalle', this.$store.state.evento[0].id)
                    .then(response => {
                      
                        this.loading_detalles = false;
                    })
                    .catch(error => {
                        this.loading_detalles= true;
                    })

                /*this.$store.dispatch('loadTranslate', this.$store.state.evento[0].id)
                    .then(response => {
                        this.loading_detalles = false;
                    })
                    .catch(error => {
                        this.loading_detalles= true;
                    })*/
            })
            .catch(error => {
                this.loading_detalles = true;
            })  
    }else{
        /*cuando viene desde la cartelera*/
        this.item = this.$route.params.detalle;
        this.loading_detalles = false;
        /*this.loading_evento = false;

        this.$store.dispatch('loadDetalle', this.$route.params.evento.id)
            .then(response => {
                this.loading_boton_obras = false;
            })
            .catch(error => {
                this.loading_boton_obras= true;
            })

        this.$store.dispatch('loadTranslate', this.$route.params.evento.id)
            .then(response => {
                this.loading_detalles = false;
            })
            .catch(error => {
                this.loading_detalles= true;
            })*/
    }
  },
  computed:
  {
    evento() {
        if(this.$route.params.detalle === undefined){
            //return this.$store.state.evento[0];
            return this.$store.state.detalle;
        }else{
            return this.item;
        }
    },
    /*detalle() {
return this.$store.state.detalle;
    }*/
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
.cursor {
    cursor:pointer;
}
.obra-titulo:hover {
    color: #19b868 !important;
}
.uk-alert-success {
  color: #333 !important;
  background-color: white !important;
  text-align: justify !important;
  box-shadow: 0 2px 10px 0 rgba(30,30,30,.09);
}
.pad-nuevo {
  padding: 20px 0px !important;
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
</style>