<template>
  <div class="ranking" v-if="ranking">
    <GeneralHeader title="排行榜" />
    <ul class="header">
      <li
        :class="{ active: type === 'epub' }"
        @click="$router.push('/ranking?type=epub')"
      >
        出版
      </li>
      <li
        :class="{ active: type === 'male' }"
        @click="$router.push('/ranking?type=male')"
      >
        男频
      </li>
      <li
        :class="{ active: type === 'female' }"
        @click="$router.push('/ranking?type=female')"
      >
        女频
      </li>
    </ul>
    <div class="nav-neirong">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item, index) in rankCategory[type]"
            :key="index"
            :title="item.shortTitle"
          />
        </van-sidebar>
      </div>
      <ul class="right">
        <ListItem
          v-for="(book, index) in ranking.books"
          :key="index"
          :book="book"
          :luyou="'luyou'"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListItem from "@/components/ListItem.vue";
import GeneralHeader from "@/components/GeneralHeader.vue"

export default {
  computed: {
    ...mapState(["rankCategory"]),
  },
  components: {
    ListItem,
    GeneralHeader
  },
  data() {
    return {
      type: "male",
      activeKey: 0,
      ranking: null,
      luyou: 'ranking'
    };
  },
  methods: {
    getRanking: function (id) {
      this.axios.get("http://novel.kele8.cn/rank/" + id).then((response) => {
        // console.log(response);
        this.ranking = response.data.ranking;
        // console.log(this.ranking);
      });
    },
    getLists: function () {
      this.getRanking(this.rankCategory[this.type][this.activeKey]._id);
    },
  },
  created() {
    this.getLists();
  },
  watch: {
    type: function () {
      this.activeKey = 0;
      this.getLists();
    },
    activeKey: function () {
      this.getLists();
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      vm.type = to.query.type || "male";
      vm.luyou = to.query;
    });
  },
  beforeRouteUpdate(to, from, next) {
    // ...
    this.type = to.query.type || "male";
    this.luyou = to.query;
    next();
  },
};
</script>

<style scoped lang="less">
.ranking {
  background-color: white;
  .header {
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    line-height: 34px;
    font-size: 12px;
    color: #8a8a8f;
    border-bottom: 1px solid #ddd;
    .active {
      color: red;
      border-bottom: 2px solid red;
    }
  }
  .nav-neirong {
    display: flex;
    padding-right: 5px;
    .left {
      .van-sidebar {
        height: calc(100vh - 34px);
        overflow-y: scroll;
      }
    }
    .right {
      flex: 1;
      height: calc(100vh - 34px);
      overflow-y: scroll;
    }
  }
}
</style>