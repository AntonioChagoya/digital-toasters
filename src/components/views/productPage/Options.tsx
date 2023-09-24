import { useEffect, useState } from "react"

// Next
import { useRouter } from "next/router"

// Shopify
import { ProductOption, ProductVariant } from "@shopify/hydrogen-react/storefront-api-types"

// Utils
import { parseIdStorefront } from "utils/stringParse"

// Types

interface OptionProps {
  variants: ProductVariant[]
  selectedVariant: ProductVariant
  options: ProductOption[]
  handle: string
}

const Options = ({ options, handle, selectedVariant, variants }: OptionProps) => {
  const router = useRouter()

  return (
    <div className="flex gap-5">
      {options.map((option, index) => (
        <div key={index}>
          <h5>{option.name}</h5>
          <select name="" id=""
            onChange={(e) => {
              // Parse selected option
              const selection = JSON.parse(e.target.value)

              // Generate a new object replacing the selected option
              const updatedSelection = selectedVariant.selectedOptions.map((option) => {
                if (selection.name === option.name) {
                  return selection
                } else {
                  return option
                }
              })

              // Find the variant that has the same selectedOptions combination as the updatedSelection 
              const newVariant = variants.find((variant) =>
                variant.selectedOptions.every((option) =>
                  updatedSelection.some((updatedOption) =>
                    option.name === updatedOption.name && option.value === updatedOption.value
                  )
                )
              )

              router.push({
                pathname: `/products/${handle}`,
                query: { variant: parseIdStorefront(newVariant?.id) }
              }, undefined, { scroll: false })
            }}
          >
            {/* <div className="variant-options flex gap-4 mt-2"> */}
            {
              option.values.map((value, index) => (
                <option
                  key={index}
                  id={option.name + "-" + index}
                  value={JSON.stringify({ __typename: "SelectedOption", name: option.name, value: value })}
                  defaultChecked={selectedVariant.selectedOptions.some((currentSelection) => option.name === currentSelection.name && currentSelection.value === value)}
                // className="hidden"

                >
                  {value}
                </option>
              ))
            }
          </select>
        </div>
      ))}
    </div>
  )
}

export default Options