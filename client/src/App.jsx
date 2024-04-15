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
import AboutUsPage from "./pages/AboutUsPage"
import ContactUs from "./pages/ContactUs"
import SearchResult from "./pages/SearchResult"

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/companies" element={<CompanyPage />} />
        <Route path="/freelancers" element={<FreelancersPage/>} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/profile/:email" element={<ProfileDisplay />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/search" element={<SearchResult location={location} />} />


      </Routes>
      
      
    </>
  )
}

export default App