import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobno, setMobno] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name,
        email,
        mobno,
        password,
        role: "user", // normal user
      };

      const response = await axios.post("http://localhost:5000/api/auth/register", payload);

      setMessage(response.data.message);

      // Clear form fields after successful registration
      setName("");
      setEmail("");
      setMobno("");
      setPassword("");

      // Redirect to login after successful registration
      if (response.data.message.includes("successful")) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form 
        onSubmit={handleSubmit}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-lg"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Sign Up</h1>
        <p className="text-gray-500 text-sm mt-2">Create your account to get started</p>
        
        {/* Name Input */}
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Full Name" 
            className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
            disabled={loading}
          />                 
        </div>

        {/* Email Input */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500 transition-colors">
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
          </svg>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email id" 
            className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
            disabled={loading}
          />                 
        </div>

        {/* Mobile Number Input */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input 
            type="text" 
            value={mobno} 
            onChange={(e) => setMobno(e.target.value)} 
            placeholder="Mobile Number" 
            className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
            disabled={loading}
            maxLength="10"
          />                 
        </div>
    
        {/* Password Input */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500 transition-colors">
          <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
          </svg>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            className="bg-transparent text-gray-900 placeholder-gray-500 outline-none text-sm w-full h-full" 
            required 
            disabled={loading}
            minLength="6"
          />                 
        </div>

        {/* Error/Success Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            message.includes('successful') || message.includes('Registration successful')
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
            {message.includes('successful') && (
              <div className="mt-2 text-xs text-green-600">
                Redirecting to login page...
              </div>
            )}
          </div>
        )}
    
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className={`mt-6 w-full h-11 rounded-full text-white font-medium transition-all duration-200 ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg active:scale-95'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>
        
        {/* Sign In Link */}
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Already have an account? 
          <a className="text-indigo-500 hover:text-indigo-600 transition-colors ml-1" href="/login">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;