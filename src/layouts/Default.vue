<template>
    <div class="default-layout">
        <div><slot name="contenido"></slot></div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'DefaultLayout',
  components: {
    Footer
  }
}
</script>
