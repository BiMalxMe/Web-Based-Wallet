export const Appbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20 bg-gray-900 border border-gray-800 rounded-full w-[50%] max-w-[600px] shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-2xl font-semibold text-white">KhaTa</span>
        </a>
      </div>
    </nav>
  );
};
