
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

import Vuex from 'vuex'
Vue.use(Vuex)
// import mui from './lib/mui/js/mui.min.js'
// Vue.prototype.mui = mui

var car = JSON.parse(localStorage.getItem('car') || '[]') 

var storeobj = new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        addToCar(state,goodsinfo){
           var flag = false;
           state.car.some(item =>{
               if(item.id == goodsinfo.id){
                   item.count += parseInt(goodsinfo.count)
                   flag = true;
                   return true;
               }
           });
           if (!flag){
               state.car.push(goodsinfo);
           }
        //    本地存储
           localStorage.setItem('car',JSON.stringify(state.car));     
        },
        updateGoodsinfo(state,goodsinfo){
            state.car.some(item =>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));  
        },
        removeFromCar(state,id){
            state.car.some((item,i) =>{
                if(item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsSelected(state,info){
            state.car.some(item =>{
                if(item.id == info.id){
                    item.selected = info.selected;
                    return true;
                }
            });
            localStorage.setItem('car',JSON.stringify(state.car));    
        }
        
    },
    getters:{
        getAllcount(state){
            var c = 0;
            state.car.forEach(item =>{
                c += item.count; 
            });
            return c;
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item =>{
                o[item.id] = item.count;
            });
            return o
        },
        getGoodsSelect(state){
            var o = {}
            state.car.some((item,i) =>{
                o[item.id]=item.selected;
            });
            return o
        },
        getGoodsCountAndAmount(state){
            var o ={
                count:0,
                amount:0
            }
            state.car.forEach(item =>{
                if(item.selected){
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            });
            return o

        }
    }
})


var vm = new Vue({
    el:'#app',
    render:function(createElements){
        return createElements(app);
    },
    router:routerobj,
    store:storeobj
})