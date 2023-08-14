import { useEffect, useState } from "react"

// Next
import { useRouter } from "next/router"

// Shopify
import { Product, ProductOption } from "@shopify/hydrogen-react/storefront-api-types"

// Utils
import { parseIdStorefront } from "utils/stringParse"
import { parse } from "path"

interface OptionProps {
  options: ProductOption[]
  selectedVariant: any
  handle: string
  variants: any
  register: any
}

const Options = ({ options, handle, selectedVariant, variants, register }: OptionProps) => {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-5">
      {options.map((option: any, index) => (
        <div key={index}>
          <h5>{option.name}</h5>
          <div className="variant-options flex gap-4 mt-2">
            {
              option.values.map(({ value }, index) => (
                <div key={index}>
                  <input
                    id={option.name + "-" + index}
                    name={option.name}
                    type="radio"
                    value={JSON.stringify({ name: option.name, value: value, type: option.values[index].type })}
                    defaultChecked={selectedVariant.selectedOptions.some((currentSelection) => option.name === currentSelection.name && currentSelection.value === value)}
                    className="hidden"
                    onChange={(e) => {
                      const selection = JSON.parse(e.target.value)

                      const updatedSelection = selectedVariant.selectedOptions.map((option) => {
                        if (selection.name === option.name) {
                          return selection
                        } else {
                          return option
                        }
                      })
                      const newVariant = variants.find((variant) => {
                        return variant.selectedOptions.every((option) => {
                          return updatedSelection.some((updatedOption) => {
                            return option.name === updatedOption.name && option.value === updatedOption.value
                          })
                        })
                      })
                      router.push(`/products/${handle}?variant=${parseIdStorefront(newVariant.id)}`)
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