<template>
<div class="event-add">
    <input type="text" class="n-input" v-model="content" placeholder="todo" @keyup.enter="submit">
    <button class="add-btn" @click="submit">添加</button>
</div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            content: ''
        }
    },
    methods: {
        submit() {
            let self = this,
                params = {
                    id: 0,
                    type: 1,
                    content: '',
                    time: ''
                };
            if (self.content) {
                params.content = self.content;
                self.$store.dispatch('addevent', params);
                self.content = '';
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.event-add {
    position: relative;
    padding: 30px 0;
    font-size: 16px;
    .n-input {
        width: 100%;
        height: 40px;
        padding: 7px 90px 7px 10px;
        line-height: 26px;
        border-radius: 4px;
        transition: border-color 0.2s cubic-bezier(.645,.045,.355,1);
        box-sizing: border-box;
        font-size: inherit;
        &:focus {
            outline: none;
        }
    }
    .add-btn {
        position: absolute;
        right: 0;
        top: 30px;
        width: 80px;
        height: 40px;
        line-height: 26px;
        color: #fff;
        border-radius: 0 4px 4px 0;
        transition: background 0.3s ease-in;
    }
}
</style>
