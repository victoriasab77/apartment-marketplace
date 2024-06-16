import React from 'react'

interface InputFieldProps {
  id: string
  label: string
  type: string
  value: string
  placeholder?: string
  minLength?: number
  min?: number
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  placeholder,
  minLength,
  min,
  name,
  onChange,
}) => {
  return (
    <div className='me-2 mb-2 flex-grow-1'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <input
        type={type}
        className='form-control'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        minLength={minLength}
        min={min}
      />
    </div>
  )
}

export default InputField
