import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Coupons = () => {
  const axiosSecure = useAxiosSecure();
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discountAmount: '' });
  const [editCoupon, setEditCoupon] = useState(null);

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const res = await axiosSecure.get('/coupons');
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch coupons');
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Add new coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discountAmount) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await axiosSecure.post('/coupons', newCoupon);
      toast.success('Coupon added');
      setNewCoupon({ code: '', discountAmount: '' });
      fetchCoupons();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add coupon');
    }
  };

  // Delete coupon
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This coupon will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/coupons/${id}`);
      toast.success('Coupon deleted');
      fetchCoupons();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete coupon');
    }
  };

  // Update coupon
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editCoupon.code || !editCoupon.discountAmount) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await axiosSecure.patch(`/coupons/${editCoupon._id}`, editCoupon);
      toast.success('Coupon updated');
      setEditCoupon(null);
      fetchCoupons();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update coupon');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>

      {/* Add Coupon */}
      <form onSubmit={handleAddCoupon} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Coupon Code"
          className="input input-bordered flex-1"
          value={newCoupon.code}
          onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount %"
          className="input input-bordered w-32"
          value={newCoupon.discountAmount}
          onChange={(e) => setNewCoupon({ ...newCoupon, discountAmount: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      {/* Coupons Table */}
      <table className="table w-full">
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount %</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(c => (
            <tr key={c._id}>
              <td>
                {editCoupon && editCoupon._id === c._id ? (
                  <input
                    value={editCoupon.code}
                    onChange={(e) => setEditCoupon({ ...editCoupon, code: e.target.value })}
                    className="input input-bordered w-full"
                  />
                ) : (
                  c.code
                )}
              </td>
              <td>
                {editCoupon && editCoupon._id === c._id ? (
                  <input
                    type="number"
                    value={editCoupon.discountAmount}
                    onChange={(e) => setEditCoupon({ ...editCoupon, discountAmount: e.target.value })}
                    className="input input-bordered w-full"
                  />
                ) : (
                  c.discountAmount
                )}
              </td>
              <td className="flex gap-2">
                {editCoupon && editCoupon._id === c._id ? (
                  <>
                    <button onClick={handleUpdate} className="btn btn-success btn-sm">Save</button>
                    <button onClick={() => setEditCoupon(null)} className="btn btn-warning btn-sm">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditCoupon(c)} className="btn btn-info btn-sm">Edit</button>
                    <button onClick={() => handleDelete(c._id)} className="btn btn-error btn-sm">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
