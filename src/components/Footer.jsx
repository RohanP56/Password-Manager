

function Footer() {
  return (
    <div className="bg-black text-white flex flex-col justify-center items-center w-full">
      <div className="logo font-bold text-4xl text-white">
        Password
        <span className="text-indigo-500">Bank</span>
      </div>

      <div>
        <div className="flex m-2">
          Created with
          <img className="w-6 mx-1" src="/icons/heart.png" alt="" /> by Rohan
        </div>
      </div>
    </div>
  );
}

export default Footer;
