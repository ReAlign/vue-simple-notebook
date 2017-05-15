/**
 * store 主页面
 * author anliangjun(hrealign@yeah.net)
 * date   2017-05-11
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions.js';
import * as config from './config.js';
Vue.use(Vuex);
const getDate = () => { //获取当天日期
    const date = new Date(),
        seperator1 = "-",
        year = date.getFullYear();
    var month = date.getMonth() + 1,
        day = date.getDate();

    month = formatStyle(month, 1);
    day = formatStyle(day);

    return year + seperator1 + month + seperator1 + day;
}

const getTime = () => { //获取当天时间
    const time = new Date(),
        seperator1 = ":";
    var hour = time.getHours(),
        minu = time.getMinutes(),
        seco = time.getSeconds();

    hour = formatStyle(hour);
    minu = formatStyle(minu);
    seco = formatStyle(seco);

    return getDate() + "<br>" + hour + seperator1 + minu + seperator1 + seco;
}

const formatStyle = (str, limit = 1) => {
    if (str >= limit && str <= 9) {
        str = "0" + str;
    }
    return str;
}

const localEvent = function(item) {
    this.get = function() {
        return JSON.parse(localStorage.getItem(item)) || [];
    }
    this.set = function(obj) {
        localStorage.setItem(item, JSON.stringify(obj));
    }
    this.clear = function() {
        localStorage.removeItem(item);
    }
}
const local = new localEvent('ls_notebook');
const state = {
    event: local.get(),
    status: config.status
}

const mutations = {
    ADDEVENT(states, obj) {
        let len = states.event.length + 1;
        obj.items.id = len;
        states.event.unshift(obj.items);
        local.set(states.event);
    },
    EVENTDONE(states, obj) {
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 2;
                states.event[i].time = getTime();
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        local.set(states.event);
    },
    EVENTTODO(states, obj) {
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 1;
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        local.set(states.event);
    },
    EVENTCANCEL(states, obj) {
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 3;
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        local.set(states.event);
    },
    CLEAREVENT(states) {
        states.event = [];
        local.clear();
    },
    DELEVENT(states, info) {
        if (states.event[info.index].id === info.id) {
            states.event.splice(info.index, 1);
        } else {
            states.event.filter(function(d, i) {
                if (d.id == info.id) {
                    states.event.splice(i, 1);
                }
            })
        }
        local.set(states.event);
    },
    EDITEVENT(states, info) {
        if (states.event[info.index].id === info.id) {
            states.event[info.index].content = info.content;
        } else {
            states.event.filter(function(d) {
                if (d.id == info.id) {
                    d.content = info.content;
                }
            })
        }
        local.set(states.event);
    }
}
export default new Vuex.Store({state, actions, mutations})
