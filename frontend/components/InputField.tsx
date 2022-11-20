import { stringArg } from "nexus";
import { useState } from 'react';

function InputField({ updateFields, id, name, value, plusOrMinus }) {
   const [inputValue, setInputValue] = useState(value);
   const [plusOrMinusValue, setPlusOrMinusValue] = useState(plusOrMinus);

   const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
   }



   return <div className="row justify-content-md-center mt-3">
      <div className="col-md-auto">
         <div className="shadow p-3 mb-5 bg-white rounded align-items-center">
            <div className="row justify-content-center">
               <div className="col-md-auto">
                  <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
               </div>
            </div>
            <div className="input-group mb-3">
               <input className="form-control" type="number"
                  onChange={changeValue}
                  value={inputValue} />
               <button
                  className={plusOrMinusValue ? "btn btn-success" : "btn btn-danger"}
                  type="button"
                  onClick={() => setPlusOrMinusValue(!plusOrMinusValue)}
               >{plusOrMinusValue ? '+' : '-'}</button>
            </div>
            <div className="row justify-content-center">
            <div className="col-md-auto">
               <button className="btn btn-danger" onClick={() => updateFields(id, name, Number(inputValue), plusOrMinusValue)}>Delete</button>
            </div>
         </div>
         </div>
      </div>
   </div>
}

export default InputField;