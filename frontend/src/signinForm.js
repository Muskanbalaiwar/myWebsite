import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "./components/textField"; // Assuming you have a TextBox component
import { useSelector, useDispatch } from "react-redux";

// Validation schema using yup
const schema = yup.object().shape({
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

export default function AddItemForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const itemID = useSelector((state) => {
    return state.cmn.updateItemId;
  });

  const onSubmit = async (data) => {
    console.log(data);
    const obj = {
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };

    let response = {};
    if (!itemID) {
      response = await saveData(obj);
    } else {
      response = await updateData(obj, itemID);
      if (response.msg) {
        dispatch({ type: "saveGetResponse", payload: [] });
      }
    }

    if (response?.msg) {
      alert(response.msg);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <button
       
      >
        Login 
      </button>
    </div>
  );
}
