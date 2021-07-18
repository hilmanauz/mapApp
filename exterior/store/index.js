export const state = () => ({
  isLoading: false,
  allToko: [],
  filterToko: [],
  paginationToko: [],
  searchToko: [],
  kategori: [],
  motor: [],
  center: [],
  filterKategori: [],
  filterMotor: []
})

export const mutations = {
  SET_ALL_TOKO(state, payload) {state.allToko = payload},  
  SET_PAGINATION_TOKO(state, payload) {state.paginationToko = payload},  
  SET_FILTER_TOKO(state, payload) {state.filterToko = payload},  
  SET_FILTER_KATEGORI(state, payload) {state.filterKategori = payload},  
  SET_FILTER_MOTOR(state, payload) {state.filterMotor = payload},  
  SET_SEARCH_TOKO(state, payload) {state.searchToko = payload},  
  SET_KATEGORI(state, payload) {state.kategori = payload}, 
  SET_MOTOR(state, payload) {state.motor = payload},  
  SET_CENTER(state, payload) {state.center = payload},
  SET_IS_LOADING(state, payload) {state.isLoading = payload},
}

export const actions = {
  async apiFirstCreated({commit}, payload) {
    try {
      commit('SET_IS_LOADING', true)
      const dataPaginationToko = await this.$axios.get('/toko/1')
      const dataToko = await this.$axios.get('/toko')
      const dataMotor = await this.$axios.get('/motor')
      const dataKategori = await this.$axios.get('/kategori')
      commit('SET_PAGINATION_TOKO', dataPaginationToko.data)
      commit('SET_ALL_TOKO', dataToko.data)
      commit('SET_CENTER', [dataToko.data[0].lat, dataToko.data[0].long])
      commit('SET_KATEGORI', dataKategori.data)
      commit('SET_MOTOR', dataMotor.data)
      commit('SET_IS_LOADING', false)
    } catch (error) {
      console.log(error)
    }
  },
  async apiCreateToko({commit, dispatch}, payload) {
    try {
      commit('SET_IS_LOADING', true)
      const {data} = await this.$axios.post('/toko', payload)
      console.log(data)
      dispatch('apiFirstCreated')
      commit('SET_IS_LOADING', false)
    } catch (error) {
      console.log(error)
    }
  },
  async apiNextPage({commit}, payload) {
    try {
      commit('SET_IS_LOADING', true)
      const dataPaginationToko = await this.$axios.get(`/toko/${payload}`)
      commit('SET_PAGINATION_TOKO', dataPaginationToko.data)
      commit('SET_IS_LOADING', false)
    } catch (error) {
      console.log(error)
    }
  },
  async searchToko({commit}, payload) {
    try {
      commit('SET_IS_LOADING', true)
      const {data} = await this.$axios.post(`/cariToko/${payload.page}`, payload)
      commit('SET_SEARCH_TOKO', data)
      commit('SET_IS_LOADING', false)
    } catch (error) {
      console.log(error)
    }
  },
  async filterToko({state, commit}, payload) {
    try {
      commit('SET_IS_LOADING', true)
      const filter = { 
        MotorId: state.filterMotor, 
        KategoriId: state.filterKategori
      }
      if(state.filterMotor.length || state.filterKategori.length) {
        let {data} = await this.$axios.post(`/filterToko/${payload.page}`, filter)
        commit('SET_FILTER_TOKO', data)
      } else {
        commit('SET_FILTER_TOKO', [])
      }
      commit('SET_IS_LOADING', false)
    } catch (error) {
      console.log(error)
    }
  }
}