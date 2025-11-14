import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminSignin } from "./authThunks";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      adminSignin({
        emailOrUsername: form.identifier,
        password: form.password,
      })
    );

    if (adminSignin.fulfilled.match(result)) {
      console.log("Login successful:", result.payload);
      // Navigate to dashboard here
      navigate("/dashboard");
    } else {
      console.error("Login error:", result.payload);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Sign In
        </h1>

        {/* Error Message */}
        {error && (
          <p className="mb-3 text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email or Username */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder="Enter your email or username"
              className="px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors duration-200 disabled:bg-gray-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
