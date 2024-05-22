import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner';
const MemberForm = () => {
  const [inputs, setInputs] = useState({
    lastname: "",
    firstname: "",
    middlename: "",
    dob: "",
    doj: "",
    address: "",
    city: "",
    pin: "",
    email: "",
    mobile: "",
    aadhar: "",
    pan: "",
    status: "",
    extcode: "",

  });
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const responce = await axios.post("http://192.168.179.25:5002/member", inputs);
      if (responce.status === 200) {
        toast("Member Registerd Successfully");
      }
    } catch (error) {
      console.log("error fetching data", error);
    }
    console.log(inputs);
  };

  return (
    <>


      <div className="flex justify-center ">
        <div className="card w-full sm:max-w-md bg-base-100 shadow-xl ">
          <div className="card-body w-120  py-4 px-6">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex flex-col mb-2">
                  <label htmlFor="lastname" className="lable font-bold"><span className="label-text"> Last Name *</span></label>
                  <input onChange={handleInputChange} value={inputs.lastname} placeholder="Last Name" type="text" name="lastname" id="lastname" className="input input-bordered input-md w-full" />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="firstname" className="lable  font-bold"><span className="label-text"> First Name *</span></label>
                  <input onChange={handleInputChange} value={inputs.firstname} placeholder="First Name" type="text" name="firstname" id="firstname" className="input input-bordered input-md w-full" required />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="middlename" className="lable  font-bold"><span className="label-text"> Middle Name *</span></label>
                  <input onChange={handleInputChange} value={inputs.middlename} placeholder="Middle Name" type="text" name="middlename" id="middlename" className="input input-bordered input-md w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col mb-2">
                  <label htmlFor="dob" className="lable  font-bold"><span className="label-text"> DOB *</span></label>
                  <input type="date" onChange={handleInputChange} value={inputs.dob} name="dob" id="dob" className="input input-bordered input-md w-full" required />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="doj" className="lable  font-bold"><span className="label-text"> DOJ *</span></label>
                  <input type="date" onChange={handleInputChange} value={inputs.doj} name="doj" id="doj" className="input input-bordered input-md w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col mb-2">
                  <label htmlFor="address" className="lable  font-bold"><span className="label-text"> Address *</span></label>
                  <input onChange={handleInputChange} value={inputs.address} placeholder="Address" type="text" name="address" id="address" className="input input-bordered input-md w-full" required />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="city" className="lable  font-bold"><span className="label-text"> City *</span></label>
                  <input onChange={handleInputChange} value={inputs.city} placeholder="City" type="text" name="city" id="city" className="input input-bordered input-md w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col mb-2">
                  <label htmlFor="pin" className="lable  font-bold"><span className="label-text"> Pin *</span></label>
                  <input onChange={handleInputChange} value={inputs.pin} placeholder="Pin" type="number" name="pin" id="pin" className="input input-bordered input-md w-full" required />
                </div>
                <div className="flex flex-col mb-2">
                  <label htmlFor="email" className="lable  font-bold"><span className="label-text"> Email *</span></label>
                  <input onChange={handleInputChange} value={inputs.email} placeholder="Email" type="email" name="email" id="email" className="input input-bordered input-md w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col mb-3">
                  <label htmlFor="mobile" className="lable  font-bold"><span className="label-text"> Mobile *</span></label>
                  <input onChange={handleInputChange} value={inputs.mobile} placeholder="Mobile" type="number" name="mobile" id="mobile" className="input input-bordered input-md w-full" required />
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="aadhar" className="lable  font-bold"><span className="label-text"> Aadhar *</span></label>
                  <input onChange={handleInputChange} value={inputs.aadhar} placeholder="Aadhar" type="number" name="aadhar" id="aadhar" className="input input-bordered input-md w-full" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col mb-1">
                  <label htmlFor="pan" className="lable  font-bold"><span className="label-text"> Pan *</span></label>
                  <input onChange={handleInputChange} value={inputs.pan} placeholder="Pan" type="" name="pan" id="pan" className="input input-bordered input-md w-full" required />
                </div>
                <div className="flex flex-col mb-1">
                  <label htmlFor="status" className="lable  font-bold"><span className="label-text"> Status *</span></label>
                  <select id="status" onChange={handleInputChange} value={inputs.status} name="status" className="input input-bordered input-md w-full" required>
                    <option value="">Select Status</option>
                    <option value="A">Active</option>
                    <option value="I">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col mb-1">
                  <label htmlFor="extcode" className="lable  font-bold"><span className="label-text"> Ext_code *</span></label>
                  <input onChange={handleInputChange} value={inputs.extcode} placeholder="Extcode" type="text" name="extcode" id="extcode" className="input input-bordered input-md w-full" required />
                </div>
              </div>

              <div className="form-control">
                <button className="btn btn-outline btn-primary">Submit</button>
                <button className="btn btn-outline btn-error mt-1" onClick={() => navigate("/MemberView")}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>


      {/* <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="flex flex-col mb-3">
        <label htmlFor="lastname" className="lable"><span className="label-text"> Last Name *</span></label>
       
        <input onChange={handleInputChange} value={inputs.lastname} placeholder="Last Name" type="text" name="lastname" id="lastname" className="input input-bordered input-md w-full max-w-xs" />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="firstname" className="lable"><span className="label-text"> First Name *</span></label>
        <input onChange={handleInputChange} value={inputs.firstname} placeholder="First Name" type="text" name="firstname" id="firstname" className="input input-bordered" required />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="middlename" className="lable"><span className="label-text"> Middle Name *</span></label>
        <input onChange={handleInputChange} value={inputs.middlename} placeholder="Middle Name" type="text" name="middlename" id="middlename" className="input input-bordered" required />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col mb-3">
        <label htmlFor="dob" className="lable"><span className="label-text"> DOB *</span></label>
        <input type="date" onChange={handleInputChange} value={inputs.dob}  name="dob" id="dob" className="input input-bordered" required />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="doj" className="lable"><span className="label-text"> DOJ *</span></label>
        <input type="date" onChange={handleInputChange} value={inputs.doj} name="doj" id="doj" className="input input-bordered" required />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col mb-3">
        <label htmlFor="address" className="lable"><span className="label-text"> Address *</span></label>
        <input onChange={handleInputChange} value={inputs.address} placeholder="Address" type="text" name="address" id="address" className="input input-bordered" required />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="city" className="lable"><span className="label-text"> City *</span></label>
        <input onChange={handleInputChange} value={inputs.city} placeholder="City" type="text" name="city" id="city" className="input input-bordered" required />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col mb-3">
        <label htmlFor="pin" className="lable"><span className="label-text"> Pin *</span></label>
        <input onChange={handleInputChange} value={inputs.pin} placeholder="Pin" type="text" name="pin" id="pin" className="input input-bordered" required />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="email" className="lable"><span className="label-text"> Email *</span></label>
        <input onChange={handleInputChange} value={inputs.email} placeholder="Email" type="email" name="email" id="email" className="input input-bordered" required />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col mb-3">
        <label htmlFor="mobile" className="lable"><span className="label-text"> Mobile *</span></label>
        <input onChange={handleInputChange} value={inputs.mobile} placeholder="Mobile" type="tel" name="mobile" id="mobile" className="input input-bordered" required />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="aadhar" className="lable"><span className="label-text"> Aadhar *</span></label>
        <input onChange={handleInputChange} value={inputs.aadhar} placeholder="Aadhar" type="number" name="aadhar" id="aadhar" className="input input-bordered" required />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex flex-col mb-3">
        <label htmlFor="pan" className="lable"><span className="label-text"> Pan *</span></label>
        <input onChange={handleInputChange} value={inputs.pan} placeholder="Pan" type="text" name="pan" id="pan" className="input input-bordered" required />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="status" className="lable"><span className="label-text"> Status *</span></label>
        <select id="status" onChange={handleInputChange} value={inputs.status} name="status" className="input input-bordered" required>
          <option value="">Select Status</option>
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
      </div>
    </div>
    <div className="flex flex-col md:flex-row mb-2">
      <div className="flex-grow mb-2 md:mb-0 md:mr-2">
        <label htmlFor="extcode" className="lable"></label>
        <input onChange={handleInputChange} value={inputs.extcode} placeholder="Extcode" type="text" name="extcode" id="extcode" className="input input-bordered" required />
      </div>
    </div>

    <div className="form-control ">
    <button className="btn btn-outline btn-primary">Submit</button>
    <button className="btn btn-outline btn-error" onClick={()=>navigate("/MemberView")}>Cancel</button>
            </div>
  </form> */}




      {/* <div className="max-w-md mx-auto rounded-md p-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Employee Information</h2>

      <form>

        
        <div className="grid grid-cols-3 gap-4 mb-1">
          
          <div className="mb-2 md:w-full md:mr-4">
    <label className="label">
      <span className="label-text">Last Name</span>
    </label>
    <input type="text" placeholder="Last Name" className="input input-bordered w-full" required />
  </div>
          
          <div className="mb-2 md:w-full md:mr-4">
    <label className="label">
      <span className="label-text">First Name</span>
    </label>
    <input type="text" placeholder="First Name" className="input input-bordered w-full" required />
  </div>
          
          <div className="mb-1 md:w-full md:mr-4">
    <label className="label">
      <span className="label-text">Middle Name</span>
    </label>
    <input type="text" placeholder="Middle Name" className="input input-bordered w-full" required />
  </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4 mb-1">
          
          <div className="mb-2 md:w-full md:mr-4"> 
                <label className="label">
                <span className="label-text">DOB</span>
                </label>
                <input type="date" placeholder="DOB" className="input input-bordered" required />
            </div>
          
           <div className="mb-2 md:w-full md:mr-4"> 
                <label className="label">
                <span className="label-text">DOJ</span>
                </label>
                <input type="date" placeholder="DOJ" className="input input-bordered" required />
                
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          
          <div className="mb-1 md:w-full md:mr-4"> 
                <label className="label">
                <span className="label-text">Address</span>
                </label>
                <input type="text" placeholder="Address" className="input input-bordered" required />
            </div>
      
        </div>
        <div className="grid grid-cols-2 gap-4 mb-1">
          
          <div className=""> 
                <label className="label">
                <span className="label-text">City</span>
                </label>
                <input type="text" placeholder="City" className="input input-bordered" required />
            </div>
          
           <div className=""> 
                <label className="label">
                <span className="label-text">Pin</span>
                </label>
                <input type="number" placeholder="Pin" className="input input-bordered" required />
                
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-1">
          
          <div className=""> 
                <label className="label">
                <span className="label-text">Email</span>
                </label>
                <input type="eamil" placeholder="Email" className="input input-bordered" required />
            </div>
          
           <div className=""> 
                <label className="label">
                <span className="label-text">Mobile</span>
                </label>
                <input type="number" placeholder="Mobile" className="input input-bordered" required />
                
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-1">
          
          <div className=""> 
                <label className="label">
                <span className="label-text">Email</span>
                </label>
                <input type="eamil" placeholder="Email" className="input input-bordered" required />
            </div>
          
           <div className=""> 
                <label className="label">
                <span className="label-text">Mobile</span>
                </label>
                <input type="number" placeholder="Mobile" className="input input-bordered" required />
                
            </div>
        </div>
   

        
         
        <div className="flex justify-end">
          <button type="submit" className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Submit
          </button>
        </div>

      </form>
    </div> */}


      {/* <div className="hero min-h-screen bg-base-200 ">
    <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-auto shadow-2xl bg-base-100">
        <form className="card-body">
        <div className="flex flex-col md:flex-row">
  <div className="mb-2 md:w-full md:mr-4">
    <label className="label">
      <span className="label-text">Last Name</span>
    </label>
    <input type="text" placeholder="Last Name" className="input input-bordered w-full" required />
  </div>
  <div className="mb-2 md:w-full md:mr-4">
    <label className="label">
      <span className="label-text">First Name</span>
    </label>
    <input type="text" placeholder="First Name" className="input input-bordered w-full" required />
  </div>
  <div className="mb-2 md:w-full md:mr-4">
    <label className="label">
      <span className="label-text">Middle Name</span>
    </label>
    <input type="text" placeholder="Middle Name" className="input input-bordered w-full" required />
  </div>
</div>

            <div className="flex flex-col md:flex-row justify-center"> 
            <div className="mb-2 md:w-full md:mr-4"> 
                <label className="label">
                <span className="label-text">DOB</span>
                </label>
                <input type="date" placeholder="DOB" className="input input-bordered" required />
            </div>
            <div className="mb-2 md:w-full md:mr-4"> 
                <label className="label">
                <span className="label-text">DOJ</span>
                </label>
                <input type="date" placeholder="DOJ" className="input input-bordered" required />
                
            </div>
            </div>
            <div className="flex flex-col md:flex-row"> 
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Address</span>
                </label>
                <input type="text" placeholder="address" className="input input-bordered" required />
            </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center"> 
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">City</span>
                </label>
                <input type="text" placeholder="City" className="input input-bordered" required />
            </div>
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Pin</span>
                </label>
                <input type="number" placeholder="Pin" className="input input-bordered" required />
                
            </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center"> 
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered" required />
            </div>
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Mobile</span>
                </label>
                <input type="number" placeholder="Mobile" className="input input-bordered" required />
                
            </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center"> 
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Aadhar</span>
                </label>
                <input type="number" placeholder="Aadhar" className="input input-bordered" required />
            </div>
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Pan</span>
                </label>
                <input type="text" placeholder="Pan" className="input input-bordered" required />
                
            </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center"> 
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Status</span>
                </label>
                <select
                className="input input-bordered"
                id="status"
                name="status"
                
                >
                <option value="">Select Status</option>
                <option value="A">Active</option>
                <option value="I">Inactive</option>
                </select>
            
            </div>
            <div className="mb-2 md:mr-4"> 
                <label className="label">
                <span className="label-text">Ext Code</span>
                </label>
                <input type="text" placeholder="Ext Code" className="input input-bordered" required />
                
            </div>
            </div>
            <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
            </div>
        </form>
        </div>
    </div>
    </div> */}

      {/* <label classNameName="input input-bordered flex items-center gap-2">
  <input type="text" classNameName="grow" placeholder="Search" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" classNameName="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
</label>
<label classNameName="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" classNameName="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
  <input type="text" classNameName="grow" placeholder="Email" />
</label>
<label classNameName="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" classNameName="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
  <input type="text" classNameName="grow" placeholder="Username" />
</label>
<label classNameName="input input-bordered flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" classNameName="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
  <input type="password" classNameName="grow" value="password" />
</label> */}
    </>
  )
}

export default MemberForm;
