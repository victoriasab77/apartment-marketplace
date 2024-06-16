import React from 'react'
import { useApartmentContext } from '../../contexts/ApartmentsContext'
import { Dropdown } from '../molecules'
import { ApartmentItem } from '../organisms'
import type { Apartment } from '../../contexts/ApartmentsContext'
import { SORT_OPTIONS, FILTER_OPTIONS } from '../../utils/constants'
import texts from '../../utils/texts'

const ApartmentList: React.FC = () => {
  const {
    apartments,
    availableApartmentsNumber,
    apartmentsNumber,
    sortOrder,
    roomsFilter,
    currentRent,
    deleteApartment,
    editApartment,
    setSortOrder,
    setRoomsFilter,
    setCurrentRent,
    cancelRent,
  } = useApartmentContext()

  const handleEdit = (apartment: Partial<Apartment>) => {
    if (apartment.id) {
      editApartment(apartment as Apartment)
    }
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value)
  }

  const handleRoomsFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setRoomsFilter(value === 'none' ? null : parseInt(value, 10))
  }

  console.log(currentRent)

  return (
    <>
      {apartmentsNumber === 0 ? (
        <div className='d-flex justify-content-center align-items-center'>
          <h2 className='text-center'>
            {texts.components.organisms.apartmentList.noApartmentsAvailable}
          </h2>
        </div>
      ) : (
        <div>
          {currentRent ? (
            <>
              <div>
                <h4>
                  <span role='img' aria-label='Your current rent'>
                    {texts.components.organisms.apartmentList.smileImage}{' '}
                  </span>
                  {texts.components.organisms.apartmentList.currentRent}
                </h4>
              </div>
              <ApartmentItem
                {...currentRent}
                isCurrentRent={true}
                onCancelRent={cancelRent}
              />
            </>
          ) : null}
          {availableApartmentsNumber === 0 ? null : (
            <>
              <h4>
                <span role='img' aria-label='Available Apartments'>
                  {texts.components.organisms.apartmentList.apartmentImage}{' '}
                </span>
                {texts.components.organisms.apartmentList.availableApartments} (
                {availableApartmentsNumber})
              </h4>
              <div className='mb-3 d-flex'>
                <div className='me-3'>
                  <Dropdown
                    id='sort'
                    label={texts.label.sortBy}
                    options={SORT_OPTIONS}
                    value={sortOrder}
                    onChange={handleSortChange}
                    name='sortOrder'
                  />
                </div>
                <div>
                  <Dropdown
                    id='roomsFilter'
                    label={texts.label.filterBy}
                    options={FILTER_OPTIONS}
                    value={
                      roomsFilter !== null ? roomsFilter.toString() : 'none'
                    }
                    onChange={handleRoomsFilterChange}
                    name='roomsFilter'
                  />
                </div>
              </div>
              {apartments.map((apt) => (
                <>
                  {apt.id === currentRent?.id ? null : (
                    <ApartmentItem
                      onDelete={() => deleteApartment(apt.id)}
                      onEdit={handleEdit}
                      onRent={() => setCurrentRent(apt)}
                      key={apt.id}
                      isCurrentRent={false}
                      {...apt}
                    />
                  )}
                </>
              ))}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default ApartmentList
