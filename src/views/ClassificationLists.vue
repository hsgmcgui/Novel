<template>
  <div class="classification-lists">
    <GeneralHeader :title="$route.params.name" />
    <ul v-if="booklists">
      <ListItem v-for="(book,index) in booklists.books" :key="index" :book="book" :luyou="'/category'"/>
    </ul>
  </div>
</template>

<script>
import GeneralHeader from "@/components/GeneralHeader.vue";
import ListItem from "@/components/ListItem.vue";
export default {
  components: {
    GeneralHeader,
    ListItem,
  },
  data() {
    return {
      booklists: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    window.axios
      .get(
        "http://novel.kele8.cn/category-info?gender="+to.query.gender+"&type=hot&major=" +
          to.params.name
      )
      .then((res) => {
        next((vm) => {
          vm.booklists = res.data;
        });
      });
  },
};
</script>

<style scoped lang="less">
    .classification-lists{
        background-color: white;
        ul{
            padding: 0 12.8px;
        }
    }
</style>