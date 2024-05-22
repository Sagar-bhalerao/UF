import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import EditAppModal from './EditApp';
import ViewAppModal from './ViewAppModal';
import Pagination from "react-js-pagination";
import { BiEdit, BiShow } from 'react-icons/bi';
import { toast } from 'sonner';
const ApplicationView = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [EditMemData, setEditMemData] = useState([]);
  const [amount, setAmount] = useState(Number);
  const [post, setpost] = useState("");
  const [ApplicationDetails,setApplicationDetails] = useState([]);

  const itemsPerPage = 8;
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.179.25:5002/application-view`);
      if (response.status === 200) {
        setData(response.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
        setLoading(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(true);
    }
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.filter((item) =>
    (item.mem_id && item.mem_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.app_date && item.app_date.toLowerCase().includes(searchTerm.toLowerCase()))

  ).slice(indexOfFirstItem, indexOfLastItem);


  const handleEdit = (selectedMember) => {
    // setSelectedMember([selectedMember]);
    setEditMemData([selectedMember]);
    document.getElementById('EditApp').showModal();

  }
  const handleView = async (appId) => {
    document.getElementById('ViewApp').showModal();
    try {
      const response = await axios.get(
        `http://192.168.179.25:5002/application-view/${appId}`
      );
      if (response.status === 200) {
        setApplicationDetails([response.data]);
      } else {
        // toast.error("Failed to fetch data");
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(`failed to fetch application ${error}`);
    }
  };
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      // Extract the app_no from the first edited member (assuming there's only one)
      const memberId = EditMemData[0].app_no;
      const updatedData = {
        post: post,
        post_amount: amount,
      };
      console.log(updatedData);
      // Send a PUT request to update the application with memberId
      const response = await axios.put(
        `http://192.168.179.25:5002/update-application/${memberId}`,
        updatedData
      );
      if (response.status == 200) {
        toast.success("Application updated successfully:");

      }
      console.log("Data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 mx-9 my-4 px-9 py-6">
        <Link className="btn  btn-primary mb-2 md:mb-0" to="/ApplicationForm">Add Application</Link>
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" />
      </div>


      {currentItems.length > 0 ? (
        <div className="container mx-auto px-2 lg:max-w-8xl flex justify-center mt-2">
          <div className="overflow-x-auto border shadow-xl rounded-xl w-full">
            <table className="table ">
              <thead className="dark:bg-blue-600 dark:text-white">
                <tr>
                  <th className="">App ID</th>
                  <th className="">App Date</th>
                  <th className="">Member</th>
                  <th className="">From Date</th>
                  <th className="">To Date</th>
                  <th className="">Amount</th>
                  <th className="">Disease</th>
                  <th className="">Action</th>

                </tr>
              </thead>
              {currentItems.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{item.app_no}</td>
                    <td>{moment(item.app_date).format("DD/MM/YYYY")}</td>
                    <td>{item.mem_id}</td>
                    <td>{moment(item.from_date).format("DD/MM/YYYY")}</td>
                    <td>{moment(item.to_date).format("DD/MM/YYYY")}</td>
                    <td>{item.amount}</td>
                    <td>{item.disease}</td>
                    <td className="py-2 flex justify-center">
                      <button className=" mr-3 btn btn-sm btn-primary" onClick={() => handleEdit(item)}><BiEdit/></button>
                      <button className=" btn btn-sm btn-success" onClick={() => handleView(item.app_no)} ><BiShow/></button>
                    </td>
                  </tr>
                </tbody>
              ))}

            </table>

          </div>

        </div>

      ) : (<>
        <div className="container mx-auto px-4 lg:max-w-7xl flex justify-center">

          <div className="overflow-x-auto shadow-lg rounded-lg w-full flex ">
            <table className="table rounded-lg w-full">
              <thead className="dark:bg-blue-600 dark:text-white">
                <tr>
                  <th className="px-4 py-2">App ID</th>
                  <th className="px-4 py-2">App Date</th>
                  <th className="px-4 py-2">Member</th>
                  <th className="px-4 py-2">From Date</th>
                  <th className="px-4 py-2">To Date</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Disease</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

            </table>
          </div>
        </div> <h1 className=' mt-5 flex justify-center text-red-500'><span className="loading loading-spinner text-primary"></span></h1> </>)}


      {/* pagination */}
      <div className="flex  mx-8 my-4 lg:justify-center h-9 ">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          itemClass="px-4 py-2 border rounded-md mr-2"
          linkClass="text-blue-600 hover:text-white hover:bg-blue-600"
          activeClass="bg-blue-600 text-white"
          activeLinkClass="bg-blue-600 text-white"
          prevPageText="Previous"
          nextPageText="Next"
          innerClass="flex"
        />
      </div>


      <EditAppModal EditMemData={EditMemData} handleSaveChanges={handleSaveChanges}
        post={post}
        setpost={setpost}
        amount={amount}
        setAmount={setAmount} />
      <ViewAppModal ApplicationDetails={ApplicationDetails} />
    </>
  )
}

export default ApplicationView;
