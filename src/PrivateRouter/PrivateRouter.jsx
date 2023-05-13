import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRouter = ({children}) => {

  const location=useLocation()

    const {user,loader}=useContext(AuthContext);

    if(loader){
      return <div>loading...</div>

    }

    if(user?.email){

        return children;
    }

    return <Navigate state={{from: location}} replace to='/login'></Navigate>
};

export default PrivateRouter;