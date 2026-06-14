import { get, post } from '../utils/request'

/**
 * 获取用户创建的歌单
 * @param {*} userId 用户ID
 * @returns 
 */
export async function getUserCreateSheets(userId) {
    // return get(`/v1/users/${userId}/create`)
    return get('/v1/sheets/page')
}

/**
 * 获取用户收藏歌单
 * @param {*} userId 
 * @returns 
 */
export const getUserColletsSheets = (userId) => {
    // return get(`/v1/users/${userId}/collect`)
    return get('/v1/sheets/page')
}
/**
 * 首页数据
 * @returns 
 */
export const indexes = () => {
    return get(`/v1/indexes`, { app: 30 })
}