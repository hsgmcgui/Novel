<template>
  <div class="read" v-if="content">
    <ul>
      <li v-for="(item, index) in content" :key="index">
        <h3>{{ item.title }}</h3>
        <div>{{ item.cpContent }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  // props: ["order"],
  data() {
    return {
      // num: 0,
      content: [],
      top: 0,
    };
  },
  computed: {
    ...mapState(["chapter", "num"]),
  },
  created() {
    // if (this.order) {
    //   this.num = this.order;
    // }
    this.getContent();
  },
  methods: {
    getContent: function () {
      this.content = [];
      for (var i = 0; i <= this.num; i++) {
        this.axios
          .get(
            "http://novel.kele8.cn/chapters/" +
              encodeURIComponent(this.chapter.chapters[i].link)
          )
          .then((res) => {
            this.content.push(res.data.chapter);
            var lis = document.querySelectorAll(".read ul li");
            // console.log(lis);
            // let top = 0;
            for (var j = 0; j <= lis.length; j++) {
              
              if(j==lis.length){
                this.top += document.documentElement.clientHeight;
              }else{
                this.top += lis[j].offsetHeight + 20;
              }
            }
            var height = this.top + 17;
            document.documentElement.scrollTop = height;
            // console.log(document.documentElement.clientHeight);
          });
      }
    },
    height: function () {},
  },
  watch: {
    num: function () {
      this.getContent();
    },
  },
};
</script>

<style scoped lang="less">
.read {
  background-color: #eee6dd;
  ul {
    padding: 17px 17px;
    li {
      margin-top: 20px;
      h3 {
        margin: 0;
        font-size: 26px;
        color: #333;
        font-weight: 400;
        padding-bottom: 10px;
        text-align: center;
      }
      div {
        white-space: pre-wrap;
        // text-indent: 2em;
        font-size: 22px;
        line-height: 40px;
      }
    }
  }
}
</style>