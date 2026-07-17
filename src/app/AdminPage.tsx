import { useState } from "react";
import BookingsManager from "./components/BookingsManager";
import { requestNotificationPermission } from "../notifications";

const ADMIN_PASSWORD = "Oluwapelumi @123";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
  if (password === ADMIN_PASSWORD) {
    setIsAuthenticated(true);
    setError("");

    alert("Login successful - about to request notifications");

await requestNotificationPermission();

alert("Finished requestNotificationPermission()");
  } else {
    setError("Invalid password");
  }
};

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 outline-none"
          />

          {error && (
            <p className="mt-3 text-sm text-red-500">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="mt-5 w-full rounded-lg bg-[#D4AF37] p-3 font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF8F3]">
      
      <button
        onClick={handleLogout}
        className="absolute right-6 top-6 z-50 rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>

      <BookingsManager
        isOpen={true}
        onClose={() => {}}
        refreshTrigger={0}
      />
    </div>
  );
}