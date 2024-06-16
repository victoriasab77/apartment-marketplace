export const ROOMS_TYPES = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
]
export const SORT_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'highest', label: 'Price: Highest First' },
  { value: 'lowest', label: 'Price: Lowest First' },
]
export const FILTER_OPTIONS = [
  { value: 'none', label: 'All' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
]

export const MINIMUM_VALUE = 10
export const MINIMUM_LENGTH = 10

export const APARTMENTS_STORAGE_KEY = 'apartments'
export const CURRENT_RENT_STORAGE_KEY = 'currentRent'

export const APARTMENT_INITIAL_STATE = {
  name: '',
  rooms: '1',
  price: '',
  description: '',
}
