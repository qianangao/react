/*
redux最核心的管理对象模块
 */
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducers from "./reducers";

//createStore是用来初始化redux store的,是redux最重要的api
const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

export default store
