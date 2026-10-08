import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { register as registerAPI } from "../../api/auth";
import Baseet from "../../assets/BASEET-smiling-hat.png";
import Logo from "../../components/ui/logo";

const PASSWORD_RULES = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (password) => password.length >= 8,
  },
  {
    id: "upper",
    label: "One uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lower",
    label: "One lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: "digit",
    label: "One number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    id: "special",
    label: "One special character",
    test: (password) => /[!@#$%^&*(),.?":{}|<>_-]/.test(password),
  },
];

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const rulesPassed = PASSWORD_RULES.filter((rule) =>
    rule.test(password)
  ).length;

  const allPasswordRulesPassed =
    rulesPassed === PASSWORD_RULES.length;

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !email.trim() || !password || !role) {
      setError("Please complete all fields.");
      return;
    }

    if (!allPasswordRulesPassed) {
      setError("Please meet all password requirements.");
      return;
    }

    setLoading(true);

    try {
      await registerAPI({
        username: username.trim(),
        email: email.trim(),
        password,
        role,
      });

      setSuccess(
        "Registration completed successfully. Redirecting to login…"
      );

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (err) {
      let message = "Registration failed.";

      if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
        message = "Cannot connect to the backend.";
      } else if (err.response?.data?.detail) {
        message =
          typeof err.response.data.detail === "string"
            ? err.response.data.detail
            : "Registration failed.";
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      console.error("Registration error:", err);
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
          <h2 className="card-title">Register</h2>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="success-message" role="status">
              {success}
            </p>
          )}

          <form onSubmit={handleRegister} className="form">
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />

            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <div className="auth-field-header">
              <label htmlFor="register-password">Password</label>

              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPass((visible) => !visible)}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>

            <input
              id="register-password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />

            {password.length > 0 && (
              <ul className="auth-requirements">
                {PASSWORD_RULES.map((rule) => {
                  const passed = rule.test(password);

                  return (
                    <li
                      key={rule.id}
                      className={
                        passed
                          ? "auth-req-item auth-req-ok"
                          : "auth-req-item auth-req-fail"
                      }
                    >
                      <span className="auth-req-icon">
                        {passed ? "✅" : "✗"}
                      </span>
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            )}

            <label htmlFor="register-role">Role</label>
            <select
              id="register-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            >
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="supervisor">Supervisor</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !allPasswordRulesPassed}
            >
              {loading ? "Registering…" : "Register"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
