import React from 'react'
import { forwardRef ,useId } from 'react'


const Select=forwardRef(function Select({
    options,
    label,
    classname='',
    ...props
},ref) {
    const id=useId();

  return (

    <div className=' w-full'>
       {label && <label className='' htmlFor={id}></label>}
       <select {...props} id={id} ref={ref} className=' '>
        {options?.map((option )=>(/// ke jo option mathi kaik ayu hoy to j run thay. jo aam handel na karie to  option empty hoy tyare  code cress thai jase 
            <option value={option} key={option}>
                {option}
                
            </option>
        ))}

       </select>

      
    </div>
  )
}
)


export default Select
