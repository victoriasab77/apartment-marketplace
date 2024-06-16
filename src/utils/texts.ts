export default {
  alerts: {
    allFieldsMustBeFilled: 'All fields must be filled out',
    minimumRentPrice: 'Rent price must be at least 10',
    minimumDescriptionLength: 'Description must be at least 10 characters long',
    apartmentIsExist: 'Apartment with these details already exists.',
  },
  placeholders: {
    title: 'Ex. Flat in the city center',
    price: 'Ex. 100',
    description: 'Ex. Flat with a great view',
  },
  label: {
    title: 'Title',
    rooms: 'Beds',
    price: 'Rent Price',
    description: 'Description',
    sortBy: 'Sort by:',
    filterBy: 'Filter by rooms:',
  },
  components: {
    organisms: {
      apartmentForm: {
        createNewRent: 'Create a new rent',
        submitRent: 'Submit rent',
        apartmentImage: '🏠',
      },
      apartmentItem: {
        save: 'Save',
        cancel: 'Cancel',
        roomsNumber: 'Number of Rooms:',
        price: 'Price: $',
        description: 'Description:',
        cancelRent: 'Cancel rent',
        edit: 'Edit',
        delete: 'Delete',
        rent: 'Rent',
      },
      apartmentList: {
        noApartmentsAvailable:
          'No apartments available. Please add new apartments to the list.',
        currentRent: 'Your current rent',
        availableApartments: 'Available Apartments',
        smileImage: '😃',
        apartmentImage: '🏡',
      },
    },
  },
  pages: {
    title: 'Apartments Marketplace',
  },
}
