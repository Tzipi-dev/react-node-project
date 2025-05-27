import { useDispatch, useSelector } from "react-redux";
import Add from "../components/Add";
import LastItems from "../components/LastItems";
import { selectCurrentUser, setCurrentUser } from "../redux/slice/currentuser";
import { useCookies } from "react-cookie";
import { User } from "../interfaces/models";
import { useEffect } from "react";



const HomePage = () => {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const decodeJwtPayload = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT payload:", error);
      return null;
    }
  };
  useEffect(() => {
    if (currentUser?.name === 'Guest' && currentUser.email === '') {
      if (token) {
        const payload = decodeJwtPayload(token);
        if (payload) {
          const userDetailsToSend: User = {
            _id: payload._id || '',
            name: payload.name || '',
            email: payload.email || '',
            password: payload.password || '',
            phone: payload.phone || '',
          };
          dispatch(setCurrentUser(userDetailsToSend));
        }
      } else {
        alert("Please log in or sign up");
      }
    }
  }, [token, currentUser, dispatch]);
  return (
    <>
      <Add />
      <LastItems />
      
    </>
  );
};

export default HomePage;
