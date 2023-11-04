import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";


const Bookings = () => {
    const {user} = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    const url = `http://localhost:5000/bookings?email=${user.email}`;
     useEffect(()=>{

        axios.get(url, {withCredentials: true})
        .then(res =>{
          setBookings(res.data)
        })
        // fetch(url)
        // .then(res => res.json())
        // .then(data => setBookings(data))
     },[]);

     const handleDelete = id =>{
      const proceed = confirm('Are you sure you want to delete')
      if(proceed){
        fetch(`http://localhost:5000/bookings/${id}`,{
          method:'DELETE'
        })
            .then(res => res.json())
            .then(data =>{
              console.log(data);
              if(data.deletedCount > 0){
            alert('delete successfull');
            const remaining = bookings.filter(booking => booking._id !== id);
            setBookings(remaining);
          }
        })
      }
    }

    const handleConfirm = id =>{
   fetch(`http://localhost:5000/bookings/${id}`,{
    method:'PATCH',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify({status:'confirm'})
   })

   .then(res => res.json())
   .then(data => {
    console.log(data);
    if(data.modifiedCount > 0){
      //update state
      const remaining = bookings.filter(booking => booking._id !== id)
      const updated = bookings.find(booking => booking._id == id)
      updated.status = 'confirm'
      const newBookings = [updated, ...remaining];
      setBookings(newBookings)
    
    
    }
   })



    }
  

    return (
        <div>
            <h2 className="text-4xl ">Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
        </th>
        <th className="text-xl">Image</th>
        <th className="text-xl">Service</th>
        <th className="text-xl">Date</th>
        <th className="text-xl">Price</th>
        <th className="text-xl">Status</th>
      </tr>
    </thead>
    <tbody>
      {

        bookings.map(booking => <BookingRow 
            key={booking._id}
            booking={booking}
            handleDelete={handleDelete}
            handleConfirm={handleConfirm}
            ></BookingRow>)
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Bookings;