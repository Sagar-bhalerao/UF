import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import AddGroupModal from './AddGroupModal';

const GroupView = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5002/group-view`);

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

  // Filter the data based on the search term
  const filteredData = data.filter((item) =>
    item.group_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 mx-9 my-4 px-9 py-6">
        <button className="btn  btn-primary mb-2 md:mb-0" onClick={() => document.getElementById("AddGroup").showModal()}>Create Group</button>
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" />
      </div>

      {filteredData.length > 0 ? (
        <div class="container mx-auto px-2 lg:max-w-8xl flex   justify-center mt-2" >
          <div className="overflow-x-auto border shadow-xl rounded-xl w-full">
            <table className="table ">
              {/* head */}
              <thead className='dark:bg-blue-600 dark:text-white'>
                <tr>
                  <th>ID</th>
                  <th> Group Name</th>
                  <th>Main Group</th>
                  {/* <th>Favorite Color</th> */}
                </tr>
              </thead>
              {filteredData.map((item, index) => (
                <tbody key={index}>
                  <tr className='hover'>
                    <th>{item.id}</th>
                    <td>{item.group_name}</td>
                    <td>{item.main_group}</td>
                    {/* <td>Blue</td> */}
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
              <thead className="bg-blue-600 dark:text-white">
                <tr>
                  <th>ID</th>
                  <th> Group Name</th>
                  <th>Main Group</th>
                </tr>
              </thead>

            </table>
          </div>
        </div> <h1 className=' mt-5 flex justify-center text-red-500'>No Any Group Found ... <span className="ml-4 loading loading-spinner text-primary"></span></h1> </>)}

      {/* pagination */}
      <div className="flex justify-center my-4">
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


      <AddGroupModal GroupData={data} onSave={fetchData} />

    </>
  )
}

export default GroupView;
