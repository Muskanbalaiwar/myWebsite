import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "./components/textField";
import { loginData ,signinData} from './invoke'
import { useSelector, useDispatch } from "react-redux";
// Assuming you have a TextBox component

// Validation schema using yup
const schema = yup.object().shape({
  email: yup.string().required("Email id is required"),
  password: yup.string().required("password is required"),
});

const signInschema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

export default function LoginForm() {
    const [showLogin , setShowLogin] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(showLogin ?schema : signInschema),
  });

  // Handle form submission
  const dispatch = useDispatch()
 const itemID =  useSelector((state)=>{
  return state.cmn.updateItemId
 })
  const onSubmit = async(data) => {
    if(showLogin){
    let obj ={
        
            
            _email :data.email,
           
            _password :data.password
        
    }
    
    const response= await loginData(obj)
    if(response.token){
        localStorage.setItem("token",response.token)
        dispatch({type :"showDashboard", payload : true})
    }}
    else {
        let obj ={
            _Name:data.name,
   _Email:data.email,
     _Number:data.mobile,
    _Password: data.password
        }
const response = await signinData(obj);
if(response.details){
    setShowLogin(true)
}
    }
  };

  return (
    <>
{showLogin ? <div className="max-w-md mx-auto p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Segment Name Input */}
        <div className="mb-4">
        <TextBox
            name="email"
            type="email"
            label="enter emailId"
            register={register}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

       
        <div className="mb-4">
          <TextBox
            name="password"
            type="password"
            label="enter password"
            register={register}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Rupees Input */}
       

        {/* Submit Button */}
        <div className="fixed-submit">
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded ${!errors ? "btn-primary" : "btn-primary"}`}
            disabled={Object.keys(errors).length > 0}
          >
            Login
          </button>
          
        </div>
      </form>
      <button onClick={()=>{
        setShowLogin(false)
      }}>signin</button>
    </div> :  <div className="max-w-md mx-auto p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Input */}
        <div className="mb-4">
          <TextBox name="name" type="text" label="Name" register={register} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <TextBox
            name="email"
            type="email"
            label="Email"
            register={register}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile Input */}
        <div className="mb-4">
          <TextBox
            name="mobile"
            type="text"
            label="Mobile"
            register={register}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <TextBox
            name="password"
            type="password"
            label="Password"
            register={register}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="fixed-submit">
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded ${
              !errors ? "btn-primary" : "btn-primary"
            }`}
            disabled={Object.keys(errors).length > 0}
          >
            Add User
          </button>
        </div>
      </form>

      <button onClick={()=>{setShowLogin(true)}}>
        Login 
      </button>
    </div>}
   
    </>
  );
}
