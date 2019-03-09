<template>
    <div class="goodsinfo-container">

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :lunbotuList="lunbotus" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price}}</del>&nbsp;&nbsp;
                        销售价：<span class="now_price">￥{{ goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量: <numberbox @getCount = "getSelectCount" :maxCount="goodsinfo.stock_quantity"></numberbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addtoshopcar">加入购物车</mt-button>
                    </p>
                    
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no}}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity}}</p>
                    <p>上架时间：{{ goodsinfo.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
            </div>
        </div>
       
    </div>
</template>


<script>

import swiper from '../subcomponent/swipe.vue'

import numberbox from '../subcomponent/goodsInfo_numberBox.vue'

export default {
    data(){
        return{
            id: this.$route.params.id,
            lunbotus:[],
            goodsinfo:{},
            ballflag:false,
            selectedCount:1
        }
    },
    created(){
        this.getLunbotos();
        this.getGoodsInfo();
    },
    methods:{
        getLunbotos(){
            this.$http.get('api/getthumimages/'+this.id).then(function(result){
                if(result.body.status==0){
                     result.body.message.forEach(item => {
                         item.img = item.src;
                     });
                     this.lunbotus = result.body.message;
                }
            });
        },
        getGoodsInfo(){
            this.$http.get('api/goods/getinfo/'+this.id).then(result =>{
                if(result.body.status==0){
                     this.goodsinfo = result.body.message[0];
                }
            });
        },
        getDesc(id){
            this.$router.push({ name: 'goodsdesc', params: { id:id }});
        },
        getComment(id){
            this.$router.push({ name: 'goodscomment', params: { id }});
        },
        addtoshopcar(){
            this.ballflag = !this.ballflag;
            var goodsinfo = {id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true}
            this.$store.commit('addToCar',goodsinfo);

        },
        beforeEnter(el){
            el.style.transform="translate(0,0)";
        },
        enter(el,done){

            var ballposition = this.$refs.ball.getBoundingClientRect();
            var badgeposition = document.getElementById("badge").getBoundingClientRect();

            var xDist = badgeposition.left - ballposition.left;
            var yDist = badgeposition.top - ballposition.top;

            el.offsetWidth;
            el.style.transform=`translate(${xDist}px, ${yDist}px)`;
            // el.style.transition="all 1s ease";
            el.style.transition="all 0.5s cubic-bezier(.4,-0.3,.1,.68)";
            
            done();
        },
        afterEnter(el){
            this.ballflag = !this.ballflag;
        },
        getSelectCount(count){
            this.selectedCount = count;
            // console.log("拿到子组件的值:"+count);
        }


    },
    components:{
        swiper,
        numberbox

    }
}
</script>


<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
        color:red;
        font-weight: bold;
        font-size: 16px;
    }
    .mui-card-footer{
        display: block;
        button{
            margin:13px 0;
        }
    }
    .ball{
        width: 15px;
        height:15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:592px;
        left:137px;
        // transform:translate(490px, 700px);
    }

    // .v-enter,.v-leave-to{
    //     opacity: 0;
    //     transform: translate(137px,592px);
    // }
    // .v-enter-active,.v-leave-active{
    //     transition: all 0.5s ease;

    // }
}
</style>
