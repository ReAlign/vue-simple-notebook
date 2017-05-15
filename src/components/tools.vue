<template>
<div class="event-tools" :class="{'show-event-tools':isShow}">
    <a class="close-btn" @click="showTools">
        <span></span>
    </a>
    <ul class="tools-sidebar">
        <li>
            <button class="tools-btn" @click="showDialog">清空数据</button>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: ['isShow'],
    methods: {
        showTools() {
            this.$emit('tools');
        },
        showDialog() {
            this.$emit('cleardialog');
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.event-tools {
    position: fixed;
    top: 70px;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 30px 20px;
    box-sizing: border-box;
    transform: translateX(-100%);
    transition: transform 0.3s;
    text-align: center;
    background: rgba(0,0,0,.7);
    font-size: 16px;
    &.show-event-tools {
        transform: translateX(0);
    }
    a.close-btn {
        position: absolute;
        top: 40px;
        right: 40px;
        width: 30px;
        height: 26px;
        cursor: pointer;
    }
    span,
    span:before {
        position: absolute;
        left: 0;
        width: 30px;
        height: 4px;
        content: '';
        background: #fff;
    }
    span {
        top: 11px;
        transform: rotate(45deg) translateY(7px);
        &:before {
            top: 0;
            left: 7px;
            transform: rotate(-90deg) translateY(-7px);
        }
    }
    .tools-sidebar {
        margin-top: 140px;
        & > li {
            line-height: 60px;
        }
    }
    .tools-btn {
        width: 200px;
        height: 60px;
        line-height: 26px;
        font-size: 18px;
        color: #fff;
        transition: background 0.3s ease-in;
    }
    pre {
        white-space: pre-wrap;
        font: {
            size: 14px;
            family: arial,"microsoft yahei";
        }
        line-height: 20px;
    }
}
</style>
