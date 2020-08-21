<template>
  <div class="seasonList">
    <h1 class="seasonList__title">F1 {{seasonInfo.season}}</h1>
    <ul class="seasonList__list">
      <li v-for="(race, index) in seasonInfo.Races" :key="index" class="seasonList__item" :class="raceClass(race.round)" @click="shouldSwapRaceView(race.round)">
        {{race.round}} - {{race.raceName}}
        <!-- <p class="seasonList__circuit">{{race.Circuit.circuitName}}</p> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'SeasonList',
  components: {
  },
  data: function () {
    return {
        
    }
  },
  methods: {
    isPastRace(round){
      return this.lastRoundOfSeason >= parseInt(round);
    },
    raceClass(round){
      return { 'seasonList__item--future': !this.isPastRace(round) };
    },
    shouldSwapRaceView(round) {
      if(this.isPastRace(round)){
        this.$store.dispatch('swapRaceView', round);
      }
    }
  },
  computed: {
    ...mapGetters(['seasonInfo', 'lastRoundOfSeason']),
    ...mapActions(['swapRaceView'])
  },
  mounted() {
    this.$store.dispatch('loadSeasonInfo');
    this.$store.dispatch('loadCurrentRaceInfo');
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .seasonList {
    text-align: left;
    padding-left: 20px;
  }

  .seasonList__title {

  }

  .seasonList__circuit{
    margin: 0 0 6px 6px;
  }

  .seasonList__list {
    list-style: none;
  }

  .seasonList__item {
    cursor: pointer;
  }

  .seasonList__item.seasonList__item--future {
    color: #999;
    cursor: default;
  }

  .seasonList__item:hover {
    color: #bbbbbb;
  }
</style>