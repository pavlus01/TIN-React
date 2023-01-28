import {Routes, Route } from 'react-router-dom';

import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from './components/fragments/Footer';
import AutoList from './components/Auto/AutoList';
import KlientList from './components/Klient/KlientList';
import WypozyczenieList from './components/Wypozyczenie/WypozyczenieList';
import AutoDetails from './components/Auto/AutoDetails'
import AutoForm from './components/Auto/AutoForm'
import KlientDetails from './components/Klient/KlientDetails'
import KlientForm from './components/Klient/KlientForm'
import WypozyczenieDetails from './components/Wypozyczenie/WypozyczenieDetails'
import WypozyczenieForm from './components/Wypozyczenie/WypozyczenieForm'
import AutoDelete from './components/Auto/AutoDelete'
import KlientDelete from './components/Klient/KlientDelete'
import WypozyczenieDelete from './components/Wypozyczenie/WypozyczenieDelete'
import { useState } from 'react';
import LoginForm from './components/other/LoginForm';
import ProtectedRoute from './components/other/ProtectedRoute';
import ProtectedAdmin from './components/other/ProtectedAdmin';
import PortfelList from './components/Portfel/PortfelList';
import PortfelDetails from './components/Portfel/PortfelDetails'
import PortfelDelete from './components/Portfel/PortfelDelete'
import PortfelForm from './components/Portfel/PortfelForm'
import WypozyczalniaList from './components/Wypozyczalnia/WypozyczalniaList';
import WypozyczalniaDetails from './components/Wypozyczalnia/WypozyczalniaDetails'
import WypozyczalniaDelete from './components/Wypozyczalnia/WypozyczalniaDelete'
import WypozyczalniaForm from './components/Wypozyczalnia/WypozyczalniaForm'

function App() {
  const [user, setUser] = useState()

  const handleLogin = (user) => {
    localStorage.setItem('user', user)
    setUser(user)
  }
  
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  return (
    <>
      <Header />
      <Navigation handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="Auto">
          <Route index={true} element={ <AutoList /> } />
          <Route path="details/:autoId" element={<ProtectedRoute> <AutoDetails /> </ProtectedRoute>} />
          <Route path="add" element={<ProtectedRoute><ProtectedAdmin>  <AutoForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="edit/:autoId" element={<ProtectedRoute><ProtectedAdmin> <AutoForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="delete/:autoId" element={<ProtectedRoute><ProtectedAdmin> <AutoDelete /> </ProtectedAdmin></ProtectedRoute>} />
        </Route>
        <Route path="Klient">
          <Route index={true} element={<ProtectedRoute> <KlientList /> </ProtectedRoute> } />
          <Route path="details/:klientId" element={<ProtectedRoute> <KlientDetails /> </ProtectedRoute>} />
          <Route path="add" element={<ProtectedRoute><ProtectedAdmin> <KlientForm /> </ProtectedAdmin></ProtectedRoute>} /> 
          <Route path="edit/:klientId" element={<ProtectedRoute><ProtectedAdmin> <KlientForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="delete/:klientId" element={<ProtectedRoute><ProtectedAdmin> <KlientDelete /> </ProtectedAdmin></ProtectedRoute>} /> 
        </Route>
        <Route path="Wypozyczenie">
          <Route index={true} element={<ProtectedRoute> <WypozyczenieList /> </ProtectedRoute>} />
          <Route path="details/:wypozyczenieId" element={<ProtectedRoute> <WypozyczenieDetails /> </ProtectedRoute>} />
          <Route path="add" element={<ProtectedRoute> <WypozyczenieForm /> </ProtectedRoute>} />
          <Route path="edit/:wypozyczenieId" element={<ProtectedRoute><ProtectedAdmin> <WypozyczenieForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="delete/:wypozyczenieId" element={<ProtectedRoute><ProtectedAdmin> <WypozyczenieDelete /> </ProtectedAdmin></ProtectedRoute>} />
        </Route>
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="Portfel">
          <Route index={true} element={<ProtectedRoute> <PortfelList /> </ProtectedRoute> } />
          <Route path="details/:portfelId" element={<ProtectedRoute><ProtectedAdmin> <PortfelDetails /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="add" element={<ProtectedRoute><ProtectedAdmin>  <PortfelForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="edit/:portfelId" element={<ProtectedRoute><ProtectedAdmin> <PortfelForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="delete/:portfelId" element={<ProtectedRoute><ProtectedAdmin> <PortfelDelete /> </ProtectedAdmin></ProtectedRoute>} />
        </Route>
        <Route path="Wypozyczalnia">
          <Route index={true} element={ <WypozyczalniaList /> } />
          <Route path="details/:wypozyczalniaId" element={<ProtectedRoute><ProtectedAdmin> <WypozyczalniaDetails /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="add" element={<ProtectedRoute><ProtectedAdmin>  <WypozyczalniaForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="edit/:wypozyczalniaId" element={<ProtectedRoute><ProtectedAdmin> <WypozyczalniaForm /> </ProtectedAdmin></ProtectedRoute>} />
          <Route path="delete/:wypozyczalniaId" element={<ProtectedRoute><ProtectedAdmin> <WypozyczalniaDelete /> </ProtectedAdmin></ProtectedRoute>} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}


export default App;