import axios from 'axios';
import moment from 'moment';
import React,{useState,useEffect} from 'react'
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { BiEdit, BiShow } from 'react-icons/bi';
const VoucherEntryView = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 8;
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://192.168.179.25:5002/voucher-view"
            );
            if (response.status === 200) {
                setData(response.data);
            } else {
                console.log("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.filter((item) =>
        (item.voucher_date && item.voucher_date.toLowerCase().includes(searchTerm.toLowerCase()))


    ).slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
  return (
    <>
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 mx-9 my-4 px-9 py-6">
    <Link to="/VoucherEntry" className="btn btn-primary mb-2 md:mb-0" >Add Voucher</Link>
    <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" />
</div>

{currentItems.length > 0 ? (
    <div className="container mx-auto px-2 lg:max-w-8xl flex justify-center mt-2">
        <div className="overflow-x-auto border shadow-xl rounded-xl w-full ">
            <table className="table ">
                <thead className="dark:bg-blue-600 dark:text-white">
                    <tr>
                    <th className="px-4 py-2">Voucher NO</th>
                        <th className="px-4 py-2">Voucher Date</th>
                        <th className="px-4 py-2">Voucher Type</th>
                        <th className="px-4 py-2">Voucher Amount</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                {currentItems.map((item, index) => (
                    <tbody key={index}>
                        <tr>
                        <td>{item.voucher_no}</td>
                <td>{moment(item.voucher_date).format("DD/MM/YYYY")}</td>
                <td>{item.voucher_type}</td>
                <td>{item.voucher_amount}</td>
                <td className="py-2 flex justify-center">
                      <button className=" mr-3 btn btn-sm btn-primary" ><BiEdit/></button>
                      <button className=" btn btn-sm btn-success"><BiShow/></button>
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
                        <th className="px-4 py-2">Voucher NO</th>
                        <th className="px-4 py-2">Voucher Date</th>
                        <th className="px-4 py-2">Voucher Type</th>
                        <th className="px-4 py-2">Voucher Amount</th>
                        <th className="px-4 py-2">Action</th>

                    </tr>
                </thead>

            </table>
        </div>
    </div> <h1 className=' mt-5 flex justify-center text-red-500'><span className="loading loading-spinner text-primary"></span></h1> </>)}

     {/* pagination */}
     <div className="flex mx-8 my-4 lg:justify-center h-9 ">
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
    </>
  )
}

export default VoucherEntryView;
