<!-- VipLevel.vue -->
<template>
    <div  class="box flex items-center">
        <div :class="[flag?'record yes':'record ']">
            <div></div>
        </div>
        <div :class="[flag?'n_vip  vip':'n_vip']">
            VIP<span>{{ flag ? level : '开通' }}</span>
        </div>
    </div>
</template>
<script setup>
defineProps({
    flag:{
        type:Boolean,
        default:false
    },
    level:String
})
</script>
<style scoped>
.box{
    position: relative;
}
.record{
    width: 1.4em;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: gainsboro;
    border: 2px solid #f7f9fc;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}
.yes{
    background-color: #483f3f !important;
}
.yes>div{
    background-color: red !important;
}
.record>div{
    width: 0.4em;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 1px solid gray;
    background-color: gainsboro;
}
.n_vip{
    height: 14px;
    line-height: 14px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 0 7px 7px 0;
    background-color: gainsboro;
    font-size: 8px;
    margin-left: -2px;
    color: white;
}
.vip{
    background-color: #483f3f !important;
    color: #bba6a3 !important;
}
</style>