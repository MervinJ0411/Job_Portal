import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { assets, jobsData } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";

const ApplyJob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { job } = useContext(AppContext);

  const fetchJob = async () => {
    const data = job.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      // console.log(data[0]);
    }
  };

  useEffect(() => {
    if (job.length > 0) {
      fetchJob();
    }
  }, [id, job]);

  return jobData ? (
    <div>
      {console.log(jobData)}
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-between bg-blue-50 p-8 rounded-lg shadow-md mt-8 mx-auto max-w-7xl w-full min-h-[200px]">
        {/* Left Side: Logo and Details */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-3/4 ml-12">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={jobData.companyId.image}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="ml-6 flex flex-col">
            {/* Row 1: Company Name */}
            <h2 className="text-xl font-semibold text-gray-800">
              {jobData.title}
            </h2>

            {/* Row 2: Job Title + Other Info in one line */}
            <div className="flex flex-wrap gap-6 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <img
                  src={assets.suitcase_icon}
                  alt="Suitcase"
                  className="w-4 h-4"
                />
                {jobData.title}
              </span>
              <span className="flex items-center gap-2">
                <img
                  src={assets.location_icon}
                  alt="Location"
                  className="w-4 h-4"
                />
                {jobData.location}
              </span>
              <span className="flex items-center gap-2">
                <img
                  src={assets.person_icon}
                  alt="Person"
                  className="w-4 h-4"
                />
                {jobData.level}
              </span>
              <span className="flex items-center gap-2">
                <img src={assets.money_icon} alt="Money" className="w-4 h-4" />
                CTC: {kconvert.convertTo(jobData.salary)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Apply Button and Timestamp */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/4 mt-6 lg:mt-0">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-2">
            Apply Now
          </button>
          <p className="text-sm text-gray-500">
            Posted: {moment(jobData.date).fromNow()}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-start p-6 mt-6 ml-[8%]">
  {/* Left Side: Job Description */}
  <div className="w-full lg:w-2/3 mr-8">
    <h2 className="font-bold text-2xl mb-4">Job Description</h2>
    <div
      className="rich-text"
      dangerouslySetInnerHTML={{ __html: jobData.description }}
    ></div>
    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-6">
      Apply Now
    </button>
  </div>

  {/* Right Side: JobCards */}
  <div className="w-full lg:w-1/3 mr-[8%]">
    {job
      .filter(
        (job) =>
          job._id !== jobData._id &&
          job.companyId._id === jobData.companyId._id
      )
      .slice(0, 4)
      .map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
  </div>
</div>

    </div>
  ) : (
    <Loader />
  );
};

export default ApplyJob;
