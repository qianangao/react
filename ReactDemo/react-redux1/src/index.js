import React from "react";
import ReactDOM from 'react-dom'


import App from'./components/app'
import store from './redux/store'
render()
function render(){
    ReactDOM.render(<App store={store}/>,document.getElementById('root'))
}

store.subscribe(render)
