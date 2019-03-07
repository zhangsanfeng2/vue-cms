<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator 
            mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cates"
                     :key="item.id" @tap="getPhotos(item.id)">
                         {{item.title}}
                    </a>
                    
                </div>
            </div>
        </div>

        <ul class="photo-list"> 
            <router-link v-for="item in photolist" :key="item.id"
                :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body" >{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>

</template>


<script>

import mui from '../../lib/mui/js/mui.min.js'

export default{
    data(){
        return {
            cates : [],
            photolist:[]
        }
    },
    created(){
        this.getAllPhoto();
        this.getPhotos(0);
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getAllPhoto(){
            this.$http.get('api/getimgcategory').then(function(result){
                // console.log(result.body.message);
                
                if(result.body.status == 0){
                    result.body.message.unshift({title:'全部',id:0});
                    this.cates = result.body.message;
                }else{
                    // Toast("获取图片分类数据失败！");
                }
            });
        },
        getPhotos:function(cateId){
            this.$http.get('api/getimages/'+cateId).then(function(result){
                // console.log(result.body.message);
                
                if(result.body.status == 0){
                    this.photolist = result.body.message;
                }else{
                    // Toast("获取图片分类数据失败！");
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>

* {
    touch-action: pan-y;
}


.photo-list{
    list-style: none;
    margin:0;
    padding:10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width:100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color:white;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            max-height: 84px;
            .info-title{
                font-size: 14px;
                text-align: left;
            }
            .info-body{
                font-size: 13px;
                text-align: left;
            }
        }  
    }
}
</style>

