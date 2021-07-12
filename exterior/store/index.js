export const state = () => ({
  isLoading: false,
  allToko: [],
  kategori: [],
  motor: [],
  center: [],
})

export const mutations = {
  SET_ALL_TOKO(state, payload) {state.allToko = payload},  
  SET_KATEGORI(state, payload) {state.kategori = payload}, 
  SET_CENTER(state, payload) {state.center = payload},
  SET_MOTOR(state, payload) {state.motor = payload},  
  SET_IS_LOADING(state, payload) {state.isLoading = payload},
}

export const actions = {
  async apiFirstCreated({commit}, payload) {
    try {
      commit('SET_IS_LOADING', true)
      const {data} = await this.$axios.get('/toko')
      commit('SET_ALL_TOKO', data[0])
      commit('SET_CENTER', [data[0][data[0].length-1].lat, data[0][data[0].length-1].long])
      commit('SET_KATEGORI', data[1])
      commit('SET_MOTOR', data[2])
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
  }
}