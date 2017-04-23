<template>
    <div class="jumbotron">
        <div class="container">
            <nav class="navbar navbar-default" role="navigation">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        <span class="text-center">スクフェス Live Calculator</span>
                    </a>
                </div>
            </nav>
            <div id="app">
                <div class="row">
                    <live-list></live-list>
                </div>
                <div class="row">
                    <team-list></team-list>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <calculating></calculating>
                    </div>
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

    export default {
        el: '#app',
        components: {
            'live-list': liveList,
            'team-list': teamList,
            'card-select': cardSelect,
            'calculating': calculating
        }
    }
</script>

<style scoped>
    .file-button {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;
    }
    
    .demo-raised-button {
        width: 100%;
    }
</style>