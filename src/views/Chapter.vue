<template>
  <div class="chapter">
    <van-nav-bar
      title="优质书库"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    >
      <template #right>
        <van-icon
          name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC2UlEQVRoQ+2ZS6hOURTHf39JKOUxlfKOUkpMFEZSl5tCed0kBl7FNVKUujHFgC4jeRR5xFBSUmZKSvLOjYEBIQlJllaO+nC/c/bZ55z7fW5nTb7B2Xut9dv/dfZeZ39ikJgGCQc1SLspWStSK1LRClRaWmbWBcwFXgC9kr5WxFHdrmVmR4CdDYlfA9ZKel8FTOmKmJn7PAZs7SfhGwnMm7JhSgUxszHAaWBpSqLXgTWS3pUJUxqImY0CLgBLAhK8CWyQ9CpgbNCQUkASiEvA4qCovwY9AZZJ8t/CVhjEzMYBDrEoIpunQIck/y1khUDMbFbyTswukEUf0CnpfgEf8duvmXnyrsTkIgkkc58DKyXdi/UVpUgCcR6YHhu4n3mPgS5Jd2J85gYxsznAGWBGTMCMOR+BTZJc6VyWC8TMOoCzwOhcUfIN/gKsk3Qlz7RgEDNbDpwDhucJEDnWYbyduRo6PwjEzFYkSgwExO/cvcFcL+lyCEwmiJmtBk4OkBJ/5+wwGyX5xpJqTUHMbAiwB9gPDMtyVOHzb8Au4ISkH83ipIF4OV2E+LOmRDgDVqWVWRpIN3CoxGSKutot6XCMImOBHuCDd6rA+KKZRMz3c8V3ypfA8bTWP/Nl9+Bm9gCYGZFI0SmvgWmSPmU5CgXxVntqlrMKnvuX5AJJj7J8/w8gCyU9rEEaV8DMWllatSL/lGOEIt5a3AY+JweqH2gjgfnAiKx6b3juL3vLFLkLbAaeAd8bQIYm3zDeLUwIhGkpSI8k78/6NTPz09l7pxBrKcg2Sb0pIFv8HjiEAmgpyA5JfmXaTJHtwNEapMkKVHGyt7UifhM4JbAcygR56zeYkrxpTbVQRfwCbVKWs+R5mSB+Yz9PkscvBeSWd6FZzioA6ZM0MSRuqCKdwKnA+6x9kg6m7Fp7gQMhyQHdkvyfr0wLAsn00gYDapA2EOGPFGpFakUqWoFBU1o/ASNuD0IW//0zAAAAAElFTkSuQmCC"
          size="26"
        />
      </template>
    </van-nav-bar>
    <div class="chapter-nav">
      <div class="mulu">
        <span>目录</span>
        <span>共{{ chapter.chapters.length }}章</span>
      </div>
      <ul v-if="chapter">
        <CatalogList
          v-for="(item, index) in chapter.chapters"
          :key="index"
          :title="item.title"
          :order="item.order"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CatalogList from "@/components/CatalogList.vue";
export default {
  computed: {
    ...mapState(["chapter"]),
  },
  components: {
    CatalogList,
  },
};
</script>

<style scoped lang="less">
.chapter {
  background-color: white;
  .van-nav-bar{
    background-color: #9dc5cf;
  }
  .chapter-nav{
    padding-left: 17px;
    .mulu{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      span:nth-child(1){
        font-size: 14px;
        color: #000;
        font-weight: 700;
        margin-right: 5px;
      }
      span:nth-child(2){
        font-size: 12px;
        color: #9999;
      }
    }
  }
}
</style>