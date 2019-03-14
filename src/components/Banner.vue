<template>
  <div class="banner">
    <div class="uk-container uk-container-center uk-text-center">
        <h2 class="banner-titulo">Explora nuestras salas <router-link to="/espacios/visitaguiada" class="boton-banner" aria-label="Explorar salas"><span class="uk-margin-small-right" uk-icon="arrow-right"></span></router-link></h2>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Banner'
  }
</script>