import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import AdminModule from './components/Admin/AdminModule'
import EmployeeFile from './components/EmployeeFile/EmployeeFile'
import Reports from './components/Reports/Reports'
import Holiday from './components/Holiday/Holiday'
import Login from './components/Login/Login'
import Register from './components/Registration/Register'
import HolidaySchedule from './components/Holiday/HolidaySchedule'
import EmployeeFileData from './components/EmployeeFile/EmployeeFileData'
import HolidayRequestForm from './components/Holiday/HolidayRequestForm'
import HolidayRequestList from './components/Holiday/HolidayRequestList'
import HolidayYearPlans from './components/Holiday/HolidayYearPlans'
import AccountManagement from './components/EmployeeFile/AccountManagement'
import CalendarHolder from './components/Utils/CalendarHolder'
import ProtectedRoute from './components/Utils/ProtectedRoute'
import UserDataChange from './components/Reports/UserDataChange'

const hasToken = (): boolean => {
  const token = localStorage.getItem('authToken');
  return token !== null;
}

function App() {
  const [hasValidToken, setHasValidToken] = useState<boolean | null>(hasToken())

  useEffect(() => {
    const handleStorageChange = () => {
      setHasValidToken(hasToken());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [hasValidToken]);

  return (
    <div>
      <Routes>
        <Route path='/' element={hasValidToken ? <MainPage /> : <Login />} />
        <Route path='/strona-glowna' element={<ProtectedRoute element={<MainPage />} authenticated={hasValidToken} />} />
        <Route path='/modul-administracyjny' element={<ProtectedRoute element={<AdminModule />} authenticated={hasValidToken} />} />
        <Route path='/kartoteka-pracownika' element={<ProtectedRoute element={<EmployeeFile />} authenticated={hasValidToken} />} />
        <Route path='/kartoteka-pracownika/dane-pracownika' element={<ProtectedRoute element={<EmployeeFileData />} authenticated={hasValidToken} />} />
        <Route path='/kartoteka-pracownika/zarzadzanie-kontami' element={<ProtectedRoute element={<AccountManagement />} authenticated={hasValidToken} />} />
        <Route path='/urlopy' element={<ProtectedRoute element={<Holiday />} authenticated={hasValidToken} />} />
        <Route path='/urlopy/wnioski-urlopowe' element={<ProtectedRoute element={<HolidayRequestForm />} authenticated={hasValidToken} />} />
        <Route path='/urlopy/plan-urlopu' element={<ProtectedRoute element={<HolidaySchedule />} authenticated={hasValidToken} />} />
        <Route path='/urlopy/lista-wnioskow' element={<ProtectedRoute element={<HolidayRequestList />} authenticated={hasValidToken} />} />
        <Route path='/urlopy/roczne-plany-urlopowe' element={<ProtectedRoute element={<HolidayYearPlans />} authenticated={hasValidToken} />} />
        <Route path='/rejestracja' element={<ProtectedRoute element={<Register />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie' element={<ProtectedRoute element={<Reports />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/zmiana-danych' element={<ProtectedRoute element={<UserDataChange />} authenticated={hasValidToken} />} />
        <Route path='/kalendarz' element={<ProtectedRoute element={<CalendarHolder />} authenticated={hasValidToken} />} />
      </Routes>
    </div>
  );
}

export default App;