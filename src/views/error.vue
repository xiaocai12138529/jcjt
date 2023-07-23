<template>
  <div class="container">
    <img alt="" src="../assets/images/404.png">
    <router-link class="link" to="/index">返回首页</router-link>
  </div>
</template>
<script>
export default {
  name: 'ERROR'
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  text-align: center;
  img {
    width: 50vw;
  }

  .link {
    text-align: center;
    margin-top: 1em;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
