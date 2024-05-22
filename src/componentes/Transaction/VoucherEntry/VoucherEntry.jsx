import React, { useCallback, useState } from 'react'

import AccountModal from './AccountModal';
import MemberModal from './MemberModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
const VoucherEntry = () => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [showFirstTable, setShowFirstTable] = useState(false);
    const [Card, setCard] = useState(true);
    
    const [voucherEntries, setVoucherEntries] = useState([
        {
            id: 1,
            accountID: "",
            accountName: "",
            memberName: "",
            memberID: "",
            voucherAmount: "",
            balanceType: "",
            remark: ""
        },
    ]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [totalCredit, setTotalCredit] = useState(0);
    const [totalDebit, setTotalDebit] = useState(0);

    // Handle changes in voucher amount
    const handleVoucherAmountChange = useCallback((index, value) => {
        const updatedEntries = [...voucherEntries];
        updatedEntries[index].voucherAmount = value;
        setVoucherEntries(updatedEntries);
    }, [voucherEntries]);


    // Handle changes in balance type
    const handleBalanceTypeChange = useCallback((index, value) => {
        const updatedEntries = [...voucherEntries];
        updatedEntries[index].balanceType = value;
        setVoucherEntries(updatedEntries);
    }, [voucherEntries]);

    // Handle changes in remark
    const handleRemarkChange = useCallback((index, value) => {
        const updatedEntries = [...voucherEntries];
        updatedEntries[index].remark = value;
        setVoucherEntries(updatedEntries);
    }, [voucherEntries]);




    const handelSelectBtn = (RowID) => {
        setSelectedRowIndex(RowID);
        document.getElementById('AccountModal').showModal();

    }
    const handelMemSelectBtn = (RowID) => {
        setSelectedRowIndex(RowID);
        document.getElementById('MemberModal').showModal();
    }

    const handleAccountSelection = (item) => {
        if (selectedRowIndex !== null) {
            const updatedEntries = voucherEntries.map((entry, index) => {
                if (index === selectedRowIndex) {
                    return {
                        ...entry,
                        accountID: item.id,
                        accountName: item.name,
                    };
                }
                return entry;
            });
            setVoucherEntries(updatedEntries);
        }
        document.getElementById('AccountModal').close();
    };

    const handleMemberSelection = (item) => {
        if (selectedRowIndex !== null) {
            const updatedmemEntry = voucherEntries.map((entry, index) => {
                if (index === selectedRowIndex) {
                    return {
                        ...entry,
                        memberID: item.id,
                        memberName: item.name,

                    };
                }
                return entry;
            });
            setVoucherEntries(updatedmemEntry);
        }
        document.getElementById('MemberModal').close();
    };
    const handleGoBtn = () => {
        if (!selectedDate || !selectedType) {
            return;
        }
        setCard(false);
        setShowFirstTable(true);
    }
    const handleAddEntry = () => {
        const newEntry = {
            id: voucherEntries.length + 1,
            accountID: "",
            accountName: "",
        };
        setVoucherEntries([...voucherEntries, newEntry]);
    };
    const handleDeleteBtn = () => {
        setVoucherEntries(prevEntries => {
            if (prevEntries.length > 1) {
                const updatedEntries = [...prevEntries];
                updatedEntries.pop();
                return updatedEntries;
            }
            return prevEntries;
        });
    };


    const handleSubmit = async () => {

        // if (totalCredit !== totalDebit || !totalCredit && !totalDebit) {
        //     // toast.warning("Credit and Debit Amounts must be match !");
        //     return;
        // }

        try {

            let body = {
                voucher_date: selectedDate,
                voucher_type: selectedType,
                entries: voucherEntries, // Pass voucherEntries array 
            };
            console.log(body);
            const response = await axios.post("http://192.168.179.25:5002/Voucher-Entry", body);
            if (response.status === 200) {
                toast.success("Data Inserted Successfully");
                navigate("/VoucherEntryView");

            }
            console.log("Response:", response.data);

        } catch (error) {
            toast.error("Something Went Wrong !!");

        }
    };


    return (
        <>
            {Card && (<div className=' flex justify-center items-center'>
                <div className="card w-96 bg-base-100 shadow-xl mt-5">
                    <figure><img src="https://www.pngitem.com/pimgs/m/340-3409067_image-result-for-accounting-accounting-software-png-transparent.png" alt="Shoes" /></figure>
                    <div className="card-body">
                        <form >
                            <h2 className='flex justify-center mb-2 font-extrabold'>Voucher Entry</h2>
                            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2 w-120">
                                <div>
                                    <label className="label">
                                        <span className="label-text font-bold">Date *</span>
                                    </label>

                                    <input type="date" onChange={(e) => setSelectedDate(e.target.value)} placeholder="" className="input input-bordered input-md w-full max-w-xs" />
                                </div>
                                <div>
                                    <label className="label ">
                                        <span className="label-text  font-bold">Type *</span>
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="input input-bordered input-md w-full max-w-xs"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="BR">Bank Receipt</option>
                                        <option value="BP">Bank Payment</option>
                                        <option value="CR">Cash Receipt</option>
                                        <option value="CP">Cash Payment</option>
                                        <option value="JV">Journal Voucher</option>
                                    </select>

                                </div>

                            </div>
                            <button
                                onClick={handleGoBtn}
                                type="button"
                                className="btn btn-normal btn-primary flex justify-center w-full  mt-5"
                            >
                                GO
                            </button>
                        </form>
                    </div>
                </div>
            </div>)}

            {showFirstTable && (

                <div className="container mx-auto mt-5  ">
                    <div className="overflow-x-auto shadow-xl rounded-lg p-6">
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr className="">
                                    <th>Sr</th>
                                    <th className="px-4 py-2">Account Name *</th>
                                    <th className="px-4 py-2">Voucher Amount *</th>
                                    <th className="px-4 py-2">Balance Type *</th>
                                    <th className="px-4 py-2">Member Name *</th>
                                    <th className="px-4 py-2">Reamrk *</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {voucherEntries.map((item, index) => (
                                    <tr key={index} className="">
                                        <td>{index + 1}</td>
                                        <td className="px-4 py-2">
                                            <div className="join">
                                                <div>
                                                    <div>
                                                        <input value={item.accountName} className="input input-bordered join-item" placeholder="Account" readOnly />
                                                    </div>
                                                </div>

                                                <div className="indicator">

                                                    <button onClick={() => handelSelectBtn(index)} className="btn join-item border-sky-400">A</button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2"><input value={item.voucherAmount}
                                            onChange={(e) =>
                                                handleVoucherAmountChange(index, e.target.value)
                                            } type="number" className="input input-bordered  join-item" placeholder="Enter Amount" /></td>
                                        <td className="px-4 py-2">  <div>

                                            <select
                                                id="status"
                                                name="status"
                                                value={item.balanceType}
                                                onChange={(e) =>
                                                    handleBalanceTypeChange(index, e.target.value)
                                                }
                                                className="input input-bordered  join-item"
                                            >
                                                <option value="">Select Type</option>
                                                <option value="DR">Debit</option>
                                                <option value="CR">Credit</option>

                                            </select>

                                        </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="join">
                                                <div>
                                                    <div>
                                                        <input value={item.memberName} className="input input-bordered join-item" placeholder="Member" readOnly />
                                                    </div>
                                                </div>

                                                <div className="indicator">
                                                    <button onClick={() => handelMemSelectBtn(index)} className="btn join-item border-sky-400">M</button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="text" value={item.remark}
                                                onChange={(e) => handleRemarkChange(index, e.target.value)} className="input input-bordered  join-item" placeholder="Remark" />
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                        <div className='mt-5'>
                            <button className='btn btn-success' onClick={handleAddEntry} >Add Entry</button>
                            <button className='btn ml-3 btn-error' onClick={handleDeleteBtn}>Cancel</button>
                        </div>
                    </div>
                    <div className='flex justify-center mt-4 sm:mx-auto'>
                        <button className='btn btn-primary' onClick={handleSubmit} >Submit</button>
                        <button className='btn ml-3 btn-error' onClick={() => navigate("/VoucherEntryView")}>Cancel</button>
                    </div>
                </div>

            )}


            <AccountModal handleSeletion={handleAccountSelection} />
            <MemberModal handleSeletion={handleMemberSelection} />
        </>
    )
}

export default VoucherEntry;
