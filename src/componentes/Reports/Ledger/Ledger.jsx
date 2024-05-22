import React, { useState } from 'react'
import GroupModal from './GroupModal';
import AccountModal from './AccountModal';
import ReusableTable from './ReusableTable';
import moment from 'moment';
import axios from 'axios';
import { BsArrowLeftCircle } from "react-icons/bs";

const Ledger = () => {
    const [groupID, setGroupID] = useState("");
    const [AccId, setAccID] = useState("");
    const [showGroup, setShowGroup] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [selectedLedger, setSelectedLedger] = useState(null);
    const [selectedAccName, setselectedAccName] = useState("");
    const [selectedGroupName, setselectedGroupName] = useState("");
    const [tableData, setTableData] = useState(false);
    const [data, setData] = useState([]);
    const [GroupData, setGroupData] = useState([]);
    const [fromDate, setfromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [fallbacktext, setfallbacktext] = useState(true);

    const handleGroupCheckboxChange = () => {
        setShowGroup(!showGroup);
        setShowAccount(false);
        setSelectedLedger("Group");
    };

    const handleAccountCheckboxChange = () => {
        setShowAccount(!showAccount);
        setShowGroup(false);
        setSelectedLedger("Account");
    };

    const handleAccountSelection = (item) => {
        document.getElementById("accountModal").close();
       
        setselectedAccName(item.name);
        setAccID(item.id);
    };

    const handleGroupSelection = (item) => {
        document.getElementById("groupModal").close();
        
        setselectedGroupName(item.group_name);
        setGroupID(item.id);
    };


    const handleSubmit = async (event) => {
        setfallbacktext(false);
        event.preventDefault();

        try {
            let response;
            const endpoint = selectedLedger === "Group" ? "group-ledger" : "account-ledger";
            const id = selectedLedger === "Group" ? groupID : AccId;
            const params = `fromdate=${fromDate}&todate=${toDate}`;

            response = await axios.get(`http://192.168.179.23:5002/${endpoint}/${id || 'null'}?${params}`);

            if (response.status === 200) {
                if (selectedLedger === "Group") {
                    setGroupData(response.data);
                } else {
                    setData(response.data);
                }
                setTableData(true);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(`Failed to fetch data: ${error}`);
        }
    };



    return (
        <>
            <div className="card lg:card-side bg-base-100 shadow-xl w-auto">
                <div className='container mx-3 flex justify-center w-auto m-3 '>
                    <div className="card card-compact w-auto bg-base-100 shadow-xl  ">
                        <figure ><img className='w-auto h-auto ' src="https://t3.ftcdn.net/jpg/01/34/35/86/360_F_134358697_bWE6vHPDP2Z3lma65Khv9O1hnCwCJb5l.jpg" alt="Shoes" /></figure>
                        <div className="card-body w-auto">
                            <div className=' grid-cols-2 flex gap-7 justify-center'>
                                <div className="  ">
                                    <div className="form-control w-40">
                                        <label className="cursor-pointer label">
                                            <span className="label-text font-bold">Group Ledger</span>
                                            <input onChange={handleGroupCheckboxChange} type="checkbox" className="toggle toggle-primary" />
                                        </label>
                                    </div>
                                </div>
                                <div className=" ">
                                    <div className="form-control w-40">
                                        <label className="cursor-pointer label">
                                            <span className="label-text font-bold ">Account Ledger</span>
                                            <input onChange={handleAccountCheckboxChange} type="checkbox" className="toggle toggle-primary" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* input */}
                            <div className="form-control mt-5">
                                <div className="grid-cols-2 flex justify-center gap-7">
                                    <div className="form-control ">
                                        <label htmlFor="fromdate" className="lable  font-bold"><span className="label-text"> From Date *</span></label>
                                        <input type="date" onChange={(e) => setfromDate(e.target.value)} name="fromdate" id="fromdate" className="input input-bordered input-md w-full" required />
                                    </div>
                                    <div className="form-control ">
                                        <label htmlFor="todate" className="lable  font-bold"><span className="label-text"> To Date *</span></label>
                                        <input type="date" onChange={(e) => setToDate(e.target.value)} name="todate" id="todate" className="input input-bordered input-md w-full" required />
                                    </div>
                                </div>
                            </div>
                            {showGroup && (
                                <div className="form-control mt-5 ">
                                    <div className="join flex justify-center">
                                        <div>

                                            <div>
                                                <input value={selectedGroupName} className="input input-bordered  join-item" placeholder="Group" readOnly />
                                            </div>
                                        </div>

                                        <div className="indicator">
                                            <button onClick={() => document.getElementById("groupModal").showModal()} className="btn join-item border-sky-400">Select</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showAccount && (
                                <div className="form-control mt-5 ">
                                    <div className="join flex justify-center">
                                        <div>

                                            <div>
                                                <input value={selectedAccName} className="input input-bordered  join-item" placeholder="Account" readOnly />
                                            </div>
                                        </div>

                                        <div className="indicator">
                                            <button onClick={() => document.getElementById("accountModal").showModal()} className="btn join-item border-sky-400">Select</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='flex justify-center gap-5 mt-3'>
                                <button type='submit' onClick={handleSubmit} className="btn btn-primary ">Submit</button>
                                <button className="btn btn-error ">Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {fallbacktext && (<>
                        <div className='flex justify-center my-8'>
                            <div className="card w-96 bg-base-100 shadow-xl ">
                                <figure><img src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-company-activity-report_516790-1820.jpg" alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title font-semibold"> <BsArrowLeftCircle size={30} /> Please Select The Ledger Type!</h2>

                                </div>
                            </div>
                        </div>

                    </>)}
                    {tableData && (<h2 className="card-title flex justify-center">A {selectedLedger} Report Table</h2>)}
                    {tableData && selectedLedger === "Account" && (
                        <ReusableTable
                            data={data}
                            selectedLedger={selectedLedger}
                            moment={moment}
                            tableData={tableData}
                        />
                    )}
                    {tableData && selectedLedger === "Group" && (
                        <ReusableTable
                            data={GroupData}
                            selectedLedger={selectedLedger}
                            moment={moment}
                            tableData={tableData}
                        />
                    )}

                </div>
            </div>




            <GroupModal handleSelection={handleGroupSelection} />
            <AccountModal handleSelection={handleAccountSelection} />


        </>
    )
}

export default Ledger;
