import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {Dashboard} from './dashboard'
import AddItemForm from './form'

export const MainFile =() =>{
    const showDashboard = useSelector((state)=>{
      return  state.cmn.showDashboard
    })
    return (
        <div>{
            showDashboard ?<Dashboard/>:<AddItemForm/>
        }</div>
        
    )
}