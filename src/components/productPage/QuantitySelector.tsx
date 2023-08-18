

// Libs
import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantitySelector = ({ decrementCounter, incrementCounter, register, setValue, onChange = (event) => { }, ...rest }) => {

  return (
    <div className="flex gap-1 items-center">
      <button onClick={decrementCounter} type="button" className={`${rest.buttonSize ? rest.buttonSize : "w-6 h-6"} hover:scale-[1.1] flex justify-center items-center rounded bg-gray-100`}><FaMinus /></button>
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
        className={`${rest.inputSize ? rest.inputSize : "w-6 h-6"} border rounded text-center text-sm`}
      />
      <button type="button" onClick={incrementCounter} className={`${rest.buttonSize ? rest.buttonSize : "w-6 h-6 flex justify-center items-center"} flex justify-center items-center hover:scale-[1.1] rounded bg-gray-100`}><FaPlus /></button>
    </div>
  )
}

export default QuantitySelector