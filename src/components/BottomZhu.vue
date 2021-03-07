<template>
  <div class="bottom-zhu">
    <van-search v-model="inputValue" @click="$router.push('/search')" show-action placeholder="请输入搜索关键词">
      <template #action>
        <div>搜索</div>
      </template>
    </van-search>

    <van-row type="flex" justify="center">
      <van-col span="6" @click="$router.push('/category')">分类</van-col>
      <van-col span="6">书架</van-col>
      <van-col span="6">联系我们</van-col>
    </van-row>

    <div class="co-info">
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202006103"
      >
        <img
          src="http://statics.zhuishushenqi.com/msite/icon/recordIcon.png"
          alt=""
        />
        <p>沪公网安备 31011202006103号</p>
      </a>
    </div>

    <div class="co-infop">
      上海元聚网络科技有限公司 增值电信业务经营许可证沪B2-20170022
      网络文化经营许可证沪网文（2016）3206-227号
      出版物经营许可证新出发沪批字第U7659号
    </div>

    <div class="co-phone">客服电话：0793-8688116</div>
    <div class="co-phone">举报电话：021-54700287</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: null
    }
  },
};
</script>

<style scoped lang="less">
.bottom-zhu {
  padding-bottom: 30px;
  background-color: #ddd;
  .van-search {
    background-color: #ddd;
  }
  .van-row {
    margin-top: 10px;
    color: #333;
    font-size: 12px;
    font-weight: 600;
  }
  .co-info {
    width: 100%;
    padding: 20px 0 0 0;
    margin: 0 auto;
    text-align: center;
    color: #999999;
    font-size: 12px;
    a {
      width: 193px;
      list-style-type: none;
      color: #999999;
      text-decoration: none;
      display: block;
      height: 20px;
      line-height: 20px;
      display: flex;
      margin: 0 auto;
      p {
        margin: 0;
        // float: left;
      }
    }
  }
  .co-infop{
    padding: 0 10px;
    margin-top: 13px;
    font-size: 12px;
    color: #999999;
    text-align: center;
    line-height: 1.2;
  }
  .co-phone{
    color: #999999;
    font-size: 12px;
    text-align: center;
    margin-top: 13px;
  }
}
</style>