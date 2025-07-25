import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { FaShoppingCart, FaBolt, FaMoneyBillWave, FaHome, FaPlane, FaQuestion } from "react-icons/fa";
import apiRoutes from "../../routes/Menus/apiRoutes";
import axiosInstance from "../../api/axiosInstance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const iconMap = {
  Groceries: FaShoppingCart,
  Utilities: FaBolt,
  Salary: FaMoneyBillWave,
  Rent: FaHome,
  Travel: FaPlane,
};


const Transactions = () => {
  const familyUsers = ["John", "Emma", "Sophia", "Michael"]; 
  const [type, setType] = useState("expense");
  const [categories, setCategories] = useState([]);
  const [categoryAmounts, setCategoryAmounts] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      axiosInstance.get(apiRoutes.categories)
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
    };
    fetchCategories();
  }, []);

  const handlecategoryChange = (e, categoryName) => {
    const value = e.target.value;
    setCategoryAmounts((prev) => ({
      ...prev,
      [categoryName]: value,
    }));
  }

  const [form, setForm] = useState({
    username: "",
    type: "",
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

      setCategoryAmounts((prev) => {
        const updated = {};
        categories.forEach((cat) => {
          if (cat.type === value) {
            updated[cat.name] = prev[cat.name] || "0";
          }
        });
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.error("Username is required.");
      return;
    }

    if (!form.type.trim()) {
      toast.error("Transaction type is required.");
      return;
    }

    if (!form.date) {
      toast.error("Date is required.");
      return;
    }

    const totalAmount = Object.values(categoryAmounts).reduce((acc, val) => acc + Number(val), 0);

    if (totalAmount <= 0) {
      toast.error("Total amount must be greater than zero.");
      return;
    }

    const hasValidCategory = Object.values(categoryAmounts).some(val => Number(val) > 0);
    if (!hasValidCategory) {
      toast.error("At least one category must have a value.");
      return;
    }

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("type", form.type);
    formData.append("date", form.date);
    formData.append("description", form.description);
    formData.append("amount", totalAmount);
    formData.append("categories", JSON.stringify(categoryAmounts));
    
    try {
      const response = await axiosInstance.post(apiRoutes.addTransaction, formData);
      console.log(response);
      if (response.status === 201) {
        toast.success("Transaction added successfully!");

        setForm({
          username: "", 
          type: "",
          date: "",
          description: "",
          file: null,
        });
        setCategoryAmounts({});
        setType("expense");
      } else {
        toast.warning("Unexpected response received.");
      }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid categories format.");
      } else {
        toast.error("Something went wrong while adding the transaction.");
      }
      console.error("Error submitting transaction:", error);
    }

  };

  return (
    <MainLayout>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
            <div className="card bg-white border border-gray-200 p-6 rounded-3xl shadow-xl h-full">
                <h2 className="subhead text-xl font-semibold mb-4 text-teal-800">Transactions</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* User */}
                    <div class="w-full">
                        <label for="username" class="block text-sm font-medium text-gray-900">User</label>
                        <div class="mt-2 grid grid-cols-1">
                            <select name="username"
                                value={form.username}
                                onChange={handleChange} 
                                class="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300">
                                <option value="">Select User</option>
                                {familyUsers.map((user) => (
                                  <option key={user} value={user}>
                                    {user}
                                  </option>
                                ))}
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end text-teal-800 w-4 h-4">
                                <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Type */}
                    
                    <div class="w-full">
                        <label for="type" class="block text-sm font-medium text-gray-900">Type</label>
                        <div class="mt-2 grid grid-cols-1">
                            <select name="type"
                                value={form.type}
                                onChange={handleChange}
                                class="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300">
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end text-teal-800 w-4 h-4">
                                <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Date */}
                    
                    <div class="w-full">
                        <label for="date" class="block text-sm font-medium">Date</label>
                        <div class="mt-2">
                            <input type="date"
                                  name="date"
                                  value={form.date}
                                  onChange={handleChange} 
                                  class="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                  </div>

                  <h2 className="subhead text-xl font-semibold mb-4 text-teal-800">
                  {type && (
                    type === "expense" ? "Expenses" : "Income"
                  )}
                  </h2>
                  {type && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categories
                        .filter((cat) => cat.type === type)
                        .map((cat) => {
                          const Icon = iconMap[cat.name] || FaQuestion;

                          return (
                            <div
                              key={cat.name}
                              className="card border border-gray-200 bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
                            >
                              <div className="flex items-center gap-3">
                                <div className={'bg-gray-100 p-2 rounded-xl'}>
                                  <Icon size={24} className={cat.colorClass} />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-gray-700">{cat.name}</h3>
                                  <p className="text-xs text-gray-600">
                                    <input
                                      type="number"
                                      name={`amount-${cat.name}`}
                                      value={categoryAmounts[cat.name] || "0"}
                                      onChange={(e) => handlecategoryChange(e, cat.name)}
                                      className="w-full p-2 border rounded-xl"
                                      required
                                    />
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}


                  <h2 className="subhead text-xl font-semibold mb-4 text-teal-800">Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {/* Amount */}
                      <div class="w-full">
                        <label for="amount" class="block text-sm font-medium">Amount (₹)</label>
                        <div class="mt-2">
                            <input type="number"
                                  name="amount"
                                  value={Object.values(categoryAmounts).reduce((acc, val) => acc + Number(val), 0)} required
                                  class="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      {/* File Upload */}
                      <div class="w-full">
                        <label for="file" class="block text-sm font-medium">Upload File</label>
                        <div class="mt-2">
                            <input type="file"
                                    name="file"
                                    onChange={handleChange}
                                  class="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 sm:text-sm sm:leading-6" />
                        </div>
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
                        className="w-full p-2 border rounded-md"
                        placeholder="Optional notes..."
                      />
                    </div>
                  

                  <div className="px-2 text-center"> 
                    <button
                      type="submit"
                      className="subhead bg-teal-600 text-white py-2 px-4 rounded-xl hover:bg-teal-700 transition"
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
