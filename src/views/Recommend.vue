<template>
  <div class="recommend">
    <GeneralHeader :title="title1" />
    <ul>
      <ListItem
        v-for="(book, index) in booklists"
        :key="index"
        :book="book"
        :luyou="'/recommend'"
      />
    </ul>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";
import GeneralHeader from "@/components/GeneralHeader.vue";
export default {
  props: [],
  components: {
    ListItem,
    GeneralHeader,
  },
  data() {
    return {
      booklists: null,
      title1: null
    };
  },
  created() {
    this.booklists = this.$route.query.booklists.books;
    this.title1 = this.$route.query.title
    // console.log(1111);
  },
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   next((vm) => {
  //     // 通过 `vm` 访问组件实例
  //     vm.booklists = to.query.booklists.books;
  //   });
  // },
};
</script>

<style scoped lang="less">
  .recommend{
    margin: 0;
    background-color: white;
    ul{
      padding: 0 12.8px;
    }
  }
</style>