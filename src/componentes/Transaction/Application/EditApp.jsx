import React from 'react'

const EditAppModal = ({ EditMemData, post,setpost,amount,setAmount,handleSaveChanges}) => {
  

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
  return (


    <dialog id="EditApp" className="modal">
      <div className="modal-box">
        <h1 className='flex justify-center text-xl font-bold '> <span>Edit Application</span> </h1>
        {EditMemData.map((item, index) => (
          <form onSubmit={handleSaveChanges} key={index} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="label">
                  <span className="label-text font-bold">Name</span>
                </label>

                <input value={item.mem_id} readOnly type="text" placeholder="Type here" className="input input-bordered input-md w-full max-w-xs" />
              </div>

              <div>
                <label className="label">
                  <span className="label-text  font-bold">Date</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formatDate(item.app_date)}
                  className="input input-bordered input-md w-full max-w-xs"
                  readOnly
                />
              </div>
            </div>
            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="label">
                  <span className="label-text  font-bold">From Date</span>
                </label>
                <input
                  type="date"
                  name="fromdate"
                  id="fromdate"
                  value={formatDate(item.from_date)}
                  className="input input-bordered input-md w-full max-w-xs"
                  readOnly
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text  font-bold">To Date</span>
                </label>
                <input
                  type="date"
                  name="todate"
                  id="todate"
                  value={formatDate(item.to_date)}
                  className="input input-bordered input-md w-full max-w-xs"
                readOnly
                />
              </div>
            </div>

            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
              <div>
                <label className="label">
                  <span className="label-text  font-bold">Post *</span>
                </label>
               
            <select id="status" onChange={(e)=>setpost(e.target.value)} value={post} name="status" className="input input-bordered input-md w-full" required>
              <option value="">Select Post</option>
              <option value="P">Post</option>
              <option value="R">Reject</option>
            </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text  font-bold">Amount *</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"                  
                  className="input input-bordered input-md w-full max-w-xs"
                  onChange={(e)=>setAmount(e.target.value)}
                  value={amount}
                />
              </div>
            </div>
            <button onClick={()=>document.getElementById("EditApp").close()} type='button' className='btn btn-error float-end ml-3'>Cancel</button>
            <button
              onClick={() => document.getElementById('EditApp').close()}
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

export default EditAppModal;
