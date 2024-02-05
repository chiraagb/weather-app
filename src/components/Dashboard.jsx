import { useNavigate } from "react-router-dom";
import logo from "../images/logo-alpaago.png";
import Weather from "./Weather";
import { getAuth, signOut } from "firebase/auth";
import UserTable from "./UserTable";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };
  return (
    <>
      <div className="flex justify-between m-3">
        <div className="flex items-center gap-2 p-2">
          <img src={logo} className="w-12" />
          <span>Weather Information</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleSignout}
            className="p-2 bg-[#612698] text-white text-md rounded-lg"
          >
            SignOut
          </button>
        </div>
      </div>

      <Weather />
      <UserTable />
    </>
  );
};
export default Dashboard;
