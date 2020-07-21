import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import getConstructorExtraInfo from "./helpers";
// import _ from 'lodash';

Vue.use(Vuex);
Vue.use(VueAxios, axios);


Vue.axios.defaults.baseURL = "https://ergast.com/api/f1/current/last/results.json";

export default new Vuex.Store({
  state: {
    raceResults: [],
    viewRacersByGridPosition: false
  },
  getters: {
    raceInfo: state => { 
        let race = {...state.raceResults.Races};
        return race[0];
    },
    racePodium: state => {
        let podium = {...state.raceResults?.Races}
        return podium[0]?.Results;
    }
  },
  actions: {
    loadUsers({commit}) {
      Vue.axios.get('').then(result => {
        commit('SAVE_RACE_RESULT', result.data.MRData.RaceTable);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    swapRaceOrdering({commit}) {
      commit('SWAP_RACER_ORDERING');
    }
  },
  mutations: {
    SAVE_RACE_RESULT(state, result) {
      let raceResults = result;
      let enhancedPodium = [];

      try {
        // get race key
        let podium = {...raceResults?.Races};
        podium = podium[0]?.Results;

        // adding aditional construtor info
        enhancedPodium = podium?.map(el => 
        {
            const aditionalInfo = getConstructorExtraInfo(el.Constructor.constructorId);
            el.Constructor = ({...el.Constructor, ...aditionalInfo})
            return el;
        })

        // adding it back to main object
        raceResults.Races[0].Results = enhancedPodium;

      }catch(e){
        console.log(e);
      }

      state.raceResults = raceResults;
    },
    SWAP_RACER_ORDERING(state) {
      state.viewRacersByGridPosition = !state.viewRacersByGridPosition;
    }
  }
})