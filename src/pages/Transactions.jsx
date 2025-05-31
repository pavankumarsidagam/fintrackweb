import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { FaShoppingCart, FaBolt, FaMoneyBillWave, FaHome, FaPlane } from "react-icons/fa";

const Transactions = () => {
  const familyUsers = ["John", "Emma", "Sophia", "Michael"]; 
  const [type, setType] = useState("expense");

  const categories = [
    {
      name: "Groceries",
      icon: <FaShoppingCart size={24} className="text-green-600" />,
      type: "expense"
    },
    {
      name: "Utilities",
      icon: <FaBolt size={24} className="text-yellow-600" />,
      type: "expense"
    },
    {
      name: "Salary",
      icon: <FaMoneyBillWave size={24} className="text-blue-600" />,
      type: "income"
    },
    {
      name: "Rent",
      icon: <FaHome size={24} className="text-purple-600" />,
      type: "expense"
    },
    {
      name: "Travel",
      icon: <FaPlane size={24} className="text-orange-600" />,
      type: "expense"
    }
  ];


  const [form, setForm] = useState({
    username: "",
    amount: "",
    type: "",
    category: "",
    date: "",
    description: "",
    file: null,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (name === "type") {
      setType(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
            <div className="card bg-white border border-gray-200 p-6 rounded-3xl shadow-xl h-full">
                <h2 className="text-xl font-semibold mb-4 text-teal-800">Transaction</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* User */}
                    <div>
                      <label className="block text-sm font-medium mb-1">User</label>
                      <select
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-xl"
                        required
                      >
                        <option value="">Select User</option>
                        {familyUsers.map((user) => (
                          <option key={user} value={user}>
                            {user}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-xl"
                        required
                      >

                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-xl"
                        required
                      />
                    </div>

                  </div>

                  <h2 className="text-xl font-semibold mb-4 text-teal-800">Expenses</h2>
                  {type && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categories
                        .filter((cat) => cat.type === type)
                        .map((cat) => (
                          <div
                            key={cat.name}
                            className="card border border-gray-200 bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-gray-100 p-2 rounded-xl">{cat.icon}</div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-700">{cat.name}</h3>
                                <p className="text-xs text-gray-400">
                                  <input
                                    type="number"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-xl"
                                    required
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}


                  <h2 className="text-xl font-semibold mb-4 text-teal-800">Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {/* Amount */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                        <input
                          type="number"
                          name="amount"
                          value={form.amount}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-xl"
                          required
                        />
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Upload File</label>
                        <input
                          type="file"
                          name="file"
                          onChange={handleChange}
                          className="w-full p-2 border rounded-xl"
                        />
                      </div>
                    </div>
                    
                    {/* Description and Submit - full width */}
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border rounded-xl"
                        placeholder="Optional notes..."
                      />
                    </div>
                  

                  <div className="px-2 text-center"> 
                    <button
                      type="submit"
                      className=" bg-teal-600 text-white py-2 px-4 rounded-xl hover:bg-teal-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

        </div>
        

        <div className="col-span-12">
            <div className="card bg-white border border-gray-200 p-6 rounded-3xl shadow-xl h-full">
                
            </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Transactions;
