<template>
    <div class="jumbotron">
        <div class="container">
            <nav class="navbar navbar-default navbar-static-top" style="background-color: #fff" role="navigation">
                <a class="navbar-brand" href="#"><span class="text-center">スクフェス Live Calculator</span></a>
            </nav>
            <div id="app">
                <div class="row">
                    <live-list></live-list>
                </div>
                <div>
                    <team-list></team-list>
                </div>
                <div class="row">
                    <calculating></calculating>
                </div>
                <card-select></card-select>
            </div>
        </div>
    </div>
    
</template>

<script>
    import liveList from './components/LiveList.vue';
    import teamList from './components/TeamList.vue';
    import calculating from './components/Calculating.vue'
    import cardSelect from './components/CardSelect.vue';

    let sdsd = [11, 2, 2, 2, 3, 4, 5, 56, 1.4];

    export default {
        el: '#app',
        components: {
            'live-list': liveList,
            'team-list': teamList,
            'card-select': cardSelect,
            'calculating': calculating
        },
        data() {
            return {
                weight: sdsd
            }
        }
    }
</script>