<template>
<div>
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
          v-model="latLong"
          :rules="latLongRules"
          label="Lattitude-Langitude"
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
      inputRules: [v =>  !!v || 'Select can not be empty'],
      latLong: null,
      phone: null,
      latLongRules: [v => !isNaN(parseFloat(v)) || 'Input Must be A number'],
      numericRules: [v => !isNaN(Number(v)) || 'Input Must be A number'],
      isDialog: false,
      isActive: true,
    }
  },

  props: {
    kategori: {
      type: [Array, Object],
      default: [],
    },
    motor: {
      type: [Array, Object],
      default: [],
    },
  },

  methods: {
    submit () {
      if(this.$refs.form.validate()){
        const parseLatLong = this.latLong.split(',')
        const data = {
          nama: this.name,
          kategoriId: this.selectedCategory,
          motorId: this.selectedMotor,
          lat: parseLatLong[0],
          long: parseLatLong[1],
          telp: this.phone,
          status: this.isActive ? 0 : 1
        }
        this.$store.dispatch('apiCreateToko', data)
        this.clear()
      }
    },
    clear () {
      this.name = ''
      this.selectedCategory = ''
      this.selectedMotor = ''
      this.latLong = null
      this.phone = null
      this.isActive = false
      this.isDialog= false
      this.$refs.form.resetValidation()
    },
  }
}
</script>

<style lang="scss">
.add-btn {
  position: absolute;
  bottom: 0;
  margin: 30px;
}
</style>