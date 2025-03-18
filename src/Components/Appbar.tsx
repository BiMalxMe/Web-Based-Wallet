export const Appbar = () => {
    return (
      <nav className="mt-7 bg-gray-900 fixed top-0 left-1/2 transform -translate-x-1/2 z-20 border-b border-gray-800 rounded-full w-2/4">
        <div className="flex items-center justify-between p-4">
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
  