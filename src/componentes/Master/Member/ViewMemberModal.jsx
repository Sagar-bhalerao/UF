import React from 'react'

const ViewMemberModal = ({MemberDetails}) => {
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
<>
<dialog id="ViewMember" className="modal">
    {/* modal body */}
  <div className="modal-box">
  
  {/* <h1 className='flex justify-center text-xl font-bold '> <span>View Member</span> </h1> */}
  {MemberDetails.map((item,index)=>(
 <form key={index} className="max-w-lg mx-auto w ">
    
 <div className="flex flex-col md:flex-row mb-1">
   <div className="relative flex-grow mb-2 md:mb-0 md:mr-2">
   <label className="label">
            <span className="label-text  font-bold">Name *</span>
          </label>
     <div className="flex">
       <input value={item.name} placeholder="Last Name" type="text" name="lastname" id="lastname" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
     </div>
   </div>

 </div>
 <div className="flex flex-col md:flex-row mb-2">
   <div className="flex-grow mb-2 md:mb-0 md:mr-2">
   <label className="label">
            <span className="label-text  font-bold">DOB *</span>
          </label>
     <input value={formatDate(item.dob)}  type="date" name="dob" id="dob" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
   <div className="flex-grow">
   <label className="label">
            <span className="label-text  font-bold">DOJ *</span>
          </label>
     <input value={formatDate(item.doj)}   type="date" name="doj" id="doj" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
 </div>
 <div className="flex flex-col md:flex-row mb-2">
   <div className="flex-grow mb-2 md:mb-0 md:mr-2">
   <label className="label">
            <span className="label-text  font-bold">Address *</span>
          </label>
     <input value={item.address}  placeholder="Address.." type="text" name="address" id="address" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
 </div>
 <div className="flex flex-col md:flex-row mb-2">
   <div className="flex-grow mb-2 md:mb-0 md:mr-2">
   <label className="label">
            <span className="label-text  font-bold">City *</span>
          </label>
     <input value={item.city}   type="text" name="city" id="city" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
   <div className="flex-grow">
   <label className="label">
            <span className="label-text  font-bold">Pin *</span>
          </label>
     <input value={item.pin}   type="text" name="pin" id="pin" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
 </div>
 <div className="flex flex-col md:flex-row mb-2">
   <div className="flex-grow mb-2 md:mb-0 md:mr-2">
   <label className="label">
            <span className="label-text  font-bold">Email *</span>
          </label>
     <input value={item.email}   type="text" name="email" id="email" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
   <div className="flex-grow">
   <label className="label">
            <span className="label-text  font-bold">Mobile *</span>
          </label>
     <input value={item.mobile}   type="number" name="mobile" id="mobile" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
 </div>
 <div className="flex flex-col md:flex-row mb-2">
   <div className="flex-grow mb-2 md:mb-0 md:mr-2">
   <label className="label">
            <span className="label-text  font-bold">Aadhar *</span>
          </label>
     <input value={item.aadhar}   type="number" name="aadhar" id="aadhar" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
   <div className="flex-grow">
   <label className="label">
            <span className="label-text  font-bold">Pan *</span>
          </label>
     <input value={item.pan}    type="text" name="pan" id="pan" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
 </div>
 <div className="flex flex-col md:flex-row mb-2">
 <div className="flex-grow mb-2 md:mb-0 md:mr-2">
 <label className="label">
            <span className="label-text  font-bold">Status *</span>
          </label>
   <select  id="status" name="status" value={item.status} readOnly  className="input input-bordered input-md w-full max-w-xs" required >
       <option value="">Select Status</option>
       <option value="A">Active</option>
       <option value="I">Inactive</option>
   </select>
</div>

   <div className="flex-grow">
   <label className="label">
            <span className="label-text  font-bold">Ext_code *</span>
          </label>
     <input value={item.external_code}  type="text" name="extcode" id="extcode" className="input input-bordered input-md w-full max-w-xs" required readOnly/>
   </div>
 </div>

 
 <button type='button' onClick={()=>document.getElementById("ViewMember").close()} className='btn btn-sm btn-primary float-end mx-2 my-2'>close</button>
</form>

))}
 
 

  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
</>
  )
}

export default ViewMemberModal;
