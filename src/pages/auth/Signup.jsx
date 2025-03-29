import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { signupUser } from "../../services/Auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setLoading(false);
      return toast.error("Both fields are required!");
    }

    try {
      // const result = await signupUser(formData);
      if (!result) {
        setLoading(false);
        return toast.error("Signup failed! Please check your details.");
      }

      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); 
    } catch (err) {
      setError(err.message || "Something went wrong!");
      toast.error(err.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          Create an Account
        </h2>
    
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
   
        <div className="mb-6">
          <label className="block text-sm text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
   
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-600 font-medium">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
