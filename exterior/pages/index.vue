<template>
  <div id="map-wrap" style="height: 100vh; width:100vw;" v-if="allToko.length !== 0">
  <client-only>
    <l-map :center="center" :zoom="zoom" class="" style="position: fixed!important;" :options="{ zoomControl: false }">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- <l-marker :lat-lng="[-6.137483, 106.863139]">
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          icon-url="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png"
        />
      </l-marker> -->
      <l-marker v-for="(item,index) in allToko" :key="index" :lat-lng="[item.lat, item.long]" ref="markersRef">
        <l-popup><a class="text-caption font-weight-medium" target="_blank" :href="item.mapUrl">{{item.nama}}</a></l-popup>
      </l-marker>
    </l-map>
  </client-only>
    <NavigationDrawerDesktop class="d-lg-flex d-none" @displayPopUp="displayPopUp"/>
    <FormToko :motor="motor" :kategori="kategori" class="d-lg-flex d-none" />
    <NavigationDrawerMobile class="d-flex d-lg-none"/>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      zoom: 17,
      markerObjects: null,
    }
  },

  computed: {
    ...mapState(['kategori', 'motor', 'allToko', 'center']),
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    }
  },

  methods: {
    goToMap(item) {
      console.log(item)
    },
    displayPopUp (id) {
      for (let markerObject of this.markerObjects) {
        markerObject.closePopup();
      }
      const selectedIndex = this.allToko.findIndex(toko => toko.id === id)
      this.markerObjects[selectedIndex].openPopup();
    }
  },

  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        if(this.allToko.length !== 0) {
          this.markerObjects = this.$refs.markersRef.map(ref => ref.mapObject);
        }
      });
    }, 2000);
  },

  created() {
    this.$store.dispatch('apiFirstCreated')
  }
}
</script>
<style lang="scss">
.v-main {
  padding: 0 !important;
}
.leaflet-container a {
  text-decoration: none;
  color: black;
}
</style>