<template>
  <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-card-hover parent" uk-grid
    :style="{ background: actividad.color_oscuro + '!important', 
              background: '-webkit-linear-gradient(top,' +actividad.color_claro+', '+actividad.color_opuesto+') !important',
              background: '-moz-linear-gradient(top,' +actividad.color_claro+', '+actividad.color_opuesto+') !important',
              background: 'linear-gradient(to bottom,' +actividad.color_claro+', '+actividad.color_opuesto+') !important' }">
    <div class="uk-card-media-left uk-cover-container">

        <!--<h4 class="ribbon">{{ actividad.cuanto_falta }}</h4>-->
<!--<div v-if="actividad.fecha_rango === fechahoy && actividad.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h4 class="ribbon tamaño-ribbon">Hoy<br> 11:00 a 19:00 hrs</h4>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h4 class="ribbon tamaño-ribbon">Hoy<br> 10:00 a 20:00 hrs</h4>
    </div>
</div>
<div v-else-if="actividad.fecha_rango !== fechahoy && actividad.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h4 class="ribbon tamaño-ribbon">{{ actividad.cuanto_moment }}<br> 11:00 a 19:00 hrs</h4>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h4 class="ribbon tamaño-ribbon">{{ actividad.cuanto_moment }}<br> 10:00 a 20:00 hrs</h4>
    </div>
</div>
  <div v-else>
    <h4 class="ribbon tamaño-ribbon">{{ actividad.cuanto_moment }}<br>{{actividad.horario}}</h4>
  </div>-->




                          <!--    <div v-if="actividad.horario === 'horario indefinido'">
                                <div v-if="dia === 'sabado'">
                                  <h4 class="ribbon tamaño-ribbon">Hoy<br> 11:00 a 19:00 hrs</h4>
                                </div>
                                <div v-else-if="dia === 'domingo'">
                                
                                </div>
                                <div v-else>
                                  <h4 class="ribbon tamaño-ribbon">Hoy<br> 10:00 a 20:00 hrs</h4>
                                </div>
                              </div>
                              <div v-else>
                                <h4 class="ribbon tamaño-ribbon">{{ actividad.cuanto_moment }}<br>{{actividad.horario}}</h4>
                              </div>-->

        <!--<h4 class="ribbon tamaño-ribbon">{{ actividad.cuanto_moment }}</h4>-->

          <img :src="actividad.thumbnail" alt="" class="img-tamaño-1"
            style="
              max-width: none;
              position: absolute;
              left: 53%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);
              z-index: 6;" >
          <canvas width="600" height="650" class="canvas-height"></canvas>
      </div>
      <div>
          <div class="uk-card-body uk-text-left">
            <!--<div class="uk-card-badge-left uk-label label-date" :style="{ fontWeight: 900 }">
              {{ actividad.cuanto_falta }}
            </div>-->
            <!--<div class="uk-card-badge uk-label" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
              {{ actividad.area }}
            </div>-->

            <div class="visible-note oculto-note">
              <!--<div class="date centro">
                 <span class="month">{{actividad.dia_semana}}</span>
                    <h1 class="day">{{actividad.fecha_inicio_formato_day}}</h1>
                    <span class="month">{{actividad.fecha_inicio_formato_month}}</span>
              </div>-->


<h1 class="titulo-1">{{actividad.area}}</h1>
<div v-if="actividad.fecha_rango === fechahoy && actividad.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h2 class="titulo-2">Hoy - 11:00 a 19:00 hrs</h2>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h2 class="titulo-2">Hoy - 10:00 a 20:00 hrs</h2>
    </div>
</div>
<div v-else-if="actividad.fecha_rango !== fechahoy && actividad.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h2 class="titulo-2">{{ actividad.cuanto_moment }} - 11:00 a 19:00 hrs</h2>
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h2 class="titulo-2">{{ actividad.cuanto_moment }} - 10:00 a 20:00 hrs</h2>
    </div>
</div>
  <div v-else>
    <h2 class="titulo-2">{{ actividad.cuanto_moment }} - {{actividad.horario}}</h2>
  </div>
<!--<h3 class="titulo-2">jj</h3>-->
<hr class="mar-20">
<h1 @click.prevent="goToActividad(actividad)" class="titulo-3 titulo cursor"> {{ actividad.nombre }}</h1>
<hr class="mar-20">
<h2 class="titulo-5">Entrada {{ actividad.entrada }}</h2>
<h2 class="ribbon titulo-4">{{actividad.donde}}</h2>   
<!--<h2 class="titulo-5">Entrada {{ actividad.entrada }}</h2>-->
<!--<h4 class="ribbon tamaño-ribbon">{{actividad.donde}}</h4>-->
              <!--<h3 @click.prevent="goToActividad(actividad)" class="uk-card-title sinmar titulo cursor"> {{ actividad.nombre }}</h3>-->
              <!--<h3 class="uk-card-title sinmar"> {{ actividad.nombre }}</h3>-->
              <!--<h3 class="uk-card-title sinmar"> {{ actividad.nombre }}</h3>-->
<!--              <div class="mar-badge estilo-ultimate" :style="{ 'border-right': '10px solid' + actividad.area_color }">

                <div class="uk-label mar-single-badge" :style="{ background: '#333 !important', fontWeight: 900 }">
                  Entrada {{actividad.entrada}}
                </div>
                <div class="uk-label mar-single-badge" :style="{ background: '#333 !important', fontWeight: 900 }">
                  <span uk-icon="icon: location"></span> {{actividad.donde}}
                </div>
              </div>-->
            </div>

            <div class="visible-movil oculto-movil">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-expand">


                  <h2 class="titulo-1m">{{actividad.area}}</h2>
<div v-if="actividad.fecha_rango === fechahoy && actividad.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h2 class="titulo-2m">Hoy - 11:00 a 19:00 hrs</h2>
  
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h2 class="titulo-2m">Hoy - 10:00 a 20:00 hrs</h2>
      
    </div>
</div>
<div v-else-if="actividad.fecha_rango !== fechahoy && actividad.horario === 'horario indefinido'">
  
    <div v-if="dia === 'sabado'">
      <h2 class="titulo-2m">{{ actividad.cuanto_moment }} - 11:00 a 19:00 hrs</h2>
     
    </div>
    <div v-else-if="dia === 'domingo'">
    </div>
    <div v-else>
      <h2 class="titulo-2m">{{ actividad.cuanto_moment }} - 10:00 a 20:00 hrs</h2>
      
    </div>
</div>
  <div v-else>
    <h2 class="titulo-2m">{{ actividad.cuanto_moment }} - {{actividad.horario}}</h2>
   
  </div>
<!--<h3 class="titulo-2">jj</h3>-->
<hr class="mar-20">
<h2 @click.prevent="goToActividad(actividad)" class="titulo-3m titulo cursor"> {{ actividad.nombre }}</h2>
<hr class="mar-20">
<h3 class="titulo-5m">Entrada {{ actividad.entrada }}</h3>
<h3 class="ribbon titulo-4m">{{actividad.donde}}</h3>   


                  <!--<h3 @click.prevent="goToActividad(actividad)" class="uk-card-title sinmar font-tamaño titulo cursor"> {{ actividad.nombre }}</h3>
                  -->
                  <!--<h3 class="uk-card-title sinmar font-tamaño"> {{ actividad.nombre }}</h3>-->
                  <!--<h3 class="uk-card-title sinmar font-tamaño"> {{ actividad.nombre }}</h3>-->
                </div>
                <!--<div class="uk-width-auto">
                  <div class="date">
                     <span class="month">{{actividad.dia_semana}}</span>
                    <h1 class="day">{{actividad.fecha_inicio_formato_day}}</h1>
                    <span class="month">{{actividad.fecha_inicio_formato_month}}</span>
                  </div>
                </div>-->
              </div>
             
            </div>  
            <!--<div class="mar-badge">
              <div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                <span uk-icon="icon: calendar"></span> {{actividad.cuanto_falta}}
              </div>
              <div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                {{actividad.entrada}}
              </div>
              <div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                <span uk-icon="icon: location"></span> {{actividad.lugar}}
              </div>
            </div>-->
            <!--<p class="uk-text-small uk-text-muted">
              Publicado el: {{actividad.fecha_publicacion}}
            </p>-->
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Slider',
  props: {
    actividad: {
      type: Object,
      required: true
    }
  },
      methods: {
    goToActividad (actividad) {
      this.$router.push({
        params: {
          id: actividad.slug,
          evento: actividad
        },
        name: 'Evento'
      })
    },
  },
      computed: {
    dia() {
      moment.locale('es')
      var dianombre = moment().format('dddd')
      return dianombre;
    },
        fechahoy() {
      moment.locale('es')
      var fechanombre = moment().format('DD/MM/YYYY')
      return fechanombre;
    },
  },
}
</script>

<style scoped>
canvas {
    max-width: max-content !important;
}
hr {
border-top-color: rgba(255,255,255,.5);
}
.titulo-1 {
  font-weight: 900;
  color: #333;
  margin: 20px 0px 0px 0px !important;
}
.titulo-2 {
  font-weight:lighter;
  color: #333;
  margin: 0 !important;
}
.titulo-3 {
  font-weight:700;
  color: white;
  margin: 30px 0px 30px 0px !important;
}
.titulo-4 {
  font-weight:900;
  color: white;
}
.titulo-5 {
  margin: 0px 0px 10px 0px !important;
  font-weight:lighter !important;
  color: white;
}


.titulo-1m {
  font-weight: 900;
  color: white;
  margin: 20px 0px 0px 0px !important;
}
.titulo-2m {
  color: white;

  font-weight:400;
  margin: 0 !important;
}
.titulo-3m {
  font-weight:700;
  color: white;
  margin: 30px 0px 30px 0px !important;
}
.titulo-4m {
  font-weight:900;
  color: white;
}
.titulo-5m {
  margin: 0px 0px 10px 0px !important;
  font-weight:400 !important;
  color: white;
}

/*@media only screen and (min-width: 1200px) {
  .cuadro {
    width: 1200px;
    margin: 0 auto;
  }
}*/
@media only screen and (max-width: 1199px) {
.uk-child-width-1-2\@s>* {
    height: 650px;
}
  .titulo-1 {
    /*font-size: calc(30px + 1vw);*/
    font-size: calc(24px + 1.5vw);
  }
    .titulo-2 {
    /*font-size: calc(20px + 1vw);*/
    font-size: calc(14px + 1.5vw);
  }
    .titulo-3 {
      /*12*/
    /*font-size: calc(30px + 1vw);*/
    font-size: calc(24px + 1.5vw);
        margin-top: calc(18px + 1vw) !important;
    margin-bottom: calc(18px + 1vw) !important;
  }
      .titulo-4 {
        /*font-size: calc(20px + 1vw);*/
    font-size: calc(14px + 1.5vw);
  }
  .titulo-5 {
        /*font-size: calc(20px + 1vw);*/
    font-size: calc(14px + 1.5vw);
  }

  .mar-20 {
    margin-top: calc(0px + 1vw) !important;
    margin-bottom: calc(0px + 1vw) !important;
  }
 
}
@media only screen and (max-width: 639px) {
  /*.uk-grid+.uk-grid-collapse, .uk-grid-collapse>.uk-grid-margin {
    /*height: -webkit-fill-available;*/
   /* height: 420px !important;
}*/
.uk-child-width-1-2\@s>* {
    height: 350px;
}
  .canvas-height {
  height: 420px !important;
}
.uk-card-body {
    padding: 4px 15px 4px 60px;;
}
.uk-grid-small>* {
    padding-left: 0px; 
}

  .titulo-1m {
    font-size: calc(20px + 1vw);
  }

    .titulo-2m {
    font-size: calc(20px + 1vw);
  }
    .titulo-3m {
    font-size: calc(20px + 1vw);
        margin-top: calc(18px + 1vw) !important;
    margin-bottom: calc(18px + 1vw) !important;
  }
      .titulo-4m {
    font-size: calc(10px + 1vw);
  }
  .titulo-5m {
    font-size: calc(10px + 1vw);
  }

  .mar-20 {
    margin-top: calc(0px + 1vw) !important;
    margin-bottom: calc(0px + 1vw) !important;
  }

  .estilo-slider-h1 {
    font-size: calc(12px + 2.5vw);
  }
  .estilo-slider-h4 {
    font-size: calc(14px + 0.5vw);
  }
  .mar-bottom {
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-20 {
    margin-top: calc(0px + 1vw) !important;
    margin-bottom: calc(0px + 1vw) !important;
  }
  .mar-30 {
    /*margin-top: calc(13px + 1vw) !important;
    margin-bottom: calc(13px + 1vw) !important;*/
    margin-top: calc(8px + 1vw) !important;
    margin-bottom: calc(8px + 1vw) !important;
  }
  .mar-top {
    margin-top: calc(0px + 1vw) !important;
  }
}

.titulo:hover {
  color: yellow;
}
.cursor {
    cursor:pointer;
}
.parent {
  overflow: hidden; /* required */
  /*width: 50%; /* for demo only */
  /*height: 250px /* some non-zero number */;
  /*margin: 25px auto; /* for demo only */
  /*border:1px solid grey; /* for demo only */
  /*position: relative; /* required  for demo*/
}

.ribbon {
  margin: 0;
  padding: 0;
  /*background: #19b868;*/
  background: #333;
  color:white;
  /*padding:1em 0;*/
  padding:8px 30px 8px 0px;
  /*position: absolute;*/
  position: absolute;

  /*top:0;
  left:0;*/
  /*transform: translateX(-30%) translateY(0%) rotate(315deg);*/
  transform-origin: top right;
  z-index: 5;
  font-weight: bold;

}
.ribbon:before,
.ribbon:after {
  content: '';
  position: absolute;
  top:0;
  margin: 0 -1px; /* tweak */
  width: 150%;
  height: 100%;
  /*background: #19b868;*/
  background: #333;
  /*box-shadow: 0 0 8px rgba(0,0,0,.3);*/
  
}
.ribbon:before {
  right:100%;
}

.ribbon:after {
  left:100%;
  
}


.label-date {
  background: #333 !important;
}
.uk-card-badge-left {
    position: absolute;
    top: 30px;
    left: 30px; 
    z-index: 1;
}
.mar-top {
  margin-top: 40px !important;
}
.date {
	display: block;
	width: 100px;
	height: 120px;
	/*margin: 40px 0px;*/
  margin: 40px 0px 20px 0px;
	background: #fff;
	text-align: center;
	font-family: 'Helvetica', sans-serif;
	position: relative;
}
.date .binds {
	position: absolute;
	height: 15px;
	width: 60px;
	background: transparent;
	border: 2px solid #999;
	border-width: 0 5px;
	top: -6px;
	left: 0;
	right: 0;
	margin: auto;
}
.date .month {
	background: #333;
	display: block;
	padding: 2px 0;
	color: #fff;
	font-size: 12px;
	font-weight: bold;
	/*border-bottom: 2px solid #333;
	box-shadow: inset 0 -1px 0 0 #666;*/
}
.date .day {
	display: block;
	margin: 0;
	padding: 10px 0;
	font-size: 48px;
	/*box-shadow: 0 0 3px #ccc;*/
    border-style: solid;
  border-width: 1px;
  border-color: #ccc;
	position: relative;
}
.date .day::after {
	content: '';
	display: block;
	height: 100%;
	width: 96%;
	position: absolute;
	top: 3px;
	left: 2%;
	z-index: -1;
    border-style: solid;
  border-width: 1px;
  border-color: #ccc;
	/*box-shadow: 0 0 3px #ccc;*/
}
.date .day::before {
	content: '';
	display: block;
	height: 100%;
	width: 90%;
	position: absolute;
	top: 6px;
	left: 5%;
	z-index: -1;
    border-style: solid;
  border-width: 1px;
  border-color: #ccc;
	/*box-shadow: 0 0 3px #ccc;*/
}
.sinmar {
  margin-top: 0px !important;
}
.oculto-note {
  display: none;
  visibility: hidden;
}
.visible-movil {
  display: block;
  visibility: visible;
}
@media only screen and (min-width: 640px) {
  .visible-note {
    display: block;
    visibility: visible;
  }
  .oculto-movil {
    display: none;
    visibility: hidden;
  }
}
.centro{
  margin-left: auto !important;
  margin-right: auto !important;
}
@media only screen and (max-width: 639px) {
  .img-tamaño-1 {
    /*width: 700px !important;*/
  }
    .date {
  margin: 20px 0px 20px 0px !important; 
}
}
@media only screen and (min-width: 640px) and (max-width: 959px) {
  .img-tamaño-1 {
    /*height: 750px !important;*/
  }
}
@media only screen and (min-width: 960px) {
  .img-tamaño-1 {
    /*height: 600px !important;*/
  }
}
.font-tamaño {
  font-size: 1.25rem !important;
}
.mar-badge {
  margin-top: 20px !important;
}
.mar-badge-2 {
  margin-top: 0px !important;
}
.mar-single-badge {
  margin: 2px !important;
  white-space: normal !important;
}

@media only screen and (max-width: 500px) {
  .tamaño-ribbon {
    font-size: 16px !important;
  }
}

.estilo-ultimate {
  background-color: #333 !important;
}
</style>