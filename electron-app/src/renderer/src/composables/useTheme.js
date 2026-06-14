// useTheme.js 切换主题相关逻辑代码

import { ref } from "vue"

// 存储在 localStorage 中主题的key
const THEME_KEY='theme_mode'
// 从 localStorage 中取出主题预设  如果没有就用默认的 system(跟随系统)
const mode=ref(localStorage.getItem(THEME_KEY)||'system')
// 是否是深色模式的标记
const isDark=ref(false)

// 应用主题
async function applyTheme(m) {
    // 对参数m(即将要设置的主题)做边界处理
    const tageMode=m || mode.value
    if(tageMode=='system'){
    }else{
        // 判断是否是深色模式
        isDark.value=tageMode=='dark';
        // 调用给html动态添加dark样式的方法
        updateHtmlClass(isDark.value)
        // 通知主进程主题切换
        await window.api?.setDarkMode?.(tageMode)
    }

    // 将选择的主题存储到缓存中
    localStorage.setItem(THEME_KEY, tageMode)
    mode.value = tageMode
}

/**
 * 给html动态添加dark样式的方法
 * @param {是否深色模式} dark
 */
function updateHtmlClass(dark){
    // 获取 html 这个 DOM 对象
    const html = document.documentElement;
    if(dark){
        // 如果是深色模式，就给html添加 dark 样式
        html.classList.add('dark')
    }else{
        // 如果是浅色模式，就移除html的dark样式
        html.classList.remove('dark')
    }
}
export function useTheme(){
    // 设置主题的方法
    const setTheme=(mode)=>applyTheme(mode)
    // 初始化主题的方法
    const initTheme=()=>applyTheme()

    return{
        mode,
        isDark,
        setTheme,
        initTheme
    }
}