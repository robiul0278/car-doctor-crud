import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingTable from "./BookingTable";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const url = `http://localhost:5000/checkout?email=${user?.email}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);





// DELETE ITEM  ||||||||||||||||||||||


  const handleDelete = id => {
    const proceed = confirm('Are You sure you want to delete');
    if (proceed) {
        fetch(`http://localhost:5000/checkout/${id}`, {
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
