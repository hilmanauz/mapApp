<template>
  <div style="z-index: 10; position: absolute; right:0;">
    <v-btn
      @click="isDrawer= !isDrawer"
      tile 
      small
      color="white"
      height="50"
      width="10"
    >
      <v-icon large>{{isDrawer ? mdiChevronRight : mdiChevronLeft}}</v-icon>
    </v-btn>
    <v-navigation-drawer 
      app
      v-model="isDrawer"
      right
      fixed
      width="400"
    >
      <div class="pa-3 px-5">
        <v-autocomplete
          class="mb-4"
          hide-no-data
          hide-details
          label="Nama Toko"
        ></v-autocomplete>
        <FilterChip :item="kategori" :title="titleKategori"/>
        <FilterChip :item="motor" :title="titleMotor"/>
      </div>
      <div>
        <v-list>
          <v-list-item-group
          v-model="selectedToko"
          :mandatory="selectedToko ? true : false"
          >
            <CardToko 
            v-for="(item, index) in allToko"
            :key="index"
            :item="item" />
          </v-list-item-group>
        </v-list>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mdiPlus, mdiChevronRight, mdiChevronLeft} from '@mdi/js'
export default {
  data() {
    return {
      selectedToko: null,
      isDrawer: true,
      titleKategori: 'Kategori',
      titleMotor: 'Motoris',
      mdiChevronRight: mdiChevronRight,
      mdiChevronLeft: mdiChevronLeft,
      mdiPlus: mdiPlus
    }
  },
  computed: {
    ...mapState(['allToko', 'kategori', 'motor'])
  }
}
</script>

<style lang="scss" scoped>
.v-input--selection-controls {
  margin-top:0; 
}
</style>
