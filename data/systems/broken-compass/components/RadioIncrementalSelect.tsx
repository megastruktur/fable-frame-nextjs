'use client'

import { useState } from 'react'
import { saveFieldValue } from '@/lib/character'
import { TbDiamondFilled } from 'react-icons/tb'
import { TbDiamond } from 'react-icons/tb'

type Props = {
  fieldId: string
  characterId: string
  fieldType: string
  fieldValue: string
  fieldName: string
  valuesAmount: number
  textClass?: string
}

export default function RadioIncrementalSelect({ fieldId, characterId, fieldType, fieldValue, fieldName, valuesAmount, textClass="" }: Props) {

  // Create List of numbers from 1 to valuesAmount
  const numbers = Array.from(Array(valuesAmount).keys()).map(i => i + 1)
  const fieldInputName = `${characterId}-${fieldType}-${fieldId}`
  const [value, setValue] = useState(fieldValue)

  function changeHandler(event: any) {
    const newValue = event.target.value
    setValue(newValue)
    saveFieldValue(fieldId, newValue, characterId)
  }

  return (
    <>
      <input
        key={`${fieldId}-0-i`}
        className="hidden"
        type="radio"
        name={fieldInputName}
        id={`${fieldId}-0`}
        data-character-id={characterId}
        data-field-type={fieldType}
        data-field-id={fieldId}
        data-field-name={fieldName}
        checked={(Number(value) === 0) ? true : false}
        onChange={changeHandler}
        value="0" />

        {numbers.map(number =>
          <span key={`${fieldId}-${number}`} className={"flex"}>
            <label
              className={`cursor-pointer font-bold ${textClass} ml-1 text-red-500 pt-1`}
              htmlFor={`${fieldId}-${number}`}
              >{number <= Number(value) ? <TbDiamondFilled /> : <TbDiamond />}
            </label>
              <input
                className="hidden"
                type="radio"
                id={`${fieldId}-${number}`}
                name={fieldInputName}
                value={number}
                onChange={changeHandler}
                checked={(Number(value) === number) ? true : false}
                />
          </span>
        )}
    </>
  )
}
