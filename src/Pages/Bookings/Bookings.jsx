import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingTable from "./BookingTable";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate()

  const url = `https://car-doctor-server-tawny-seven.vercel.app/checkout?email=${user?.email}`;

  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if(!data.error){
        setBookings(data)
        }
        else{
          navigate('/');
        }
      });
  }, [url, navigate]);

// DELETE ITEM  ||||||||||||||||||||||


  const handleDelete = id => {
    const proceed = confirm('Are You sure you want to delete');
    if (proceed) {
        fetch(`https://car-doctor-server-tawny-seven.vercel.app/checkout/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('deleted successful');
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                }
            })
    }
}


  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>
            </th>
            <th>Service</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <BookingTable key={booking._id} handleDelete={handleDelete} booking={booking}></BookingTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
