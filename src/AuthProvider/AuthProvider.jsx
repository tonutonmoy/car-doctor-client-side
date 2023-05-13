import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import app from '../firebase/firebase.config'





export const AuthContext= createContext(null);

const auth = getAuth(app);

const googleProvider= new GoogleAuthProvider();


const AuthProvider = ({children}) => {

   const [user,setUser]=useState(null)
   const [loader,setLoader]=useState(true)


   const createUser=(email,password)=>{

      setLoader(true)

      return createUserWithEmailAndPassword(auth,email,password)

   }


    const loginUser=(email,password)=>{

      setLoader(true)

      return signInWithEmailAndPassword(auth,email,password)

    }

    const singInWithGoogle=()=>{

     return signInWithPopup(auth,googleProvider)

    }

     useEffect(()=>{

     const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{

           
          
           setUser(currentUser)

           setLoader(false);
         console.log(currentUser)

         if(currentUser && currentUser.email){

            const loggedUser={ email: currentUser.email}

            fetch('https://car-doctor-server-tonutonmoy.vercel.app/jwt',{
               method:'POST',
               headers:{
                'content-type':'application/json'
               },
               body:JSON.stringify(loggedUser)
                
              })
              .then(a=> a.json())
              .then(a=> {
                console.log(a)
              
                localStorage.setItem('car-access-token',a.token)
    
              })
              .catch(error=> console.log(error))
         }

         else{
            localStorage.removeItem('car-access-token')
         }

      })

      return ()=>{

         return unsubscribe();
      }

},[])
   


const logOut=()=>{

   setLoader(true)

 return signOut(auth)
  }

    const authInfo={
      createUser,
      user,
      loader,
      loginUser,
      logOut,
      singInWithGoogle

    }

    return (

       <AuthContext.Provider value={authInfo}>
          
          {children}
        
       </AuthContext.Provider>
    );
};

export default AuthProvider;