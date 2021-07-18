<template>
  <div class="justify-end" :class="isDrawer ? 'open-drawer' : 'close-drawer'">
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
      touchless
      hide-overlay
      width="25%"
    >
      <div class="pt-3 px-5">
        <v-autocomplete
          class="mb-4"
          solo
          clearable
          v-model="selectedSearchItem"
          hide-no-data
          hide-details
          :items="allToko"
          item-text="nama"
          item-value="nama"
          label="Nama Toko"
          @input="searchItem"
        ></v-autocomplete>
        <FilterChip :item="kategori" :title="titleKategori"/>
        <FilterChip :item="motor" :title="titleMotor"/>
      </div>
      <div v-if="!searchToko.data && !filterToko.data">
        <ListOfCard :cards="paginationToko" @displayPopUp="displayPopUp"/>
      </div>
      <div v-else-if="searchToko.data && !filterToko.data">
        <ListOfCard :cards="searchToko" @displayPopUp="displayPopUp" :search="selectedSearchItem" />
      </div>
      <div v-else-if="filterToko.data && !searchToko.data">
        <ListOfCard :cards="filterToko" @displayPopUp="displayPopUp" />
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
      selectedSearchItem: null,
      isDrawer: true,
      titleKategori: 'Kategori',
      titleMotor: 'Motoris',
      mdiChevronRight: mdiChevronRight,
      mdiChevronLeft: mdiChevronLeft,
      mdiPlus: mdiPlus,
    }
  },
  methods: {
    displayPopUp(id) {
      this.$emit('displayPopUp', id)
    },
    searchItem() {
      const data = {
        search: this.selectedSearchItem,
        page: 1,
      }
      this.$store.dispatch('searchToko', data)
    }
  },
  computed: {
    ...mapState(['allToko', 'paginationToko', 'searchToko', 'filterToko', 'kategori', 'motor'])
  }
}
</script>

<style lang="scss" scoped>
.v-input--selection-controls {
  margin-top:0; 
}
.v-navigation-drawer {
  box-shadow: 0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12)!important;
  transition-duration: 0.1s;
}
.open-drawer {
  margin-right: 25%;
}

.close-drawer {
  margin-right: 1%;
}
</style>
