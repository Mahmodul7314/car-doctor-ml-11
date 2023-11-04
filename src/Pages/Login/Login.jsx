import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../assets/assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';


const Login = () => {
  const {signIn} = useContext(AuthContext)
  const location = useLocation();
  // console.log(location)
  const navigate = useNavigate();

   const handleLogin = event =>{
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form .password.value;


    signIn (email, password)
    .then (result =>{
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const user ={email};
  
    //get access token
    axios.post('http://localhost:5000/jwt',user,{
      withCredentials:true})
    .then(res =>{
      console.log(res.data)
      if(res.data.success){
          navigate(location?.state ? location?.state: "/")
      }

       })
    })
    .catch(error => console.log(error))

    }

    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className=" w-1/2 mr-6">
           <img src={login} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
              <h1 className="text-4xl font-bold text-center">Login now!</h1>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password"name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className='btn btn-primary' type='submit' value="Login"/>
             
              </div>
            </form>
            <p className='py-4 text-center'>New to Here Please <Link className='font-bold  text-orange-500'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    );
};

export default Login;