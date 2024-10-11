import SessionManager from "./components/SessionManager"
import { AuthManager } from "./components/AuthManager"
import { NextUIProvider } from "@nextui-org/system"

function App() {

  return (
    <NextUIProvider>
      <AuthManager>
        <SessionManager />
      </AuthManager>
    </NextUIProvider>
  )
}

export default App
