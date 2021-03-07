<template>
  <li class="catalog-list" v-if="title && order" @click="updateClickNum">
    <span>{{ order }}</span>
    <span>{{ title }}</span>
  </li>
</template>

<script>
export default {
  props: ["title", "order"],
  methods: {
    updateClickNum: function(){
      this.$router.push(`/book/${this.$route.params.id}/read`);
      this.$store.commit("updateNum", this.order-1);
    }
  },
};
</script>

<style scoped lang="less">
.catalog-list {
  padding: 0 17px 0 0;
  height: 40px;
  line-height: 40px;
  color: #999999;
  font-size: 12px;
  border-bottom: 1px solid #f8f8f8;
}
</style>