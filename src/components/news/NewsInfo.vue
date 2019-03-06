<template>
    <div class="newinfo-container">
        <h3 class="title"> {{newsInfo.title}} </h3>
        <p class="subtitle">
            <span>发表时间：{{ newsInfo.add_time | dataFormats }}</span>
            <span>点击: {{ newsInfo.click }} 次</span>
        </p>
        <hr>
        <div class="content"  v-html="newsInfo.content"></div>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>

import {Toast} from 'mint-ui'

import comment from '../subcomponent/comment.vue'

export default{
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/'+this.id).then(function(result){
                if(result.body.status == 0){
                    this.newsInfo = result.body.message[0];
                    console.log(this.newsInfo);
                }else{
                   Toast("获取新闻详情数据信息失败....");     
                }
            });
        }
    },
    components:{
        'comment-box':comment
    }
}

</script>


<style lang="scss" scoped>
.newinfo-container{
    padding:4px 0;
    .title{
        
        font-size:25px;
        color:red;
        text-align: center;
        margin:15px 0;
    }
    .subtitle{
        
        font-size:20px;
        color:#226aff;
        display: flex;
        justify-content: space-between;
    }
}

</style>

