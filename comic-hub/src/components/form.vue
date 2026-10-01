<template>
    <div>
        <h1 @click="sendClickHandle">{{ title }}</h1>
    </div>
</template>
<script>
export default {
    name: "formTest",
    props: {
        title: {
            type: String,
            default: "Test"
        },
        chList: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    methods:{
        sendClickHandle(){
            this.$emit("onEvent",this.title)
        }
    }
}
</script>
<style scoped>
div {
    width: 400px;
    height: 400px;
    background-color: white;
    z-index: 200;
}
</style>