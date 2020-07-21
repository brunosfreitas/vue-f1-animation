<template>
  <div class="raceList">
    <h1 class="raceList__title">F1 race!</h1>
    <p></p>
    <button v-on:click="shuffle">Shuffle</button>

    <transition-group name="flip-list" tag="ul" class="raceList__list">
      <li v-for="racer in racers" v-bind:key="racer.name" class="raceList__listItem">
        {{racer.name}} {{racer.time}}
      </li>
  </transition-group>


    <transition-group name="flip-list" tag="ul" class="raceList__list">
      <li v-for="racer in racePodium" v-bind:key="racer.number" class="raceList__listItem">
        <RaceItem :racer="racer"/>
      </li>
  </transition-group>
  </div>
</template>

<script>
import _ from 'lodash';
import RaceItem from './RaceItem';
import { mapState, mapGetters } from "vuex";

export default {
  name: 'RaceList',
  components: {
    RaceItem
  },
  data: function () {
    return {
        racers: [
          {
            name: 'Haikonen',
            color: '#e5446d',
            time: 123
          },
          {
            name: 'Ricciardo',
            color: '#f2e863',
            time: 124
          },
          {
            name: 'Vettel',
            color: '#c2f970',
            time: 200
          }
        ]
    }
  },
  methods: {
    shuffle: function () {
      this.racers = _.shuffle(this.racers);
      return;
    }
  },
  computed: {
    ...mapState(['raceResults']),
    ...mapGetters(['racePodium'])
  },
  mounted() {
    this.$store.dispatch('loadUsers');
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .raceList {
    text-align: left;
    padding-left: 20px;
  }

  .raceList__title {

  }

  .flip-list-move {
    transition: transform 1s;
  }

  .raceList__list {
    list-style: none;
  }
</style>