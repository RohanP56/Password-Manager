import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (localStorage.getItem("passwords")) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  //This function will control the visibility of the password
  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/offeye.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/offeye.png";
      passwordRef.current.type = "text";
    }
  };

  //function to save password
  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
    
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    //console.log(...passwordArray, form);
    setForm({ site: "", username: "", password: "" });
    toast('Password saved Successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    }else{
      toast('Error: Please fill all the fields!');
    }
  };

  //function to edit password
  const editPassword = (id) => {
    console.log("Editing password with ID: ", id);
    setForm(passwordArray.filter(item => item.id === id)[0]);
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  }

  //function to delete password
  const deletePassword = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this password?");
    if(confirm){
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //copying text to clipboard
  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="text-white p-3 md:p-0 md:mycontainer min-h-[88.2vh]">
        <h1 className="text-3xl  font-bold text-center">
          Password
          <span className="text-indigo-700">Bank</span>
          <br />
        </h1>
        <p className="text-indigo-200 text-xl font-bold text-center">
          Your Digital Fortress
        </p>
        <div className="text-white flex flex-col p-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            id="site"
            placeholder="Website URL"
            className="w-full p-2 rounded-full border-2 border-indigo-300"
          />
          <div className="flex flex-col md:flex-row w-full text-white p-4 gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              className="p-2 flex rounded-full w-full border-2 border-indigo-300"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="p-2 flex rounded-full w-full border-2 border-indigo-300"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <span
                className="absolute right-[5px] top-[8px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={27}
                  src="./icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-600 hover:bg-green-800 rounded-full px-8 py-1 w-fit hover:border-2 border-white-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="click"
              stroke="bold"
              colors="primary:#ffffff,secondary:#e4e4e4"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4 text-indigo-400">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-sm overflow-hidden mb-10">
              <thead className="bg-indigo-900 text-white border border-white">
                <tr>
                  <th className="py-2">Website URL</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-indigo-950 text-white border border-white">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* Added unique key prop */}
                      <td className="py-2 border text-center ">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div className="px-2">
                            <img
                              className="w-3 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }} // Added onClick event
                              src="./icons/copy.svg"
                              alt="copy icon"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border text-center">
                        <div className="flex items-center justify-center ">
                          {item.username}
                          <div className="px-2">
                            <img
                              className="w-3 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }} // Added onClick event
                              src="./icons/copy.svg"
                              alt="copy icon"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border text-center">
                        <div className="flex items-center justify-center">
                          {item.password}
                          <div className="px-2">
                            <img
                              className="w-3 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }} // Added onClick event
                              src="./icons/copy.svg"
                              alt="copy icon"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="flex items-center justify-center py-3 gap-6  text-center">
                        <span onClick={()=>{editPassword(item.id)}} className="cursor-pointer" >
                          <img className="w-3" src="./icons/edit.svg" alt="edit icon" />
                        </span>
                        <span onClick={()=>{deletePassword(item.id)}} className="cursor-pointer" >
                          <img className="w-3" src="./icons/trash.svg" alt="delete icon" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
