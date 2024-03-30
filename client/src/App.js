import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Register, Error, ProtectedRoute } from './pages'
import {
  Home,
  SharedLayout,
  AddNewListing,
  ListingInfo,
} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path='AddNewListing' element={<AddNewListing />}></Route>
          <Route path='ListingInfo' element={<ListingInfo />}></Route>
        </Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/landing' element={<Landing />}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
