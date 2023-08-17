
// Libs
import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantitySelector = ({ decrementCounter, incrementCounter, register, setValue, nameId, onChange = (event) => { } }) => {

  return (
    <div className="flex gap-3 items-center">
      <button onClick={decrementCounter} type="button" className="p-3 rounded bg-slate-100"><FaMinus /></button>
      <input
        type="number"
        id={nameId}
        name={nameId}
        {...register(nameId, { min: 1, max: 99 })}
        onBlur={(e) => {
          if (parseInt(e.target.value) > 99) {
            setValue(nameId, 99);
          }
          if (parseInt(e.target.value) < 1) {
            setValue(nameId, 1);
          }
        }}
        onChange={(e) => {
          if (parseInt(e.target.value) < 99 || parseInt(e.target.value) > 1) {
            setValue(nameId, parseInt(e.target.value));
            onChange(e)
          }
        }}
        className="w-24 h-10 border rounded text-center px-4"
      />
      <button type="button" onClick={incrementCounter} className="p-3 rounded bg-slate-100"><FaPlus /></button>
    </div>
  )
}

export default QuantitySelector