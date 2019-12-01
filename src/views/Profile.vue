<template>
  <div>
    <van-tabs class="van-tabs">
      <van-tab title="登录">
        <van-cell-group class="van-group">
          <van-field v-model="loginUsername" required clearable label="用户名" placeholder="请输入用户名" />
          <van-field
            v-model="loginPassword"
            required
            type="password"
            label="密码"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="loginHandler">{{login ? '退出':'登录'}}</van-button>
        </div>
      </van-tab>
      <van-tab title="注册">
        <van-cell-group class="van-group">
          <van-field v-model="registUsername" required clearable label="用户名" placeholder="请输入用户名" />
          <van-field
            v-model="registPassword"
            required
            type="password"
            label="密码"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="registHandler">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
  <footer-bar></footer-bar>
  </div>
</template>

<script>
import FooterBar from '../components/Footer-bar'
import axios from "axios";
import url from "@/service.config.js";
import { mapActions } from "vuex";
export default {
   components: {
    FooterBar
  },
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      registUsername: "",
      registPassword: "",
      login: false
    };
  },
  methods: {
    ...mapActions(["changeLogin"]),
    // 注册处理方法
    registHandler() {
      console.log("注册");
      axios({
        method: "post",
        url: url.registUser,
        data: {
          userName: this.registUsername,
          password: this.registPassword
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success("注册成功");
            this.registUsername = "";
            this.registPassword = "";
          }
        })
        .catch(err => {
          console.log(err);
          this.$toast.fail("注册失败");
        });
    },
    // 登录处理方法

    loginHandler() {
      // 如果显示为登录
      if (!this.login) {
        axios({
          url: url.loginUser,
          method: "post",
          data: {
            userName: this.loginUsername,
            password: this.loginPassword
          }
        })
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
             
              this.$toast.success("登录成功");
              this.login = true;
              // 存入缓存
              let data = {
                name: this.loginUsername,
                password: this.loginPassword,
                flag: this.login
              };
              data = JSON.stringify(data);
              localStorage.setItem("login", data);
              // 改变首页登录状态
              this.changeLogin(res.data.userInfo);
              setTimeout(() => {
                this.$router.go(-1);
              }, 500);
            } else {
              this.$toast.fail("登录失败");
            }
          })
          .catch(err => {
            console.log(err);
            this.$toast.fail("登录失败");
          });
      } else {
        // 模态框
        this.$dialog.confirm({
          message: '您确定退出登录吗？'
        }).then(() => {
           localStorage.clear()
            this.loginUsername = "";
            this.loginPassword = "";
            this.login = false;
            this.changeLogin({});
        }).catch(() => {
          // on cancel
        });
      }
    }
  },
  mounted() {
      let str = JSON.parse(localStorage.getItem("login"));
      // console.log(str);
      if(str){
        if (str.flag) {
                this.loginUsername = str.name;
                this.loginPassword = str.password;
                this.login = true;
              }
      }else{
         this.loginUsername = "";
        this.loginPassword = "";
        this.login = false;
      }
  }
};
</script>

<style scoped lang="scss">
.van-group {
  margin-top: 0.2rem;
}
</style>
