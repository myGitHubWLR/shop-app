<template>
  <div id="app">
    <!-- 缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
  
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  
</style>
