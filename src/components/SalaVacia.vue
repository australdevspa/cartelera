<template>
  <div class="uk-card uk-card-default">
    <div class="uk-card-header uk-background-cover uk-background-top-center sala-border" :style="{ 'background': 'linear-gradient(to top, rgba(0, 0, 0, 1.0), rgba(200, 200, 200, 0.3)), url(' + sala.rutaimg + ')' }">
      <div v-if="sala.piso !== null" class="sala-badge uk-label" :style="{ background: '#19b868 !important', fontWeight: 900 }">
        Piso {{sala.piso}}
      </div>
      <div class="uk-grid-small uk-flex-middle" uk-grid>
        <div class="uk-width-expand sala-head">
          <h3 class="uk-card-title">{{sala.sala}}</h3>
          <p>{{sala.centro}}</p>
        </div>
      </div>
    </div>
    <div class="uk-card-body sala-body">
        <div class="card-vacio">
            <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
                <div class="uk-width-expand">
                    Sin actividades programadas para hoy.
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SalaVacia',
    props: {
        sala: {
            type: Object,
            required: true
        }
    },
}
</script>