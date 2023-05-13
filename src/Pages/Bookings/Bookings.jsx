import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";



const Bookings = () => {

    const {user}=useContext(AuthContext);
    const navigate= useNavigate()

 

    const [booking,setBooking]=useState([]);


    const url=`http://localhost:5000/bookings?email=${ user?.email}`

    useEffect(()=>{

        fetch(url,{
          method:"GET",
          headers:{
            authorization: `Bearer ${localStorage.getItem('car-access-token')}`
          }
        })
        .then(a=>a.json())
        .then(a=> {


          if(!a.error){
            setBooking(a)
          } 
          else{
            navigate('/')
          }


        })
        .catch(error=> console.log(error))
    },[url,navigate])

    

    const deleteBooking=(id)=>{

       


        fetch(`http://localhost:5000/bookings/${id}`,{

           method:"DELETE"
        })
        .then(a=>a.json())
        .then(a=>{



            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {


                    if(a.deletedCount > 0){

                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
        
                        const filter=booking.filter(f=> f._id !== id)
        
                        setBooking(filter)
                    }
                   
                }
              })
              




        
        })
        .catch(error=> console.log(error))

    };



    const handelBookingConfirm=(id)=>{

      

      fetch(`http://localhost:5000/bookings/${id}`,{
        method: 'PATCH',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify({status:'confirm'})
      })
      .then(a=> a.json())
      .then(a=> {
        console.log(a)


        
         
        if(a.modifiedCount > 0){

          Swal.fire(
              'update'
          )

         const filter= booking.filter(f=> f._id !== id);
         
         const find= booking.find(f=> f._id === id)

         find.status='confirm';
         
         
          const newBooking=[find,...filter]

          setBooking(newBooking)


         
      }

        
      })
      .catch(error=> console.log(error))

 

    }

    return (
        <div>
            <h2>{booking.length}</h2>


            <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>

        </th>

        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Service</th>
        <th>Date</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>

    
    {
        booking?.map(a=> 
            
            <tr key={a._id}>
            <th>
            <button onClick={()=>deleteBooking(a._id)} className="btn btn-sm btn-circle">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
            </th>
            <td>
            <div className="avatar">
                  <div className="rounded w-24 h-23">
                    <img src={a.img && a.img} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
            </td>
            <td>
            
              <span className="badge badge-ghost badge-sm">{a.name}</span>
            </td>
            <td><span className="badge badge-ghost badge-sm">{a.email && a.email}</span></td>
            <td><span className="badge badge-ghost badge-sm">{a.service && a.service}</span></td>
            <td><span className="badge badge-ghost badge-sm">{a.date && a.date}</span></td>
            <td><span className="badge badge-ghost badge-sm">${a.amount && a.amount}</span></td>
            <th>
              {
                a.status === 'confirm' ? <button  className="btn btn-ghost btn-xs">Confirmed</button>

                : 
                <button onClick={()=> handelBookingConfirm(a._id)} className="btn btn-ghost btn-xs">Confirm</button>
              }
            </th>
          </tr>
            
            )
    }
     
    </tbody>
 
    
  </table>
</div>
        </div>
    );
};

export default Bookings;