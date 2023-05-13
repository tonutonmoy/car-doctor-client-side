import { Link } from "react-router-dom";


const ServiceCard = ({data}) => {

    const {_id,title,price,img}=data
    return (
        <div className="card w-96 bg-base-100 shadow-xl p-5  rounded-2xl ">
        <figure><img className=" rounded-xl" src={img} alt="Shoes" /></figure>
        <div className="card-body p-0 space-y-3 mt-8">
          <h2 className="card-title">{title}</h2>
          <p>Price: ${price}</p>
          <div className="card-actions justify-end">
            
            <Link to={`/book/${_id}`}>

              <button className="btn btn-primary">Booking Now</button>
            </Link>
          </div>
        </div>
      </div>
                
    );
};

export default ServiceCard;