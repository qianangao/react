/*
包含n个工具函数
 */
export function getRedirectTo(type,header){
    let path
    if(type==='dashen'){
        path='/dashen'
    }else{
        path='/boss'
    }
    if(!header){
        path+='info'
    }
    return path
}
