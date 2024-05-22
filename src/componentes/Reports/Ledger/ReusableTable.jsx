import React from 'react'

const ReusableTable = ({ data, selectedLedger, moment, tableData }) => {
    // Function to convert table data to CSV
    const convertToCSV = () => {
        // Prepare CSV content
        const csvContent = [
            // Add CSV header row
            `${selectedLedger} Name,Voucher type,Voucher No,Voucher Date,Voucher Amount,Balance Type`,
            // Add CSV data rows
            ...data.map(item =>
                `${selectedLedger === "Account" ? item.name : item.group_name},${item.voucher_type},${item.voucher_no},${moment(item.voucher_date).format("DD/MM/YYYY")},${item.voucher_amount},${item.balance_type}`
            )
        ].join('\n');

        // Create Blob from CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

        // Trigger file download
        saveAs(blob, `${selectedLedger}_data.csv`);
    };
    const sortedItems = data.sort((a, b) => parseInt(a.voucher_no) - parseInt(b.voucher_no));
    return (
        <>
            <div className='container shadow-xl rounded-xl   '>
                <div className="overflow-x-auto py-2 ">
                    <table className="table">
                        {/* head */}
                        <thead className=' font-extrabold text-lg  '>
                            <tr>
                                <th> Name</th>
                                <th>Voucher type</th>
                                <th>Voucher No</th>
                                <th>Voucher Date</th>
                                <th>Voucher Amount</th>
                                <th>Balance Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{selectedLedger === "Account" ? item.name : item.group_name}</td>
                                    <td>{item.voucher_type}</td>
                                    <td>{parseInt(item.voucher_no)}</td>
                                    <td>{moment(item.voucher_date).format("DD/MM/YYYY")}</td>
                                    <td>{item.voucher_amount}</td>
                                    <td>{item.balance_type}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

            <div className="card-actions justify-end mt-2">
                <button onClick={convertToCSV} className="btn btn-success">Export To CSV</button>
            </div>
        </>
    )
}

export default ReusableTable;
