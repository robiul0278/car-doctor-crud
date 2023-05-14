import { Link } from "react-router-dom";

const ServicesCard = ({ service }) => {
  const { title, img, price, _id } = service;
  return (
    <div className="card w-full bg-base-100 border">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <div className="card-actions justify-end">
    <p>Price: ${price}</p>
    <Link
      to={`/checkout/${_id}`}
    ><button className="rounded px-2 btn-primary">Book Now</button></Link>
    </div>
  </div>
    </div>
  );
};

export default ServicesCard;
