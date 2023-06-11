'use client'

import { useState, useEffect, useRef } from "react"

import { saveFieldValue } from "@/lib/utils"

type Props = {
  fieldId: string
  characterId: string
  fieldType: string
  fieldValue: string
  fieldName: string
}

export default function ClickInput({ fieldId, characterId, fieldType, fieldValue, fieldName }: Props) {

  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(fieldValue)
  const inputRef = useRef<HTMLInputElement>(null)

  function clickEdit(event: any) {
    
    setEdit(true)
  }

  function backToText(event: any) {
    if (value === "") {
      setValue(fieldValue)
    }

    // Save the data to DB
    saveFieldValue(fieldId, value, characterId)

    setEdit(false)
  }

  function handleChangeField(event: any) {
    setValue(event.target.value)
  }

  function EditableInput({ value }: { value: string }) {

    useEffect(() => {
      if (inputRef !== null) {
        inputRef.current?.focus();
      }
    }, [])

    return (
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 inline-block"
        type="text"
        data-character-id={characterId}
        data-field-type={fieldType}
        data-field-id={fieldId}
        data-field-name={fieldName}
        defaultValue={value}
        onBlur={backToText}
        onChange={handleChangeField}
        ref={inputRef}
      />
    )
  }

  const element = !edit? (
    <span onClick={clickEdit} className="text-green-300 cursor-pointer">{value}</span>
  ) : (
    <EditableInput value={value} />
  )

  return element
}
