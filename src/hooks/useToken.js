import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useToken = cUser => {
    const [token, setToken] = useState('');
    const [user] = useAuthState(auth);

    useEffect(() => {
        const email = cUser?.user?.email;
        const currentUser = { email: email, name: user?.displayName };
        if (email) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(user);
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }

    }, [cUser, user?.displayName, user]);
    return [token];
}

export default useToken;