import React, { useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import {getData,deleteData} from './invoke'

export const Dashboard =()=>{
   const dispatch =  useDispatch ();
   const saveGetResponse = useSelector((state)=>{
    return state.cmn.saveGetResponse
   })
    useEffect(()=>{

        async function getItem() {
            if(saveGetResponse?.length<=0){
            const response = await getData();
            console.log(response)
            dispatch({type :"saveGetResponse", payload : response.data})}
        } 
        getItem()
    },[saveGetResponse])

    async function handleDelete(id){
        const obj ={
            itemId : id}
        const response = await deleteData(obj);
        if(response.msg){
            alert(response.msg)
            dispatch({type :"saveGetResponse", payload : []})
        }
    }
return (
    <>{
        saveGetResponse && saveGetResponse.length>0 ?
        saveGetResponse.map((item,index)=>{
            return(<div><div>s.no. :{index+1}<button className='btn danger' onClick={()=>{handleDelete(item.id)}}>delete book</button><button onClick ={() =>{ dispatch({type :"updateItemId", payload : item.id})
                dispatch({type :"showDashboard", payload : false})}}>Edit Details</button>
                <div>Book Name : {item.name}</div>
            <div>Book Description : {item.description}</div>
            <div>Book Amount : {item.rupees}</div><br/>
            </div>
            </div>
            )
        })
    :<div>fetching data.....</div>}</>
)
}