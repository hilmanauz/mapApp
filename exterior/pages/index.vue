<template>
  <div id="map-wrap" style="height: 100vh" v-if="allToko.length !== 0">
  <client-only>
    <l-map :zoom=17 :center="center" style="position: fixed!important;">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- <l-marker :lat-lng="[-6.137483, 106.863139]">
        <l-icon
          :icon-size="dynamicSize"
          :icon-anchor="dynamicAnchor"
          icon-url="https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png"
        />
      </l-marker> -->
      <div v-for="(item,index) in allToko" :key="index">
        <l-marker :lat-lng="[item.lat, item.long]"></l-marker>
      </div>
    </l-map>
  </client-only>
    <NavigationDrawer/>
    <v-btn
      class="add-btn"
      color="blue darken-2"
      dark
      fab
      @click.stop="isDialog = true"
    >
    <v-icon large>{{mdiPlus}}</v-icon>
    </v-btn>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="isDialog"
    >
      <v-card class="pa-5 text-center">
        <span class="text-h4 font-weight-bold">Form Lokasi</span>
         <v-form
            ref="form"
            lazy-validation
          >
          <div class="d-flex">
            <v-switch
              class="ml-3"
              inset
              v-model="isActive"
              :messages="isActive ? 'Active' : 'inActive'"
            ></v-switch>
            <v-text-field
              v-model="name"
              :counter="25"
              label="Nama Toko"
              :rules="wordsRules"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="lat"
            :rules="latLongRules"
            label="Lattitude"
          ></v-text-field>
          <v-text-field
            v-model="long"
            :rules="latLongRules"
            label="Longitude"
          ></v-text-field>
          <v-text-field
            v-model="phone"
            :rules="numericRules"
            label="No. Telp"
          ></v-text-field>
          <v-select
            v-model="selectedCategory"
            :items="kategori"
            item-text="nama"
            item-value="id"
            :rules="inputRules"
            label="Kategori Toko"
          ></v-select>
          <v-select
            v-model="selectedMotor"
            :items="motor"
            item-text="nama"
            item-value="id"
            :rules="inputRules"
            label="Motoris"
          ></v-select>

          <v-btn
            class="mr-4"
            @click="submit"
            color="primary"
            x-large
            width="250"
          >
            submit
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import {mdiPlus} from '@mdi/js'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        mdiPlus: mdiPlus,
        name: '',
        wordsRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 25) || 'Name must be less than 25 characters'],
        selectedCategory: '',
        selectedMotor: '',
        inputRules: [v => v.length !== 0 || 'Select can not be empty'],
        lat: null,
        long: null,
        phone: null,
        latLongRules: [v => !isNaN(parseFloat(v)) || 'Input Must be A number'],
        numericRules: [v => !isNaN(Number(v)) || 'Input Must be A number'],
        isDialog: false,
        isActive: false,
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
      submit () {
        if(this.$refs.form.validate()){
          const data = {
            nama: this.name,
            kategoriId: this.selectedCategory,
            motorId: this.selectedMotor,
            lat: this.lat,
            long: this.long,
            telp: this.phone,
            status: this.isActive ? 0 : 1
          }
          this.$store.dispatch('apiCreateToko', data)
          this.clear()
        }
      },
      clear () {
        this.name = ''
        this.lat = null
        this.long = null
        this.phone =null
        this.isActive = false
        this.selectedCategoy = ''
        this.selectedMotor = ''
        this.isDialog= false
      },
    },
    created() {
      this.$store.dispatch('apiFirstCreated')
    }
  }
</script>
<style lang="scss" scoped>
.add-btn {
  position: absolute;
  bottom: 0;
  margin: 30px;
}
</style>