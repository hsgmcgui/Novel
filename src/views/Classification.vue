<template>
  <div class="category" v-if="categorys">
    <GeneralHeader title="分类" />
    <div class="male fenlei">
      <h3>男生</h3>
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(value, index) in categorys.male"
          :key="index"
          @click="$router.push('/category/' + value.name + '?gender=male')"
        >
          <h3>{{ value.name }}</h3>
          <p>{{ value.bookCount }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="female fenlei">
      <h3>女生</h3>
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(value, index) in categorys.female"
          :key="index"
          @click="$router.push('/category/' + value.name + '?gender=female')"
        >
          <h3>{{ value.name }}</h3>
          <p>{{ value.bookCount }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="chuban fenlei">
      <h3>出版</h3>
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(value, index) in categorys.press"
          :key="index"
          @click="$router.push('/category/' + value.name + '?gender=press')"
        >
          <h3>{{ value.name }}</h3>
          <p>{{ value.bookCount }}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import GeneralHeader from "@/components/GeneralHeader.vue";
export default {
  components: {
    GeneralHeader,
  },
  data() {
    return {
      categorys: null,
    };
  },
  created() {
    this.axios.get("api/cats/lv2/statistics").then((response) => {
      // console.log(response);
      this.categorys = response.data;
      // console.log(this.categorys);
    });
  },
  methods: {
    onClickLeft: function () {
      // console.log(1111)
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="less">
.category {
  background-color: white;
  // .van-nav-bar {
  //   color: white;
  //   background: #b93321;
  //   .van-nav-bar__content {
  //     color: white;
  //     .van-nav-bar__left{
  //       color: white;
  //     }
  //     .van-nav-bar__title {
  //       color: white!important;
  //       font-weight: 600;
  //     }
  //   }
  // }
  .fenlei {
    font-size: 12px;
    color: #999;
    & > h3 {
      font-weight: 400;
    }
    .van-grid {
      .van-grid-item {
        .van-grid-item__content {
          h3 {
            margin: 0;
            color: #333;
            font-size: 15px;
            font-weight: 700;
          }
          p {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>