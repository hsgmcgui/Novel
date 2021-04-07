<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view />
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  created() {
    this.axios.get("api/ranking/gender").then((response) => {
      // this.category = response.data;
      this.$store.commit("updateRankCategory", response.data);
      
    });
    this.axios.get("api/book/search-hotwords").then((res) => {
      // console.log(res);
      this.$store.commit("updateSearchHot", res.data.searchHotWords);
    })
  },

};
</script>

<style scoped lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  background-color: #ddd;
}
</style>
