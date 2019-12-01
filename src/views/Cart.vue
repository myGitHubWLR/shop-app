<template>
  <div>
    <van-nav-bar title="购物车" left-text="返回" class="nav-bar" @click-left="$router.go(-1)" />
    <div class="container">
      <van-card
        v-for="(item,index) in cartList"
        :key="index"
        :price="item.price"
        :desc="item.company"
        :title="item.name"
        :thumb="item.img"
      >
        <div slot="footer">
          <van-button size="mini" class="deleteBtn" @click="deleteCart(item._id,index)">删除</van-button>
        </div>
      </van-card>
      <van-submit-bar 
      
      class="submit-bar" :price="totalPrice" button-text="提交订单" @submit="onSubmit" />
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import FooterBar from "../components/Footer-bar";
// import axios from "axios";
// import url from "../service.config.js";
import { mapState } from "vuex";
export default {
  components: {
    FooterBar
  },
  data() {
    return {
      cartList: [
      ]
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    totalPrice() {
      return (
        this.cartList.reduce((pre, cur) => {
          pre += cur.price;
          return pre;
        }, 0) * 100
      );
    }
  },
  methods: {
    onSubmit() {
      this.$toast.success("提交成功");
    },
    deleteCart(id, index) {
      this.cartList.splice(index, 1);
      var cartData = JSON.parse(localStorage.getItem("cart")) || [];
      cartData.splice(index, 1);
      console.log(cartData);

      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  },
  created() {
    // 后端未做购物车删除数据功能，所以先利用缓存机制
    // axios({
    //   url: url.getCart,
    //   method: "get",
    //   params: this.userInfo._id
    // })
    //   .then(res => {
    //     // console.log(res)
    //     for (let item of res.data) {
    //       // console.log(item);
    //       this.cartList.push(item.productId);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    if (localStorage.getItem("login") == null) {
      this.$toast.fail("请先进行登录");
      setTimeout(() => {
        this.$router.push("/profile");
      }, 1500);
    } else {
      let cartData = JSON.parse(localStorage.getItem("cart"));
      this.cartList = cartData;
      // console.log(cartData);
    }
  }
};
</script>

<style scoped lang="scss">
.nav-bar {
  background-color: #eee;
}
.container {
  position: fixed;
  top: 46px;
  bottom: 2rem;
  right: 0;
  overflow-y: scroll;
}
.deleteBtn {
  background-color: #f40;
  color: #fff;
}
.submit-bar {
  margin-bottom: 1rem;
}
</style>