import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);

    const handleGoogle = () => {
        googleSignIn()
        .then(result => {
            const user = result.user;
            console.log(user)
        })
        .catch(error => console.log(error))
    }
  return (
    <div>
      <div className="divider">OR</div>
      <button onClick={handleGoogle} className="btn btn-circle btn-outline">G</button>
    </div>
  );
};

export default SocialLogin;
