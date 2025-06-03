const ProfileSection = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 pt-16">
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-blue-500 p-1">
          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AT
            </span>
          </div>
        </div>
      </div>

      <h1 className="text-4xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
        Alex Turianskyj
      </h1>

      <p className="text-xl md:text-2xl text-gray-300 mb-3">
        Software Developer
      </p>

      <div className="text-sm text-gray-400 max-w-md mx-auto">
        <p>Hover over the nodes to explore my projects</p>
      </div>
    </div>
  );
};

export default ProfileSection;
