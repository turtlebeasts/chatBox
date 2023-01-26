import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase_config";
import ResponsiveDrawer from "./pages/Dashboard";
import SignIn from "./pages/SignIn";

function App() {
  const [user, setUser] = useState(undefined)

  onAuthStateChanged(auth, result => setUser(result))
  return (
    <div>
      {
        user?
        <ResponsiveDrawer user={user}/>
        :<SignIn />
      }
    </div>
  );
}

export default App;
