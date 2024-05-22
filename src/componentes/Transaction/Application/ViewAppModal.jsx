import React from 'react'

const ViewAppModal = ({ ApplicationDetails }) => {
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

    <dialog id="ViewApp" className="modal">
      <div className="modal-box">
        <div className="flex justify-center ">
          <div className="card w-full sm:max-w-md bg-base-100 shadow-xl ">
            <div className="card-body w-120  py-4 px-6">
              {ApplicationDetails.map((item, index) => (
                <form key={index} className="max-w-lg mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col mb-2">
                      <label htmlFor="appdate" className="lable  font-bold"><span className="label-text"> App Date *</span></label>
                      <input readOnly value={formatDate(item.appdate)} type="date" name='appdate' id="appdate" className="input input-bordered input-md w-full" required />
                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col mb-2">
                      <label htmlFor="member" className="lable font-bold"><span className="label-text"> Member *</span></label>
                      <input  value={item.mem_id} type='text' className="input input-bordered join-item" placeholder="" readOnly />

                    </div>
                    <div className="flex flex-col mb-1">
                      <label htmlFor="relation" className="lable  font-bold"><span className="label-text"> Relation *</span></label>
                      <select id="relation" readOnly value={item.relation} name="relation" className="input input-bordered input-md w-full" required>
                        <option value="">Select Relation</option>
                        <option value="self">Self</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="wife">Wife</option>
                        <option value="daughter">Daughter</option>
                        <option value="son">Son</option>
                      </select>
                    </div>
                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col mb-2">
                      <label htmlFor="fromdate" className="lable  font-bold"><span className="label-text"> From Date *</span></label>
                      <input readOnly value={item.fromdate} type="date" name="fromdate" id="fromdate" className="input input-bordered input-md w-full" required />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="todate" className="lable  font-bold"><span className="label-text"> To Date *</span></label>
                      <input readOnly value={item.todate} type="date" name="todate" id="todate" className="input input-bordered input-md w-full" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col mb-2">
                      <label htmlFor="disease" className="lable  font-bold"><span className="label-text"> Disease *</span></label>
                      <input readOnly placeholder="Disease"  value={item.disease} type="text" name="disease" id="disease" className="input input-bordered input-md w-full" required />
                    </div>
                    <div className="flex flex-col mb-2">
                      <label htmlFor="expences" className="lable  font-bold"><span className="label-text"> Expences *</span></label>
                      <input readOnly placeholder="Expences"  value={item.amount} type="number" name="amount" id="expences" className="input input-bordered input-md w-full" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col mb-3">
                      <label htmlFor="anyhelp" className="lable  font-bold"><span className="label-text"> Any Help *</span></label>
                      <input readOnly placeholder="Any Help"  value={item.ext_name} type="text" name="ext_name" id="ext_name" className="input input-bordered input-md w-full" required />
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="helpamount" className="lable  font-bold"><span className="label-text"> Help Amount *</span></label>
                      <input readOnly placeholder="Help Amount"  value={item.ext_amount} type="number" name="ext_amount" id="ext_amount" className="input input-bordered input-md w-full" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col mb-1">
                      <label htmlFor="remark" className="lable  font-bold"><span className="label-text"> Post *</span></label>
                      <input readOnly placeholder=""  value={item.post} type="" name="remark" id="remark" className="input input-bordered input-md w-full" required />
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="netamount" className="lable  font-bold"><span className="label-text">Amount *</span></label>
                      <input readOnly placeholder=""  value={item.post_amount} type="number"  className="input input-bordered input-md w-full" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col mb-1">
                      <label htmlFor="remark" className="lable  font-bold"><span className="label-text"> Remark *</span></label>
                      <input readOnly placeholder="Reamark"  value={item.remark} type="" name="remark" id="remark" className="input input-bordered input-md w-full" required />
                    </div>
                    <div className="flex flex-col mb-3">
                      <label htmlFor="netamount" className="lable  font-bold"><span className="label-text">Net Amount *</span></label>
                      <input readOnly placeholder="Net Amount"  value={item.ext_amount} type="number" name="ext_amount" id="ext_amount " className="input input-bordered input-md w-full" required />
                    </div>
                  </div>

                  <div className="form-control">
                    
                    <button onClick={()=>document.getElementById('ViewApp').close()} type='reset' className="btn btn-outline btn-error mt-1" >Cancel</button>
                  </div>
                </form>))}

            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default ViewAppModal;
