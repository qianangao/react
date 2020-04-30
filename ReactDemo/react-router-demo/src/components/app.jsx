import React, {Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

import MyNavLink from "./my-nav-link";
import Home from '../views/home'
import About from "../views/About";
export default class App extends Component{
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div className="page-header">
                            <h2>React Router Demo</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-offset-2 col-xs-2">
                        <ul className="nav nav-pills nav-stacked">
                            <li>
                                <MyNavLink className='list-group-item' to='/home' >Home</MyNavLink>
                            </li>
                            <li>
                                <MyNavLink className='list-group-item' to='/about'>About</MyNavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xs-6">
                        <div className="panel">
                            <Switch>
                                <Route path='/home' component={Home} />
                                <Route path='/about' component={About} />
                                <Redirect to='/home'/>
                            </Switch>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
