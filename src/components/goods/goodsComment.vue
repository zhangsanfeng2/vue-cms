<template>
    <div>
        <goodsComment :id="id" ></goodsComment>
    </div>
</template>

<script>

import comment from '../subcomponent/comment.vue'

export default {
    data(){
        return {
            id : this.$route.params.id
        }
    },
    methods:{

    },
    components:{
        'goodsComment':comment
    }
}
</script>


<style lang="scss" scoped>

</style>