
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg' 
import { useContext} from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin';


const SingUp = () => {
   

    const {createUser}= useContext(AuthContext);


  
    const fromHandler=(e)=>{

        event.preventDefault();

        const name= e.target.name.value;
        const email= e.target.email.value;
        const password= e.target.password.value;

        console.log(name,email,password)


        createUser(email,password)
        .then(a=>{

            console.log(a)
        })
        .catch(error=> console.log(error))
      
    }
   return(


    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="mr-12 w-1/2">
     
   <img src={img} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <div className="card-body">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={fromHandler} action="">

      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name='name' className="input input-bordered" />
        </div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name='email' className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" name='password' className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
         <input className="btn btn-primary" type="submit" value='SingUp' />
        </div>

      </form>
      <p className='mt-5'>All ready have an account <Link className=' text-orange-500 font-bold' to='/login'> Login</Link></p>

      <div className='text-center'>
        <SocialLogin></SocialLogin>
      </div>
      </div>
    </div>
  </div>
</div>
   )
};

export default SingUp;