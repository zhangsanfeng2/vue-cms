<template>
    <div class="goodsdesc-content">
        <h3>{{ goodsdesc.title}}</h3>
        <hr>
        <div class="content" v-html="goodsdesc.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            goodsdesc:{}
        }
    },
    created(){
        this.getGoodsDesc();
    },
    methods:{
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(function(result){
                if(result.body.status==0){
                     this.goodsdesc = result.body.message[0];
                }
            });
        }
    }
}
</script>


<style lang="scss">
.goodsdesc-content{
    padding:8px;

    h3{
        columns: #226aff;
        font-size: 16px;
        margin: 15px 0;
        text-align: center;

    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>



