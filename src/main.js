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

new Vue({
    render: h => h(App),
    router,
    store

}).$mount('#app')
