<template>
    <section>
        <div v-if="loading">
            <div class="pad-bottom uk-section-muted">
                <div uk-spinner="ratio: 4" class="uk-position-center uk-overlay" />
            </div>
        </div>

        <div v-else class="uk-container uk-container-center pad-top">
            <!--<div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom">{{expo.nombre}}</h3>
                            <p class="uk-text-meta uk-margin-remove-top">Publicado: {{expo.fecha_publicacion}} / Fecha inicio: {{expo.fecha_inicio_formato}}.</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body uk-text-center">{{expo.contenido}}</div>
                <div class="uk-card-footer">
                    <p class="uk-text-meta uk-margin-remove-top">Lugar: {{expo.lugar}}.</p>
                </div>
            </div>-->



            <div class="uk-card uk-card-default">

                <div v-if="traduction_original === true">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">

                                <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.nombre }}</h3>  
                                <div v-if="translate[0].note_en !== null">                      
                                    <div v-if="traduction_original">
                                        <a href="" @click.prevent="traducirEn" class="text-translate a-translate">(English Version)</a>
                                    </div>
                                    <div v-else>
                                        <a href="" @click.prevent="traducirEs" class="text-translate a-translate">(Original Text)</a>
                                    </div>
                                </div>



                                <!--<div class="uk-text-left" uk-grid>
                                    <div class="uk-width-expand@m">
                                        <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.nombre }}</h3>                        
                                        <div v-if="traduction_original">
                                            <a href="" @click.prevent="traducirEn" class="text-translate a-translate">(English Version)</a>
                                        </div>
                                        <div v-else>
                                            <a href="" @click.prevent="traducirEs" class="text-translate a-translate">(Original Text)</a>
                                        </div>
                                    </div>
                                    <div class="uk-width-1-6@m uk-text-right">
                                        <div class="audio-icon">
                                            <a href="" class="uk-icon-button" uk-icon="play-circle"></a>
                                        </div>
                                    </div>
                                </div>-->

                                <ul uk-accordion="multiple: true">
                                    <li>
                                        <a class="uk-accordion-title" href="#">Más Detalles</a>
                                        <div class="uk-accordion-content">
                                            <p class="uk-text-meta mar-p">Fecha: {{ evento.fecha_inicio_formato }}.</p>
                                            <p class="uk-text-meta mar-p">Horario: {{ evento.horario }}.</p>
                                            <p class="uk-text-meta mar-p">Entrada: {{ evento.entrada }}.</p>
                                            <p class="uk-text-meta mar-p">Lugar: {{ evento.donde }}.</p>
                                        </div>
                                    </li>
                                </ul>

                                <ul v-if="translate[0].url_audio_nota_es !== null" uk-accordion="multiple: true">
                                    <li>
                                        <a class="uk-accordion-title" href="#">Audios</a>
                                        <div class="uk-accordion-content">
                                            <aplayer
                                                :music="{
                                                    title: 'Audio del Título',
                                                    artist: 'Español',
                                                    src: ''+translate[0].url_audio_titulo_es,
                                                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                                                }"
                                            />
                                            <aplayer
                                                :music="{
                                                    title: 'Audio de la Actividad',
                                                    artist: 'Español',
                                                    src: ''+translate[0].url_audio_nota_es,
                                                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                                                }"
                                            />
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body uk-text-center video" v-html= evento.contenido></div>
                    <div class="uk-card-body uk-text-center">
                        <img :src="evento.thumbnail"/>
                    </div>
                    <!--<div class="uk-card-footer">
                        <p class="uk-text-meta uk-margin-remove-top">Lugar: {{ evento.lugar }}.</p>
                    </div>-->
                </div>




                <div v-if="traduction_original === false">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">

                                <h3 class="uk-card-title uk-margin-remove-bottom" v-html= translate[0].title_en></h3>
                                <div v-if="translate[0].note_en !== null">   
                                    <div v-if="traduction_original">
                                        <a href="" @click.prevent="traducirEn" class="text-translate a-translate">(Traducción al Inglés)</a>
                                    </div>
                                    <div v-else>
                                        <a href="" @click.prevent="traducirEs" class="text-translate a-translate">(Original Text)</a>
                                    </div>
                                </div>

                                <!--<div class="uk-text-left" uk-grid>
                                    <div class="uk-width-expand@m">
                                        <h3 class="uk-card-title uk-margin-remove-bottom" v-html= translate[0].title_en></h3>
                                        <div v-if="traduction_original">
                                            <a href="" @click.prevent="traducirEn" class="text-translate a-translate">(Traducción al Inglés)</a>
                                        </div>
                                        <div v-else>
                                            <a href="" @click.prevent="traducirEs" class="text-translate a-translate">(Original Text)</a>
                                        </div>
                                    </div>
                                        <div class="uk-width-1-6@m uk-text-right">
                                            <div class="audio-icon">
                                                <a href="" class="uk-icon-button" uk-icon="play-circle"></a>
                                            </div>
                                    </div>
                                </div>-->

                                <ul uk-accordion="multiple: true">
                                    <li>
                                        <a class="uk-accordion-title" href="#">More Details</a>
                                        <div class="uk-accordion-content">
                                            <p class="uk-text-meta mar-p">Date: {{ evento.fecha_inicio_formato }}.</p>
                                            <p class="uk-text-meta mar-p">Hours: {{ evento.horario }}.</p>
                                            <p class="uk-text-meta mar-p">Price: free.</p>
                                            <p class="uk-text-meta mar-p">Place: {{ evento.donde }}.</p>
                                        </div>
                                    </li>
                                </ul>

                                <ul v-if="translate[0].url_audio_note_en !== null" uk-accordion="multiple: true">
                                    <li>
                                        <a class="uk-accordion-title" href="#">Audios</a>
                                        <div class="uk-accordion-content">
                                            <aplayer
                                                :music="{
                                                    title: 'Title Audio',
                                                    artist: 'English',
                                                    src: ''+translate[0].url_audio_title_en,
                                                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                                                }"
                                            />
                                            <aplayer
                                                :music="{
                                                    title: 'Audio of the Activity',
                                                    artist: 'English',
                                                    src: ''+translate[0].url_audio_note_en,
                                                    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
                                                }"
                                            />
                                        </div>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body uk-text-center video" v-html= translate[0].note_en ></div>
                    <div class="uk-card-body uk-text-center">
                        <img :src="evento.thumbnail"/>
                    </div>
                    <!--<div class="uk-card-footer">
                        <div v-if="traduction_original">
                            <button class="uk-button uk-button-secondary" @click.prevent="traducirEn">Traducción al Inglés</button>
                        </div>
                        <div v-else>
                            <button class="uk-button uk-button-secondary" @click.prevent="traducirEs">Original Text</button>
                        </div>
                        <p class="uk-text-meta uk-margin-remove-top">Lugar: {{ evento.lugar }}.</p>
                    </div>-->
                </div>
            </div>



        </div>
    </section>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name: 'ExpoView',
  components: {
    Aplayer
  },
  data() {
    return {
        item: [],
        loading: false,
        traduction_original: true,
        show: false,


        //loading: false
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  created () {
    /*this.loading = true
      
    var str = window.location.pathname;
    var last = str.substring(str.lastIndexOf("/") + 1, str.length);
    this.$store.dispatch('loadExpo', last)
        .then(response => {
            this.loading = false
        })
        .catch(error => {
            this.loading = true
        })*/

    window.addEventListener('scroll', this.handleScroll);
    this.loading = true
    if(this.$route.params.evento === undefined){
        var str = window.location.pathname;
        var last = str.substring(str.lastIndexOf("/") + 1, str.length);
        this.$store.dispatch('loadExpo', last)
            .then(response => {
                this.loading = false
                this.$store.dispatch('loadTranslate', this.$store.state.expo[0].id)
            })
            .catch(error => {
                this.loading = true
            })
    }else{
        this.item = this.$route.params.evento;
        this.loading = false;
        this.$store.dispatch('loadTranslate', this.$route.params.evento.id)
    }
  },
  computed:
  {
    expo() {
        return this.$store.state.expo[0];
    },

        evento() {
        if(this.$route.params.evento === undefined){
            return this.$store.state.expo[0];
        }else{
            return this.item;
        }
    },
    /*evento() {
        return this.$route.params.evento
    }*/
    translate() {
        return this.$store.state.translate;
    },
  },
  methods: {

    traducirEn () {
        
      
            
        this.traduction_original = false
                this.audio_titulo = this.$store.state.translate[0].url_audio_title_en;
        this.audio_descripcion = this.$store.state.translate[0].url_audio_note_en;
            //$("#translated").html(traduction);
        
    },
    traducirEs () {
        this.traduction_original = true
                        this.audio_titulo = this.$store.state.translate[0].url_audio_titulo_es;
        this.audio_descripcion = this.$store.state.translate[0].url_audio_nota_es;
    }
  },
}
</script>

<style scoped>
.pad-top {
  margin-top: 30px !important;
  margin-bottom: 30px !important;
}
.pad-bottom {
  padding-bottom: 500px;
}
</style>
