'use client'

import { useState } from 'react'
import { saveFieldValue } from '@/lib/utils'
import { BsChevronUp } from'react-icons/bs'

type Props = {
  fieldId: string
  characterId: string
  fieldType: string
  fieldValue: string
  fieldName: string

  valuesAmount: number
}

export default function RadioIncrementalSelect({ fieldId, characterId, fieldType, fieldValue, fieldName, valuesAmount }: Props) {

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
          <span key={`${fieldId}-${number}`}>
            <label
              className={`cursor-pointer font-bold text-3xl text-red-500 ${number <= Number(value)? 'text-red-500' : 'text-white'}`}
              htmlFor={`${fieldId}-${number}`}
              >

              <input
                className="hidden"
                type="radio"
                id={`${fieldId}-${number}`}
                name={fieldInputName}
                value={number}
                onChange={changeHandler}
                checked={(Number(value) === number) ? true : false}
                />
              <BsChevronUp className='inline-block' />
            </label>
          </span>
        )}
    </>
  )
}
