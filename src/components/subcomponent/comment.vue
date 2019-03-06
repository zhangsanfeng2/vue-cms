<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入BB内容(最多吐槽120字)" maxlength="120" v-model="commentMsg"></textarea>

        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>


        <div class="cmt-list" v-for="(item, i) in commentlist " :key="item.add_time">
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dataFormats }}
                </div>
                <div class="cmt-body">
                    {{ item.content == "undefined"?"此用户很懒，没有评论内容" :item.content}}
                </div>
            </div>
        </div>
        

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>

    </div>
</template>


<script>

import {Toast} from 'mint-ui'

export default{
    data(){
        return {
            pageindex:1,
            commentlist:[],
            commentMsg:''
        }
    },
    created(){
        this.getComment();
    },
    methods:{
        getComment(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(function(result){
                if(result.body.status == 0){
                    // this.commentlist = result.body.message;
                    this.commentlist = this.commentlist.concat(result.body.message);
                }else{
                    Toast("获取评论信息失败...");
                }
            });
        },
        getMore(){
            this.pageindex++;
            // console.log(this.pageindex);
            this.getComment();
        },
        addComment(){
            if(this.commentMsg.length == 0){
                return Toast("评论内容不能为空!");
            }
            this.$http.post('api/postcomment/'+this.$route.params.id,{content:this.commentMsg.trim()}).then(
                function(result){
                    if(result.body.status == 0){
                        var cmt = { user_name:"匿名用户",add_time:Date.now(), content:this.commentMsg.trim()};
                        this.commentlist.unshift(cmt);
                        this.commentMsg = '';
                        Toast("发表评论添加成功...");
                    }else{
                        Toast("发表评论添加失败...");
                    }
                }
            );
        }
    },
    props:['id']
}

</script>


<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size:20px;
    }
    textarea{
        margin: 0px;
        height: 85px;

    }
    .cmt-list{
        margin:10px 0;
        .cmt-item{
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
                font-size:23px;
            }
            .cmt-body{
                line-height: 30px;
                font-size:23px;
                text-indent: 2em;
            }
        }
    }
}
</style>
