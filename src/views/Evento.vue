<template>
    <section>
        <div v-if="loading">
            <div class="pad-bottom uk-section-muted">
                <div uk-spinner="ratio: 4" class="uk-position-center uk-overlay" />
            </div>
        </div>

        <div v-else class="uk-container uk-container-center pad-top">

                  <transition name="bounce">
        <div v-if="show" class="icon-bar">
          <a href="" class="uk-icon-button uk-margin-small-right" uk-totop uk-scroll></a>
        </div>
      </transition>

            <div class="uk-card uk-card-default">

                <div v-if="traduction_original === true">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-margin-remove-bottom">{{ evento.nombre }}</h3>
                                
                                <div v-if="traduction_original">
                                    <a href="" @click.prevent="traducirEn" class="text-translate a-translate">(Traducción al Inglés)</a>
                                </div>
                                <div v-else>
                                    <a href="" @click.prevent="traducirEs" class="text-translate a-translate">(Original Text)</a>
                                </div>

                                <ul uk-accordion="multiple: true">
                                    <li>
                                        <a class="uk-accordion-title" href="#">Más Detalles</a>
                                        <div class="uk-accordion-content">
                                            <p class="uk-text-meta mar-p">Fecha: {{ evento.fecha_inicio_formato }}.</p>
                                            <p class="uk-text-meta mar-p">Horario: {{ evento.horario }}.</p>
                                            <p class="uk-text-meta mar-p">Precio: {{ evento.entrada }}.</p>
                                            <p class="uk-text-meta mar-p">Lugar: {{ evento.lugar }}.</p>
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
                                
                                <div v-if="traduction_original">
                                    <a href="" @click.prevent="traducirEn" class="text-translate a-translate">(Traducción al Inglés)</a>
                                </div>
                                <div v-else>
                                    <a href="" @click.prevent="traducirEs" class="text-translate a-translate">(Original Text)</a>
                                </div>

                                <ul uk-accordion="multiple: true">
                                    <li>
                                        <a class="uk-accordion-title" href="#">More Details</a>
                                        <div class="uk-accordion-content">
                                            <p class="uk-text-meta mar-p">Date: {{ evento.fecha_inicio_formato }}.</p>
                                            <p class="uk-text-meta mar-p">Hours: {{ evento.horario }}.</p>
                                            <p class="uk-text-meta mar-p">Price: {{ evento.entrada }}.</p>
                                            <p class="uk-text-meta mar-p">Place: {{ evento.lugar }}.</p>
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
export default {
  name: 'EventoView',
  data() {
    return {
        item: [],
        loading: false,
        traduction_original: true,
        show: false,
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
    this.loading = true
    if(this.$route.params.evento === undefined){
        var str = window.location.pathname;
        var last = str.substring(str.lastIndexOf("/") + 1, str.length);
        this.$store.dispatch('loadEvento', last)
            .then(response => {
                this.loading = false
                this.$store.dispatch('loadTranslate', this.$store.state.evento[0].id)
            })
            .catch(error => {
                this.loading = true
            })
    }else{
        this.item = this.$route.params.evento;
        this.loading = false;
        this.$store.dispatch('loadTranslate', this.$route.params.evento.id)
    }
    //this.$store.dispatch('loaTra', evento.id)
    //this.evento = this.$route.params.id
  },
  computed:
  {
    evento() {
        if(this.$route.params.evento === undefined){
            return this.$store.state.evento[0];
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
    handleScroll (event) {
      if(window.scrollY > 300){
        this.show = true
        //console.log("Pasaste la posicion 300 del scroll" + window.scrollY);
      }else{
        this.show = false;
      }
      //console.log("Pasaste la posicion 300 del scroll" + window.scrollY);
    },
    traducirEn () {
        
      
            
        this.traduction_original = false
            //$("#translated").html(traduction);
        
    },
    traducirEs () {
        this.traduction_original = true
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
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
.video >>> iframe {
  max-width: 100% !important;
  max-height: 100% !important;
}
.datos {
    margin-top: 5px;
}
.mar-p {
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}
.a-translate:link {
  color: #999 !important; /*#999 -> white*/
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
}
.icon-bar {
  position: fixed;
  /*top: 50%;*/
  bottom: 10%;
  /*-webkit-transform: translateY(-10%);
  -ms-transform: translateY(-10%);
  transform: translateY(-10%);*/
  z-index: 3;
  margin-left: 20px;
}

.icon-bar a {
  /*display: block;
  text-align: center;
  padding: 40px;*/
  transition: all 0.3s ease;
  /*color: white;*/
  font-size: 20px;
      background-color: #222;
    color: #fff;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-out .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(0);
  }
}
.uk-icon-button {
  width: 60px !important;
  height: 60px !important;
}
</style>
