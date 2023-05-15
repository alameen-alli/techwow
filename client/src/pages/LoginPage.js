import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setCurrentUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:4040/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    if (response.ok) {
      response.json().then(userInfo => {
        setCurrentUserInfo(userInfo);
        setRedirect(true);
      })
    } else {
      alert('wrong credentials!');
    };
  };



  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="pb-12 mt-16">
      <form className="login" onSubmit={login}>
        <div className="border-b border-gray-900/10">
          <h1 className="text-base font-semibold leading-7 text-gray-900">Login</h1>

          <div>
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="text"
                placeholder="xyz@mail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>


          <div className="mt-5 mb-12">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ">
              <input
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end w-full">
        <button className="loginbtn px-5 py-3 text-gray-50">Login</button>
        </div>
      </form>
    </div>
  );
}
