<template>
    <div>
        
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbotuList" :key="item.img">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe> -->

        <swipe :lunbotuList="lunbotuList" :isfull="true"></swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodlist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="#">
                    <img src="../../images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div></router-link></li>
        </ul>
    </div>
</template>


<script>

import {Toast} from 'mint-ui';

import swipe from '../subcomponent/swipe.vue'

export default {
    data(){
        return {
            lunbotuList:[]
        }
    },
    created(){
        this.getLunBoTu()
    },
    methods:{
        getLunBoTu(){
            this.$http.get("api/getlunbo").then(function(result){
                // console.log(result.data);
                if(result.body.status == 0){
                    this.lunbotuList = result.body.message;
                }else{
                    Toast("获取轮播图数据失败！");
                }
            });    
        }
    },
    components:{
        'swipe':swipe
    }

}
</script>

 <style lang="scss" scoped>
.mint-swipe{
    height:400px;
    .mint-swipe-item{
        &:nth-child(1){
            background-color: red;
        }
        &:nth-child(2){
            background-color: blue;
        }
        &:nth-child(3){
            background-color: yellow;
        }
    }

    img{
        width:100%;
        height:100%;
    }
}

.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border:none;
    // img{
    //     width:60px;
    //     height:60px;
    // }
    // .mui-media-body{
    //     font-size: 35px;
    //         line-height:35px;
    //     height:40px;
    // }
}
.mui-grid-view.mui-grid-9{
   border:0px;
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 35px;
    line-height:35px;
    height:35px;
}

</style>

