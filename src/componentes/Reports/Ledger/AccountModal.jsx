import React from 'react'
import { useAccountData } from '../../../context/AccountContex';
const AccountModal = ({handleSelection}) => {
    const { accountData} = useAccountData();
  return (
    <dialog id="accountModal" className="modal">
    <div className="modal-box">
    <div className="flex justify-center mb-4 w-120">
      
      {/* <input onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" /> */}
    </div>
    <h2 className='font-bold flex justify-center mb-2ś'>Select Group</h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className='font-bold'>
  
                    <th>ID</th>
                    <th>Account Name</th>
                    <th>Select</th>
                  </tr>
                </thead>
                {accountData.map((item, index) => (
                  <tbody key={index}>
  
                    <tr className='hover'>
                      <th>{item.id}</th>
                      <td >{item.name}</td>
                      <td><button className="btn btn-sm btn-info" onClick={() => handleSelection(item)}>Select</button></td>
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
