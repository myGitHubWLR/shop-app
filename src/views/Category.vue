<template>
  <div>
    <van-nav-bar title="商品分类" class="nav-bar"/>
    <div>
      <van-row>
        <van-col span="6" class="nav">
          <ul>
            <li
              @click="selectProduct(item.typeId,index)"
              :class="{active:active == index}"
              v-for="(item,index) in types"
              :key="item.typeId"
            >{{item.typeName}}</li>
          </ul>
        </van-col>
        <van-col span="18" class="container">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="content">
              <div class="content-item" v-for="(item, index) in productList" :key="index" @click="goDetail(item._id)">
                <img :src="item.img" alt class="content-item-img"/>
                <p class="content-item-name">{{item.name}}</p>
                <p>￥{{item.price}}</p>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import FooterBar from '../components/Footer-bar.vue'
import axios from "axios";
import url from "../service.config";
export default {
  components:{
    FooterBar
  },
  data() {
    return {
      types: [],
      typeId: 1, //当前选择类型
      start: 0,
      limit: 10,
      active: 0,
      productList: [],
      loading: false,
      finished: false
    };
  },
  created() {
    // 首先获取类别
    axios({
      url: url.getTypes
    })
      .then(res => {
        // console.log(res);
        this.types = res.data;
        this.selectProduct(this.typeId, this.active);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    selectProduct(typeId, index) {
      this.active = index
      this.typeId = typeId
      this.productList = []
      this.finished = false
      // console.log(this.active,this.typeId)
      this.getProduct();
    },
    getProduct() {
      this.loading = true;
      axios({
        url: url.getProductsByType,
        method: "get",
        params: {
          typeId: this.typeId,
          start: this.productList.length,
          limit: this.limit
        }
      })
        .then(res => {
          // console.log(res);
          if (res.data.length != 0) {
            this.productList = this.productList.concat(res.data);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 触底加载
    onLoad() {
      setTimeout(() => {
        this.getProduct();
      }, 2000);
    },
    // 下拉刷新
    onRefresh(){
      setTimeout(() => {
        this.productList = []
        this.getProduct();
      }, 2000);
    },
    // 跳转到详情页
    goDetail(id){
      // name 形式，刷新页面参数丢失
      // this.$router.push({
      //   name:'detail',
      //   params:{
      //     id:id
      //   }
      // })

      // this.$router.push({
      //   path:'detail',
      //   query:{
      //     id:id
      //   }
      // })

      this.$router.push(`/detail/${id}`)
    }
  }
};
</script>

<style scoped lang="scss">
.nav-bar{
  background-color: #eee;
}
.nav {
  background-color: #eee;
  li {
    border-bottom: 2px solid #fff;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
  }
  .active {
    background-color: #fff;
  }
}
.container{
  position: fixed;
  top: 46px;
  bottom: 1rem;
  right: 0;
  overflow-y: scroll;
  .content{
    display: flex;
    flex-wrap: wrap;
    &-item{
      width:40%;
      text-align: center;
      padding:0 10px;
      &-img{
        width: 2rem;
        height: 2rem;
      }
      &-name{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>