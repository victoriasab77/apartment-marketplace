import React, { useState } from 'react'
import { useApartmentContext } from '../../contexts/ApartmentsContext'
import { Dropdown, InputField } from '../molecules'
import texts from '../../utils/texts'
import {
  ROOMS_TYPES,
  MINIMUM_LENGTH,
  MINIMUM_VALUE,
  APARTMENT_INITIAL_STATE,
} from '../../utils/constants'

const ApartmentForm: React.FC = () => {
  const { addApartment } = useApartmentContext()

  const [formState, setFormState] = useState(APARTMENT_INITIAL_STATE)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'price' && Number(value) < 0) {
      setFormState({
        ...formState,
        [name]: '',
      })
    } else {
      setFormState({
        ...formState,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      formState.name.trim() === '' ||
      formState.price.trim() === '' ||
      formState.description.trim() === ''
    ) {
      alert(texts.alerts.allFieldsMustBeFilled)
      return
    }

    if (Number(formState.price) < MINIMUM_VALUE) {
      alert(texts.alerts.minimumRentPrice)
      return
    }

    if (formState.description.length < MINIMUM_LENGTH) {
      alert(texts.alerts.minimumDescriptionLength)
      return
    }

    addApartment({
      id: Date.now().toString(),
      name: formState.name,
      rooms: Number(formState.rooms),
      price: Number(formState.price),
      description: formState.description,
    })

    setFormState(APARTMENT_INITIAL_STATE)
  }

  return (
    <div>
      <h4 className='mb-4'>
        <span role='img' aria-label='Create a new rent'>
          {texts.components.organisms.apartmentForm.apartmentImage}
        </span>{' '}
        {texts.components.organisms.apartmentForm.createNewRent}
      </h4>
      <form
        className='mb-5 card p-4'
        onSubmit={handleSubmit}
        style={{ backgroundColor: '#f7f7f7' }}
      >
        <div className='row'>
          <div className='col-md-3'>
            <InputField
              id='name'
              label={texts.label.title}
              type='text'
              value={formState.name}
              onChange={handleInputChange}
              name='name'
              placeholder={texts.placeholders.title}
            />
          </div>
          <div className='col-md-2'>
            <Dropdown
              id='rooms'
              label={texts.label.rooms}
              options={ROOMS_TYPES}
              value={formState.rooms}
              onChange={handleInputChange}
              name='rooms'
            />
          </div>
          <div className='col-md-2'>
            <InputField
              id='price'
              label={texts.label.price}
              type='number'
              value={formState.price}
              onChange={handleInputChange}
              name='price'
              placeholder={texts.placeholders.price}
              min={MINIMUM_VALUE}
            />
          </div>
          <div className='col-md-3'>
            <InputField
              id='description'
              label={texts.label.description}
              type='text'
              value={formState.description}
              onChange={handleInputChange}
              name='description'
              placeholder={texts.placeholders.description}
              minLength={MINIMUM_LENGTH}
            />
          </div>
          <div className='col-md-2 align-self-end'>
            <button type='submit' className='btn btn-success w-100 mb-2'>
              {texts.components.organisms.apartmentForm.submitRent}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ApartmentForm
