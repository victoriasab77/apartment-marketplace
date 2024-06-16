import { ApartmentsPage } from './pages'
import { ApartmentProvider } from './contexts'

const App = () => (
  <ApartmentProvider>
    <ApartmentsPage />
  </ApartmentProvider>
)

export default App
