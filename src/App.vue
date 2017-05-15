<template>
<div id="app">
    <!-- header -->
    <n-header :is-show="tools" @tools="tools =! tools"></n-header>
    <!-- main -->
    <section class="container">
        <add-event></add-event>
        <div class="event-content" v-for="item in getStructure">
            <div class="event-tab" @click.self="changeCollapse(item.type,$event)">
                {{item.desc}}
                <span :class="{'close-span': !collapse[item.type].show}"></span>
            </div>
            <ul class="event-box" :style="{'height':'auto','display':'block'}">
                <li class="event-list" v-for="(value,i) in getList(item.type)">
                    <input type="checkbox"
                           id="{item.type+i}"
                           v-if="item.type == 1"
                           checked
                           @click="moveTo(value.id,item.type,$event)">
                    <input type="checkbox"
                           v-else
                           id="{item.type+i}"
                           @click="moveTo(value.id,item.type,$event)">
                    <label for="{item.type+i}"
                           class="event-con">
                        {{value.content}}
                    </label>
                    <span v-if="item.type == 1"
                          class="event-time"
                          v-html="value.time"></span>
                    <button v-else class="cancel-btn"
                            @click="moveOpt(value.id,item.type)">
                        {{item.opt}}
                    </button>
                </li>
            </ul>
        </div>
        <!-- menu -->
        <n-tools :is-show="tools"
                 @cleardialog="clearData"
                 @tools="tools =! tools">
        </n-tools>
    </section>
    <!-- dialog -->
    <n-dialog :is-show="dialog"
              :msg="tips"
              @cancel="dialog = false"
              @sure="sureDialog">
    </n-dialog>
</div>
</template>

<script>
import nHeader from './components/header.vue';
import addEvent from './components/add_event.vue';
import nTools from './components/tools.vue';
import nDialog from './components/dialog.vue';

export default {
    data() {
        var self = this;
        return {
            collapse: [{
                    show: true,
                    contentHeight: 'auto'
                },
                {
                    show: true,
                    contentHeight: 'auto'
                },
                {
                    show: true,
                    contentHeight: 'auto'
                }
            ],
            tools: false,
            dialog: false,
            table: false,
            dialog_type: '',
            tips: '',
            del_info: {
                index: 0,
                id: 0
            }
        }
    },
    computed: {
        getStructure() {
            return this.$store.state.status;
        }
    },
    components: {
        nHeader,
        addEvent,
        nTools,
        nDialog
    },
    methods: {
        moveTo(id, n, event) {
            if (n == 0 || n == 2) {
                if (event.target.checked) {
                    this.$store.dispatch('eventdone', id);
                    event.target.checked = false;
                }
            } else if (n == 1) {
                if (event && !event.target.checked) {
                    this.$store.dispatch('eventtodo', id);
                    event.target.checked = true;
                } else if (id) {
                    this.$store.dispatch('eventtodo', id);
                }
            }
        },
        getList(n) {
            const self = this;
            return self.$store.state.event.filter(function(d) {
                if (d.type === n + 1) {
                    return d;
                }
            });
        },
        moveOpt(id, n = 0) {
            var ENUM_ARR = ['eventcancel', '', 'eventtodo'];
            this.$store.dispatch(ENUM_ARR[n], id);
        },
        changeCollapse(num, event) {
            if (this.collapse[num].show) {
                this.closeCollapse(num, event);
                this.collapse[num].show = false;
            } else {
                this.openCollapse(num, event);
                this.collapse[num].show = true;
            }
        },
        closeCollapse(num, event) {
            const ulElement = event.target.nextElementSibling;
            ulElement.style.height = ulElement.offsetHeight + 'px';
            this.collapse[num].contentHeight = ulElement.offsetHeight;
            setTimeout(function() {
                ulElement.style.height = '0px';
                setTimeout(function() {
                    ulElement.style.display = 'none';
                }, 300)
            }, 10)

        },
        openCollapse(num, event) {
            const ulElement = event.target.nextElementSibling,
                self = this;
            ulElement.style.display = 'block';
            setTimeout(function() {
                ulElement.style.height = self.collapse[num].contentHeight + 'px';
                setTimeout(function() {
                    ulElement.style.height = 'auto';
                }, 300)
            }, 10)
        },
        clearData() {
            this.dialog = true;
            this.dialog_type = 'clear';
            this.tips = '清空后无法恢复，确认清空吗？';
        },
        delData(index, id) {
            this.dialog = true;
            this.dialog_type = 'del';
            this.tips = '删除后无法恢复，确认删除吗？';
            this.del_info = {
                index: index,
                id: id
            }
        },
        sureDialog() {
            const self = this;
            switch (self.dialog_type) {
                case 'clear':
                    self.$store.dispatch('clearevent');
                    break;
                case 'del':
                    self.$store.dispatch('delevent', self.del_info);
                    break;
            }
            this.dialog = false;
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" src="./../static/theme.scss"></style>
<style lang="scss" rel="stylesheet/scss">
body,
html,
input,
li,
ul {
    margin: 0;
    padding: 0;
}
body {
    font-size: 16px;
    font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
}
button {
    padding: 7px 0;
    outline: none;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
    font: {
        size: inherit;
        family: inherit;
    }
    cursor: pointer;
}
html {
    width: 100%;
    overflow: hidden;
}
ul {
    list-style: none;
}
.container {
    width: 600px;
    margin: auto;
}
.event-content {
    .event-tab {
        position: relative;
        height: 44px;
        line-height: 44px;
        padding-left: 20px;
        border-bottom: 1px solid #fff;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        span {
            position: absolute;
            right: 20px;
            top: 15px;
            width: 10px;
            height: 10px;
            content: '';
            border: {
                top: 3px solid #fff;
                right: 3px solid #fff;
            }
            transform: rotate(135deg);
            transition: transform 0.3s;
            &.close-span {
                transform: rotate(45deg);
            }
        }
    }
    ul.event-box {
        font-size: 14px;
        list-style: none;
        overflow: hidden;
        border: {
            left: 1px solid #eee;
            right: 1px solid #eee;
        }
        transition: height 0.3s;
        .event-list {
            position: relative;
            min-height: 44px;
            line-height: 25px;
            padding: 10px 80px 10px 40px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;
            input[type=checkbox] {
                position: absolute;
                left: 15px;
                top: 15px;
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
            .cancel-btn {
                position: absolute;
                right: 10px;
                top: 7px;
                width: auto;
                height: 30px;
                font-size: 12px;
                padding: 0 10px;
                background: #fff;
                border: 1px solid #c0ccda;
                color: #c0ccda;
            }
            .event-con {
                cursor: pointer;
            }
            .event-time {
                position: absolute;
                right: 10px;
                top: 6px;
                line-height: 16px;
                font-size: 12px;
                color: #aaa;
                text-align: right;
            }
            .event-delete {
                text-decoration: line-through;
                color: #999;

            }
        }
    }
}
</style>
