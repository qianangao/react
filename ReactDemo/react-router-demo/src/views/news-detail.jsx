import React from "react";
const allNews=[
    {id:1,title:'news001',content:'news Content001'},
    {id:2,title:'news002',content:'news Content002'},
    {id:3,title:'news003',content:'news Content003'}
]

export default function MessageDetail(props){
    const {id}=props.match.params
    const newArr=allNews.find((news)=>news.id===id*1)
    return(
        <ul>
            <li>ID:{newArr.id}</li>
            <li>title:{newArr.title}</li>
            <li>content:{newArr.content}</li>
        </ul>
    )
}
