import { useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {

    const [services,setServices]=useState([]);

    useState(()=>{

        fetch('http://localhost:5000/services')
        .then(a=> a.json())
        .then(a=> setServices(a))
         
    },[])

    console.log(services)
    return (
        <div>
            <h3 className='text-2xl  text-orange-500 font-bold'>Service</h3>
            <h2 className="text-5xl">Our Service Area</h2>

            <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which dont look even slightly believable.  </p>


            
               <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                {
                     services.map(a=>  <ServiceCard key={a?._id} data={a}></ServiceCard>
                    
           
                     )
                }
               </div>
           


        </div>
    );
};

export default Services;