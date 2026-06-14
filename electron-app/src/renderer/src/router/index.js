//路由配置
import { createRouter, createWebHistory } from 'vue-router'

import SelectedView from '../views/SelectedView.vue'
//定义路由规则
const routes = [
    { 
        path: '/', 
        name:'Selected', 
        component: () => import('../views/SelectedView.vue')
    },
    { 
        path: '/blog', 
        name:'blog', 
        component: () => import('../views/BlogView.vue') 
    },
     { 
        path: '/follow', 
        name:'follow', 
        component: () => import('../views/FollowView.vue') 
    },
    { 
        path: '/setting', 
        name:'setting', 
        component: () => import('../views/SettingView.vue') 
    },
    { 
        path: '/sheetDetail/:id', 
        name:'sheetDetail', 
        component: () => import('../views/SheetDetailView.vue') 
    },
    {
        path: '/allSongs',
        name: 'allSongs',
        component: () => import('../views/AllSongsView.vue')
    },
    {
        path: '/randomSongs',
        name: 'randomSongs',
        component: () => import('../views/RandomSongsView.vue')
    },
    { 
        path: '/discover', 
        name:'discover', 
        component: () => import('../views/DiscoverView.vue') 
    },
    {
        path: '/playlist/:id',
        name: 'playlistDetail',
        component: () => import('../views/PlaylistDetail.vue')
    },
    {
        path: '/recentlyPlayed',
        name: 'recentlyPlayed',
        component: () => import('../views/RecentlyPlayed.vue')
    },
    {
        path: '/download',
        name: 'download',
        component: () => import('../views/DownloadView.vue')
    },
    {
        path: '/favoriteMusic',
        name: 'favoriteMusic',
        component: () => import('../views/FavoriteMusic.vue')
    },
    {
        path: '/localMusic',
        name: 'localMusic',
        component: () => import('../views/LocalMusic.vue')
    },
]

//实例化一个对象
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router