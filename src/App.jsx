
import './App.css'
import MemberView from './componentes/Master/Member/MemberView'
import Navbar from './componentes/Navbar'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './componentes/Home/Home';
import MemberForm from './componentes/Master/Member/MemberForm';
import GroupView from './componentes/Master/Group/GroupView';
import AccountView from './componentes/Master/Account/AccountView';
import { DataProvider } from './context/memberDatacontext';
import { GroupDataProvider } from './context/GroupContext';
import { AccountDataProvider } from './context/AccountContex';
import Footer from './componentes/Footer/Footer';
import ApplicationView from './componentes/Transaction/Application/ApplicationView';
import ApplicationForm from './componentes/Transaction/Application/ApplicationForm';
import SalaryUpload from './componentes/Transaction/Salary Upload/SalaryUpload';
import VoucherEntryView from './componentes/Transaction/VoucherEntry/VoucherEntryView';
import VoucherEntry from './componentes/Transaction/VoucherEntry/VoucherEntry';
import Signup from './componentes/Auth/Signup';
import Login from './componentes/Auth/Login';

import Logout from './componentes/Auth/Logout';
import { useAuth } from './context/AuthContext';
import {Toaster} from "sonner";
import Ledger from './componentes/Reports/Ledger/Ledger';
import Profile from './componentes/Auth/Profile';
function App() {
  const { isAuthenticated } = useAuth();
 console.log("the testing phase");
 
   return (
    <>
      <BrowserRouter>

        <DataProvider>
          <GroupDataProvider>
            <AccountDataProvider>

              {/* <div className='min-h-screen'> */}
                <Navbar />
                {!isAuthenticated && <Navigate to="/Login"   /> }
                 <Toaster position='top-right' richColors/>
                <Routes>

                  <Route path="/" element={<Home />} />
                  <Route path="/MemberView" element={<MemberView />} />
                  <Route path="/MemberForm" element={<MemberForm />} />
                  <Route path='/GroupView' element={<GroupView />} />
                  <Route path='/AccountView' element={<AccountView />} />
                  <Route path='/ApplicationView' element={<ApplicationView />} />
                  <Route path='/ApplicationForm' element={<ApplicationForm />} />
                  <Route path='/SalaryUpload' element={<SalaryUpload />} />
                  <Route path='/VoucherEntryView' element={<VoucherEntryView />} />
                  <Route path='/VoucherEntry' element={<VoucherEntry />} />


                  <Route path='/Signup' element={<Signup />} />
                  <Route path='/Login' element={<Login />} />
                  <Route path='/Logout' element={<Logout />} />
                  <Route path='/Ledger' element={<Ledger />} />
                  <Route path='/Profile' element={<Profile/>}/>
                </Routes>
                <Footer />
              {/* </div> */}

            </AccountDataProvider>
          </GroupDataProvider>
        </DataProvider>
      </BrowserRouter>







    </>
  )
}

export default App
