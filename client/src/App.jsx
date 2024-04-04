import Nav from "./components/Nav"
import "./App.css"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { Routes, Route } from "react-router-dom"
import CompanyPage from "./pages/CompanyPage"
import FreelancersPage from "./pages/FreelancersPage"
import AccountPage from "./pages/AccountPage"
import ProfileDisplay from "./pages/ProfileDisplay"

function App() {

  return (
    <>
      {/* <Nav /> */}
      {/* <LandingPage /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/freelancers" element={<FreelancersPage/>} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/profile/:email" element={<ProfileDisplay />} />


      </Routes>
      
      
    </>
  )
}

export default App