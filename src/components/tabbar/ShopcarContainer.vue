<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelect[item.id]"
                            @change="selectedChange(item.id,$store.getters.getGoodsSelect[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{ item.title}}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <numberbox :initCount="$store.getters.getGoodsCount[item.id]"
                                :goodsid="item.id"></numberbox>
                                <a href="#" v-on:click="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="lef">
                        <p>总计(不含运费)</p>
                        <p>已选够商品
                            <span class="storemark">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，
                            总计：￥<span class="storemark">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                    </div>
                    <div class="right">
                        <mt-button type="danger">去结算</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <p>{{ $store.getters.getGoodsSelect }}</p>
    </div>
</template>


<script>

import shopcarnumbox from '../subcomponent/goodslist_numberBox.vue'

export default {
    data(){
        return {
            goodslist:[]
        }
    },
    created(){
        this.getshopcar();
    },
    methods:{
        getshopcar(){
            var ids = []
            this.$store.state.car.forEach(item => {
                ids.push(item.id);
            });
            if(ids.length <=0){
                return
            }
            this.$http.get("api/goods/getshopcarlist/"+ids.join(",")).then(function(result){
                // console.log(result.data);
                if(result.body.status == 0){
                    this.goodslist = result.body.message;
                }
            });
        },
        remove(id,index){
            // 删除商品
            this.goodslist.splice(index,1);
            this.$store.commit('removeFromCar',id);

        },
        selectedChange(id,status){
            this.$store.commit('updateGoodsSelected',{id:id,selected:status});
            
        }
    },
    components:{
        numberbox:shopcarnumbox
    }
}
</script>

 <style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        img{
            width:70px;
            height:70px;
        }
        .info{
            margin: 4px 0;
            padding:4px;
            h1{
                font-size: 15px;
            }
            .price{
                color:red;
                font-weight: bold;
            }
        }
        .mui-card-content-inner{
            display:flex;
            align-items: center;
        }
    }
    .mui-card-content-inner{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .storemark{
            color:red;
            font-weight: bold;
            font-size: 16px;
        }
    }
}
</style>