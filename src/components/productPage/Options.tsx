import { useState } from "react"

// Next
import { useRouter } from "next/router"

// Shopify
import { Product, ProductOption } from "@shopify/hydrogen-react/storefront-api-types"

// Utils
import { parseIdStorefront } from "utils/stringParse"

interface OptionProps {
  options: ProductOption[]
  selectedVariant: any
  handle: string
}

const Options = ({ options, handle, selectedVariant }: OptionProps) => {
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState<any>(selectedVariant.selectedOptions)

  return (
    <div className="flex flex-col gap-5">
      {options.map((option, index) => (
        <div key={index}>
          <h5>{option.name}</h5>
          <div className="variant-options flex gap-4 mt-2">
            {
              option.values.map(({ value }: any, index) => (
                <div key={index}>
                  <input
                    id={option.name + "-" + index}
                    name={option.name}
                    type="radio"
                    value={value}
                    defaultChecked={selectedOptions.find((selectedOption) => selectedOption.value === value) ? true : false}
                    className="hidden"
                    onChange={(e) => {
                      console.log("e", e.target.value);
                    }}
                  />
                  <label
                    htmlFor={option.name + "-" + index}
                    className="block p-2 border rounded hover:scale-[1.05] duration-200 cursor-pointer"
                  >
                    {value}
                  </label>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default Options