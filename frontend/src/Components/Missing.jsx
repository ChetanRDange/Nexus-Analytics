import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-4 overflow-hidden">
      {/* Bouncy alert icon with blue background */}
      <div className="animate-bounce bg-blue-600 p-4 rounded-full shadow-lg mb-6">
        <AlertTriangle className="h-10 w-10 text-white" />
      </div>

      {/* Glowing black 404 text */}
      <h1 className="text-6xl font-extrabold mb-4 animate-glow text-black">
        404
      </h1>

      {/* Slide-in message */}
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md animate-slide-in-up">
        The page you're looking for doesn't exist. Let's head back to safer ground.
      </p>

      {/* Pulsing Go to Dashboard button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-black text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 animate-pulse"
      >
        Go to Dashboard
      </button>

      {/* Custom keyframes */}
      <style>
        {`
          @keyframes slideInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-in-up {
            animation: slideInUp 0.8s ease-out forwards;
          }

          @keyframes glow {
            0%, 100% {
              text-shadow: 0 0 10px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.4);
            }
            50% {
              text-shadow: 0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6);
            }
          }
          .animate-glow {
            animation: glow 2s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
