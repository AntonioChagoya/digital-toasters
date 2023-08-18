
// Libs
import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantitySelector = ({ decrementCounter, incrementCounter, register, setValue, onChange = (event) => { }, ...rest }) => {

  return (
    <div className="flex gap-3 items-center">
      <button onClick={decrementCounter} type="button" className="p-3 rounded bg-slate-100"><FaMinus /></button>
      <input
        {...rest}
        type="number"
        id={rest.id || ""}
        name={rest.name || ""}
        max={99}
        min={1}
        {...register(rest.name)}
        onBlur={(e) => {
          if (parseInt(e.target.value) > 99) {
            setValue(rest.name, 99);
          }
          if (parseInt(e.target.value) < 1) {
            setValue(rest.name, 1);
          }
        }}
        onChange={(e) => {
          if (parseInt(e.target.value) < 100 && parseInt(e.target.value) > 0) {
            setValue(rest.name, parseInt(e.target.value));
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