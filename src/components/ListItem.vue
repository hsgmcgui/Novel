<template>
  <li class="list-item" @click="$router.push('/book/'+book._id)">
    <van-card
      :lazy-load="true"
      :desc="book.shortIntro"
      :title="book.title"
      :thumb="`http://statics.zhuishushenqi.com${book.cover}`"
    >
      <!-- <template #footer>
        <van-button size="mini">{{ book.majorCate }}</van-button>
      </template> -->
    </van-card>
    <div class="renqi" :class="{ active: luyou === 'luyou' }">
      <ul :class="{ active2: luyou === 'luyou' }">
        <li>{{ book.minorCate }}</li>
        <li>|</li>
        <li>{{ book.latelyFollower | formatPlayCountWan }}</li>
        <li>人气</li>
      </ul>
      <div>{{ book.majorCate }}</div>
    </div>
    <!-- <div>111</div> -->
  </li>
</template>

<script>
export default {
  props: ["book", "luyou"],
  filters: {
    formatPlayCountWan: function (value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style scoped lang="less">
.list-item {
  list-style: none;
  font-size: 12px;
  position: relative;
  .van-card {
    padding: 10px 0;
    background-color: #fff;
    .van-card__thumb {
      width: 60px;
      height: 80px;
      .van-image {
        .van-image__img {
          display: block;
          border-radius: 0;
        }
      }
    }
    .van-card__content {
      .van-card__title {
        font-size: 14px;
        color: #333;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .van-card__desc {
        max-height: 40px;
        white-space: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }

  .renqi {
    width: calc(100vw - 85.6px);
    display: flex;
    position: absolute;
    right: 0;
    top: 70%;
    line-height: 14px;
    padding-left: 8px;
    box-sizing: border-box;
    ul {
      flex: 2;
      height: 14px;
      display: flex;
      position: relative;
      // margin-right: 20%;
      // left: 8px;
      li {
        margin-right: 5px;
      }
      li:nth-child(3) {
        color: red;
        margin-right: 0;
      }
    }
    .active2 {
      // flex: 2;
      overflow: hidden;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
    div {
      // flex: 1;
      height: 14px;
      position: relative;
      right: 0;
      border: 1px solid #ff8400;
      color: #ff8400;
      line-height: 12px;
      padding: 0 3px;
      overflow: hidden;
    }
  }
  .active {
    width: calc(100vw - 145px);
  }
}
</style>