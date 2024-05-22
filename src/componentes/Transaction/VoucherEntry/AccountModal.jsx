import React, { useState } from 'react'
import { useAccountData } from '../../../context/AccountContex';
const AccountModal = ({handleSeletion}) => {
  const [searchQuery, setSearchQuery] = useState("");
    const { accountData } = useAccountData();
    const FiltredData = accountData.filter((item)=>item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  return (  

<dialog id="AccountModal" className="modal">
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
                  <th>Account Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              {FiltredData.map((item, index) => (
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

export default AccountModal;
