import bg_image from "../images/bg_login.jpg";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="relative">
        <img
          src={bg_image}
          className="w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <div className="bg-[#181A1B] flex flex-col justify-center items-center p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-[#FFCD1A] font-bold">Welcome!</h1>
          <h2 className="text-2xl text-white">Login using Firebase</h2>
        </div>

        <button
          onClick={handleGoogle}
          className="p-3 rounded-lg text-white bg-[#612698] hover:opacity-75"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
