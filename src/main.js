
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import app from './App.vue'

import routerobj from './router.js'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import 'mint-ui/lib/style.css'
import { Header, Swipe, SwipeItem  } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);



var vm = new Vue({
    el:'#app',
    render:function(createElements){
        return createElements(app);
    },
    router:routerobj
})