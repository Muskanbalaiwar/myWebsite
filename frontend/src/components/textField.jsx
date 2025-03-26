import { useSelector, useDispatch } from "react-redux"

const TextBox =(props) =>{
  
    return (
      <>
      <label className="font-14 line-height-16 inter-semibold">{props.label}</label>
      <input
                  type={props.type}
                  name={props.name}
                  onChange={props
                    .handleChange
                  }
                  className=""
                  required={props.required}
                  {...props.register(props.name)}
                />
                </>
    )
  }
  export default TextBox;