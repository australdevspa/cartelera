<template>
  <div class="default-layout">
          <div v-if="loading">
            <div class="uk-section-muted">
              <div uk-spinner="ratio: 4"/>
            </div>
          </div>
    <!--<div v-if="loading">
      <div uk-spinner="ratio: 4" class="uk-position-center uk-overlay" />
    </div>-->
    <div v-else><slot name="contenido"></slot></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'DefaultLayout',
  components: {
    Footer
  },
  data() {
    return {
      loading: false
    }
  },
  created () {
    this.loading = true
    this.$store.dispatch('loadAll')
      .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      })
    //this.$store.dispatch('loadAll')

    //this.loading = true
    /*this.$store.dispatch('loadCarousel')
      .then(response => {
        this.loading = false
      })
      .catch(error => {
        this.loading = true
      })*/
  },
  computed: {
    all() {
      return this.$store.state.all;
    }
  }
}
</script>
