import {INCREMENT,DECREMENT} from "./action-types";

export const increment=(num)=>({type:INCREMENT,data:num})
export const decrement=(num)=>({type:DECREMENT,data:num})
export const incrementAsync=(num)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(increment(num))
        },1000)
    }
}
