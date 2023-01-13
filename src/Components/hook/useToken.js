import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
const useToken = (user) => {
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = { email: email };
        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => {
                    if (res.status === 403 || res.status === 404) {
                        signOut(auth)
                        localStorage.removeItem("accessToken")
                        navigate('/')
                    }
                    return res.json()
                })
                .then(data => {
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken)
                    setToken(accessToken)
                })
        }
    }, [user])
    return [token];
}
export default useToken;