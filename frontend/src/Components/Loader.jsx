function Loader() {


return (
  <div className="fixed inset-0 bg-slate-500 bg-opacity-20 flex items-center justify-center z-50">
      {/* Bouncing dots loader with dark grey color and faster bounce */}
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-duration:1s]"></div>
        <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-duration:1s] [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-duration:1s] [animation-delay:-.5s]"></div>
      </div>
    </div>
)
}

export default Loader;
