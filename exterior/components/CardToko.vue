<template>
  <div>
    <v-divider></v-divider>
    <v-list-item @click="goToMapCenter">
      <div class="card-list d-flex pa-2" style="width: 100%">
        <div>
          <img height= "100" width= "100" class="rounded-lg mr-4"
          src="https://picsum.photos/id/11/500/300"
          >
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <span class="text-h5">{{item.nama}}</span> <v-chip text-color="white" small class="mx-2 text-body-2" :color="item.status ? 'red' : 'green'">{{item.status ? 'inActive' : 'Active'}}</v-chip>
          </div>
          <span class="text-caption">{{item.Kategori.nama}}</span>
          <span class="text-caption">{{item.telp}}</span>
        </div>
      </div>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: [Array, Object],
      default: [],
    },
  },
  methods: {
    goToMapCenter() {
      this.$store.commit('SET_CENTER', [this.item.lat, this.item.long])
    }
  }
}
</script>

<style>

</style>