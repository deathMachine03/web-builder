import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings } from "../store/store";
import Header from "../components/Header";
import EditPanel from "../components/EditPanel";


const HomePage = () => {
  const dispatch = useDispatch();
  const { bgImage, text, buttonColor, buttonText } = useSelector((state) => state.site);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div
        className="h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-900">{text}</h1>
          <button className="px-6 py-2 mt-5 text-white rounded-lg" style={{ backgroundColor: buttonColor }}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
