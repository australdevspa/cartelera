<template>
  <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-card-hover parent" uk-grid>
     
      <div class="uk-flex-last@s uk-card-media-right uk-cover-container">

        <!--<h4 class="ribbon">{{ actividad.cuanto_falta }}</h4>-->
        <!--<h4 class="ribbon tamaño-ribbon">{{ actividad.cuanto_moment }}</h4>-->

        <div v-if="actividad.fecha_rango === fechahoy && actividad.horario === 'horario indefinido'">
  
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
  </div>


          <img :src="actividad.thumbnail" alt="" class="img-tamaño-1"
            style="
              max-width: none;
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);" >
          <canvas width="600" height="300"></canvas>
      </div>
      <div>
          <div class="uk-card-body uk-text-left">
            <div class="uk-card-badge-left uk-label" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
              {{ actividad.area }}
            </div>
            <!--<div class="uk-card-badge uk-label label-date" :style="{ fontWeight: 900 }">
              {{ actividad.cuanto_falta }}
            </div>-->

            <div class="visible-note oculto-note">
              <div class="date centro">
                <span class="month">{{actividad.dia_semana}}</span>
                <h1 class="day">{{actividad.fecha_inicio_formato_day}}</h1>
                <span class="month">{{actividad.fecha_inicio_formato_month}}</span>
              </div>
              <h3 @click.prevent="goToActividad(actividad)" class="uk-card-title sinmar titulo cursor"> {{ actividad.nombre }}</h3>
              <!--<h3 class="uk-card-title sinmar"> {{ actividad.nombre }}</h3>-->
              <div class="mar-badge estilo-ultimate" :style="{ 'border-left': '10px solid' + actividad.area_color }">
                <!--<div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                    <span uk-icon="icon: calendar"></span> {{actividad.cuanto_falta}}
                </div>-->
                <div class="uk-label mar-single-badge" :style="{ background: '#333 !important', fontWeight: 900 }">
                  Entrada {{actividad.entrada}}
                </div>
                <div class="uk-label mar-single-badge" :style="{ background: '#333 !important', fontWeight: 900 }">
                  <span uk-icon="icon: location"></span> {{actividad.donde}}
                </div>
              </div>
            </div>

            <div class="visible-movil oculto-movil">
              <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                  <div class="date">
                    <span class="month">{{actividad.dia_semana}}</span>
                    <h1 class="day">{{actividad.fecha_inicio_formato_day}}</h1>
                    <span class="month">{{actividad.fecha_inicio_formato_month}}</span>
                  </div>
                </div>
                <div class="uk-width-expand">
                  <h3 @click.prevent="goToActividad(actividad)" class="uk-card-title sinmar font-tamaño titulo cursor"> {{ actividad.nombre }}</h3>
                  
                  <!--<h3 class="uk-card-title sinmar font-tamaño"> {{ actividad.nombre }}</h3>-->
                  <!--<h3 class="uk-card-title sinmar font-tamaño"> {{ actividad.nombre }}</h3>-->
                </div>
              </div>
              <div class="mar-badge-2 estilo-ultimate" :style="{ 'border-left': '10px solid' + actividad.area_color }">
                <!--<div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                    <span uk-icon="icon: calendar"></span> {{actividad.cuanto_falta}}
                </div>-->
                <div class="uk-label mar-single-badge" :style="{ background: '#333 !important', fontWeight: 900 }">
                  Entrada {{actividad.entrada}}
                </div>
                <div class="uk-label mar-single-badge" :style="{ background: '#333 !important', fontWeight: 900 }">
                  <span uk-icon="icon: location"></span> {{actividad.donde}}
                </div>
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
            </div>
            <!--<p class="uk-text-small uk-text-muted">
              Publicado el: {{actividad.fecha_publicacion}}
            </p>-->
        </div>
   

  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CardRight',
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
.titulo:hover {
  color: #19b868;
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
  background: #19b868;
  color:white;
  /*padding:1em 0;*/
  padding:5px;
  position: absolute;
  top:0;
  right:0;
  transform: translateX(30%) translateY(0%) rotate(45deg);
  transform-origin: top left;
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
  background: #19b868;
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
	box-shadow: inset 0 -1px 0 0 #666;
  box-shadow: 0 0 3px #555;*/
    /*border-style: solid;
  border-width: 3px;
  border-color: #555;*/
}
.date .day {
	display: block;
	margin: 0;
	padding: 10px 0;
	font-size: 45px;
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
	/*box-shadow: 0 0 3px #ccc;*/
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
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
    width: 700px !important;
  }
  .date {
  margin: 20px 0px 20px 0px !important; 
}
}
@media only screen and (min-width: 640px) and (max-width: 959px) {
  .img-tamaño-1 {
    height: 750px !important;
  }
}
@media only screen and (min-width: 960px) {
  .img-tamaño-1 {
    height: 600px !important;
  }
}
.font-tamaño {
  font-size: 1.25rem !important;
}
.mar-badge {
  margin-top: 20px !important;
}
.mar-badge-2 {
  margin-top: 20px !important;
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