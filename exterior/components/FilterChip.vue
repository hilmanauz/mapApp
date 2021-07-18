<template>
  <v-menu
    transition="slide-y-transition"
    bottom
    style="z-index:20!important;"
    :close-on-content-click="false"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-chip  v-bind="attrs" v-on="on">{{title}}<v-icon right>
        {{mdiChevronDown}}
      </v-icon></v-chip>
    </template>
    <v-list flat>
      <v-list-item-group
      multiple
      >
        <v-list-item v-for="(element, index) in item" :key="index">
          <v-checkbox
            v-model="selected"
            :label="element.nama"
            :value="element.id"
            hide-details
            @change="selectedFilter"
          ></v-checkbox>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import {mdiChevronDown} from '@mdi/js'
export default {
  data() {
    return {
      mdiChevronDown: mdiChevronDown,
      selected: []
    }
  },
  props: {
    item: {
      type: [Array, Object],
      default: [],
    },
    title: {
      type: [String],
      default: '',
    },
  },
  methods: {
    selectedFilter(item) {
      if(this.title === "Kategori") {
        this.$store.commit('SET_FILTER_KATEGORI', this.selected)
      } else {
        this.$store.commit('SET_FILTER_MOTOR', this.selected)
      }
      this.$store.dispatch('filterToko', {page : 1})
    }
  }
}
</script>

<style lang="scss" scoped>
.v-input--selection-controls {
  margin-top:0; 
}
</style>