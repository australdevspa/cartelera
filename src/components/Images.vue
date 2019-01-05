<template>
  <img v-if="window.width > 959" :src="original" alt="" class="img-tamaño-1"
    style="
      max-width: none;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);" >

  <img v-else-if="window.width > 639 && window.width < 960" :src="original" alt="" class="img-tamaño-1"
    style="
      max-width: none;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);" >

  <img v-else-if="window.width < 640" :src="grid" alt="" class="img-tamaño-1"
    style="
      max-width: none;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);" >

  <!--<img v-if="window.width > 959" :src="shiet.original_size" alt="" class="img-tamaño-1"
    style="
      max-width: none;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);" >

  <img v-else-if="window.width > 639 && window.width < 960" :src="shiet.original_size" alt="" class="img-tamaño-1"
    style="
      max-width: none;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);" >

  <img v-else-if="window.width < 640" :src="shiet.grid_size" alt="" class="img-tamaño-1"
    style="
      max-width: none;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);" >-->

          <!--<img :src="shiet.original_size" alt="" class="img-tamaño-1"
            style="
              max-width: none;
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);" >-->

          <!--<img :src="shiet.grid_size" alt="" class="img-tamaño-1"
            style="
              max-width: none;
              position: absolute;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%,-50%);
              transform: translate(-50%,-50%);" >-->
    <!--<h1>{{shiet.id}}</h1>-->
    <!--<div v-if="actividad_translate.note_en !== null">                        
        <div v-if="estado_traduccion">

            <p class="uk-text-meta mar-p">{{ actividad.fecha_inicio_formato }}</p>

        </div>
    </div>-->
</template>

<script>
export default {
  name: 'Images',
    data() {
    return {
          window: {
      width: 0,
      height: 0
    }
    }
  },
  props: {
    shiet: {
      type: Object,
      required: true
    },
        original: {
      type: String,
      required: true
    },
        grid: {
      type: String,
      required: true
    }
  },
   created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
  /*props: {
    actividad: {
      type: Object,
      required: true
    },
    actividad_translate: {
      type: Object,
      required: true
    }
  }*/
}
</script>

<style scoped>

</style>