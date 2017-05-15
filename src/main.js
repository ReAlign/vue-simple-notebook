/**
 * 主页面
 * author anliangjun(hrealign@yeah.net)
 * date   2017-05-10
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuex from 'vuex';
import store from './store/index';
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store: store,
    template: '<App/>',
    components: {App}
});
