<template>
  <van-tabbar v-model="active" class="footer" @change="change">
    <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="cart"  @click="goCart">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data(){
    return{
      active:0
    }
  },
  created(){
    let active =localStorage.getItem('active')
    if(active == 'NaN'){
      this.active = 0
    }else{
      this.active = parseInt(localStorage.getItem('active'))
    }
    
    // console.log(this.active)
  },
  methods: {
    change(active){
      localStorage.setItem('active',active)
      // console.log(this.active)
    },
    goCart(){
      if(JSON.parse(localStorage.getItem("cart"))){
        this.$router.push('/cart')
      }else{
        this.$toast.fail('购物车为空，请先挑选商品')
        setTimeout(() => {
          this.$router.push('/category')
        },1500)
      }
    }
  }
}


</script>

<style scoped lang="scss">
.footer {
  background-color: #eee;
}
</style>