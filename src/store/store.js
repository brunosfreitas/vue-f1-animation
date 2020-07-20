import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import getConstructorExtraInfo from "./helpers";
// import _ from 'lodash';
// import { getConstructorExtraInfo } from './helpers';

Vue.use(Vuex);
Vue.use(VueAxios, axios);


Vue.axios.defaults.baseURL = "https://ergast.com/api/f1/current/last/results.json";

export default new Vuex.Store({
  state: {
    raceResults: []
  },
  getters: {
    raceInfo: state => { 
        let race = {...state.raceResults.Races};
        return race[0];
    },
    racePodium: state => {
        let podium = {...state.raceResults?.Races}
        podium = podium[0]?.Results;

        // adding aditional construtor info
        let enhancedPodium = podium?.map(el => 
          {
              const aditionalInfo = getConstructorExtraInfo(el.Constructor.constructorId);
              el.Constructor = ({...el.Constructor, ...aditionalInfo})
              return el;
              // const Constructor = el.Constructor;
          }
        )
        return enhancedPodium;
    }
  },
  actions: {
    loadUsers({commit}) {
      Vue.axios.get('').then(result => {
        commit('SAVE_RACE_RESULT', result.data.MRData.RaceTable);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    }
  },
  mutations: {
    SAVE_RACE_RESULT(state, result) {
      state.raceResults = result;
    }
  }
})