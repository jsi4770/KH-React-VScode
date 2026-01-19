import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/commons/Layout"


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          hello world
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
