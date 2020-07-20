import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import _ from 'lodash';

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
        let race = {...state.raceResults.Races}
        race = _.orderBy(
            race[0]?.Results, 
            function (obj) {
                console.log(parseInt(obj.position, 10));
                return parseInt(obj.position, 10);
            },
            ['asc']);
        return race;
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