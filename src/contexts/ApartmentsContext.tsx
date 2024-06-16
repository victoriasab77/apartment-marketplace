import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

export interface Apartment {
  id: string
  name: string
  rooms: number
  price: number
  description: string
}

enum sortOptions {
  NONE = 'none',
  HIGHEST = 'highest',
  LOWEST = 'lowest',
}

import texts from '../utils/texts'
import {
  APARTMENTS_STORAGE_KEY,
  CURRENT_RENT_STORAGE_KEY,
  MINIMUM_LENGTH,
  MINIMUM_VALUE,
} from '../utils/constants'

interface AppContextProps {
  apartments: Apartment[]
  currentRent: Apartment | null
  sortOrder: string
  availableApartmentsNumber: number
  apartmentsNumber: number
  roomsFilter: number | null
  addApartment: (apartment: Apartment) => void
  deleteApartment: (id: string) => void
  editApartment: (apartment: Apartment) => void
  setCurrentRent: (apartment: Apartment | null) => void
  setSortOrder: (order: string) => void
  setRoomsFilter: (rooms: number | null) => void
  cancelRent: () => void
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const useApartmentContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

const loadFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

const saveToLocalStorage = (key: string, data: object) => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const ApartmentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [currentRent, setCurrentRent] = useState<Apartment | null>(null)
  const [sortOrder, setSortOrder] = useState<string>(sortOptions.NONE)
  const [roomsFilter, setRoomsFilter] = useState<number | null>(null)
  const [originalApartments, setOriginalApartments] = useState<Apartment[]>([])

  const availableApartmentsNumber = currentRent
    ? apartments?.length - 1
    : apartments?.length

  const apartmentsNumber = apartments?.length

  useEffect(() => {
    const initialApartments = loadFromLocalStorage(APARTMENTS_STORAGE_KEY) || []
    const initialCurrentRent = loadFromLocalStorage(CURRENT_RENT_STORAGE_KEY)
    setApartments(initialApartments)
    setOriginalApartments(initialApartments)
    setCurrentRent(initialCurrentRent)
  }, [])

  const addApartment = (apartment: Apartment) => {
    const duplicate = apartments.some(
      (apt) =>
        apt.name === apartment.name &&
        apt.rooms === apartment.rooms &&
        apt.price === apartment.price &&
        apt.description === apartment.description
    )

    if (duplicate) {
      alert(texts.alerts.apartmentIsExist)
    } else {
      setApartments((prevApartments) => {
        const updatedApartments = [...prevApartments, apartment]
        setOriginalApartments(updatedApartments)
        saveToLocalStorage(APARTMENTS_STORAGE_KEY, updatedApartments)
        return updatedApartments
      })
    }
  }

  const deleteApartment = (id: string) => {
    setApartments((prevApartments) => {
      const updatedApartments = prevApartments.filter(
        (apartment) => apartment.id !== id
      )
      setOriginalApartments(updatedApartments)
      saveToLocalStorage(APARTMENTS_STORAGE_KEY, updatedApartments)
      return updatedApartments
    })
  }

  const editApartment = (updatedApartment: Apartment) => {
    if (
      !updatedApartment.name.trim() ||
      !updatedApartment.rooms ||
      !updatedApartment.price ||
      !updatedApartment.description.trim()
    ) {
      alert(texts.alerts.allFieldsMustBeFilled)
      return
    }

    if (updatedApartment.price < MINIMUM_VALUE) {
      alert(texts.alerts.minimumRentPrice)
      return
    }

    if (updatedApartment.description.length < MINIMUM_LENGTH) {
      alert(texts.alerts.minimumDescriptionLength)
      return
    }

    const duplicate = apartments.some(
      (apt) =>
        apt.id !== updatedApartment.id &&
        apt.name === updatedApartment.name &&
        apt.rooms === updatedApartment.rooms &&
        apt.price === updatedApartment.price &&
        apt.description === updatedApartment.description
    )

    if (duplicate) {
      alert(texts.alerts.apartmentIsExist)
      return
    }

    setApartments((prevApartments) => {
      const updatedApartments = prevApartments.map((apartment) =>
        apartment.id === updatedApartment.id ? updatedApartment : apartment
      )
      setOriginalApartments(updatedApartments)
      saveToLocalStorage(APARTMENTS_STORAGE_KEY, updatedApartments)
      return updatedApartments
    })
  }

  const getFilteredAndSortedApartments = () => {
    let filteredApartments = [...originalApartments]

    if (roomsFilter !== null) {
      filteredApartments = filteredApartments.filter(
        (apartment) => apartment.rooms === roomsFilter
      )
    }

    if (sortOrder === sortOptions.NONE) {
      return filteredApartments
    } else {
      return filteredApartments.sort((a, b) => {
        if (sortOrder === sortOptions.HIGHEST) {
          return b.price - a.price
        } else if (sortOrder === sortOptions.LOWEST) {
          return a.price - b.price
        } else {
          return 0
        }
      })
    }
  }

  const cancelRent = () => {
    setCurrentRent(null)
    localStorage.removeItem(CURRENT_RENT_STORAGE_KEY)
  }

  return (
    <AppContext.Provider
      value={{
        apartments: getFilteredAndSortedApartments(),
        currentRent,
        sortOrder,
        addApartment,
        deleteApartment,
        editApartment,
        setCurrentRent,
        setSortOrder,
        roomsFilter,
        setRoomsFilter,
        cancelRent,
        availableApartmentsNumber,
        apartmentsNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
