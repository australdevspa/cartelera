<template>
    <div v-if="actividad_translate.note_en !== null">                        
        <div v-if="estado_traduccion">
            <a href="" @click.prevent="espanol" class="text-translate a-translate">(Original Text)</a>
            <div class="mar-div">
                <p class="mar-p ">{{ actividad.fecha_inicio_formato }}</p>
                <p class="mar-p">{{ actividad.donde }}.</p>

                <p v-if="actividad.entrada ==='liberada' " class="mar-p">Free pass</p>
                <p v-else class="mar-p">Ticket {{actividad.entrada}}</p>
            </div>
            <div class="mar-div" v-if="actividad_translate.tts_en !== null">
                <aplayer :music="{
                        title: 'Audio',
                        artist: 'English',
                        src: ''+actividad_translate.tts_en,
                        pic: '../static/img/default/cover.jpg'
                    }"
                />
            </div>
            <!--<ul uk-accordion="multiple: true">
                <li>
                    <a class="uk-accordion-title" href="#">More Details</a>
                    <div class="uk-accordion-content">
                        <p class="uk-text-meta mar-p">Date: {{ actividad.fecha_inicio_formato }}.</p>
                        <p class="uk-text-meta mar-p">Hours: {{ actividad.horario }}.</p>
                        <p class="uk-text-meta mar-p">Price: free.</p>
                        <p class="uk-text-meta mar-p">Place: {{ actividad.donde }}.</p>
                    </div>
                </li>
            </ul>-->

            <!--<ul v-if="actividad_translate.url_audio_note_en !== null" uk-accordion="multiple: true">
                <li>
                    <a class="uk-accordion-title" href="#">Audios</a>
                    <div class="uk-accordion-content">
                        <aplayer :music="{
                                title: 'Title Audio',
                                artist: 'English',
                                src: ''+actividad_translate.url_audio_title_en,
                                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                            }"
                        />
                        <aplayer :music="{
                                title: 'Audio of the Activity',
                                artist: 'English',
                                src: ''+actividad_translate.url_audio_note_en,
                                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                            }"
                        />
                    </div>
                </li>
            </ul>-->
        </div>
        
        <div v-else>
            <a href="" @click.prevent="ingles" class="text-translate a-translate">(English Version)</a>
            <div class="mar-div">
                <p class="mar-p">{{ actividad.fecha_inicio_formato }}</p>
                <p class="mar-p">{{ actividad.donde }}</p>
                <p class="mar-p">Entrada {{ actividad.entrada }}</p>
            </div>
            <div class="mar-div" v-if="actividad_translate.tts_es !== null">
                <aplayer :music="{
                        title: 'Audio',
                        artist: 'Español',
                        src: ''+actividad_translate.tts_es,
                        pic: '../static/img/default/cover.jpg'
                    }"
                />
            </div>
            <!--<ul uk-accordion="multiple: true">
                <li>
                    <a class="uk-accordion-title" href="#">Más Detalles</a>
                    <div class="uk-accordion-content">
                        <p class="uk-text-meta mar-p">Fecha: {{ actividad.fecha_inicio_formato }}.</p>
                        <p class="uk-text-meta mar-p">Horario: {{ actividad.horario }}.</p>
                        <p class="uk-text-meta mar-p">Entrada: {{ actividad.entrada }}.</p>
                        <p class="uk-text-meta mar-p">Lugar: {{ actividad.donde }}.</p>
                    </div>
                </li>
            </ul>-->

            <!--<ul v-if="actividad_translate.url_audio_note_en !== null" uk-accordion="multiple: true">
                <li>
                    <a class="uk-accordion-title" href="#">Audios</a>
                    <div class="uk-accordion-content">
                        <aplayer :music="{
                                title: 'Audio del Título',
                                artist: 'Español',
                                src: ''+actividad_translate.url_audio_titulo_es,
                                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                            }"
                        />
                        <aplayer :music="{
                                title: 'Audio de la Actividad',
                                artist: 'Español',
                                src: ''+actividad_translate.url_audio_nota_es,
                                pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                            }"
                        />
                    </div>
                </li>
            </ul>-->
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
    }
  },
}
</script>

<style scoped>
.mar-p {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
  color: #333 !important;
}
/*.a-translate:link {
  color: #999 !important;
  text-decoration:none;
}
.a-translate:visited {
  color: #999 !important;
}
.a-translate:hover {
  color: #666 !important;
}
.a-translate:active {
  color: #666 !important;
}
.text-translate {
  color: #999 !important;
}*/
.a-translate:link {
  color: #666 !important;
  text-decoration:none;
}
.a-translate:visited {
  color: #666 !important;
}
.a-translate:hover {
  color: #333 !important;
}
.a-translate:active {
  color: #333 !important;
}
.text-translate {
  color: #666 !important;
}
.mar-div {
  margin-top: 15px !important;
  margin-bottom: 15px !important;
}
</style>