import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import { useTheme } from '../../context/ThemeContext';
const Login = () => {
  const [changePass, setPasschange] = useState(true);
  const changeIcon = changePass === true ? false : true;
  const navigate = useNavigate();
  // const { theme } = useTheme();
  const { storeToken, verifyRole, setId, getPersonData } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address").required("Required"),
      password: Yup.string()
        .required('Password is required')
      // .min(8, "Password must be at least 8 characters "),
    }),

    onSubmit: async (values) => {
      try {
        let body = {
          email: values.email,
          password: values.password,

        }
        const responce = await axios.post('http://192.168.179.25:5002/log-in', body);
        if (responce.status === 200) {
          getPersonData(responce.data.firstname, responce.data.lastname);
          storeToken(responce.data.token, responce.data.role, responce.data.theme);
          verifyRole(responce.data.role);
          setId(responce.data.userId)
          toast.success(`Log in Successfully <br> Welcome back ${responce.data.firstname.toUpperCase()} !`);
          navigate("/MemberView")
        }
        else {
          toast.error(responce.data.message)

        }

      } catch (error) {
        toast.error("Error occured in fetching data", error);

      }


    }

  })


  return (
    <div className="hero mt-10 ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h2 className='flex justify-center mt-5 text-xl font-bold'>Login to the UF</h2>
          <form onSubmit={formik.handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-bold">Email *</span>
              </label>
              <input onChange={(e) => { formik.handleChange(e); formik.handleBlur(e) }} value={formik.values.email} name='email' type="email" placeholder="email" className="input input-bordered" required />
              {formik.touched.email && formik.errors.email ? (<div className='text-sm text-red-600  flex justify-center'>{formik.errors.email}</div>) : null}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-lg font-bold">Password *</span>
              </label>
              <input onChange={(e) => { formik.handleChange(e); formik.handleBlur(e) }} value={formik.values.password} name='password' type={changePass ? "password" : "text"} placeholder="password" className="input input-bordered" required />
              <span className='absolute right-2 top-14 py-1' onClick={() => setPasschange(changeIcon)}  > {changeIcon ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}</span>
              {formik.touched.password && formik.errors.password ? (<div className='text-sm text-red-600 flex justify-center'>{formik.errors.password}</div>) : null}
              <div className='flex justify-around mt-3'>
                <label className="label ">
                  <a href="#" className="label-text-alt link link-hover text-sm ">Forgot password?</a>
                </label>
                <label className="label flex justify-end">
                  <Link to="/Signup" className="label-text-alt link link-hover text-sm">Don't have an account? </Link>
                </label>
              </div>

            </div>
            <div className="form-control mt-5">
              <button type='submit' className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
