export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black w-full">
      <div className="relative w-24 h-24 animate-spin-slow">
        {/* Outer orbit */}
        <div className="absolute border-4 border-white border-t-transparent rounded-full w-24 h-24"></div>
        {/* Middle orbit */}
        <div className="absolute border-4 border-white border-t-transparent rounded-full w-16 h-16 top-1/4 left-1/4"></div>
        {/* Inner orbit */}
        <div className="absolute border-4 border-white border-t-transparent rounded-full w-8 h-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

        <style jsx>{`
          .animate-spin-slow {
            animation: spin-slow 2s linear infinite;
          }
          @keyframes spin-slow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
