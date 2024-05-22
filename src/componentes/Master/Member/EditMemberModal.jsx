import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'sonner';

const EditMemberModal = ({ selectedMember, onSave }) => {
  const [memberData, setMemberData] = useState(selectedMember);
  useEffect(() => {
    setMemberData(selectedMember);
  }, [selectedMember]);
  console.log(memberData);

  const handleChange = (statusId, newStatus) => {
    const updatedMemberData = memberData.map(member => {
      if (member.id === statusId) {
        return { ...member, status: newStatus };
      }
      return member;
    });

    setMemberData(updatedMemberData);
    console.log(`Status changed for member with ID ${statusId} to:`, newStatus);
  };

  const handledojChange = (dojID, newDoj) => {
    const updatedoj = memberData.map(member => {
      if (member.id === dojID) {
        return { ...member, doj: newDoj }
      }
      return member
    });
    setMemberData(updatedoj);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return `${year}-${month}-${day}`;
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // onClose();
    memberData.forEach(member => {
      let body = {
        status: member.status,
        doj: member.doj
      };

      axios.put(`http://localhost:5002/update-member/${member.id}`, body) // Send body directly here
        .then(response => {
          if (response.status === 200) {
          toast.success("Member Updated Successfully");
            onSave(); // Trigger parent component re-render
          } else {
            throw new Error('Failed to update status');
          }
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });
    });
  };
  return (

    <dialog id="EditMember" className="modal">

      <div className="modal-box">
        <h1 className='flex justify-center text-xl font-bold '> <span>Edit Member</span> </h1>
        {memberData.map((item, index) => (
          <form onSubmit={handleSaveChanges} key={index} className="p-4 md:p-5">

            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
              <div>

                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>


                <input value={item.name} readOnly type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-xs" />
              </div>
              <div>
                <label className="label ">
                  <span className="label-text  font-bold">Status *</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={item.status}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="input input-bordered input-md w-full max-w-xs"
                >
                  <option value="">Select Status</option>
                  <option value="A">Active</option>
                  <option value="I">Inactive</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="label">
                  <span className="label-text  font-bold">DOB</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formatDate(item.dob)}
                  className="input input-bordered input-md w-full max-w-xs"
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text  font-bold">DOJ *</span>
                </label>
                <input
                  type="date"
                  name="doj"
                  id="doj"
                  onChange={(e) => handledojChange(item.id, e.target.value)}
                  className="input input-bordered input-md w-full max-w-xs"

                />
              </div>
            </div>
            <button type='button' onClick={() => document.getElementById('EditMember').close()} className='btn btn-normal btn-error float-end ml-3'>Cancel</button>
            <button
              onClick={() => document.getElementById('EditMember').close()}
              type="submit"
              className="btn btn-normal btn-primary float-end"
            >
              Update
            </button>
          </form>
        ))}

      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default EditMemberModal;
