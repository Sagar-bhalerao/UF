import React from 'react'
import { useState } from "react";
import axios from "axios";
import { toast } from 'sonner';
const AddGroupModal = ({ GroupData, onSave }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [isMainGroup, setMainGroup] = useState(false);
  const [selectedMainGroupName, setSelectedGroupName] = useState('')

  const handleGroupData = (item) => {
    document.getElementById('MainModal').close();
    setSelectedGroupId(item.id);
    setSelectedGroupName(item.group_name);

  }
  const handleGroup = async (e) => {
    document.getElementById('AddGroup').close();
    e.preventDefault();
    try {
      let body = {
        group_Id: selectedGroupId,
        group_name: groupName,
        main_group: selectedGroupId,
      };
      console.log(body);

      const response = await axios.post(
        `http://localhost:5002/group-add`,
        body
      );
      if (response.status === 200) {
        toast.success("Group Added Successfully");
        onSave();
      }

      console.log("Response from group-add API:", response);
    } catch (error) {
      console.error("Error adding group:", error);
    }
  };
  // const ModalFun = () => {
  // ;

  // }
  return (

    <>

      <dialog id="AddGroup" className="modal">
        <div className="modal-box">
          <h2 className='font-bold flex justify-center mb-2'>Create New Group</h2>
          <form onSubmit={handleGroup} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="label">
                  <span className="label-text  font-bold">Group Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder='Enter Group Name'
                  onChange={(e) => setGroupName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"

                />
              </div>

            </div>
            <div className="grid gap-4 mb-4 sm:grid-cols-1 md:grid-cols-2 sm:w-full">
    <div className="max-w-md">
      <label className="label">
        <span className="label-text font-bold">Main Group *</span>
      </label>
      <div className="join">
        <input className="input input-bordered join-item " value={selectedMainGroupName} placeholder="Select Main Group" readOnly />
        <button onClick={()=>document.getElementById("MainModal").showModal()} type='button' className="btn join-item  border-sky-400">Select</button>
      </div>
    </div>
  </div>
        <button onClick={()=>document.getElementById("AddGroup").close()} type='button' className='btn btn-error float-end ml-3'>Cancel</button>
            <button
              type='submit'
              className="btn  float-end btn-primary"
            >
              Add new Group
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>




      {/* main modal */}
      <dialog id='MainModal' className="modal">
        <div className="modal-box">
          <h2 className='font-bold flex justify-center mb-2ś'>Create Group</h2>
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
                <tbody key={index}>

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

export default AddGroupModal;;
