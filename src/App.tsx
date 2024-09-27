import SessionManager from "./components/SessionManager"
import { AuthManager } from "./components/AuthManager"

function App() {

  return (
    <AuthManager>
      <SessionManager />
    </AuthManager>
  )
}

export default App
