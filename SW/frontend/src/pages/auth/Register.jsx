import Baseet from "../../assets/BASEET-smiling-hat.png";
import Logo from "../../components/ui/logo";

export default function Register() {
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

          <form
            className="form"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              type="text"
              placeholder="Enter your username"
            />

            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
            />

            <label htmlFor="register-role">Role</label>
            <select id="register-role" defaultValue="">
              <option value="" disabled>
                Select a role
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
              <option value="supervisor">Supervisor</option>
            </select>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={(event) => event.preventDefault()}
            >
              Register
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
