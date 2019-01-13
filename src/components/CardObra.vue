<template>
    <div class="uk-card uk-card-default">
        <h1>holi</h1>
      <!--<div class="uk-card-header uk-background-cover uk-background-top-center border" :style="{ 'background': 'linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(200, 200, 200, 0.3)), url(' + sala.rutaimg + ')' }">
        
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
            <div class="uk-width-expand">
              Sin actividades o exposiciones programadas.
            </div>

              
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
    </div>-->
    </div>
</template>

<script>

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