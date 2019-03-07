<template>
    <div class="photo-container">
        <h3>{{ photoInfo.title}}</h3>
        <p class="subtitle">
            <span>发表时间:{{photoInfo.add_time | dataFormats}}</span>
            <span>点击:{{photoInfo.click}}次</span>
        </p>
        <hr>

        <div class="thums">
            <img class="preview-img" v-for="(item,index) in list" 
            :src="item.src" height="100" @click="$preview.open(index,list)" :key="item.src">
        </div>


        <div class="content" v-html="photoInfo.content"></div>

        <cmt-box :id="id"></cmt-box>
    </div>
</template>


<script>

    import comment from '../subcomponent/comment.vue'

    export default {
        data(){
            return {
                id: this.$route.params.id,
                photoInfo:{},
                list:[]
            }
        },
        created(){
            this.getPhotoInfo();
            this.getThumImages();
        },
        methods:{
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(function(result){
                    if(result.body.status==0){
                        this.photoInfo = result.body.message[0];
                    }
                });
            },
            getThumImages(){
                this.$http.get('api/getthumimages/'+this.id).then(function(result){
                    if(result.body.status==0){
                         result.body.message.forEach(item => {
                            item.w=600;
                            item.h=400;
                        });
                        this.list = result.body.message;
                    }
                });
            }
        },
        components:{
            'cmt-box':comment
        }
    }
</script>

<style lang="scss" scoped>

.photo-container{
    padding:3px;
    h3{
        font-size: 14px;
        color:#262aff;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;

    }

    .content{
        font-size: 13px;
        line-height: 30px;
    }

    .thums{
        img{
            margin: 10px;
            box-shadow: 0 0 8px #999;
        }
    }
}
</style>