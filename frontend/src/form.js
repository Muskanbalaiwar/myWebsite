import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "./components/textField";
import { saveData ,updateData} from './invoke'
import { useSelector, useDispatch } from "react-redux";
// Assuming you have a TextBox component

// Validation schema using yup
const schema = yup.object().shape({
  BookName: yup.string().required("Book Name is required"),
  description: yup.string().required("Description is required"),
  rupees: yup
    .number()
    .typeError("Rupees must be a number")
    .positive("Rupees must be positive")
    .required("Rupees is required"),
});

export default function AddItemForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const dispatch = useDispatch()
 const itemID =  useSelector((state)=>{
  return state.cmn.updateItemId
 })
  const onSubmit = async(data) => {
    console.log(data);
    const obj ={
     bookName : data.BookName,
     description :data.description,
     rupees : data.rupees}
     let response ={}
     if(!itemID){
     response =await saveData(obj)}
    else {

      response = await updateData(obj ,itemID)
      if(response.msg){
        dispatch({type :"saveGetResponse", payload : []})
      }
    }
    if(response?.msg){
      alert(response.msg)
    }


  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Segment Name Input */}
        <div className="mb-4">
          <TextBox
            name="BookName"
            type="text"
            label="Book Name"
            register={register}
          />
          {errors.segmentName && (
            <p className="text-red-500 text-sm">{errors.segmentName.message}</p>
          )}
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <TextBox
            name="description"
            type="text"
            label="Description"
            register={register}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Rupees Input */}
        <div className="mb-4">
          <TextBox
            name="rupees"
            type="number"
            label="Rupees"
            register={register}
          />
          {errors.rupees && (
            <p className="text-red-500 text-sm">{errors.rupees.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="fixed-submit">
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded ${!errors ? "btn-primary" : "btn-primary"}`}
            disabled={Object.keys(errors).length > 0}
          >
            Add Item
          </button>
          
        </div>
      </form>

      <button onClick={()=>{
            dispatch({type :"showDashboard", payload : true})
          }}>showDashboard</button>
    </div>
  );
}
