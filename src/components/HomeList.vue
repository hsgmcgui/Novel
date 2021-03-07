<template>
  <div class="home-list">
      <h3><slot></slot></h3>
      <ul>
        <ListItem v-for="(book,index) in booklists.books.slice(0,4)" :key="index" :book="book" :luyou="'/'" />
      </ul>
      <div class="genduo" @click="$router.push({path:'/recommend/'+id,query: {booklists:booklists,title: title}})">查看更多></div>
  </div>
</template>

<script>

import ListItem from "@/components/ListItem.vue"
export default {
  props: ["booklists","id","title"],
  components: {
    ListItem
  }
}
</script>

<style scoped lang="less">
  .home-list{
    // width: 100%;
    padding: 0 12.8px;
    margin-top: 5px;
    background-color: white;
    h3{
      color: #222;
      font-size: 14px;
      line-height: 40px;
      margin: 0;
      position: relative;
      &::before{
        content: '';
        display: inline-block;
        width: 0;
        height: 14px;
        border-left: 2px solid #b93321;
        position: absolute;
        left: -12px;
        top: 13px;
      }
    }
    .genduo{
      color: #b93321;
      font-size: 14px;
      line-height: 38px;
      border-top: 1px solid #ddd;
      text-align: center;
    }
  }
</style>