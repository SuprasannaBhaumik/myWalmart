import {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';
import router from 'next/router';

function index() {

    Auth.configure( {
        userPoolId: 'ap-south-1_AVaN4EgAd',
        userPoolWebClientId: '4toogc6pd49ml9i6704ii6an7m',
        region: 'ap-south-1'
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
                    <div>Welcome &nbsp;
                        <a href='/profile' >{user?.username}</a>
                    </div>
                    <div><button onClick={ () => logout()}>Logout</button></div>

                </div>
            }
        </>
    );

}

export default index;