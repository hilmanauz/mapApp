<template>
<div>
  <div class="btn-wrapper d-flex justify-center">
    <v-btn
      @click="isDrawer= !isDrawer"
      tile 
      small
      color="white"
      width="10"
    >
      <v-icon large>{{mdiChevronUp}}</v-icon>
    </v-btn>
  </div>
    <v-navigation-drawer
      app
      bottom
      touchless
      hide-overlay
      v-model="isDrawer"
      height="auto"
    >
      <v-card class="d-flex pa-3">
        <div>
          <img height= "80" width= "80" class="rounded-lg mr-4"
          src="https://picsum.photos/id/11/500/300"
          >
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <span class="text-h5">Samsul</span> <v-chip text-color="white" small class="mx-2 text-body-2" color="green">Active</v-chip>
          </div>
          <span class="text-caption">Retail</span>
          <span class="text-caption">08122494495</span>
        </div>
      </v-card>
    </v-navigation-drawer>
</div>
</template>

<script>
import {mdiPlus, mdiChevronUp, mdiChevronDown} from '@mdi/js'
export default {
  data() {
    return {
      selectedToko: null,
      isDrawer: true,
      titleKategori: 'Kategori',
      titleMotor: 'Motoris',
      mdiChevronUp: mdiChevronUp,
      mdiChevronDown: mdiChevronDown,
      mdiPlus: mdiPlus
    }
  },
}
</script>

<style lang="scss" scoped>
  .btn-wrapper {
    position: fixed; 
    width: 100vw;
    bottom: 0; 
  }
</style>