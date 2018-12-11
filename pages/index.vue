<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        Linked References
      </h1>
      <h2 class="subtitle">
        A Decentralised References Management Application that built on top of 3Box
      </h2>
      <div class="links">
        <button
          class="btn button--green"
          @click="loginVia3Box"
        >Login via 3Box</button>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  mounted() {
    this.$store.dispatch('initialization')
  },
  methods: {
    loginVia3Box() {
      console.log(`login via 3box`)
      const onComplete = () => {
        console.log('On Complete')
        this.$router.push('/profile')
      }

      const onError = err => {
        console.error(`Error occurred, error message: ${err}`)
      }

      this.$store.dispatch('initializeBox', onComplete)
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
