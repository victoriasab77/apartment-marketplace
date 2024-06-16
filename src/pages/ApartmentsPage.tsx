import { ApartmentForm, ApartmentList } from '../components/organisms'
import texts from '../utils/texts'

const App = () => {
  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>{texts.pages.title}</h1>
      <ApartmentForm />
      <ApartmentList />
    </div>
  )
}

export default App
