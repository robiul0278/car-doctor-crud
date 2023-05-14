
const BookingTable = ({ booking, handleDelete }) => {
  const {_id, img, service, price, date } = booking;


  return (
    <tr>
      <th>
      <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{service}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="badge badge-ghost badge-sm">{date}</span>
      </td>
      <td>{price}</td>
      <th>
        <button className="btn btn-ghost btn-xs"> </button>
      </th>
    </tr>
  );
};

export default BookingTable;
