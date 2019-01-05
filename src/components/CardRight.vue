<template>
  <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin uk-card-hover" uk-grid>
      <div class="uk-flex-last@s uk-card-media-right uk-cover-container">

        <div v-if="loading_detalles">
            <div class="uk-text-center">
                <div uk-spinner="ratio: 2" style="
              max-width: none;
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);"/>
            </div>
        </div>
        <div v-else>
          <div v-if="cover_original_size === null">
<img :src="actividad.thumbnail" alt="" class="img-tamaño-1"
            style="
              max-width: none;
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);" >
          </div>
           <div v-else>
            <Images :shiet="covers" :original="cover_original_size" :grid="cover_grid_size" class="cursor"></Images>
           </div>
        </div>

          <!--<img :src="actividad.thumbnail" alt="" class="img-tamaño-1"
            style="
              max-width: none;
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);" >-->
          <canvas width="600" height="300"></canvas>
      </div>
      <div>
          <div class="uk-card-body uk-text-left">
            <div class="uk-card-badge-left uk-label" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
              {{ actividad.area }}
            </div>
            <div class="uk-card-badge uk-label label-date" :style="{ fontWeight: 900 }">
              {{ actividad.cuanto_falta }}
            </div>

            <div class="visible-note oculto-note">
              <div class="date centro">
                <span class="month">{{actividad.dia_semana}}</span>
                <h1 class="day">{{actividad.fecha_inicio_formato_day}}</h1>
                <span class="month">{{actividad.fecha_inicio_formato_month}}</span>
              </div>
              <h3 class="uk-card-title sinmar"> {{ actividad.nombre }}</h3>
              <!--<h3 class="uk-card-title sinmar"> {{ actividad.nombre }}</h3>-->
              <div class="mar-badge">
                <!--<div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                    <span uk-icon="icon: calendar"></span> {{actividad.cuanto_falta}}
                </div>-->
                <div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                  Entrada {{actividad.entrada}}
                </div>
                <div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
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
                  <h3 class="uk-card-title sinmar font-tamaño"> {{ actividad.nombre }}</h3>
                  <!--<h3 class="uk-card-title sinmar font-tamaño"> {{ actividad.nombre }}</h3>-->
                </div>
              </div>
              <div class="mar-badge-2">
                <!--<div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                    <span uk-icon="icon: calendar"></span> {{actividad.cuanto_falta}}
                </div>-->
                <div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
                  Entrada {{actividad.entrada}}
                </div>
                <div class="uk-label mar-single-badge" :style="{ background: actividad.area_color + '!important', fontWeight: 900 }">
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
import Images from '@/components/Images'
export default {
  name: 'CardRight',
  components: {
    Images  
  },
  data() {
    return {
        loading_detalles: true,
        cover_id: '',
        cover_original_size: '',
        cover_grid_size: ''
    }
  },
  props: {
    actividad: {
      type: Object,
      required: true,
    }
  },
  created () {
    this.$store.dispatch('loadCovers', this.actividad.id)
                .then(response => {
                this.loading_detalles = false;
                this.cover_id = this.$store.state.covers[0].id;
                this.cover_original_size = this.$store.state.covers[0].original_size;
                this.cover_grid_size = this.$store.state.covers[0].grid_size;
            })
            .catch(error => {
                this.loading_detalles= true;
            })
       /* this.$store.dispatch('loadImagenes', '833')
            .then(response => {
                this.loading_detalles = false;
            })
            .catch(error => {
                this.loading_detalles= true;
            })*/
            this.$store.dispatch('loadCoversArray', this.actividad.id)
  },
  computed:
  {
    covers() {
      return this.$store.state.covers[0];
    },
        covers_array() {
      return this.$store.state.covers_array;
    }
  }
}
</script>

<style scoped>
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
	margin: 40px 0px;
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
/*@media only screen and (max-width: 639px) {
  .img-tamaño-1 {
    width: 700px !important;
  }
}*/
/*@media only screen and (min-width: 640px) and (max-width: 959px) {
  .img-tamaño-1 {
    height: 750px !important;
  }
}*/
@media only screen and (max-width: 639px) {
  .img-tamaño-1 {
    width: 600px !important;
  }
}
@media only screen and (min-width: 640px) and (max-width: 959px) {
  .img-tamaño-1 {
    height: 700px !important;
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
</style>