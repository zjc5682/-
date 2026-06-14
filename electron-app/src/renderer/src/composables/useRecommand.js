import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import { get } from '../utils/request'
import { indexes } from '../repository/networkRepository'

export function useRecommand() {
    const router = useRouter()
    //保存列表
    const data = ref([])
    //保存轮播图
    const bannerDatum = ref([])
    //保存推荐的歌单
    const recommendSheets = ref([])
    //保存推荐音乐
    const recommendSongs = ref([])

    const loadBanners = async () => {
        try {
            const res = await get('/banners')
            bannerDatum.value = res.banners || []
        } catch (error) {
            console.error('获取轮播图失败', error)
        }
    }

    const loadData = async () => {
        try {
            const r = await indexes()
            data.value = r.list
            recommendSheets.value = data.value.find((item) => item.style == 60)?.sheets || []
            const songs = data.value.find((item) => item.style == 50)?.songs || []
            recommendSongs.value = splitArrayIntoChunks(songs)
        } catch (error) {
            console.error('获取首页数据失败', error)
        }
    }


    function splitArrayIntoChunks(arr, chunkSize = 6) {
        return arr.reduce((result, item, index) => {
            const chunkIndex = Math.floor(index / chunkSize)
            if (!result[chunkIndex]) {
                result[chunkIndex] = [] //创建新的子数组
            }
            result[chunkIndex].push(item)
            return result
        }, [])
    }

    /**
     * 跳转到歌单详情
     * @param {*} id 歌单ID
     */
    const toSheetDetail = (id) => {
        router.push({ name: 'sheetDetail', params: { id: id } })
    }

    onMounted(() => {
        loadBanners()
        loadData()
    })

    return {
        data,
        bannerDatum,
        loadData,
        toSheetDetail,
        recommendSheets,
        recommendSongs
    }
}