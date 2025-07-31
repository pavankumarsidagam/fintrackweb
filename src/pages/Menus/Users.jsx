import React, { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

const Users = () => {
  const [form, setForm] = useState({ name: "", relation: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <MainLayout>
      <div className="col-span-12">
        {/* Outer Card */}
        <div className="card bg-white border border-gray-200 p-6 rounded-3xl shadow-xl h-full">
          <h2 className="subhead text-xl font-semibold mb-6 text-teal-800">Add Family Member</h2>

          {/* Inner Side-by-Side Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Left Form */}
            <form className="space-y-4 w-full col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="w-full">
                        <label for="name" class="block text-sm font-medium">Name</label>
                        <div class="mt-2">
                            <input type="name"
                                    name="name"
                                    placeholder="Enter name"
                                    class="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="w-full">
                        <label for="relation" class="block text-sm font-medium">Relation</label>
                        <div class="mt-2">
                            <input type="relation"
                                    name="relation"
                                    placeholder="Enter relation (e.g., Father)"
                                    class="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="w-full">
                        <label for="dob" class="block text-sm font-medium">Date</label>
                        <div class="mt-2">
                            <input type="date"
                                  name="dob"
                                    class="block w-full rounded-md border bg-white py-1.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="w-full">
                        <label for="gender" class="block text-sm font-medium text-gray-900">Gender</label>
                        <div class="mt-2 grid grid-cols-1">
                            <select name="gender"
                                class="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500">
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="pointer-events-none col-start-1 row-start-1 mr-2 self-center justify-self-end text-teal-800 w-4 h-4">
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
              <h3 className="text-lg font-semibold text-teal-700 mb-4">Sidagam's Family</h3>
              <ul className="space-y-2">
                {form.name && form.relation ? (
                  <li className="text-gray-700 font-medium">
                    {form.name} ({form.relation})
                  </li>
                ) : (
                  <li className="text-gray-400 italic">No member added yet</li>
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
