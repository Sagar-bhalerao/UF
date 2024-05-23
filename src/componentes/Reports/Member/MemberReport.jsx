import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { saveAs } from 'file-saver';
import { useData } from '../../../context/memberDatacontext';
const MemberReport = () => {
    const [searchQuery, setsearachQuery] = useState('');
    const [memId, setMemID] = useState('');
    const [memName, sememName] = useState('');
    const [memData, setMemData] = useState([]);
    const [tableData, setTableData] = useState(false);
    const [fromDate, setfromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { data } = useData();





    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!memId) {
            try {
                const response = await axios.get(
                    `http://localhost:5002/member-ledger/null?fromdate=${fromDate}&todate=${toDate}`
                );
                if (response.status === 200) {
                    setMemData(response.data);
                    setTableData(true);
                } else {
                    console.log("Something went wrong");
                }
            } catch (error) {
                console.log(`Failed to fetch data: ${error}`);
            }
        } else {
            try {
                const response = await axios.get(
                    `http://localhost:5002/member-ledger/${memId}?fromdate=${fromDate}&todate=${toDate}`
                );
                if (response.status === 200) {
                    setMemData(response.data);
                    setTableData(true);
                } else {
                    console.log("Something went wrong");
                }
            } catch (error) {
                console.log(`Failed to fetch data: ${error}`);
            }
        }


    };



    const handleSelection = (item) => {
        document.getElementById("member-modal").close();
        setMemID(item.id);
        sememName(item.name)
    }
    // Function to convert table data to CSV
    const convertToCSV = () => {
        // Prepare CSV content

        const csvContent = [
            // Add CSV header row
            `Name,Voucher type,Voucher No,Voucher Date,Voucher Amount,Balance Type`,
            // Add CSV data rows
            ...memData.map(item =>
                `${item.name},${item.voucher_type},${item.voucher_no},${moment(item.voucher_date).format("DD/MM/YYYY")},${item.voucher_amount},${item.balance_type}`
            )
        ].join('\n');

        // Create Blob from CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        let name = "member"
        // Trigger file download
        saveAs(blob, `${name}_data.csv`);


    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl p-4 m-4 ">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="from_date" className="label font-bold">From Date*</label>
                                <input type="date" id="from_date" name="from_date" className="input input-bordered w-40 max-w-xs"
                                    onChange={(e) => setfromDate(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor="to_date" className="label font-bold">To Date*</label>
                                <input type="date" id="to_date" name="to_date" className="input input-bordered w-40 max-w-xs"
                                    onChange={(e) => setToDate(e.target.value)} required />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="member" className="label font-bold">Member*</label>
                            <div className="join mb-4">
                                <input className="input input-bordered join-item w-full max-w-xs" value={memName} readOnly />
                                <button type='button' className="btn join-item border-sky-400  "
                                    onClick={() => { document.getElementById("member-modal").showModal(); }}
                                > <span className='text-sky-400'>≡</span> </button>
                            </div>
                        </div>

                        <div >
                            <div >
                                <button type="submit" className="btn btn-primary mr-2" >
                                    Submit
                                </button>
                                <button type="reset" className="btn btn-error">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            {/* Member Modal */}
            <div>
                <dialog id="member-modal" className="modal">
                    <div className="modal-box">
                        <div>
                            <table className="table-lg w-full p-4 mt-4 rounded-lg">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th> Name</th>
                                        <th>Select</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td className='text-center'>{item.id}</td>
                                            <td className='text-center'>{item.name}</td>
                                            <td className='text-center'>
                                                <button data-bs-dismiss="modal" className='btn btn-sm btn-primary' onClick={() => handleSelection(item)} >
                                                    select
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            {/*Table Data */}
            {tableData && (
                <div className='overflow-x-auto p-4 rounded-lg'>
                    <table className='table rounded-lg p-4'>
                        <thead>
                            <tr>
                                <th className='bg-sky-500 text-black'>Mamber Name</th>
                                <th className='bg-sky-500 text-black'>Voucher type</th>
                                <th className='bg-sky-500 text-black'>Voucher No</th>
                                <th className='bg-sky-500 text-black'>Voucher Date</th>
                                <th className='bg-sky-500 text-black'>Voucher Amount</th>
                                <th className='bg-sky-500 text-black'>Balance Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.voucher_type}</td>
                                    <td>{item.voucher_no}</td>
                                    <td>{moment(item.voucher_date).format("DD/MM/YYYY")}</td>
                                    <td>{item.voucher_amount}</td>
                                    <td>{item.balance_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default MemberReport;
