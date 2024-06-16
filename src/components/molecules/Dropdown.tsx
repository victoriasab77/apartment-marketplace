import React from 'react'

interface DropdownProps {
  id: string
  label: string
  options: { value: string; label: string }[]
  value: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  id,
  label,
  options,
  value,
  name,
  onChange,
}) => {
  return (
    <div className='me-2 mb-2 flex-grow-1'>
      <label htmlFor={id} className='form-label'>
        {label}
      </label>
      <select
        className='form-select'
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
