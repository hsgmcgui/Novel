<template>
  <div class="comments">
      <h3>热门书评</h3>
      <ul v-if="comments">
        <CommensList  v-for="(item,index) in comments.slice(0,6)" :key="index" :item="item" />
      </ul>
      <div else>
        暂无评论
      </div>
  </div>
</template>

<script>
import CommensList from "@/components/CommensList.vue"
export default {
  components: {
    CommensList
  },
  props: ["comments"]
}
</script>

<style scoped lang="less">
  .comments{
    padding: 0 17px;
    &>h3{
      color: #222222;
      font-size: 14px;
      font-weight: 400;
      line-height: 34px;
    }
    &>div{
      height: 40px;
      line-height: 40px;
      color: #999;
      font-size: 12px;
    }
  }
</style>