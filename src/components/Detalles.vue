<template>
  <div v-if="actividad_translate.note_en !== null">                        
    <div v-if="estado_traduccion">
      <ul class="barra-botones">
        <li>
          <a href="" @click.prevent="espanol" class="boton-principal-pequeño">Original Text</a>
        </li>
      </ul>
      <div class="mar-div-detalles">
        <!--<p class="mar-p-detalles">{{ actividad.fecha_inicio_formato }}</p>-->
        <p class="mar-p-detalles">{{ actividad.fecha_rango }}</p>
        <p class="mar-p-detalles">{{ actividad.donde }}.</p>
        <p v-if="actividad.entrada ==='liberada' " class="mar-p-detalles">Free pass</p>
        <p v-else class="mar-p-detalles">Ticket {{actividad.entrada}}</p>
      </div>
      <div class="mar-div-detalles" v-if="actividad_translate.tts_en !== null">
        <aplayer :music="{  title: 'Audio',
                            artist: 'English',
                            src: ''+actividad_translate.tts_en,
                            pic: '../static/img/default/cover.jpg'}"/>
      </div>
      <ul class="barra-botones">
        <li>
          <a v-if="detalle.length !== 0" @click.prevent="goToObras(actividad, detalle)" class="boton-principal-pequeño">Artworks</a>
        </li>
        <li>
          <a v-if="detalle.length !== 0 && actividad_translate.video !== null" class="boton-principal-pequeño" href="#modal-media-video" uk-toggle>Video</a>
        </li>
      </ul>
    </div>
        
    <div v-else>
      <ul class="barra-botones">
        <li>
          <a href="" :detalle="detalle" @click.prevent="ingles" class="boton-principal-pequeño">English Version</a>
        </li>
      </ul>
      <div class="mar-div-detalles">
        <!--<p class="mar-p-detalles">{{ actividad.fecha_inicio_formato }}</p>-->
        <p class="mar-p-detalles">{{ actividad.fecha_rango }}</p>
        <p class="mar-p-detalles">{{ actividad.donde }}</p>
        <p class="mar-p-detalles">Entrada {{ actividad.entrada }}</p>
      </div>
      <div class="mar-div-detalles" v-if="actividad_translate.tts_es !== null">
          <aplayer :music="{  title: 'Audio',
                              artist: 'Español',
                              src: ''+actividad_translate.tts_es,
                              pic: '../static/img/default/cover.jpg'}"/>
      </div>
      <ul class="barra-botones">
        <li>
          <a v-if="detalle.length !== 0" @click.prevent="goToObras(actividad, detalle)" class="boton-principal-pequeño">Obras</a>
        </li>
        <li>
          <a v-if="detalle.length !== 0 && actividad_translate.video !== null" class="boton-principal-pequeño" href="#modal-media-video" uk-toggle>Video</a>
        </li>
      </ul>
    </div>

    <div id="modal-media-video" class="uk-flex-top" uk-modal>
      <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
        <button class="uk-modal-close-outside" type="button" uk-close></button>
        <video width="720" height="576" controls playsinline uk-video>
          <source :src="actividad_translate.video" type="video/mp4">
        </video>
      </div>
    </div>

  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name: 'Detalles',
  components: {
    Aplayer
  },
  props: {
    actividad: {
      type: Object,
      required: true
    },
    actividad_translate: {
      type: Object,
      required: true
    },
    detalle: {
      type: Object,
      required: true
    }
  },
  computed: {
    estado_traduccion() {
      return this.$store.state.estado_traduccion;
    }
  },
  methods: {
    ingles () {
      this.$store.dispatch('loadTrue')
    },
    espanol () {
      this.$store.dispatch('loadFalse')
    },
    goToObras (actividad, detail) {
      this.$router.push({
        params: {
          slug:actividad.slug,
          id: actividad.id,
          evento: actividad,
          detalle: detail
        },
        name: 'Obras'
      })
    },
  },
}
</script>