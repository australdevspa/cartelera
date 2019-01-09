<template>

  <!--<div class="uk-card-headeruk-background-top-left uk-background-cover" :style="{ 'background': '    linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(0, 0, 0, 0.5)), url(' + sala.rutaimg + ')' }">-->
 
  
  <!--<div class="uk-card uk-card-default uk-card-body uk-background-blend-screen uk-background-primary uk-background-cover uk-height-small uk-panel uk-flex uk-flex-center uk-flex-middle" :style="{ 'background-image': 'url(' + sala.rutaimg + ')' }">-->
   <!--<div class="uk-card uk-card-default uk-card-body uk-background-top-left uk-background-cover" :style="{ 'background': '    linear-gradient( rgba(255, 0, 0, 0.45), rgba(255, 25, 184, 104) ), url(' + sala.rutaimg + ')' }">-->

    
<div class="uk-card uk-card-default">

      <div class="uk-card-header uk-background-cover uk-background-top-center border" :style="{ 'background': 'linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(200, 200, 200, 0.3)), url(' + sala.rutaimg + ')' }">
        
        <div class="uk-card-badge-left uk-label" :style="{ background: '#19b868 !important', fontWeight: 900 }">
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
                      <div class="uk-width-auto">
                                Hoy
            </div>
            <div class="uk-width-expand">
              No hay actividades, ni exposiciones programadas para esta sala.
            </div>

              <!--<div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
        <div class="uk-width-1-3@s">
          Hoy
        </div>
        <div class="uk-width-expand@s">
          No hay actividades, ni exposiciones programadas para esta sala.
        </div>
    </div>-->
            </div>
          </div>
      </div>
      <div v-else>

      <div class="pad-hoy" v-for="(it, index) in filtro_por_actividades"
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
      </div>

      </div>





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
import moment from 'moment';
moment.locale('es')

export default {
  name: 'CardSala',
  components: {
    CardHoy  
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
      /*ar: [],
      vas: "",
      nose: [],
      wena: []*/
    }
  },
  created () {
    //this.filtro_actividades = this.filtro_por_actividades
    for(var x in this.filtro_por_actividades){
      if(this.filtro_por_actividades[x].sala_id === this.sala.id){
        this.actividades_hoy.push(this.filtro_por_actividades[x])
        this.loading = false;
      }
      //if(x.id)
      //this.nose = this.ar[x].id;
    }
    for(var y in this.filtro_por_exposiciones){
      if(this.filtro_por_exposiciones[y].sala_id === this.sala.id){
        this.exposiciones_hoy.push(this.filtro_por_exposiciones[y])
        this.loading = false;
      }
      //if(x.id)
      //this.nose = this.ar[x].id;
    }
    /*this.loading = true
    this.$store.dispatch('loadDataCartelera')
      .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      })*/
  },
  computed: {
    filtro_por_actividades() {
      var fecha_hoy = moment().format('DD/MM/YYYY');
      return this.$store.state.data_cartelera.cartelera.filter((item) => item.fecha_rango.includes(fecha_hoy));
    },
    filtro_por_exposiciones() {
      var fecha_hoy = moment().format('DD/MM/YYYY');
      return this.$store.state.exposiciones.filter((item) => item.fecha_rango.includes(fecha_hoy));
    },
  },
  methods: {
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
        name: 'Expo'
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
  background-color: #19b868;
  padding: 30px;
  color: white;
  text-align: center;
  border-radius: 5px;
  /*border: solid 2px #f8f8f8;*/
      font-weight: 900;
}
.uk-card-badge-left {
    position: absolute;
    top: 30px;
    left: 30px; 
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
  font-size: 32px !important;
}
.border {
  border-bottom-color: black !important;
}
.uk-card-body {
  background: black;
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