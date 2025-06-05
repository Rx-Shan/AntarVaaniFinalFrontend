import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center justify-center bg-white text-center">
      <img
        src="/AF_logo.png"
        alt="AntarVaani Logo"
        className="w-40 mb-6 bg-white "
      />
      <h1 className="text-5xl font-extrabold text-green-600 tracking-wide">
        ANTARVAANI
      </h1>
      <p className="italic text-xl mt-2 font-medium text-black">
        Let your inner voice be heard
      </p>
      <button
        onClick={() => navigate('/questionnaire')}
        style={{ backgroundColor: '#5af779' }}
        className="animate-pulse mt-8 px-6 py-2 bg-amber-500 text-black border border-gray-300 rounded-md shadow hover:shadow-lg transition duration-300 text-lg font-semibold"
      >
        Try AntarVaani!
      </button>
    </div>
  );
}

export default WelcomePage;
