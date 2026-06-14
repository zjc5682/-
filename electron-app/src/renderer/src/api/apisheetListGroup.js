import {get} from '../utils/request'

/**
 * 请求创建的歌单接口
 * @returns 
 */
export async function getSheetList() {
    return get('/sheet')
}