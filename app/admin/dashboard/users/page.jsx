"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import UsersChart from "../component/UsersChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedUser, setSelectedUser] = useState(null);
  const [userHistory, setUserHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allusers`, { withCredentials: true });
        setUsers(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleViewHistory = async (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setHistoryLoading(true);
    setUserHistory([]);

    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user-history/${user._id}`, { withCredentials: true });
      setUserHistory(res.data.data);
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Users</h1>


      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {user.full_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {user.Date ? new Date(user.Date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700 flex justify-center gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                      onClick={() => handleViewHistory(user)}
                    >
                      <FaEye />
                    </button>
                    {/* Add Edit/Delete functionality later if requested */}

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User History Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl bg-white text-black max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.full_name}'s History
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {historyLoading ? (
              <p className="text-center text-gray-500">Loading history...</p>
            ) : userHistory.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No history found for this user.</p>
            ) : (
              <div className="grid gap-4">
                {userHistory.map((item, idx) => (
                  <div key={idx} className="border p-4 rounded-lg flex flex-col md:flex-row gap-4 items-start md:items-center bg-gray-50">
                    <div className="w-16 h-16 bg-gray-200 rounded shrink-0 overflow-hidden relative">
                      {item.image && (
                        <img
                          src={`data:image/jpeg;base64,${item.image.data}`}
                          alt="Prop"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{item.propertyTitle}</h4>
                      <div className="text-xs text-gray-500 flex gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-white ${item.purchaseType === 'buy' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                          {item.purchaseType}
                        </span>
                        {item.purchaseType === 'rent' && (
                          <span className="bg-gray-200 px-2 py-0.5 rounded text-gray-700">{item.rentDuration} Months</span>
                        )}
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200">{item.status}</span>
                      </div>
                      <p className="text-sm mt-1 text-gray-600">
                        Amount: {item.propertyDetails ? (
                          item.purchaseType === 'buy'
                            ? `Pkr ${item.propertyDetails.buy_price?.toLocaleString()}`
                            : item.rentDuration === '3' ? `Pkr ${item.propertyDetails.rent_price_3_months?.toLocaleString()}`
                              : item.rentDuration === '6' ? `Pkr ${item.propertyDetails.rent_price_6_months?.toLocaleString()}`
                                : `Pkr ${item.propertyDetails.rent_price_annual?.toLocaleString()}`
                        ) : 'N/A'}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
