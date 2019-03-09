<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>

export default {
    data(){
        return{
            // lunbotuList:[]
        }
    },
    created(){
        
    },
    methods:{
        
    },
    props:["lunbotuList","isfull"]

}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height:400px;
    text-align: center;
    // .mint-swipe-item{
    //     &:nth-child(1){
    //         background-color: red;
    //     }
    //     &:nth-child(2){
    //         background-color: blue;
    //     }
    //     &:nth-child(3){
    //         background-color: yellow;
    //     }
    // }

    img{
        // width:100%;
        height:100%;
    }
}
.full{
    width:100%;
}
</style>

