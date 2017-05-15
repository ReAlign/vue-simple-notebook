<template>
<header class="">
    <h1>
        <a class="t-btn" :class="{'t-btn-left':isShow}" @click="showTools">
            <span></span>
        </a>
        NoteBook
    </h1>
</header>
</template>
<script>
export default {
    props: ['isShow'],
    methods: {
        showTools() {
            this.$emit('tools');
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
header {
    width: 100%;
    height: 70px;
    h1 {
        position: relative;
        width: 600px;
        margin: 0 auto;
        line-height: 70px;
        text-align: center;
        color: #fff;
        a.t-btn {
            position: absolute;
            left: 10px;
            top: 22px;
            width: 30px;
            height: 26px;
            cursor: pointer;
        }
        span,
        span:after,
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
            &:before {
                top: 0;
                transform: translateY(-7px);
                transition: all 0.3s;
            }
            &:after {
                transform: translateY(7px);
                transition: all 0.3s;
            }
        }
    }
}
</style>
