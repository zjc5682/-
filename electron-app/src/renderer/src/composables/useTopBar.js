import { ref } from'vue';
import {useRoute, useRouter} from 'vue-router';

export function useTopBar(){
    
const router=useRouter()
const msg_size=ref(0)


const openSettingView=()=>{
    //跳转到设置界面
    router.push('setting')
    }

    return{
        msg_size,
        openSettingView
    }
}