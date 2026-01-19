import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/commons/Layout"
import '@/styles/globals.css'


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
