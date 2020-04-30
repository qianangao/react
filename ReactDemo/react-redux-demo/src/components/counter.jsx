import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component{
    static propTypes={
        count:PropTypes.number.isRequired,
        increment:PropTypes.func.isRequired,
        decrement:PropTypes.func.isRequired,
        incrementAsync:PropTypes.func.isRequired

    }
    increment=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
        //更新状态
        this.props.increment(num)

    }
    decrement=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
        //更新状态
        this.props.decrement(num)
    }
    incrementifOdd=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
        const count=this.props.count
        if(count%2===1){
            //更新状态
            this.props.increment(num)
        }

    }
    incrementAsync=()=>{
        //获取state里count值
        //获取select值
        const num=this.select.value*1
       this.props.incrementAsync(num)
    }

    render(){
        const {count}=this.props
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

