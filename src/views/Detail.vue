<template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" class="nav-bar" @click-left="$router.go(-1)" />
    <div class="detail">
      <img :src="detailList.img" alt class="detail-img" />
      <p class="detail-name">{{detailList.name}}</p>
      <p class="detail-price">￥{{detailList.price}}</p>
      <p>公司：{{detailList.company}}</p>
      <p>产地：{{detailList.city}}</p>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="goCart" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" @click="addCart"/>
    </van-goods-action>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      detailList: {}
    };
  },

  created() {
    // console.log(this.$route.params.id)
    axios({
      url: url.getDetail,
      method: "get",
      params: {
        id: this.$route.params.id
      }
    })
      .then(res => {
        this.detailList = res.data;
        // console.log(this.detailList)
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //加入购物车
    addCart() {
      //   console.log(this.detailList);
      //   console.log(this.userInfo);
      if (localStorage.getItem("login") == null) {
        this.$toast.fail("请先进行登录");
        setTimeout(() => {
          this.$router.push("/profile");
        }, 1500);
      } else {
        // 放入购物车
        // axios({
        //   url: url.addCart,
        //   method: "post",
        //   data: {
        //     productId: this.detailList._id,
        //     userId: this.userInfo._id
        //   }
        // })
        //   .then(res => {
        //     // console.log(res);
        //     if (res.data.code == 200) {
        //       this.$toast.success(res.data.message);
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });

        // 利用缓存
        var cartData = JSON.parse(localStorage.getItem('cart')) || []
        // var data = {
        //     img:this.detailList.img,
        //     name: this.detailList.name,
        //     company: this.detailList.company,
        //     price: this.detailList.price
        // };
        // data = JSON.stringify(data);
        cartData.push({
            img:this.detailList.img,
            name: this.detailList.name,
            company: this.detailList.company,
            price: this.detailList.price
        })
        // console.log(cartData)
  
        localStorage.setItem('cart', JSON.stringify(cartData));
        this.$toast.success('添加成功')
    
       
      }
    },
    // 点击购物车
    goCart() {
      if (localStorage.getItem("login") == null) {
        this.$toast.fail("请先进行登录");
        setTimeout(() => {
          this.$router.push("/profile");
        }, 1500);
      } else {
        this.$router.push("/cart");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.nav-bar {
  background-color: #eee;
}
.detail {
  width: 100%;
  &-img {
    width: 100%;
    height: 5rem;
  }
  p {
    margin: 0.1rem;
  }
  &-name {
    color: #333;
    font-weight: bolder;
    font-size: 0.3rem;
  }
  &-price {
    color: #ff7300;
    font-size: 0.4rem;
  }
}
</style>