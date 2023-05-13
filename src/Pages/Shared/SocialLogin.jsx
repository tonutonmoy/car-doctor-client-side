import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";




const SocialLogin = () => {

    const {singInWithGoogle}=useContext(AuthContext)


    const googleHandler=()=>{

        singInWithGoogle()
        .then(a=>{


            console.log(a.user)

           
        })
        .catch(error=>console.log(error))
    }


    
    return (
        <div>
              <div className="divider">OR</div>

 
             <div>
             <button onClick={googleHandler} className="btn btn-circle btn-outline">


              g
           </button>
             </div>
        </div>
    );
};

export default SocialLogin;