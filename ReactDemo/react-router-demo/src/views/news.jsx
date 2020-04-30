import React, {Component} from 'react'
import {Route} from "react-router-dom";

import MyNavLink from "../components/my-nav-link";

import NewsDetail from './news-detail'

export default class News extends Component{
    state={
        news:[]
    }
    componentDidMount() {
        setTimeout(()=>{
            const news=[
                {id:1,title:'news001'},
                {id:2,title:'news002'},
                {id:3,title:'news003'}]
            this.setState({news})
        },1000)
    }

    render(){
        return (<div>
                <ul>
                    {this.state.news.map((ne,index)=>(<li key={index}>
                        <MyNavLink to={`/home/news/newsdetail/${ne.id}`}>{ne.title}</MyNavLink>
                    </li>))
                    }
                </ul>
                <Route path='/home/news/newsdetail/:id' component={NewsDetail}/>
            </div>

        )
    }
}
