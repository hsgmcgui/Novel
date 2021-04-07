<template>
  <div class="search">
    <GeneralHeader title="搜索" />
    <div class="search-son">
      <van-search
        v-model.trim="inputValue"
        @input="inputing = true"
        show-action
        placeholder="请输入搜索关键词"
      >
        <template #action>
          <div @click="getInput(inputValue)">搜索</div>
        </template>
      </van-search>

      <div class="hot" v-if="!inputing && !books.length">
        <h3>热门推荐</h3>
        <ul>
          <li v-for="(name, index) in hotBooks.slice(0,6)" :key="index" @click="getInput(name.word)">{{ name.word }}</li>
        </ul>
      </div>
    </div>
    <ul class="search-hint" v-if="inputing && searchHint.length">
      <li
        @click="getInput(name)"
        v-for="(name, index) in searchHint"
        :key="index"
      >
        {{ name }}
      </li>
    </ul>

    <ul class="book" v-if="!inputing && inputValue">
      <BookList v-for="(book, index) in books" :key="index" :book="book" />
    </ul>
  </div>
</template>

<script>
import GeneralHeader from "@/components/GeneralHeader.vue";
import BookList from "@/components/BookList.vue";
import { mapState } from "vuex";
export default {
  components: {
    GeneralHeader,
    BookList,
  },
  data() {
    return {
      inputValue: null,
      inputing: false,
      searchHint: [],
      books: [],
    };
  },
  computed: {
    ...mapState(["hotBooks"]),
  },
  watch: {
    inputValue: function (n) {
      if (n) {
        if (this.inputing) {
          this.axios
            .get("api/book/auto-complete?query=" + this.inputValue)
            .then((res) => {
              this.searchHint = res.data.keywords;
              //   console.log(res.data.keywords);
            });
        } else {
          // console.log("搜索结果");
        }
      } else {
        this.inputing = false;
        this.searchHint = [];
        this.books = [];
      }
    },
  },
  methods: {
    getInput: function (n) {
      if (n) {
        this.inputing = false;
        this.inputValue = n;
        this.axios
          .get("api/book/fuzzy-search?query=" + n)
          .then((res) => {
            this.books = res.data.books;
            // console.log(res.data)
          });
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    this.inputing = false;
    this.searchHint = [];
    this.books = [];
    this.inputValue = null;
    next();
  },
};
</script>

<style scoped lang="less">
.search {
  background-color: white;
  .search-son {
    padding: 0 12.8px;
    .hot {
      h3 {
        color: #6b6b6b;
        font-size: 18px;
        font-weight: 400;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          color: #9b9ba3;
          font-size: 12px;
          background-color: #efeff4;
          height: 25px;
          line-height: 25px;
          border-radius: 12.5px;
          padding: 0 8px;
          margin: 0 8px 8px 0;
        }
      }
    }
  }
  .search-hint {
    padding: 0 17px;
    li {
      height: 40px;
      line-height: 40px;
      color: #222;
      font-size: 14px;
      border-bottom: 1px solid #ddd;
    }
  }
  .book {
    padding: 0 12.8px;
  }
}
</style>