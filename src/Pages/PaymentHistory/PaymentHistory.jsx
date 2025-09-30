import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import Loader from '../../Loading/Loader';
import {
  MdPayment,
  MdAttachMoney,
  MdDateRange,
  MdReceipt,
} from 'react-icons/md';
import { FaTableList } from 'react-icons/fa6';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

// format date function
const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const day = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `${time} ${day}`;
};

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [tableLayout, setTableLayout] = useState(true);
  const [gridLayout, setGridLayout] = useState(false);
  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (loading || isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load payment history: {error.message}
      </div>
    );
  }

  // Grid & Table
  const handleTableLayout = () => {
    setTableLayout(true);
    setGridLayout(false);
  }

  const handleGridLayout = () => {
    setGridLayout(true);
    setTableLayout(false);
  }

  return (
    <div className="px-5 py-10">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
        <MdPayment className="inline mr-2" /> Payment History
      </h2>
      <p className="text-center text-gray-600 mb-8">
        All your successful payments are listed below.
      </p>

      <div className='flex justify-end gap-5 p-2'>
        <button onClick={handleTableLayout} className={`${tableLayout && 'text-purple-600'}`}><FaTableList size={22}></FaTableList></button>
        <button onClick={handleGridLayout} className={`${gridLayout && 'text-purple-600'}`}><BsFillGrid3X3GapFill size={22}></BsFillGrid3X3GapFill></button>
      </div>

      {/* Table */}
      {
        tableLayout &&
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
          <table className="table table-zebra">
            <thead className="bg-purple-200 text-black text-base">
              <tr>
                <th>#</th>
                <th>User Email</th>
                <th>Booking ID</th>
                <th><MdReceipt className="inline" /> Txn ID</th>
                <th className='text-center'><MdAttachMoney className="inline" /> Amount</th>
                <th><MdDateRange className="inline" /> Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <td>{index + 1}</td>
                  <td>{pay.email}</td>
                  <td className="text-xs break-all">{pay.bookingId}</td>
                  <td className="text-xs break-all">{pay.transactionId}</td>
                  <td className='text-center'>৳{pay.price}</td>
                  <td>{formatDateTime(pay.date)}</td>
                  <td>
                    <span className="badge badge-success text-white font-semibold">
                      {pay.status || 'paid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }

      {/* Card */}
      {
        gridLayout &&
        <>
          <div className='divider m-0'></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {payments.map((pay, index) => (
              <div
                key={pay._id}
                className="bg-base-100 shadow-xl rounded-xl p-5 border border-purple-100 hover:shadow-2xl transition duration-300"
              >
                <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
                  <span className="font-semibold">#{index + 1}</span>
                  <span className="text-green-600 font-medium">
                    {pay.status || 'Paid'}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">
                    <MdDateRange className="inline mr-1" />
                    {formatDateTime(pay.date)}
                  </p>
                  <p className="text-xs text-gray-500">
                    <MdReceipt className="inline mr-1" />
                    Txn ID: <span className="break-all">{pay.transactionId}</span>
                  </p>
                </div>

                <div className="mb-2">
                  <p className="text-sm">
                    <span className="font-medium text-purple-600">User:</span>{' '}
                    {pay.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-purple-600">Booking ID:</span>{' '}
                    <span className="break-all">{pay.bookingId}</span>
                  </p>
                </div>

                <div className="mt-3 text-right">
                  <p className="text-lg font-bold text-purple-600">
                    ৳{pay.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      }
      

    </div>
  );
};

export default PaymentHistory;
