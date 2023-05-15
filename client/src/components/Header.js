import { useContext, useEffect} from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";


export default function Header() {
const {setCurrentUserInfo, currentUserInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4040/profile', {
      credentials: 'include',
    })
      .then(response => {
        return response.json();
      })
      .then(userInfo => {
        setCurrentUserInfo(userInfo);
      });
  }, []);

  function logout () {
    fetch('http://localhost:4040/logout', {
      credentials: 'include',
      method: 'POST'
    });
    setCurrentUserInfo(null);
  }

  const username = currentUserInfo?.username;

    return (
        <header className="fixed w-full  px-10 py-5 text-gray-900 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg " >
          <NavLink exact to='/' activeClassName="active" className="logo" >
            TechWow
          </NavLink>
          <nav>
            {username && (
              <>
              <NavLink to='/create' activeClassName="active" className="create">Create new post</NavLink>
              <a href="#" onClick={logout}>Logout</a>
              </>
            )}
            {!username && (
              <>
              <NavLink to='/login' activeClassName="active" className="login">Login</NavLink>
              <NavLink to='/register' activeClassName="active" className="register">Register</NavLink>
              </>
            )}
          </nav>
        </header>
    );
};