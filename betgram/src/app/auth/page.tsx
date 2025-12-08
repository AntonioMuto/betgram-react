"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiHandler } from "@/utils/apiHandler";
import { useUser } from "@/app/context/UserContext";
import { User } from "@/types/utils";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const endpoint = isRegistering
      ? "http://localhost:3001/api/auth/register"
      : "http://localhost:3001/api/auth/login";

    try {
      const response = await apiHandler<{
        token: string;
        user: User;
      }>(
        endpoint,
        {
          onError: (err: any) => {
            
            if (err.response && err.response.data && err.response.data.message) {
              setError(err.response.data.message); 
            } else {
              setError(err.message || "An unknown error occurred");
            }
            console.error("Error during authentication:", err);
          },
        },
        "POST",
        {
          email,
          password,
          ...(isRegistering && { username }), 
        }
      );

      if (response.token) {
        
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        
        router.push("/");
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden bg-custom-dark">
      <div className="relative z-10 bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {isRegistering ? "Register" : "Login"}
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {isRegistering && (
              <>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </>
            )}
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-400 hover:underline"
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
