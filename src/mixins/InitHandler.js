import LoadingIndicator from '@/components/LoadingIndicator'

export default {
  components: { 
    LoadingIndicator 
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    async onInit (promise) {
      this.loading = true

      try {
        await promise

        this.$emit('success')
      } catch (error) {
        this.$emit('error', error)
      } finally {
        this.loading = false
      }
    }
  }
}
