import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import AV from 'leancloud-storage'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';


const APP_ID = 'ppYUH2igAhO59GFH4IkNHxyk-gzGzoHsz';
const APP_KEY = 'onw8chABdVHzQJLVntnqwEUw';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

Vue.use(ElementUI);
Vue.prototype.$AV = AV

Vue.config.productionTip = false

Vue.filter('formatDate', function (val) {
    let createDate = new Date(val);
    let now = Date.now();
    let time = (now - createDate) / 1000;
    if (time < 60) {//小于60秒
        return '刚刚';
    } else if (time < 3600) {
        return parseInt(time / 60) + '分钟前';
    } else if (time < 86400) {
        return parseInt(time / 3600) + '小时前';
    } else {
        return parseInt(time / 86400) + '天前';
    }
})
Vue.filter('getTime',function (val) {
    let year = new Date(val).getFullYear();
    let month = new Date(val).getMonth()+1;
    let day = new Date(val).getDate();
    return year+'年'+month+'月'+day+'日'
})

new Vue({
    render: h => h(App),
    router,
    store

}).$mount('#app')



Vue.filter('day',function (val) {
    return new Date(val).getDate();
})

Vue.filter('month',function (val) {
    return new Date(val).getMonth()+1;
})

Vue.filter('year',function (val) {
    return new Date(val).getFullYear();
})



Vue.filter('formatIdentity',function (val) {
    if (val === 'driver'){
        return '司机'
    } else{
        return '乘客'
    }
})