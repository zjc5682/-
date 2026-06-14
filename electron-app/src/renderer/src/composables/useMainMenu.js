
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

export function useMainMenu() {
    const router = useRouter()
    const route = useRoute()

    const mainMenus = ref([
    {
        name: 'main.selected',
        icon: 'pixelarticons:thumbs-up',
        route: '/'
    },
    {
        name: 'main.blog',
        icon: 'pixelarticons:sparkles',
        route: '/blog'
    },
    {
        name: 'main.follow',
        icon: 'pixelarticons:mail-right',
        route: '/follow'
    }
    ])

      // 其他菜单
    const otherMenus = ref([
        { name: 'main.favoriteMusic', icon: 'mdi:cards-heart', route: '/favoriteMusic' },
        { name: 'main.recentlyPlayed', icon: 'ri:time-fill', route: '/recentlyPlayed' },
        { name: 'main.download', icon: 'mdi:music-box', route: '/download' },
        { name: 'main.localMusic', icon: 'mdi:music-box', route: '/localMusic' },
        { name: 'main.setting', icon: 'mdi:settings', route: '/setting' }
    ])


    const isMenuActive = (path) => {
        return route.path === path
    }
    //菜单单击事件
    const handleMenuClick = (param) => {
        router.push(param.route)
    }

    return{
        mainMenus,
        otherMenus,
        isMenuActive,
        handleMenuClick,
    }
}