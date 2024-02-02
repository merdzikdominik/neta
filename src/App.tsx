import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import AdminModule from './components/Admin/AdminModule'
import EmployeeFile from './components/EmployeeFile/EmployeeFile'
import Reports from './components/Reports/Reports'
import Holiday from './components/Holiday/Holiday'
import Login from './components/Login/Login'
import Register from './components/Registration/Register'
import HolidaySchedule from './components/Reports/HolidaySchedule'
import HolidayReport from './components/Reports/HolidayReport'
import EmployeePersonalData from './components/Reports/EmployeePersonalData'
import Employee from './components/Reports/Employee'
import EmployeeFileData from './components/EmployeeFile/EmployeeFileData'
import PaternityLeave from './components/Reports/PaternityLeave'
import HolidayStatus from './components/Reports/HolidayStatus'
import HolidayUsed from './components/Reports/HolidayUsed'
import Absences from './components/Reports/Absences'
import HolidayRequest from './components/Holiday/HolidayRequest'
import HolidayRequestList from './components/Holiday/HolidayRequestList'
import HolidayYearPlans from './components/Holiday/HolidayYearPlans'
import HolidayPlanningStatus from './components/Holiday/HolidayPlanningStatus'
import AccountManagement from './components/EmployeeFile/AccountManagement'
import CalendarHolder from './components/Utils/CalendarHolder'
import ProtectedRoute from './components/Utils/ProtectedRoute'

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
        <Route path='/urlopy/wnioski-urlopowe' element={<ProtectedRoute element={<HolidayRequest />} authenticated={hasValidToken} />} />
        <Route path='/urlopy/lista-wnioskow' element={<ProtectedRoute element={<HolidayRequestList />} authenticated={hasValidToken} />} />
        <Route path='/urlopy/roczne-plany-urlopowe' element={<ProtectedRoute element={<HolidayYearPlans />} authenticated={hasValidToken} />} />
        <Route path='/urlopy/stan-rozplanowywania-urlopow' element={<ProtectedRoute element={<HolidayPlanningStatus />} authenticated={hasValidToken} />} />
        <Route path='/rejestracja' element={<ProtectedRoute element={<Register />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie' element={<ProtectedRoute element={<Reports />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/data-urlopu' element={<ProtectedRoute element={<HolidaySchedule />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/data-urlopu/raport-urlopowy' element={<ProtectedRoute element={<HolidayReport />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/dane-pracownika' element={<ProtectedRoute element={<EmployeePersonalData />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/dane-pracownika/pracownik' element={<ProtectedRoute element={<Employee />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/urlop-rodzicielski' element={<ProtectedRoute element={<PaternityLeave />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/stan-urlopowy' element={<ProtectedRoute element={<HolidayStatus />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/wykorzystane-urlopy' element={<ProtectedRoute element={<HolidayUsed />} authenticated={hasValidToken} />} />
        <Route path='/raportowanie/nieobecnosci' element={<ProtectedRoute element={<Absences />} authenticated={hasValidToken} />} />
        <Route path='/kalendarz' element={<ProtectedRoute element={<CalendarHolder />} authenticated={hasValidToken} />} />
      </Routes>
    </div>
  );
}

export default App;