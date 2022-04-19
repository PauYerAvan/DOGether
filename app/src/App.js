import './App.sass'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Logo } from './components/elements'
import {
   Home, 
   Login, 
   Register,  
   Profile, 
   ListFavorites,  
   UserData, 
   ListLocations, 
   ListFollows, 
   DeleteAccount, 
   LocationDetails, 
   AddLocation, 
   UpdateLocation,
   AddComment,
   UpdatePassword
} from './pages'
import { validators } from 'commons'
import { Header, NavigationMenu, SearchLocations } from './components'
const { validateToken } = validators

function App() {

  const isValidToken = () => {
    try {
      validateToken(sessionStorage.token)
      return true
    }
    catch (error) {
      alert(error.message)
      return false
    }
  }

  const goBack = () => navigate(-1)

  const navigate = useNavigate()

  // views
  const showHome = () => navigate('/')
  const showSearchLocations =  ({ query, type, city }) => { navigate(`/search?${query !== null ? `query=${query}` : ''}&${type !== null ? `type=${type}` : ''}&${city !== null ? `city=${city}` : ''}`) }
  const showLogin = () => navigate('/iniciar-sesion')
  const showRegister = () => navigate('/registro')
  const showLocationDetails = locationId => navigate(`/detalles-localizacion/${locationId}`)
  const showAddComment = locationId => navigate(`/anadir-comentario/${locationId}`)
  const showAddLocation = () => navigate('/anadir-localizacion')
  const showUpdateLocation = locationId => navigate(`/editar-localizacion/${locationId}`)
  const showListFavorites = () => navigate('/localizaciones-favoritas')
  const showProfile = () => navigate('/perfil')

  const showUserData = () => navigate('/datos-usuario')
  const showUpdatePassword = () => navigate('/cambiar-contrasena')
  const showListLocations = () => navigate('/localizaciones-propias')
  const showDeleteAccount = () => navigate('/borrar-cuenta')



  return <div>
         
    {sessionStorage.token && isValidToken() && <Header onLogo={showHome}  />}

    <Routes>
      <Route path="/*" element={sessionStorage.token && isValidToken() ? <Home onSearchLocations={showSearchLocations} goToLocationDetails={showLocationDetails} goToHome={showHome} /> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/search?" element={sessionStorage.token && isValidToken() ? <SearchLocations  goToLocationDetails={showLocationDetails} /> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/iniciar-sesion" element={!sessionStorage.token ? <Login onLoggedIn={showHome} onRegister={showRegister} /> : <Navigate replace to='/' /> }/>
      <Route path="/registro" element={!sessionStorage.token ? <Register onLogin={showLogin} onRegistered={showLogin} /> : <Navigate replace to='/' /> }/>

      <Route path="/detalles-localizacion/:locationId" element={sessionStorage.token && isValidToken() ? <LocationDetails onAddComment={showAddComment}  /> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/anadir-localizacion" element={sessionStorage.token && isValidToken() ? <AddLocation /> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/localizaciones-favoritas" element={sessionStorage.token && isValidToken() ? <ListFavorites goToLocationDetails={showLocationDetails}/> : <Navigate replace to='/iniciar-sesion' /> }/>
 
      <Route path="/perfil" element={sessionStorage.token && isValidToken() ? <Profile onUserData={showUserData} onListLocations={showListLocations} onAddLocation={showAddLocation} onDeleteAccount={showDeleteAccount} onLogOut={showLogin} /> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/datos-usuario" element={sessionStorage.token && isValidToken() ? <UserData onUpdatePassword={showUpdatePassword}  /> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/cambiar-contrasena" element={sessionStorage.token && isValidToken() ? <UpdatePassword onBack={goBack}  /> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/localizaciones-propias" element={sessionStorage.token && isValidToken() ? <ListLocations goToLocationDetails={showLocationDetails} goToUpdateLocation={showUpdateLocation} onAddComment={showAddComment}/> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/editar-localizacion/:locationId" element={sessionStorage.token && isValidToken() ? <UpdateLocation onModify={showListLocations}/> : <Navigate replace to='/iniciar-sesion' /> }/>
      <Route path="/borrar-cuenta" element={sessionStorage.token && isValidToken() ? <DeleteAccount onBack={goBack} onDeletedAccount={showRegister}/> : <Navigate replace to='/iniciar-sesion' /> }/> 
      
      <Route path="/404" element={<h1>Page not found</h1>} />
      <Route path="/*" element={<Navigate replace to='/404' />} />
    </Routes>
    
    {sessionStorage.token && isValidToken() && <NavigationMenu onSearchLocationIcon={showSearchLocations} onFavoritesIcon={showListFavorites} onProfileIcon={showProfile}/>}  

  </div>

}

export default App

