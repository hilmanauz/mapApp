<template>
  <div>
    <v-list>
      <v-list-item-group
      v-model="selectedToko"
      :mandatory="selectedToko ? true : false"
      >
        <CardToko 
        v-for="(item, index) in cards.data"
        :key="index"
        :item="item" 
        @click.native="displayPopUp(item);"
        />
      </v-list-item-group>
    </v-list>
    <v-pagination
      v-if="cards.length !== 1"
      v-model="currentPage"
      :length="cards.length"
      @input="goToPageListCard"
    ></v-pagination>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      selectedToko: null,
      currentPage: null,
    }
  },
  props: {
    cards: {
      type: [Array, Object],
      default: [],
    },
    search: {
      type: [String],
      default: '',
    }
  },
  computed: {
    ...mapState(['filterKategori', 'filterMotor'])
  },
  methods: {
    displayPopUp(item) {
      this.$emit('displayPopUp', item.id)
    },
    goToPageListCard(page) {
      this.selectedToko = null
      if(this.search) {
        const data = {
          page,
          search: this.search
        }
        this.$store.dispatch('searchToko', data)
      }
      if(this.filterKategori.length > 0 || this.filterMotor.length > 0) {
        this.$store.dispatch('filterToko', {page})
      }
      this.$store.dispatch('apiNextPage', page)
    }
  },
  updated() {
    this.currentPage = this.cards.currentPage
  }
}
</script>

<style>

</style>