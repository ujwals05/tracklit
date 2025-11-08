import React from "react";
import { useAuthStore } from "./store/userAuthStore.js";


const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return <Button>Click me</Button>;;
};

export default App;
