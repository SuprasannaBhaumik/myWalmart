import {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';
import router from 'next/router';

function index() {

    Auth.configure({

    });

    const [user, setUser] = useState(null);

    useEffect(()=> {
        setUser(JSON.parse(window.sessionStorage.getItem('user')));
    }, []);


    const logout = () => {
        Auth.signOut()
            .then( () => {
                window.sessionStorage.removeItem('user');
                router.push('/login');
            })
            .catch(err => console.error(err));
    }
    
    
    return (
        <>
            {!user && <div><a href='/login'>Please login</a></div>}
            {user && 
                <div>
                    <div>{`Username: ${user?.username}`}</div>
                    <div>{`Email: ${user?.attributes?.email}`}</div>
                    <div><button onClick={ () => logout()}>Logout</button></div>
                </div>
            }
        </>
    );

}

export default index;