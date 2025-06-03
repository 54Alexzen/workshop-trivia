import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./config/firebase";

interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const loginWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      const token = await response.user.getIdToken();
      sessionStorage.setItem("token", token);
      setUser({
        displayName: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL,
        uid: response.user.uid,
      });
    } catch (error) {
      console.error("Error durante el login:", (error as Error).message);
      alert("Error al iniciar sesión con Google.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("token");
      setUser(null);
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error durante el logout:", (error as Error).message);
      alert("Error al cerrar sesión.");
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">App Deezer</h1>

      {!user ? (
        <button
          onClick={loginWithGoogle}
          className="bg-stone-200 px-4 py-2 rounded-full hover:bg-stone-300 cursor-pointer transition-colors duration-300 mt-10"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google Logo"
            className="inline-block w-6 h-6 mr-2"
          />
          Iniciar sesión con Google
        </button>
      ) : (
        <div className="text-center flex flex-col items-center mt-20">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-3xl font-bold mb-1"> Usuario</h2>
          <p className="mb-10 text-xl">{user.displayName}</p>
          <button
            onClick={logout}
            className="bg-stone-200 px-4 py-2 rounded-full hover:bg-stone-300 cursor-pointer transition-colors duration-300"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
