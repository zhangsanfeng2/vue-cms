
import Vue from 'vue'

import app from './App.vue'


import './lib/mui/css/mui.min.css'

import 'mint-ui/lib/style.css'
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);



var vm = new Vue({
    el:'#app',
    render:function(createElements){
        return createElements(app);
    }
})