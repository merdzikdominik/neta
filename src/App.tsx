import React from 'react'
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

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='modul-administracyjny' element={<AdminModule/>} />
        <Route path='kartoteka-pracownika' element={<EmployeeFile/>} />
        <Route path='kartoteka-pracownika/dane-pracownika' element={<EmployeeFileData/>} />
        <Route path='kartoteka-pracownika/zarzadzanie-kontami' element={<AccountManagement/>} />
        <Route path='urlopy' element={<Holiday/>} />
        <Route path='urlopy/wnioski-urlopowe' element={<HolidayRequest />} />
        <Route path='urlopy/lista-wnioskow' element={<HolidayRequestList />} />
        <Route path='urlopy/roczne-plany-urlopowe' element={<HolidayYearPlans />} />
        <Route path='urlopy/stan-rozplanowywania-urlopow' element={<HolidayPlanningStatus />} />
        <Route path='logowanie' element={<Login />} />
        <Route path='rejestracja' element={<Register />} />
        <Route path='raportowanie' element={<Reports/>} />
        <Route path='raportowanie/data-urlopu' element={<HolidaySchedule />} />
        <Route path='raportowanie/data-urlopu/raport-urlopowy' element={<HolidayReport />} />
        <Route path='raportowanie/dane-pracownika' element={<EmployeePersonalData />} />
        <Route path='raportowanie/dane-pracownika/pracownik' element={<Employee />} />
        <Route path='raportowanie/urlop-rodzicielski' element={<PaternityLeave />} />
        <Route path='raportowanie/stan-urlopowy' element={<HolidayStatus />} />
        <Route path='raportowanie/wykorzystane-urlopy' element={<HolidayUsed />} />
        <Route path='raportowanie/nieobecnosci' element={<Absences />} />
      </Routes>
    </div>
  );
}

export default App;
