import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { BiEdit, BiShow } from 'react-icons/bi';

import EditMemberModal from './EditMemberModal';
import ViewMemberModal from './ViewMemberModal';
const MemberView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState([]);
  const [MemberDetails, setMemberDetails] = useState([]);
  
  const itemsPerPage = 8;
  
    useEffect(() => {
    fetchData();
    // return () => fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.179.25:5002/members`);
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
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.external_code && item.external_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.dob && moment(item.dob).format("DD/MM/YYYY").includes(searchTerm)) ||
    (item.doj && moment(item.doj).format("DD/MM/YYYY").includes(searchTerm))
  ).slice(indexOfFirstItem, indexOfLastItem);


  const handleEdit = (selectedMember) => {
    setSelectedMember([selectedMember]);
    document.getElementById('EditMember').showModal();

  }
  const handleView = async (memberId) => {
    document.getElementById('ViewMember').showModal()
    try {
      const response = await axios.get(
        `http://192.168.179.25:5002/members-view/${memberId}`
      );
      if (response.status === 200) {
        setMemberDetails([response.data]);
      } else {
        console.error("Failed to fetch member details");
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
    }
  };

  return (
    <>


      <div className="flex flex-col md:flex-row items-center justify-between mb-2 mx-9 my-4 px-9 py-6   ">
        <Link className="btn  btn-primary mb-2 md:mb-0" to="/MemberForm">Add Member</Link>
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" />
      </div>

      {currentItems.length > 0 ? (
        <div className="container mx-auto px-2 lg:max-w-8xl flex justify-center mt-1">
         {/* <div className=' flex justify-center items-center  overflow-x-auto lg:mx-10 lg:px-10   '> */}
          <div className="overflow-x-auto border shadow-xl rounded-lg w-full ">
            <table className="table">
              <thead className="dark:bg-blue-600 dark:text-white text-sm ">
                <tr>
                  <th className="">ID</th>
                  <th className="">Name</th>
                  <th className="">Ext_Code</th>
                  <th className="">DOB</th>
                  <th className="">DOJ</th>
                  <th className="">Status</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              {currentItems.map((item, index) => (
                <tbody key={index}>
                  <tr className='hover'>
                    <td className="">{item.id}</td>
                    <td className="">{item.name}</td>
                    <td className="">{item.external_code}</td>
                    <td className="">{moment(item.dob).format("DD/MM/YYYY")}</td>
                    <td className="">{moment(item.doj).format("DD/MM/YYYY")}</td>
                    <td className="">{item.status}</td>
                    <td className=" flex justify-center">
                      <button className=" mr-3 btn btn-sm btn-primary" onClick={() => handleEdit(item)}><BiEdit/></button>
                      <button className=" btn btn-sm btn-success" onClick={() => handleView(item.id)} ><BiShow/></button>
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
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Ext_Code</th>
                  <th className="px-4 py-2">DOB</th>
                  <th className="px-4 py-2">DOJ</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

            </table>
          </div>
        </div> <h1 className=' mt-5 flex justify-center text-red-500'><span className="loading loading-spinner text-primary"></span></h1> </>)}

      {/* pagination */}
        <div className="flex justify-center my-4 sm:overflow-x-auto">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={data.length}
          pageRangeDisplayed={3}
          onChange={handlePageChange}
          itemClass="px-4 py-2 border rounded-md mr-1"
          linkClass="text-blue-600 hover:text-white hover:bg-blue-600"
          activeClass="bg-blue-600 text-white"
          activeLinkClass="bg-blue-600 text-white"
          prevPageText="Previous"
          nextPageText="Next"
          innerClass="flex"
         />
      </div>
    
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <EditMemberModal id="Edit" selectedMember={selectedMember} onSave={fetchData} />
      <ViewMemberModal MemberDetails={MemberDetails} />

    </>
  )
}

export default MemberView;
