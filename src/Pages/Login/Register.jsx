import { Link } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const Register = () => {
    const {createUser, logOut} = useContext(AuthContext);

    const handleRegister = (event) => {
        event.preventDefault();
        const form  = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user)
            logOut()
            form.reset()
             
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Register Successfully',
            showConfirmButton: false,
            timer: 1500
            })

        })
        .catch(error => {
            console.log(error)
        })
    
      }

    return (
<div className="hero min-h-screen bg-base-100">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center w-1/2 mr-12">
      <img src={img} alt="" />
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
    <h1 className="text-3xl text-center font-bold">Sign Up</h1>
      <form onSubmit={handleRegister}>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="name" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type="password" name="password" placeholder="confirm password" className="input input-bordered" />
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Register" />
        </div>
        <div className="py-3 text-center">
        <p>Already have an account?<Link className="font-bold text-orange-600" to="/login">Login</Link></p>
        <SocialLogin></SocialLogin>
        </div>
      </form>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;