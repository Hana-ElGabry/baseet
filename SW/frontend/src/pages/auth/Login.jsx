import Baseet from "../../assets/BASEET-smiling-hat.png";
import Logo from "../../components/ui/logo";

export default function Login() {
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

          <form
            className="form"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => event.preventDefault()}
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
