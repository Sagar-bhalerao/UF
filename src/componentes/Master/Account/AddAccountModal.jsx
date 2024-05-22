import React, { useState, useEffect } from 'react';
// import { useGroupData } from '../../../context/GroupContext';
import axios from 'axios';
import { toast } from 'sonner';
const AddAccountModal = ({ onSave }) => {
  // const { groupData } = useGroupData;

  const [accountName, setAccountName] = useState(""); //accountName payload
  const [selectedViewGroupID, setselectedViewGroupID] = useState("") //payload
  const [status, setStaus] = useState('') //payload
  const [GroupData, setGroupData] = useState([]);
  const [Groupname, setGroupName] = useState("");
  useEffect(() => {
    fetchData();
  }, [])
  const handleGroupData = (item) => {
    document.getElementById('mainModalGroup').close();
    setGroupName(item.group_name);
    setselectedViewGroupID(item.id);

  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5002/group-view");
      if (response.status === 200) {
        setGroupData(response.data);
      } else {
        console.log("Failed to fetch group data");
      }
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  }


  const addAccount = async (e) => {
    console.log("its");
    e.preventDefault();
    document.getElementById('AddAccount').close();

    try {
      let body = {
        group_id: selectedViewGroupID,
        name: accountName,
        status: status,

      };
      console.log(body);
      const response = await axios.post("http://localhost:5002/account-add",
        body
      );
      console.log(response);

      if (response.status === 200) {
        toast.success("Account Added Successfully")
        onSave();
        setAccountName('');
        setGroupName('');
        setStaus('');
      }
      console.log("add-account api responce", response)

      console.log("Account name:", accountName);

      // Add account logic here, including status


    } catch (error) {
      console.error("Error adding account:", error);
    }
  };
  return (
    <>

      <dialog id="AddAccount" className="modal">
        <div className="modal-box">
          <h2 className='font-bold flex justify-center'>Add Account </h2>
          <div className="relative p-4 flex-auto">
          <form onSubmit={addAccount} className="">
  <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2">
    <div className="max-w-md">
      <label className="label">
        <span className="label-text font-bold">Account Name *</span>
      </label>
      <input
        type="text"
        name="name"
        placeholder='Enter Account Name'
        onChange={(e) => setAccountName(e.target.value)}
        className="input input-bordered input-md w-full"
      />
    </div>
    <div className="max-w-md">
      <label htmlFor="status" className="label">
        <span className="label-text font-bold">Status *</span>
      </label>
      <select
        id="status"
        onChange={(e) => setStaus(e.target.value)}
        name="status"
        className="input input-bordered input-md w-full"
        required
      >
        <option value="">Select Status</option>
        <option value="A">Active</option>
        <option value="I">Inactive</option>
      </select>
    </div>
  </div>

  <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2 sm:w-full">
    <div className="max-w-md">
      <label className="label">
        <span className="label-text font-bold">Main Group *</span>
      </label>
      <div className="join">
        <input className="input input-bordered join-item " value={Groupname} placeholder="Select Main Group" readOnly />
        <button onClick={()=>document.getElementById("mainModalGroup").showModal()} type='button' className="btn join-item  border-sky-400">Select</button>
      </div>
    </div>
  </div>
  <button onClick={()=>document.getElementById("AddAccount").close()} type='button' className='btn btn-error float-end ml-3'>Cancel</button>
  <button
    className="btn btn-primary float-end "
    type="submit"
  >
    Submit
  </button>
</form>



          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


     {/* main Group modal */}
      <dialog id="mainModalGroup" className="modal">
        <div className="modal-box">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>

                  <th>ID</th>
                  <th>Group Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              {GroupData.map((item, index) => (
                <tbody key={index} >
                  <tr className='hover'>
                    <th>{item.id}</th>
                    <td>{item.group_name}</td>
                    <td><button className="btn btn-sm btn-info" onClick={() => handleGroupData(item)}>Select</button></td>

                  </tr>

                </tbody>
              ))}
            </table>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>




    </>
  )
}

export default AddAccountModal;
