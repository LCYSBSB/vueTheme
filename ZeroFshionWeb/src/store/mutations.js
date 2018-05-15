import state from './states'

const mutations = {
  isLoadedTempMu(state, val) {
    state.isLoadedTemp = val;
  },
  templatesMu(state, val) {
    if (val) {
      state.templates = val;
    }
  },
}

export default mutations;
