

import VueRouter from 'vue-router'

import home from './components/tabbar/HomeContainer.vue'

import member from './components/tabbar/MemberContainer.vue'

import shopcar from './components/tabbar/ShopcarContainer.vue'

import search from './components/tabbar/SearchContainer.vue'

import newslist from './components/news/NewsList.vue'

import newsInfo from './components/news/NewsInfo.vue'

import photolist from './components/photos/photolist.vue'

import photoinfo from './components/photos/photoInfo.vue'

import goodslist from './components/goods/goodsList.vue'

import goodsInfo from './components/goods/goodsInfo.vue'

import goodsDesc from './components/goods/goodsDesc.vue'

import goodsComment from './components/goods/goodsComment.vue'


var routerobj = new VueRouter({
    routes:[
        {path:"/",redirect:"/home"},
        {path:"/home",component: home},
        {path:"/member",component: member},
        {path:"/shopcar",component: shopcar},
        {path:"/search",component: search},
        {path:"/home/newslist",component: newslist},
        {path:'/home/newsinfo/:id',component: newsInfo},
        {path:'/home/photolist',component:photolist},
        {path:'/home/photoinfo/:id', component: photoinfo},
        {path:'/home/goodlist',component:goodslist},
        {path:'/home/goodsInfo/:id',component:goodsInfo},
        {path:'/home/goodsdesc/:id',component:goodsDesc , name:"goodsdesc"},
        {path:'/home/goodscomment/:id',component:goodsComment,name:"goodscomment"}

    ],
    linkActiveClass:'mui-active'
});

export default routerobj