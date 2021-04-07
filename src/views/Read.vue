<template>
  <div class="read" v-if="content" @click="flag = !flag">
    <ul>
      <li>
        <h3>{{ content.title }}</h3>
        <div>{{ content.cpContent }}</div>
      </li>
    </ul>
    <div class="next" v-if="!flag">
      <ul>
        <li @click="subtraction">上一章</li>
        <li>目录</li>
        <li @click="add">下一章</li>
      </ul>
    </div>
    <div class="catalog">
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
import CatalogList from "@/components/CatalogList.vue"

export default {
  // props: ["order"],
  data() {
    return {
      // num: 0,
      content: null,
      top: 0,
      flag: true,
      num: 0,
    };
  },
  components: {
    CatalogList
  },
  computed: {
    ...mapState(["chapter"]),
  },
  created() {
    // this.getContent(this.$route.query.order);
    this.num = this.$route.query.order;
    this.getContent(this.num);
  },
  methods: {
    getContent: function (n) {
      this.content = null;
      this.axios
        .get("ips/chapter/" + encodeURIComponent(this.chapter.chapters[n].link))
        .then((res) => {
          this.content = res.data.chapter;
        });
      // for (var i = 0; i <= this.num; i++) {
      //   this.axios
      //     .get(
      //       "ips/chapter/" +
      //         encodeURIComponent(this.chapter.chapters[i].link)
      //     )
      //     .then((res) => {
      //       this.content.push(res.data.chapter);
      //       var lis = document.querySelectorAll(".read ul li");
      //       // console.log(lis);
      //       // let top = 0;
      //       for (var j = 0; j <= lis.length; j++) {

      //         if(j==lis.length){
      //           this.top += document.documentElement.clientHeight;
      //         }else{
      //           this.top += lis[j].offsetHeight + 20;
      //         }
      //       }
      //       var height = this.top + 17;
      //       document.documentElement.scrollTop = height;
      //       // console.log(document.documentElement.clientHeight);
      //     });
      // }
      this.$store.commit("updateNum", this.num);
    },
    subtraction: function(){
      this.num--;
      if(this.num < 0){
        this.num = 0;
      }
      this.getContent(this.num);
    },
    add: function(){
      this.num++;
      this.getContent(this.num);
    }
  },
  // watch: {
  //   num: function () {
  //     this.getContent(this.num);
  //   },
  // },
};
</script>

<style scoped lang="less">
.read {
  background-color: #eee6dd;
  & > ul {
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
  .next {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    ul {
      display: flex;
      color: white;
      li {
        flex: 1;
        text-align: center;
        line-height: 50px;
      }
    }
  }
  .catalog {
    height: 100vh;
    position: fixed;
    // float: left;
    left: 0;
    top: 0;
    width: 70%;
    background-color: white;
    overflow-y: scroll;
    padding-left: 10px;
    display: none;
    ul {
      width: 70%;
    }
  }
}
</style>