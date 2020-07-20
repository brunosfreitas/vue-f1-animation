<template>
    <div class="raceInfo">
        <h1>{{ raceName }}</h1>
        <button v-on:click="swapOrder">Results / Grid</button>

        <div class="raceInfo__row">
            <template v-for="racer in racePodium">
                <RacePodiumItem :racer="racer" :itemId="racer.position" v-bind:key="racer.position"/>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
        raceOrder() {
            return this.swapOrder();
        }
    },
    methods: {
        swapOrder: function() {
            this.orderByResult = !this.orderByResult;

            /* eslint-disable no-unused-vars */
            let ordering = this.orderByResult ? 'position' : 'grid';
            console.log(ordering);
            return _.orderBy(this.racePodium, function (obj, ordering) {
                return parseInt(obj[ordering], 10);
            } , ['asc']);
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
</style>