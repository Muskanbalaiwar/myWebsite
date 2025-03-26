import axios from 'axios'
import { useSelector } from 'react-redux'

export const saveData =async(pckt)=>{
    try{

    let token= localStorage.getItem("token")
const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/add-item` , pckt,{headers:{'Authorization':token}})

return data.data}
catch(err){
    return err
}
}

export const getData = async() =>{
    try{
        let token = localStorage.getItem("token")
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAll-item` ,{headers:{'Authorization':token}})
        if(data.data){
            return data.data
        }
        else throw new Error("data not found");
        
    }
    catch(err){ return err}
   
}

export const deleteData = async (pckt) => {
    try {
      let token = localStorage.getItem("token")
      
      const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/remove-item`, {
        data: pckt, 
        headers: { 'Authorization': token } 
      });
  
      if (data.data) {
        return data.data;
      } else {
        throw new Error("Data not found");
      }
  
    } catch (err) {
      return err;
    }
  };

  export const updateData =async(pckt,id)=>{
    
    try{

    let token= localStorage.getItem("token")
const data = await axios.put(`${process.env.REACT_APP_BASE_URL}/update-item/${id}` , pckt,{headers:{'Authorization':token}})

return data.data}
catch(err){
    return err
}
}

export const loginData =async(pckt)=>{
    try{

    
const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/login` , pckt)

return data.data}
catch(err){
    return err
}
}

export const signinData =async(pckt)=>{
    try{

    
const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/sign` , pckt)

return data.data}
catch(err){
    return err
}
}
  