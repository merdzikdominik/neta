import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import AdminModule from './components/AdminModule'
import EmployeeFile from './components/EmployeeFile'
import Reports from './components/Reports'
import Holiday from './components/Holiday'
import Login from './components/Login'
import Register from './components/Register'
import HolidaySchedule from './components/HolidaySchedule'
import HolidayReport from './components/HolidayReport'
import EmployeePersonalData from './components/EmployeePersonalData'
import Employee from './components/Employee'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='modul-administracyjny' element={<AdminModule/>} />
        <Route path='kartoteka-pracownika' element={<EmployeeFile/>} />
        <Route path='raportowanie' element={<Reports/>} />
        <Route path='urlopy' element={<Holiday/>} />
        <Route path='logowanie' element={<Login />} />
        <Route path='rejestracja' element={<Register />} />
        <Route path='raportowanie/data-urlopu' element={<HolidaySchedule />} />
        <Route path='raportowanie/data-urlopu/raport-urlopowy' element={<HolidayReport />} />
        <Route path='raportowanie/dane-pracownika' element={<EmployeePersonalData />} />
        <Route path='raportowanie/dane-pracownika/pracownik' element={<Employee />} />
      </Routes>
    </div>
  );
}

export default App;
