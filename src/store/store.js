import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import getConstructorExtraInfo from "./helpers";
// import _ from 'lodash';

Vue.use(Vuex);
Vue.use(VueAxios, axios);


Vue.axios.defaults.baseURL = "https://ergast.com/api/f1/current/last/results.json";
const URL_SEASON_LISTING = "https://ergast.com/api/f1/current.json";
const URL_DRIVER_STANDINGS = "https://ergast.com/api/f1/current/driverStandings.json";
const URL_RACE_RESULT_FIRST = "https://ergast.com/api/f1/current/";
const URL_RACE_RESULT_LAST = "/results.json";

export default new Vuex.Store({
  state: {
    seasonInfo: [],
    raceResults: [],
    driverStandings: [],
    viewRacersByGridPosition: false,
    lastRoundOfSeason: 0,
    currentRaceOnDisplay: 0
  },
  getters: {
    seasonInfo: state => { 
      return state.seasonInfo;
    },
    raceInfo: state => { 
        let race = {...state.raceResults[state.currentRaceOnDisplay]?.Races};
        return race[0];
    },
    lastRaceInfo: state => { 
      let race = {...state.raceResults[state.lastRoundOfSeason]?.Races};
      return race[0];
    },
    driverStandings: state => {
      return state.driverStandings;
    },
    racePodium: state => {
        let podium = {...state.raceResults[state.currentRaceOnDisplay]?.Races}
        return podium[0]?.Results;
    },
    lastRoundOfSeason: state => { 
      return state.lastRoundOfSeason;
    }
  },
  actions: {
    // Load current season info
    loadSeasonInfo({commit}) {
      Vue.axios.get(URL_SEASON_LISTING).then(result => {
        commit('INIT_SAVE_SEASON_INFO', result.data.MRData.RaceTable);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    // Load last race details
    loadCurrentRaceInfo({commit}) {
      Vue.axios.get('').then(result => {
        commit('INIT_SAVE_LAST_ROUND_OF_SEASON', result.data.MRData.RaceTable.round);
        commit('SAVE_RACE_RESULT', result.data.MRData.RaceTable);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    // Load an specific race details
    loadRoundInfo({commit}, round) {
      let url = URL_RACE_RESULT_FIRST + round + URL_RACE_RESULT_LAST;
      Vue.axios.get(url).then(result => {
        commit('SAVE_RACE_RESULT', result.data.MRData.RaceTable);
        commit('SET_CURRENT_RACE_ON_DISPLAY', round);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    // Drivers points
    loadDriverStandings({commit}) {
      Vue.axios.get(URL_DRIVER_STANDINGS).then(result => {
        commit('INIT_SAVE_DRIVER_STANDINGS', result.data.MRData.StandingsTable.StandingsLists[0]);
      }).catch(error => {
        throw new Error(`API ${error}`);
      });
    },
    swapRaceView({ commit, state, dispatch }, round) {
      console.log(round);
      if(!state.raceResults[round]) {
        console.log("OMG I DONT HAVE THAT");
        dispatch('loadRoundInfo', round);
      }else {
        console.log("yayhhh I got this")
        commit('SET_CURRENT_RACE_ON_DISPLAY', round);
      }
    },
    swapRaceOrdering({commit}) {
      commit('SWAP_RACER_ORDERING');
    }
  },
  mutations: {
    INIT_SAVE_SEASON_INFO(state, result) {
      state.seasonInfo = result;
    },
    INIT_SAVE_LAST_ROUND_OF_SEASON(state, round) {
      state.lastRoundOfSeason = parseInt(round);
      state.currentRaceOnDisplay = parseInt(round);
    },
    INIT_SAVE_DRIVER_STANDINGS(state, result) {
      state.driverStandings = result;
    },
    SET_CURRENT_RACE_ON_DISPLAY(state, result) {
      state.currentRaceOnDisplay = result;
    },
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
            // Adding positionOffset
            el.positionOffset = el.grid - el.position;

            // Adding constructor cart picture and color
            const aditionalInfo = getConstructorExtraInfo(el.Constructor.constructorId);
            el.Constructor = ({...el.Constructor, ...aditionalInfo})
            return el;
        })

        // adding it back to main object
        raceResults.Races[0].Results = enhancedPodium;

      }catch(e){
        console.log(e);
      }

      state.raceResults[raceResults.round] = raceResults;
    },
    SWAP_RACER_ORDERING(state) {
      state.viewRacersByGridPosition = !state.viewRacersByGridPosition;
    }
  }
})