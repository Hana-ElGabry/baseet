import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { login as loginAPI } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import Baseet from "../../assets/BASEET-smiling-hat.png";
import Logo from "../../components/ui/logo";

export default function Login() {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/").catch(() => {
      // The login page can still render when the backend is unavailable.
      // The actual error is displayed when the user submits the form.
    });
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginAPI({
        email: email.trim(),
        password,
      });

      const user = response.user || {};
      const role = user.role?.value || user.role || "student";

      if (!response.access_token) {
        throw new Error("The login response did not include an access token.");
      }

      loginContext(response.access_token, user, role);

      navigate(`/dashboard/${role}`, { replace: true });
    } catch (err) {
      let message = "Login failed. Please check your credentials and try again.";

      if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
        message = "Cannot connect to the backend.";
      } else if (err.response?.status === 401) {
        message = "Invalid email or password.";
      } else if (err.response?.data?.detail) {
        message =
          typeof err.response.data.detail === "string"
            ? err.response.data.detail
            : "Login failed.";
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container relative">
      <Logo />

      <div className="form-left">
        <img
          src={Baseet}
          alt="Kids learning illustration"
          className="w-full max-w-md"
        />
      </div>

      <div className="form-right">
        <div className="form-inner card">
          <h2 className="card-title">Login</h2>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="form">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <div className="auth-field-header">
              <label htmlFor="login-password">Password</label>

              <Link to="/forgot-password" className="auth-forgot-link">
                Forgot password?
              </Link>
            </div>

            <div className="auth-password-wrap">
              <input
                id="login-password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPass((visible) => !visible)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
