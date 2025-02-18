
function Navbar() {
  return (
    <nav className="bg-black-200 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-9 h-14">
        <div className="logo font-bold text-4xl">
        Password
          <span className="text-indigo-700">Bank</span>
        </div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="#">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul>
        <button className="text-gray-400 bg-indigo-900 my-5 rounded-full flex justify-between items-center h-14 ring-white ring-1">
          <img className="p-5 w-18" src="/icons/github.png" alt="github logo" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
