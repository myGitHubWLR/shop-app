import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 样式重置 rem设置
import "../src/assets/css/reset.css"
import "../src/assets/js/rem.js"

Vue.config.productionTip = false

// mockjs
import "@/mock/mock.js"


// 按需引入vant
import {
  Tab, Tabs,Field,CellGroup,Toast,Dialog,Row, Col,List,PullRefresh,GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Card,
  SubmitBar,
  Button, Icon, NavBar, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload
} from 'vant'
Vue.use(SubmitBar).use(Card).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(PullRefresh).use(List).use(Row).use(Col).use(Dialog).use(Toast).use(CellGroup).use(Field).use(Tab).use(Tabs).use(Button).use(Icon).use(NavBar).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
