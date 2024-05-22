import React,{useState} from 'react'
import { useData } from '../../../context/memberDatacontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'sonner';

const ApplicationForm = () => {
    const { data } = useData();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMemberName,setSelectedMemberName] = useState('');
    const [selectedMemId,setSelectedMemId] = useState('');
    const [inputs,setInputs] =  useState({
        appdate: "",
        member: "",
        relation: "",
        fromdate: "",
        todate: "",
        disease: "",
        amount: "",
        ext_name: "",
        ext_amount: "",
        remark: "",
        
       });
    
       const handleMemData = (memId,memName)=>{
        // console.log(item);
        setSelectedMemId(memId);
        setSelectedMemberName(memName);
        document.getElementById('MemModal').close();

       }
     
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };


      const currentItems = data.filter((item) =>
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.external_code && item.external_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.dob && moment(item.dob).format("DD/MM/YYYY").includes(searchTerm)) ||
        (item.doj && moment(item.doj).format("DD/MM/YYYY").includes(searchTerm))
    )

       const handleSubmit = async(event) => {
        event.preventDefault();
        //  Prepare the body for the request
        let body = {
          app_no: null,
          app_date: inputs.appdate,
          mem_id: selectedMemId,
          relation: inputs.relation,
          from_date: inputs.fromdate,
          to_date: inputs.todate,
          disease: inputs.disease,
          amount: inputs.amount,
          ext_name: inputs.ext_name,
          ext_amount: inputs.ext_amount,
          remark: inputs.remark,
        };
        console.log(body);
        try {
          // Sending the request
          const response = await axios.post(
            "http://192.168.179.25:5002/application",
            body
          );
          if (response.status === 200) {
            toast.success("Appication Registered Successfully");
            
          }
          console.log("Server response:", response.data);
        //   toast.success("Data inserted Successfully!...");
          navigate("/ApplicationView");
        } catch (error) {
          console.log("Error:", error);
        }
        console.log(inputs);
      };
      


    return (
        <>
        <div className="flex justify-center mt-6">
            <div className="card w-full sm:max-w-md bg-base-100 shadow-xl ">
                <div className="card-body w-120  py-4 px-6">
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col mb-2">
                                <label htmlFor="appdate" className="lable  font-bold"><span className="label-text"> App Date *</span></label>
                                <input onChange={handleInputChange} value={inputs.appdate}  type="date" name='appdate'   id="appdate" className="input input-bordered input-md w-full" required />
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col mb-2">
                                <label htmlFor="member" className="lable font-bold"><span className="label-text"> Member *</span></label>
                                <input onClick={()=>document.getElementById('MemModal').showModal()} value={selectedMemberName} type='text'  className="input input-bordered join-item" placeholder=""  readOnly/>
                                
                            </div>
                            <div className="flex flex-col mb-1">
                                <label htmlFor="relation" className="lable  font-bold"><span className="label-text"> Relation *</span></label>
                                <select id="relation" onChange={handleInputChange} value={inputs.relation} name="relation" className="input input-bordered input-md w-full" required>
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
                                <input onChange={handleInputChange} value={inputs.fromdate}  type="date" name="fromdate" id="fromdate" className="input input-bordered input-md w-full" required />
                            </div>
                            <div className="flex flex-col mb-2">
                                <label htmlFor="todate" className="lable  font-bold"><span className="label-text"> To Date *</span></label>
                                <input onChange={handleInputChange} value={inputs.todate}  type="date" name="todate" id="todate" className="input input-bordered input-md w-full" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col mb-2">
                                <label htmlFor="disease" className="lable  font-bold"><span className="label-text"> Disease *</span></label>
                                <input placeholder="Disease" onChange={handleInputChange} value={inputs.disease} type="text" name="disease" id="disease" className="input input-bordered input-md w-full" required />
                            </div>
                            <div className="flex flex-col mb-2">
                                <label htmlFor="expences" className="lable  font-bold"><span className="label-text"> Expences *</span></label>
                                <input placeholder="Expences" onChange={handleInputChange} value={inputs.amount}  type="number" name="amount" id="expences" className="input input-bordered input-md w-full" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col mb-3">
                                <label htmlFor="anyhelp" className="lable  font-bold"><span className="label-text"> Any Help *</span></label>
                                <input placeholder="Any Help" onChange={handleInputChange} value={inputs.ext_name} type="text" name="ext_name" id="ext_name" className="input input-bordered input-md w-full" required />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="helpamount" className="lable  font-bold"><span className="label-text"> Help Amount *</span></label>
                                <input placeholder="Help Amount" onChange={handleInputChange} value={inputs.ext_amount} type="number" name="ext_amount" id="ext_amount" className="input input-bordered input-md w-full" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col mb-1">
                                <label htmlFor="remark" className="lable  font-bold"><span className="label-text"> Remark *</span></label>
                                <input placeholder="Reamark" onChange={handleInputChange} value={inputs.remark} type="" name="remark" id="remark" className="input input-bordered input-md w-full" required />
                            </div>
                            <div className="flex flex-col mb-3">
                                <label htmlFor="netamount" className="lable  font-bold"><span className="label-text">Net Amount *</span></label>
                                <input placeholder="Net Amount" onChange={handleInputChange} value={inputs.ext_amount} type="number" name="ext_amount" id="ext_amount " className="input input-bordered input-md w-full" required />
                            </div>
                        </div>

                        <div className="form-control">
                            <button  type='submit' className="btn btn-outline btn-primary">Submit</button>
                            <button type='reset' onClick={()=>navigate("/ApplicationView")} className="btn btn-outline btn-error mt-1" >Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>






        {/* Member Modal */}
        

<dialog id="MemModal" className="modal">
  <div className="modal-box">
  <div className="flex justify-center mb-4 w-120">
    
    <input onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search by Name" className="input input-bordered input-primary w-full md:w-auto max-w-xs" />
  </div>
  <h2 className='font-bold flex justify-center mb-2ś'>Select Member</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className='font-bold'>

                  <th>ID</th>
                  <th>Member Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              {currentItems.map((item, index) => (
                <tbody key={index}>

                  <tr className='hover'>
                    <th>{item.id}</th>
                    <td >{item.name}</td>
                    <td><button className="btn btn-sm btn-info" onClick={() => handleMemData(item.id,item.name)}>Select</button></td>
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

export default ApplicationForm;
