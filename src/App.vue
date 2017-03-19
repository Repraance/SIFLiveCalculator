<template>
    <div id="app">
        <div class="row">
            <live-list></live-list>
        </div>
        <div class="row">
            <team-list v-bind:noteWeight="weight"></team-list>
        </div>
        <card-select></card-select>
    </div>
</template>

<script>
    import liveList from './components/LiveList.vue';
    import teamList from './components/TeamList.vue';
    import cardSelect from './components/CardSelect.vue';

    let sdsd = [11, 2, 2, 2, 3, 4, 5, 56, 1.4];

    export default {
        el: '#app',
        components: {
            'live-list': liveList,
            'team-list': teamList,
            'card-select': cardSelect
        },
        data() {
            return {
                weight: sdsd
            }
        }
    }
</script>