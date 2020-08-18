<template>
    <div class="raceInfo">
        <div class="raceInfo__header">
            <div class="raceInfo__wrapper">
                <h1 class="raceInfo__title"><a :href="this.raceInfo.url" target="_blank">{{ this.raceInfo.raceName }}</a></h1>
                <em class="raceInfo__subtitle">{{ this.raceResults.season }}</em>
            </div>
            <div class="raceInfo__wrapperToggler">
                <button class="raceInfo__button" v-on:click="swapOrder">Results / Grid</button>
            </div>
        </div>

        <transition-group name="flip-list" class="raceInfo__row" :class="{ 'raceInfo__row--byResult': orderByResult}">
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

.raceInfo__title {
    font-size: 40px;
    text-align: left;
    text-transform: uppercase;
    color: white;
    margin-bottom: 0;
    line-height: 1;
}

.raceInfo__subtitle {
    font-size: 32px;
    text-align: left;
    text-transform: uppercase;
    display: block;
    line-height: 1;
    font-style: normal;
    font-weight: 700;
}

.raceInfo__header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 80px;
}

.raceInfo__wrapperToggler {
    padding-top: 60px;
    text-align: right;
}

.raceInfo__button {
    padding: 8px;
    font-size: 20px;
    color: white;
    font-weight: bold;
    background-color: transparent;
    border: 0;
    cursor: pointer;
}

.raceInfo__button:hover{
    background-color: #555;
}

.raceInfo__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

</style>