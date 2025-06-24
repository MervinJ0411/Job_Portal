import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets.js";
import moment from "moment";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <div>
      <Navbar />
      <div>
        {isEdit ? (
          <>
            <div className="flex items-center gap-6 pl-10 p-4 rounded-md w-fit ">
              <label
                htmlFor="resumeUpload"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer"
              >
                <span>Select Resume</span>
                <img
                  src={assets.profile_upload_icon}
                  alt="Upload Icon"
                  className="w-10 h-10 object-contain hover:scale-105 transition-transform"
                />
                <input
                  id="resumeUpload"
                  onClick={(e) => setResume(e.target.files?.[0])}
                  type="file"
                  hidden
                  accept="application/pdf"
                />
              </label>
              <button
                onClick={() => setIsEdit(false)}
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4  p-4 rounded-md w-fit pl-10">
              <a href="" className="text-blue-600 hover:underline">
                Resume
              </a>
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>
            </div>
            <div class="overflow-x-auto shadow-xl rounded-lg bg-white p-10">
              <table class="min-w-full table-auto text-left">
                <thead class="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                  <tr>
                    <th class="py-3 px-6">Company</th>
                    <th class="py-3 px-6">Job Title</th>
                    <th class="py-3 px-6">Location</th>
                    <th class="py-3 px-6">Date</th>
                    <th class="py-3 px-6">Action</th>
                  </tr>
                </thead>
                <tbody class="text-gray-800">
                  {jobsApplied.map((job, index) => (
                    <tr
                      key={index}
                      class="hover:bg-gray-50 transition-all duration-300"
                    >
                      <td class="py-4 px-6 flex items-center">
                        <img
                          src={job.logo}
                          alt={job.company}
                          class="w-8 h-8 rounded-full mr-3"
                        />
                        {job.company}
                      </td>
                      <td class="py-4 px-6">{job.title}</td>
                      <td class="py-4 px-6">{job.location}</td>
                      <td class="py-4 px-6">{moment(job.date).format("ll")}</td>
                      <td class="py-4 px-6">
                        <button
                          className={`px-4 py-2 rounded text-sm font-semibold shadow-sm transition duration-200
                                  ${
                                    job.status === "Accepted"
                                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                                      : job.status === 'Rejected' ? "bg-red-100 text-red-800 hover:bg-red-200"
                                      : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                  }`}
                        >
                          {job.status}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Applications;
