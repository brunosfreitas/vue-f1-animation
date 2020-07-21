<template>
    <div class="raceInfo">
        <h1>{{ raceName }}</h1>
        <button v-on:click="swapOrder">Results / Grid</button>

        <transition-group name="flip-list" class="raceInfo__row">
            <template v-for="(racer, index) in racers">
                <RacePodiumItem :racer="racer" :itemId="index" :key="racer.number" :orderByResult="orderByResult"/>
            </template>
        </transition-group>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import RacePodiumItem from "./RacePodiumItem";
import _ from 'lodash';

export default {
    name: 'RaceInfo',
    components: { RacePodiumItem },
    data: function () {
        return {
            orderByResult: true
        }
    },
    computed: {
        ...mapState(['raceResults']),
        ...mapGetters(['raceInfo', 'racePodium']),
        raceName() {
            return this.raceResults ? `${this.raceResults?.season} - ${this.raceInfo?.raceName}` : 'Loading';
        },
        racers() {
            if(this.orderByResult) 
                return this.racePodium;
            
            let gridOrdering = _.orderBy(this.racePodium, (el) => {
                return parseInt(el.grid, 10);
            }, 'asc');
            return gridOrdering;
        }
    },
    methods: {
        ...mapActions(['swapRaceOrdering']),
        swapOrder: function() {
            this.orderByResult = !this.orderByResult;
        }
    }

}
</script>

<style>
.raceInfo {
    margin: 0 40px;
}

.raceInfo__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.raceInfo__col {
    background-color: pink;
}

.flip-list-move {
    transition: transform 1s;
}
</style>