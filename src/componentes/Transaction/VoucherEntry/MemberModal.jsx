import React, { useState } from 'react'
import { useData } from '../../../context/memberDatacontext';
const MemberModal = ({handleSeletion}) => {
  const [searchQuery, setSearchQuery] = useState("");
     const { data } = useData();
     const filteredData = data.filter((item)=>item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <dialog id="MemberModal" className="modal">
    <div className="modal-box">
    <div className="flex justify-center mb-4 w-120">
    
    <input onChange={(e)=>setSearchQuery(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" />
  </div>
    <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>

                  <th>ID</th>
                  <th>Member Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              {filteredData.map((item, index) => (
                <tbody key={index}>

                  <tr className='hover'>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td><button className="btn btn-sm btn-info" onClick={() => handleSeletion(item)}>Select</button></td>
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
  )
}

export default MemberModal;
