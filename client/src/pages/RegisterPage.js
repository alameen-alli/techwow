import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4040/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert('Registration Successful!🙂')
    } else {
      alert('Registration Failed!😔')
    }
  }

  return (
    <div className="pb-12 mt-16">
      <form className="register" onSubmit={register}>
        <div className="border-b border-gray-900/10">
          <h1 className="text-base font-semibold leading-7 text-gray-900">Register</h1>

          <div>
            <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div className="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                type="text"
                placeholder="xyz@mail.com"
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button className="loginbtn px-5 py-3 text-gray-50">Register</button>
      </form>
    </div>
  );
}
