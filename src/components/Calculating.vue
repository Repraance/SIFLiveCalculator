<template>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div style="margin-bottom: 10px">
            <button type="button" class="btn btn-large btn-block btn-primary" @click="calculate">Calculate</button>
        </div>
        <div class="well well-sm">
            <p><b id="result">Team Attribute: {{test}}</b></p>
            <p><b id="result">Expected score: </b></p>
        </div>
    </div>
</template>

<script>
    import LiveCalculator from '../lib/calculating.js'
    export default {
        data() {
            return {
                liveSettingInfo: null,
                team: null,
                guestInfo: null,
                unitInfo: null,
                test: null,
                liveCalculator: new LiveCalculator()
            }
        },
        methods: {
            calculate: function() {
                this.liveCalculator.setTeam(this.teamInfo);
                console.log(this.liveCalculator.calculateTotalAttribute(1));
                console.log(this.liveCalculator.calculateTotalAttribute(2));
                console.log(this.liveCalculator.calculateTotalAttribute(3));
            }
        },
        mounted: function() {
            //this.$data.liveCalculator = new LiveCalculator();
            this.$events.$on('getLiveSettingInfo', liveSettingInfo => {
                this.liveSettingInfo = liveSettingInfo;
                console.log('Calculating received liveSettingInfo', this.liveSettingInfo);
            });
            this.$events.$on('getTeam', team => {
                this.team = team;
                console.log('Calculating component received team', this.team);
                //this.calculate();
            });
        }

    }
</script>