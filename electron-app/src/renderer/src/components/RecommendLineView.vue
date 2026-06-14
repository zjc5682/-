<template>
  <div
    class="recommend-line-view"
    @mouseover="changeActive"
    @mouseout="removeActive"
  >
    <div class="whole">
      <div class="rollImg">
        <img
          class="arrow left-arrow"
          v-show="show"
          src="http://localhost:3000/static/images/banners/assets/后退.png"
          @click="next"
          alt="上一张"
        />
        <img
          class="arrow right-arrow"
          v-show="show"
          src="http://localhost:3000/static/images/banners/assets/前进.png"
          @click="prev"
          alt="下一张"
        />
        <ul>
          <li
            v-for="(item, index) in bannerList"
            :key="index"
            :class="arr[index]"
          >
            <img :src="item.icon" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <ul class="circleList">
      <li
        class="circle"
        v-for="(item, index) in arr"
        :key="index"
        :class="item === 'two' ? 'red' : ''"
      ></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  bannerDatum: {
    type: Array,
    default: () => []
  }
})

const arr = ref(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'])
let animationId = null
let lastTime = 0
const INTERVAL = 3000
const show = ref(false)

const bannerList = computed(() => props.bannerDatum)

const next = () => {
  const last = arr.value.pop()
  arr.value.unshift(last)
}

const prev = () => {
  const last = arr.value.shift()
  arr.value.push(last)
}

const autoPlayLoop = (timestamp) => {
  if (!lastTime) lastTime = timestamp
  const elapsed = timestamp - lastTime
  if (elapsed >= INTERVAL) {
    next()
    lastTime = timestamp
  }
  animationId = requestAnimationFrame(autoPlayLoop)
}

const startAutoPlay = () => {
  lastTime = performance.now()
  animationId = requestAnimationFrame(autoPlayLoop)
}

const stopAutoPlay = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

const changeActive = () => {
  show.value = true
  stopAutoPlay()
}

const removeActive = () => {
  show.value = false
  startAutoPlay()
}

onMounted(startAutoPlay)
onBeforeUnmount(stopAutoPlay)
</script>

<style scoped>
.recommend-line-view {
  width: 100%;
  height: 190px;
  position: relative;
  overflow: visible;
  margin-bottom: 0;
}

.whole {
  width: 50%;
  max-width: 700px;
  height: 65%;
  margin: 10px auto 0 auto;
}

.rollImg {
  width: 100%;
  height: 100%;
  position: relative;
}

.rollImg ul li {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  list-style-type: none;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 28px;
  height: 28px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}
.arrow:hover { opacity: 1; }
.left-arrow { left: -50px; }
.right-arrow { right: -50px; }

.one {
  left: -180px;
  transform: scale(0.8);
  opacity: 0.5;
  transition: all 0.5s ease;
}
.two {
  top: 0;
  left: 0;
  z-index: 8;
  transition: all 0.5s ease;
}
.three {
  right: -180px;
  left: auto;
  transform: scale(0.8);
  opacity: 0.5;
  transition: all 0.5s ease;
}
.four, .five, .six, .seven, .eight {
  transform: scale(0);
  visibility: hidden;
  transition: all 0.5s ease;
}

.circleList {
  display: flex;
  justify-content: center;
  margin: 5px auto 0;
  padding: 0;
}
.circleList li {
  list-style: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d1d5db;
  margin: 0 3px;
}
.circle.red {
  background: #EC4141;
}
</style>
