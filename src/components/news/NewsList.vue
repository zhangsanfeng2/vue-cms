<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
					<router-link :to="'/home/newsinfo/'+ item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{ item.title }}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间: {{ item.add_time | dataFormats }}</span>
                                <span>点击:{{ item.click }}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
    </div>
    
</template>


<script>
export default {
    data(){
        return {
            newslist:[]
        }
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){
            this.$http.get('api/getnewslist').then(function(result){
                console.log(result.body.message);
                if(result.body.status == 0){
                    this.newslist = result.body.message;
                }else{
                    Toast("获取新闻列表数据失败！");
                }
            });
        }
    },
    filters:{
        dataFormat:function(dateStr, pattern=''){
                var d = new Date(dateStr);
                var year = d.getFullYear();
                var m = d.getMonth() + 1;
                var day = d.getDate();
            if(pattern.toLowerCase() === 'yyyy-mm-dd'){
                return `${year}-${m}-${day}`;
            }else{
                var hh = d.getHours();
                var mm = d.getMinutes()
                var ss = d.getSeconds()
                return `${year}-${m}-${day} ${hh} : ${mm} : ${ss}`;
            }
        }
        
    }
}
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 22px;
        }
        .mui-ellipsis{
            font-size: 22px;
            color:#226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>


