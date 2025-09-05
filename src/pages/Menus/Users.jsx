import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../api/axiosInstance";
import apiRoutes from "../../routes/Menus/apiRoutes";
import Loader from "../Authentication/Loader";

const Users = () => {
  const [form, setForm] = useState({ name: "", relation: "", dob: "", gender: "" });
  const [loader, setLoader] = useState(false);
  const [members, setMembers] = useState([]);
  const [familyName, setFamilyName] = useState("");

  const fetchFamilyName = async () => {
    try {
      setLoader(true);

      const res = await axiosInstance.get(apiRoutes.familyName);
      setFamilyName(res.data.familyName);

    } catch (err){
      toast.error("Failed to load family Name.");
      console.error("Error fetching family Name:", err);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchFamilyName();
  }, []);

  const fetchMembers = async () => {
    try{
      setLoader(true);
      
      const res = await axiosInstance.get(apiRoutes.getUsers);
      setMembers(res.data.members);
    } catch (err){
      toast.error("Failed to load family members.");
      console.error("Error fetching members:", err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Name is required.");
    if (!form.relation.trim()) return toast.error("Family relation is required.");
    if (!form.dob) return toast.error("Date of Birth is required.");
    if (!form.gender) return toast.error("Gender is required.");

    setLoader(true);

    try {
      const res = await axiosInstance.post(apiRoutes.addUser, form);
      setForm({ name: "", relation: "", dob: "", gender: "" });
      fetchMembers();

    } catch (error) {
      toast.error("An error occurred while adding the member.");
      console.error("Error adding member:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    
    <MainLayout>
      {loader && <Loader />}
      <div className="col-span-12">
        {/* Outer Card */}
        <div className="card bg-white border border-gray-200 p-6 rounded-3xl shadow-xl h-full">
          <h2 className="subhead text-xl font-semibold mb-6 text-teal-800">Add Family Member</h2>

          {/* Inner Side-by-Side Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Form */}
            <form onSubmit={handleSubmit} className="space-y-4 w-full col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                        <label for="name" className="block text-sm font-medium">Name</label>
                        <div className="mt-2">
                            <input type="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                    className="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="w-full">
                        <label for="relation" className="block text-sm font-medium">Relation</label>
                        <div className="mt-2">
                            <input type="relation"
                                    name="relation"
                                    value={form.relation}
                                    onChange={handleChange}
                                    placeholder="Enter relation (e.g., Father)"
                                    className="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="w-full">
                        <label for="dob" className="block text-sm font-medium">Date of Birth</label>
                        <div className="mt-2">
                            <input type="date"
                                  name="dob"
                                  value={form.dob}
                                  onChange={handleChange}
                                    className="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className="w-full">
                        <label for="gender" className="block text-sm font-medium text-gray-900">Gender</label>
                        <div className="mt-2 grid grid-cols-1">
                            <select 
                              name="gender"
                              onChange={handleChange}
                              value={form.gender}
                                className="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" className="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end text-teal-800 w-4 h-4">
                                <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <div className="pt-1 text-end"> 
                  <button
                    type="submit"
                    className="subhead bg-teal-600 text-white py-2 px-4 rounded-xl hover:bg-teal-700 transition"
                  >
                    Add Member
                  </button>
                </div>

              
            </form>

            {/* Right Live Preview Card */}
            <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4 shadow-md">
              <h3 className="text-lg font-semibold text-teal-700 mb-4">{familyName}'s Family</h3>
              <ul className="space-y-2">
                {members.length > 0 ? (
                  members.map((m) => (
                    <li key={m.id} className="text-gray-700 font-medium">
                      {m.name} ({m.relation})
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 italic">No members added yet</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Users;
