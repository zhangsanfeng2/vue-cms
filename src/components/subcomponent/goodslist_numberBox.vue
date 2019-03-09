<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" 
        @change="countChange" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data(){
        return{

        }
    },
    methods:{
        countChange(){
            // console.log(this.$refs.numbox.value);

            var goods={
                id:this.goodsid,
                count:this.$refs.numbox.value
            };

            this.$store.commit('updateGoodsinfo',goods);


        }
    },
    mounted(){
        mui('.mui-numbox').numbox();
    },
    props:["initCount","goodsid"]
}
</script>

<style lang="scss" scoped>

</style>