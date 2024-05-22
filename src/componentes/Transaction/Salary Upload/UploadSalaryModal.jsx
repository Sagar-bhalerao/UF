import React from 'react'

const UploadSalaryModal = ({  handleMonthChange, year, setYear, handleFileChange, handleUpload, uploadProgress }) => {
    return (

<>
        <dialog id="SalaryUpload" className="modal">
            <div className="modal-box">

                {/* <div className="card w-120  bg-base-100 shadow-xl"> */}
                    <figure><img src="https://www.shutterstock.com/image-vector/3d-bank-account-book-passbook-600nw-2168035485.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className='flex justify-center font-bold'>Upload Salary</h2>
                        <form onSubmit={handleUpload} className="">
                            <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">

                                <div>
                                    <label className="label ">
                                        <span className="label-text  font-bold">Month *</span>
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        onChange={(e) => handleMonthChange(e.target.value)}

                                        className="input input-bordered input-md w-full max-w-xs"
                                    >
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div>

                                    <label className="label">
                                        <span className="label-text font-bold">Year *</span>
                                    </label>

                                    <input type="number" onChange={(e) => {
                                        setYear(e.target.value);
                                    }} placeholder="Enter Year .." className="input input-bordered input-md w-full max-w-xs" />
                                </div>

                            </div>
                            <div className='mt-5'>
                                <input type="file" onChange={handleFileChange} className="file-input file-input-bordered file-input-primary w-full" />
                            </div>
                            
                            <progress className="progress progress-primary mt-2 w-80" value={uploadProgress} min="0" max="100"></progress>
                                <span className="text-xs  ml-1">{uploadProgress}%</span>


                            <p className='flex justify-center font-semibold text-red-600 mb-4 mt-3'>The file must be in CSV format with columns labeled as 'ext_name', 'month', 'year', and 'amount' respectively.</p>
                            <button onClick={() => document.getElementById("SalaryUpload").close()} type='button' className='btn btn-error sm:btn-sm md:btn-md float-end ml-3 '>Cancel</button>
                            <button
                                // onClick={() => document.getElementById('SalaryUpload').close()}
                                type="submit"
                                className="btn btn-normal sm:btn-sm md:btn-md btn-primary float-end "
                            >

                                Upload
                            </button>
                        </form>
                    </div>
                

            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

</>
    )
}

export default UploadSalaryModal;
