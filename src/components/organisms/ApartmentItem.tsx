import React, { useState, useEffect } from 'react'
import { Dropdown, InputField } from '../molecules'
import type { Apartment } from '../../contexts/ApartmentsContext'
import { ROOMS_TYPES, MINIMUM_VALUE } from '../../utils/constants'
import texts from '../../utils/texts'

interface ApartmentItemProps {
  id: string
  name?: string
  rooms?: number
  price?: number
  description?: string
  isCurrentRent: boolean
  onDelete?: () => void
  onEdit?: (apartment: Partial<Apartment>) => void
  onRent?: () => void
  onCancelRent?: () => void
}

const ApartmentItem: React.FC<ApartmentItemProps> = ({
  id,
  name = '',
  rooms = 0,
  price = 0,
  description = '',
  isCurrentRent,
  onDelete,
  onEdit,
  onRent,
  onCancelRent,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editState, setEditState] = useState({
    name: name || '',
    rooms: rooms.toString() || '0',
    price: price.toString() || '0',
    description: description || '',
  })

  useEffect(() => {
    if (!isEditing) {
      setEditState({
        name: name || '',
        rooms: rooms.toString() || '0',
        price: price.toString() || '0',
        description: description || '',
      })
    }
  }, [isEditing, name, rooms, price, description])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setEditState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSave = () => {
    onEdit &&
      onEdit({
        id,
        name: editState.name,
        rooms: parseInt(editState.rooms, 10),
        price: parseFloat(editState.price),
        description: editState.description,
      })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className={`card mb-3 ${isCurrentRent ? 'border-primary' : ''}`}>
      <div className='card-body d-flex align-items-center'>
        {isEditing ? (
          <div className='d-flex w-100 flex-wrap align-items-center'>
            <InputField
              id={`name-${id}`}
              label={texts.label.title}
              type='text'
              value={editState.name}
              name='name'
              onChange={handleInputChange}
            />
            <Dropdown
              id={`rooms-${id}`}
              label={texts.label.rooms}
              options={ROOMS_TYPES}
              value={editState.rooms}
              name='rooms'
              onChange={handleInputChange}
            />
            <InputField
              id={`price-${id}`}
              label={texts.label.price}
              type='number'
              value={editState.price}
              name='price'
              onChange={handleInputChange}
              min={MINIMUM_VALUE}
            />
            <InputField
              id={`description-${id}`}
              label={texts.label.description}
              type='text'
              value={editState.description}
              name='description'
              onChange={handleInputChange}
            />
            <div className='d-flex align-items-center mb-2'>
              <button
                className='btn btn-success me-2 mt-4 align-self-center'
                onClick={handleSave}
              >
                {texts.components.organisms.apartmentItem.save}
              </button>
              <button
                className='btn btn-secondary mt-4 align-self-center'
                onClick={handleCancel}
              >
                {texts.components.organisms.apartmentItem.cancel}
              </button>
            </div>
          </div>
        ) : (
          <div className='d-flex w-100 align-items-center'>
            <div className='flex-grow-1 me-2'>
              <h5 className='card-title'>{name}</h5>
              <p className='card-text mb-1'>
                {texts.components.organisms.apartmentItem.roomsNumber} {rooms}
              </p>
              <p className='card-text mb-1'>
                {texts.components.organisms.apartmentItem.price}
                {price}
              </p>
              <p className='card-text mb-1'>
                {texts.components.organisms.apartmentItem.description}{' '}
                {description}
              </p>
            </div>
            <div className='d-flex align-items-center'>
              {isCurrentRent ? (
                <button className='btn btn-danger me-2' onClick={onCancelRent}>
                  {texts.components.organisms.apartmentItem.cancelRent}
                </button>
              ) : (
                <>
                  <button
                    className='btn btn-warning me-2'
                    onClick={() => setIsEditing(true)}
                  >
                    {texts.components.organisms.apartmentItem.edit}
                  </button>
                  <button className='btn btn-danger me-2' onClick={onDelete}>
                    {texts.components.organisms.apartmentItem.delete}
                  </button>
                  <button className='btn btn-primary' onClick={onRent}>
                    {texts.components.organisms.apartmentItem.rent}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApartmentItem
