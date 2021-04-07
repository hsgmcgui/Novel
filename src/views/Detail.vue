<template>
  <div class="detail">
    <GeneralHeader title="书籍详情" />

    <div v-if="bookInfo">
      <div class="detail-header">
        <van-card
          :title="bookInfo.title"
          :thumb="`http://statics.zhuishushenqi.com${bookInfo.cover}`"
        >
          <template #tags>
            <van-tag class="active" plain type="danger">{{
              bookInfo.author
            }}</van-tag>
            <van-tag plain type="danger">|</van-tag>
            <van-tag plain type="danger">{{ bookInfo.minorCate }}</van-tag>
            <van-tag plain type="danger">|</van-tag>
            <van-tag plain type="danger">{{
              bookInfo.wordCount | formatPlayCountWan
            }}</van-tag>
          </template>
        </van-card>
        <div class="update">更新日期：{{ time }}</div>
      </div>
      <div class="boo-button">
        <button class="add">加入书架</button>
        <button
          class="read"
          @click="$router.push({path: `/book/${$route.params.id}/read`,query: {order: num}})"
        >
          开始阅读
        </button>
      </div>
      <div class="reader-data">
        <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <h3>追人气</h3>
            <p>{{ bookInfo.latelyFollower | formatPlayCountWan }}</p>
          </van-grid-item>
          <van-grid-item>
            <h3>读者留存率</h3>
            <p>{{ bookInfo.retentionRatio }}%</p>
          </van-grid-item>
          <van-grid-item>
            <h3>日更字数/天</h3>
            <p>{{ bookInfo.serializeWordCount }}</p>
          </van-grid-item>
        </van-grid>
      </div>

      <div class="long-intro" :class="{ active2: !flas }" @click="flas = !flas">
        {{ bookInfo.longIntro }}
      </div>

      <div
        class="book-catalog"
        @click="$router.push(`/book/${$route.params.id}/chapter`)"
      >
        <div class="left">目录</div>
        <div class="right">
          <i></i>
          <span>[{{ time }}更新]&nbsp;&nbsp;{{ bookInfo.lastChapter }}</span>
        </div>
      </div>

      <Comments :comments="comments" />
    </div>

    <BottomZhu />
  </div>
</template>

<script>
import { mapState } from "vuex";
import GeneralHeader from "@/components/GeneralHeader.vue";
import Comments from "@/components/Comments.vue";
import BottomZhu from "@/components/BottomZhu.vue";

export default {
  components: {
    GeneralHeader,
    Comments,
    BottomZhu,
  },
  data() {
    return {
      bookInfo: null,
      time: null,
      flas: false,
      comments: null,
    };
  },
  computed: {
    ...mapState(['num'])
  },
  created() {
    // this.axios.get("http://novel.kele8.cn/book-info/" + id).then((response) => {
    //   // console.log(response);
    //   this.ranking = response.data.ranking;
    //   console.log(this.ranking);
    // });
    // this.axios
    //   .get("http://novel.kele8.cn/book/reviews?book=" + this.$route.params.id)
    //   .then((res) => {
    //     this.comments = res.data.reviews;
    //   });
    this.axios
      .get("api/book/" + this.$route.params.id)
      .then((res) => {
          this.bookInfo = res.data;
          //   console.log(res.data);
          this.time = res.data.updated.slice(5, 10);
      });

    this.axios
      .get("api/post/review/best-by-book?book=" + this.$route.params.id)
      .then((res) => {  
          // console.log(res.data.reviews)
          this.comments = res.data.reviews;
      });
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    window.axios
      .get("api/book/" + to.params.id)
      .then((res) => {
        next((vm) => {
          vm.bookInfo = res.data;
          //   console.log(res.data);
          vm.time = res.data.updated.slice(5, 10);
        });
      });

    window.axios
      .get("api/post/review/best-by-book?book=" + to.params.id)
      .then((res) => {
        next((vm) => {
          // console.log(res.data.reviews)
          vm.comments = res.data.reviews;
        });
      });
  },
  // beforeRouteUpdate(to, from, next) {
  //   // ...
  //   this.axios
  //     .get("http://novel.kele8.cn/book/reviews?book=" + to.params.id)
  //     .then((res) => {
  //       this.comments = res.data.reviews;
  //     });
  //   next();
  // },
  beforeRouteLeave(to, from, next) {
    // ...
    if (to.name == "Read" || to.name == "Chapter") {
    //   console.log("获取章节");

      // 获取书籍源
      this.axios
        .get(
          "api/btoc?view=summary&book=" +
            this.bookInfo._id
        )
        .then((res) => {
          // 根据书籍源获取 章节
        //   console.log(res.data[0]._id);
          this.axios
            .get("api/atoc/"+res.data[0]._id+"?view=chapters")
            .then((res) => {
            //   console.log(res.data);
              this.$store.commit("updateChapter", res.data);
              next();
            });
        });
    }else{
      next();
    }
  },
  filters: {
    formatPlayCountWan: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  destroyed() {
    this.$store.commit("updateNum", 0);
  },
};
</script>

<style scoped lang="less">
.detail {
  background-color: white;
  .detail-header {
    position: relative;
    .van-card {
      .van-card__thumb {
        width: 60px;
        height: 80px;
        // border-radius: 0;
      }
    }
    .van-card__content {
      .van-card__title {
        font-size: 16px;
        font-weight: 400;
        color: #222;
        line-height: 34px;
        overflow: hidden;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .van-tag {
        color: #999999;
        font-size: 12px;
        //   border: none;
        &::before {
          border: none;
        }
      }
      .active {
        color: #b93321;
      }
    }
    .update {
      width: calc(100vw - 92px);
      position: absolute;
      right: 8px;
      top: 70px;
      font-size: 12px;
      color: #999999;
    }
  }
  .boo-button {
    padding: 17px;
    button {
      width: 45%;
      height: 40px;
      border: 1px solid #b93321;
    }
    .add {
      background: white;
      color: #b93321;
      margin-right: 10%;
    }
    .read {
      color: white;
      background: #9dc5cf;
      border-color: #9dc5cf;
    }
  }
  .reader-data {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .van-grid {
      h3 {
        color: #999999;
        font-size: 12px;
        margin: 0;
      }
      p {
        color: #222222;
        font-size: 16px;
        font-weight: 400;
        margin: 0;
        margin-top: 5px;
      }
    }
  }
  .long-intro {
    padding: 17px 17px 0;
    color: #222222;
    font-size: 13px;
    //   line-height: 20px;
    overflow: hidden;
  }
  .active2 {
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .book-catalog {
    padding: 17px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 20px;
    line-height: 20px;
    margin-top: 17px;
    //   position: relative;
    //   display: flex;
    .left {
      font-size: 15px;
      color: #222222;
      //   margin-right: 20px;
      float: left;
    }
    .right {
      color: #999;
      font-size: 12px;
      width: 60%;
      float: right;
      overflow: hidden;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      i {
        display: block;
        width: 17px;
        height: 17px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==");
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: 50%;
        transform: rotate(-90deg);
        float: right;
      }
    }
  }
}
</style>
