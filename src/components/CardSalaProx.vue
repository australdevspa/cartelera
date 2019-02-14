<template>

  <!--<div class="uk-card-headeruk-background-top-left uk-background-cover" :style="{ 'background': '    linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(0, 0, 0, 0.5)), url(' + sala.rutaimg + ')' }">-->
 
  
  <!--<div class="uk-card uk-card-default uk-card-body uk-background-blend-screen uk-background-primary uk-background-cover uk-height-small uk-panel uk-flex uk-flex-center uk-flex-middle" :style="{ 'background-image': 'url(' + sala.rutaimg + ')' }">-->
   <!--<div class="uk-card uk-card-default uk-card-body uk-background-top-left uk-background-cover" :style="{ 'background': '    linear-gradient( rgba(255, 0, 0, 0.45), rgba(255, 25, 184, 104) ), url(' + sala.rutaimg + ')' }">-->

    
<div class="uk-card uk-card-default">

      <div class="uk-card-header uk-background-cover uk-background-top-center border" :style="{ 'background': 'linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(200, 200, 200, 0.3)), url(' + sala.rutaimg + ')' }">
        
        <div v-if="sala.piso !== null" class="uk-card-badge-left uk-label" :style="{ background: '#19b868 !important', fontWeight: 900 }">
          Piso {{sala.piso}}
        </div>
        
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand margen">
                <h3 class="uk-card-title uk-margin-remove-bottom sala-estilo sala-titulo">{{sala.sala}}</h3>
                <p class="uk-margin-remove-top sala-estilo">{{sala.centro}}</p>
            </div>
        </div>
    </div>
    <div class="uk-card-body">  
      


      
      <div v-if="loading">
          <div class="carta-vacia">
            <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
              <div class="uk-width-expand">
                Sin actividades programadas.
              </div>
            </div>
          </div>
      </div>
      <div v-else>

      <!--<div class="pad-hoy" v-for="(it, index) in actividades_hoy"
        :key="index"
        >
        <div v-if="sala.id === it.sala_id">
          <CardHoy :carta="it"></CardHoy>
        </div>

      </div>

      <div class="pad-hoy"  v-for="(it, index) in exposiciones_hoy"
        :key="index"
        >
        <div v-if="sala.sala === it.sala">
          <CardHoyExpo :carta="it"></CardHoyExpo>
        </div>
      </div>

      <div class="pad-hoy" v-for="(it, index) in actividades_siguientes" 
        :key="index" 
        >
        <div v-if="sala.id === it.sala_id && index < 3">
          <CardProx :carta="it"></CardProx>
        
        </div>

      </div>-->




      <!--<div class="pad-hoy" v-for="(it, index) in cargar_actividades_hoy"
        :key="index"
        >
        <div v-if="sala.id === it.sala_id">
          <CardHoy :carta="it"></CardHoy>
        </div>

      </div>-->

      <div class="pad-hoy"  v-for="(it, index) in exposiciones_hoy"
        :key="index"
        >
        <div v-if="sala.sala === it.sala">
          <CardHoyExpo :carta="it"></CardHoyExpo>
        </div>
      </div>

      <div class="pad-hoy" v-for="(it, index) in cargar_actividades_prox" 
        :key="index" 
        >
        <div v-if="sala.id === it.sala_id && index < 4">
          <CardProx :carta="it"></CardProx>
        
        </div>

      </div>

      </div>






      
      <!--<div class="pad-hoy" v-for="(it, index) in filtro_por_actividades"
        :key="index"
        >
        <div v-if="sala.id === it.sala_id">
          <CardHoy :carta="it"></CardHoy>
        </div>

      </div>

      <div class="pad-hoy"  v-for="(it, index) in filtro_por_exposiciones"
        :key="index"
        >
        <div v-if="sala.sala === it.sala">
          <CardHoyExpo :carta="it"></CardHoyExpo>
        </div>
      </div>-->






    </div>
    <!--<div class="uk-card-footer">
        <a href="#" class="uk-button uk-button-text">Read more</a>
    </div>-->

  </div>


    <!--<div class="uk-card uk-card-default uk-card-body">
    <h2 class="uk-margin-remove-bottom">{{sala.sala}}</h2>
    <p class="uk-margin-remove-top">{{sala.centro}}</p>

    <div  v-for="(it, index) in filtro_por_actividades"
      :key="index"
      @click.prevent="goToActividad(it)">
      <div v-if="sala.id === it.sala_id">
        <CardHoy :carta="it" class="cursor"></CardHoy>
      </div>
    </div>

    <div  v-for="(it, index) in filtro_por_exposiciones"
      :key="index"
      @click.prevent="goToExpo(it)">
      <div v-if="sala.sala === it.sala">
        <CardHoy :carta="it" class="cursor"></CardHoy>
      </div>
    </div>
  </div>-->


</template>

<script>
import CardHoy from '@/components/CardHoy'
import CardHoyExpo from '@/components/CardHoyExpo'
import CardProx from '@/components/CardProx'
import moment from 'moment';
moment.locale('es')

export default {
  name: 'CardSalaProx',
  components: {
    CardHoy,
    CardProx,
    CardHoyExpo,  
  },
  props: {
    sala: {
      type: Object,
      required: true
    }
  },
   data() {
    return {
      show: false,
      loading: true,
      //filtro_actividades: [],
      //filtro_exposiciones: [],
      actividades_hoy: [],
      exposiciones_hoy: [],
      actividades_siguientes: [],
      contador: 0,
      /*ar: [],
      vas: "",
      nose: [],
      wena: []*/
    }
  },
  created () {
    this.wena();
    this.wena2();
    this.hoy_valid();
    this.prox_valid();
  },
  computed: {
    cargar_actividades_hoy(){
      for (var propiedad in this.$store.state.ejemplo.hoy) {
        if(propiedad === this.sala.id){
          //this.loading = false;
          return this.$store.state.ejemplo.hoy[this.sala.id].eventos
        }
  //var ejemplo = resultado.concat(this.$store.state.data_cartelera.categorias[propiedad].eventos)

  //resultado = ejemplo
}


    /*  if(this.$store.state.ejemplo.hoy[this.sala.id].eventos !== null)
       return this.$store.state.ejemplo.hoy[this.sala.id].eventos
      else*/
      return null
    },
        cargar_actividades_prox(){
                for (var propiedad in this.$store.state.ejemplo.proximo) {
        if(propiedad === this.sala.id){
          //this.loading = false;
          return this.$store.state.ejemplo.proximo[this.sala.id].eventos
        }
    }
      return null
    },

    filtro_por_actividades() {
      var fecha_hoy = moment().format('DD/MM/YYYY');
      return this.$store.state.data_cartelera.cartelera.filter((item) => item.fecha_rango.includes(fecha_hoy));
    },
    filtro_por_exposiciones() {
      var fecha_hoy = moment().format('DD/MM/YYYY');
      return this.$store.state.exposiciones.filter((item) => item.fecha_rango.includes(fecha_hoy));
    },
    filtro_por_actividades_siguientes() {
      return this.$store.state.data_cartelera.cartelera.filter((item) => item.w.includes("4 semanas"));
    },
    /*itemsLessThanTen: function() {
    return this.shoppingItems.filter(function(item) {
      return item.price > 10;
    })
  }*/
  },
  methods: {
    hoy_valid(){
      if (this.cargar_actividades_hoy !== null){
        this.loading = false;
      }
    },
    prox_valid(){
      if (this.cargar_actividades_prox !== null){
        this.loading = false;
      }
    },
    wena(){
    for(var x in this.filtro_por_actividades){
      if(this.filtro_por_actividades[x].sala_id === this.sala.id){
        this.actividades_hoy.push(this.filtro_por_actividades[x])
        this.loading = false;
      }
      //if(x.id)
      //this.nose = this.ar[x].id;
    }
    },
    wena2(){
   for(var w in this.filtro_por_actividades_siguientes){
      if(this.filtro_por_actividades_siguientes[w].sala_id === this.sala.id){
        this.actividades_siguientes.push(this.filtro_por_actividades_siguientes[w])
        this.loading = false;
      }
    }
    },
    suma(){
      this.contador= this.contador+1;
     }
    /*goToActividad (actividad) {
      this.$router.push({
        params: {
          id: actividad.slug,
          evento: actividad
        },
        name: 'Evento'
      })
    },
    goToExpo (expo) {
      this.$router.push({
        params: {
          id: expo.slug,
          evento: expo
        },
        name: 'Expo' xxx
      })
    }*/
  },
}
</script>

<style scoped>
.pad-hoy {
  padding: 2px !important; 
}
.carta-vacia {
  background-color: #faa05a;
  padding: 10px;
  color: white;
  text-align: center;
  border-radius: 5px;
  /*border: solid 2px #f8f8f8;*/
      font-weight: 900;
}
.uk-card-badge-left {
    position: absolute;
    top: 10px;
    left: 10px; 
    z-index: 1;
}
.uk-margin-remove-bottom {
    margin-bottom: 0!important;
}
.uk-margin-remove-top {
    margin-top: 0!important;
}
.margen {
  margin: 25px !important;
}
.sala-estilo {
  color: white !important;
  margin: 10px !important;
}
.sala-titulo {
  font-size: 24px !important;
}
.border {
  border-bottom-color: black !important;
}
.uk-card-body {
  background: black;
  padding: 10px !important;
}
/*.tinted-image {
  background: 
    /* top, transparent red, faked with gradient */ 
    /*linear-gradient(
      rgba(255, 0, 0, 0.45), 
      rgba(255, 0, 0, 0.45)
    ),*/
    /* bottom, image*/ 
   /* url(image.jpg);
}*/
</style>