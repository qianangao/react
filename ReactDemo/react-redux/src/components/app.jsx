import React, {Component} from 'react'
import * as actions from '../redux/actions'

export default class App extends Component{
    increment=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
        //更新状态
        this.props.store.dispatch(actions.increment(num))
    }
    decrement=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
        //更新状态
        this.props.store.dispatch(actions.decrement(num))
    }
    incrementifOdd=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
        const count=this.props.store.getState()
        if(count%2===1){
            //更新状态
            this.props.store.dispatch(actions.increment(num))
        }

    }
    incrementAsync=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
        setTimeout(()=>{
            //更新状态
            this.props.store.dispatch(actions.increment(num))
        },1000)

    }

    render(){
        const count=this.props.store.getState()
        return (
            <div>
                <p>Click {count} times</p>
                <div>
                    <select ref={select=>this.select=select}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;
                    <button onClick={this.incrementifOdd}>increment if odd</button>&nbsp;
                    <button onClick={this.incrementAsync}>increment async</button>
                </div>
            </div>
        )
    }
}
