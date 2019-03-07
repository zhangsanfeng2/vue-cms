
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root="http://www.liulongbin.top:3005"
Vue.http.options.emulateJSON = true;

import app from './App.vue'

import routerobj from './router.js'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import 'mint-ui/lib/style.css'
// import { Header, Swipe, SwipeItem ,Button ,Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import Mint from 'mint-ui'
Vue.use(Mint);

import vuePreview from 'vue-preview'
Vue.use(vuePreview);

import moment from 'moment'
Vue.filter('dataFormats',function(datestr,parttern="YYYY-MM-DD HH:mm:ss"){
    return moment(datestr).format(parttern);
});


// import mui from './lib/mui/js/mui.min.js'
// Vue.prototype.mui = mui


var vm = new Vue({
    el:'#app',
    render:function(createElements){
        return createElements(app);
    },
    router:routerobj
})