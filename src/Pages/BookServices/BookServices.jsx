import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";


const BookServices = () => {

    const service=useLoaderData();

    const {title,_id,price,img}=service;

    const {user}=useContext(AuthContext)



    const handleBookService=(e)=>{
        event.preventDefault();

        const name=e.target.name.value;
        const date=e.target.date.value;
        const email=user?.email;
        const amount=price;

         
        const order={
            img,
            name,
            email,
            date,
            amount,
            service_id:_id,
            service:title,
            
        }

        fetch('https://car-doctor-server-tonutonmoy.vercel.app/bookings',{
            method:"POST",
            headers:{
                'content-type': 'application/json' 
            },
            body: JSON.stringify(order)
        })
        .then(a=>a.json())
        .then(a=> {

            console.log(a)
        })
        .catch(error=> console.log(error))


        console.log(name,date,email,amount)


    }

    console.log(service)
    return (
        <div>
             <h2 className="text-center text-3xl">booking services: {title}</h2>
 
 
  


  
     

     <form onSubmit={handleBookService}>

     <div className="card-body ">


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

     

     <div className="form-control">
          <label className="label">
            <span className="label-text"> Name</span>
          </label>
          <input type="text" placeholder="Name" name="name" className="input input-bordered" />
        </div>




        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" placeholder="Last Name" defaultValue={user?.displayname} name="date" className="input input-bordered" />
         
        </div>



     <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="email" defaultValue={user?.email} name="email" className="input input-bordered" />
        </div>


        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input type="text" placeholder="Amount" defaultValue={`$ ${price}`} name="amount" className="input input-bordered" />
         
        </div>

        

        </div>

        <div className="form-control mt-6">
        <button className="btn btn-block">Order Confirm</button>
        </div>
        
        </div>
     </form>
      </div>


    
    

      
    );
};

export default BookServices;