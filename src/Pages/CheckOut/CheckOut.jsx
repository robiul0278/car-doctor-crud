import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';



const CheckOut = () => {
  const service = useLoaderData();
  const {_id, title, price, img } = service;
  const { user } = useContext(AuthContext);

  const handleCheckOut = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const amount = form.amount.value;
    const textarea = form.textarea.value;
    const order = {
        customerName: name,
        date,
        email,
        img,
        price: amount,
        service: title,
        service_id:  _id,
        message: textarea
    }
    console.log(order)
    fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      form.reset();
      if(data.insertedId){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'successful',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  };

  return (
    <div className="p-20 bg-base-200">
      <h2 className="text-center font-bold text-5xl mb-6">{title}</h2>
      <form onSubmit={handleCheckOut} className="">
        <div className="grid grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              defaultValue={user?.displayName}
              className="input border-none input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Date</span>
            </label>
            <input
              type="date"
              placeholder="date"
              name="date"
              className="input border-none input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              defaultValue={user?.email}
              className="input border-none input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Due Amount</span>
            </label>
            <input
              type="text"
              name="amount"
              defaultValue={"$" + price}
              className="input border-none input-bordered"
            />
          </div>
        </div>
        <div className="form-control mt-5">
          <label className="label">
            <span className="label-text">Your Message</span>
          </label>
          <input
            placeholder="Message"
            className="textarea w-full h-20"
            type="text"
            name="textarea"
            id=""
          />
        </div>
        <div className="form-control mt-6">
          <input
            className="btn btn-primary"
            type="submit"
            value="Order Confirm"
          />
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
