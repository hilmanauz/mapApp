<template>
  <div>
    <v-divider></v-divider>
    <v-list-item @click="goToMapCenter">
      <div class="card-list d-flex pa-2" style="width: 100%">
        <div>
          <img height= "100" width= "100" class="rounded-lg mr-4"
          src="https://cdn.bodybigsize.com/wp-content/uploads/2020/03/noimage.png"
          >
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex align-center">
            <span class="grey--text text-h6 pr-2">#{{item.id}}</span>
            <span class="font-weight-medium" :class="item.nama.length < 15 ? 'text-h6' : 'text-h7' ">{{item.nama}}</span>
          </div>
          <div class="d-flex align-center">
            <v-icon small>{{mdiLabelVariantOutline }}</v-icon><span class="align-bot text-caption"> {{item.Kategori.nama}}</span> <v-chip x-small label outlined class="mx-2 text-caption" :color="item.status ? 'red' : 'green'">{{item.status ? 'inActive' : 'Active'}}</v-chip>
          </div>
          <div class="d-flex align-center">
            <v-icon small>{{mdiPhone}}</v-icon><span class="align-bot text-caption"> {{item.telp ? item.telp : 'Not Available'}}</span>
          </div>
          <div class="d-flex align-center">
            <v-icon small>{{mdiUpdate}}</v-icon><span class="align-bot text-caption">{{viewUpdatedAt(item.updatedAt)}}</span>
          </div>
        </div>
      </div>
    </v-list-item>
  </div>
</template>

<script>
import {mdiPhone, mdiLabelVariantOutline, mdiUpdate } from '@mdi/js'
export default {
  data() {
    return {
      mdiPhone: mdiPhone,
      mdiUpdate: mdiUpdate,
      mdiLabelVariantOutline : mdiLabelVariantOutline , 
    }
  },
  props: {
    item: {
      type: [Array, Object],
      default: [],
    },
  },
  methods: {
    goToMapCenter() {
      this.$store.commit('SET_CENTER', [this.item.lat, this.item.long])
    },
    viewUpdatedAt(item) {
      const splitData = item.split('T')
      let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      let data = new Date(splitData)
      let month = monthShortNames[data.getMonth()]
      let date = data.getDate()
      let year = data.getFullYear()
      let time = data.toString().split(year)[1].split("GMT")[0]

      let dateUX = `${date} ${month} ${year} at ${time}`

      return `${dateUX}`
    },
  }
}
</script>

<style lang="scss" scoped>
.align-bot {
  margin-left: 5px;
  vertical-align: text-bottom;
}
</style>