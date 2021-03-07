import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rankCategory: null,
        chapter: null,
        num: 0,
        hotBooks: null
    },
    mutations: {
        updateRankCategory: function(state, payload) {
            state.rankCategory = payload;
        },
        updateChapter: function(state, payload) {
            state.chapter = payload
        },
        updateNum: function(state, payload) {
            state.num = payload;
        },
        updateSearchHot: function(state, payload) {
            state.hotBooks = payload;
        }
    },
    actions: {},
    modules: {}
})