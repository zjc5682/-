// useSheetListGroup.js

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSheetList } from '../api/apiSheetListGroup'

export function useSheetListGroup() {
    const route = useRoute()
    const router = useRouter()
    // 歌单列表
    const sheetList = ref([])

    const loadData = async () => {
        const res = await getSheetList()
        sheetList.value = res.list
    }

    
    onMounted(() => {
        loadData()
    })

    // 判断当前歌单是否选中
    const selected = (id) => {
        if (id === 1) return route.name === 'allSongs'
        if (id === 2) return route.name === 'randomSongs'
        return route.name === 'sheetDetail' && route.params.id == id
    }
    // 歌单的点击事件
    const itemClick = (item) => {
        if (item.title === '我的收藏' || item.id === 1) {
            router.push({ name: 'allSongs' })
        } else if (item.title === '轻音乐' || item.id === 2) {
            router.push({ name: 'randomSongs' })
        } else {
            router.push({ name: 'sheetDetail', params: { id: item.id } })
        }
    }

    return {
        sheetList,
        selected,
        itemClick
    }
}