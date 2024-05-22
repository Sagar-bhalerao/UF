import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Pagination from "react-js-pagination";
import UploadSalaryModal from './UploadSalaryModal';
import { toast } from 'sonner';


const SalaryUpload = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    


    const itemsPerPage = 8;
    useEffect(() => {
        fetchData();
    }, [currentPage]);
    if (uploadProgress === 100) {
        setTimeout(() => {
            document.getElementById("SalaryUpload").close();

        }, 2000);
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://192.168.179.25:5002/salary_upload"
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
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()))


    ).slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const monthMap = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    };

    const handleMonthChange = (value) => {
        setMonth(value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const url = `http://192.168.179.25:5002/upload?month=${month}&year=${year}`;

            // Upload file
            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);

                await axios.post(url, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: ProgressEvent => {
                        const progress = Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100);
                        setUploadProgress(progress);

                    }
                });
                
                setUploadProgress(null);
                toast.success("File Uploaded Successfully");

                // Fetch updated data
                setMonth('')
                setYear('')
                setSelectedFile(null);
                await fetchData();
            } else {
                toast.warning(<div className='text-md font-bold'>No file selected !!</div>);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 mx-9 my-4 px-9 py-6">
                <button onClick={() => document.getElementById('SalaryUpload').showModal()} className="btn  btn-primary mb-2 md:mb-0" to="/ApplicationForm">Upload Salary</button>
                <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" />
            </div>

            {currentItems.length > 0 ? (
                <div className="container mx-auto px-2 lg:max-w-8xl flex justify-center mt-2">
                    <div className="overflow-x-auto border shadow-xl rounded-xl w-full ">
                        <table className="table rounded-lg w-full">
                            <thead className="dark:bg-blue-600 dark:text-white">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Ext_Code</th>
                                    <th className="px-4 py-2">Month</th>
                                    <th className="px-4 py-2">Year</th>
                                    <th className="px-4 py-2">Amount</th>
                                </tr>
                            </thead>
                            {currentItems.map((item, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.ext_code}</td>
                                        <td>{monthMap[item.month]}</td>
                                        <td>{item.year}</td>
                                        <td>{item.amount}</td>
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
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Ext_Code</th>
                                    <th className="px-4 py-2">Month</th>
                                    <th className="px-4 py-2">Year</th>
                                    <th className="px-4 py-2">Amount</th>

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
            <UploadSalaryModal  uploadProgress={uploadProgress} handleMonthChange={handleMonthChange} year={year} setYear={setYear} handleFileChange={handleFileChange} handleUpload={handleUpload} />
        </>
    )
}

export default SalaryUpload;
