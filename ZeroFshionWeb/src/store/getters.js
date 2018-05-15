import state from './states'

const getters = {
  isLoadedTemp() {
    return state.isLoadedTemp;
  },
  templates() {
    return state.templates;
  }
}

export default getters;
