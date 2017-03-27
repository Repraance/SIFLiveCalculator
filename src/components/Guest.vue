<template>
    <div class="well well-sm">
        <div class="well well-sm" style="margin-bottom: 10px">
            <input id="guest" class="checkbox-custom" type="checkbox" onclick="disableEnableGuest()">
            <label for="guest" class="checkbox-custom-label">Add guest</label>
        </div>
        <div class="well well-sm" style="margin-bottom: 10px" id="guestLeaderSkill">
            <h4>Guest Center Skill</h4>
            Team {{ teamDefaultAttribute }} attribute up by 9% or 12% of
            <br>
            <input id="guestSmile" class="radio-custom" name="guestEffectType" type="radio" value="1" onclick="updateLiveLists()">
            <label for="guestSmile" class="radio-custom-label"><span style="color: #E91E63">Smile</span></label>
            <input id="guestPure" class="radio-custom" name="guestEffectType" type="radio" value="2" onclick="updateLiveLists()">
            <label for="guestPure" class="radio-custom-label"><span style="color: #4CAF50">Pure</span></label>
            <input id="guestCool" class="radio-custom" name="guestEffectType" type="radio" value="3" onclick="updateLiveLists()">
            <label for="guestCool" class="radio-custom-label"><span style="color: #2196F3">Cool</span></label>
        </div>
        <div class="well well-sm" style="margin-bottom: 10px" id="guestLeaderExtraSkill">
            <h4>Guest Center Extra Skill</h4>
            Team {{ teamDefaultAttribute }} attribute up by 3% of</span>
            <div>
                <input id="guestMuse" class="radio-custom" name="guestExtraEffectType" type="radio" value="4" onclick="updateLiveLists()">
                <label for="guestMuse" class="radio-custom-label">μ's</label>

                <input id="guestAqours" class="radio-custom" name="guestExtraEffectType" type="radio" value="5" onclick="updateLiveLists()">
                <label for="guestAqours" class="radio-custom-label">Aqours</label>
            </div>
            <hr>
            <div>
                Team {{ teamDefaultAttribute }} attribute up by 6% of</span>
            </div>
            
            <div v-for="option in guestOptions" style="display: inline">
                <input :value="option[1]" class="radio-custom" type="radio" :id="'guest' + option[0]">
                <label :for="'guest' + option[0]" class="radio-custom-label">{{ option[0] }}</label>
            </div>
            <p>{{ live }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['defaultAttribute'],
        data: function() {
            return {
                guestOptions: [
                    ['1st Year', 1],
                    ['2nd Year', 2],
                    ['3rd Year', 3],
                    ["μ's", 4],
                    ['Aqours', 5],
                    ['Printemps', 6],
                    ['lily white', 7],
                    ['BiBi', 8],
                    ['CYaRon！', 9],
                    ['AZALEA', 10],
                    ['Guilty Kiss', 11]
                ],
                live: 'nulll'
            }
        },
        computed: {
            teamDefaultAttribute: function() {
                if (this.defaultAttribute) {
                    return this.defaultAttribute;
                } else
                    return 'nulll';
            }
        }

    }
</script>