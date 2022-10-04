import {useEffect, useState} from 'react';
import {Auth} from 'aws-amplify';

function Profile() {

    Auth.configure( {
        userPoolId: 'ap-south-1_AVaN4EgAd',
        userPoolWebClientId: '4toogc6pd49ml9i6704ii6an7m',
        region: 'ap-south-1'
    });

    const [user, setUser] = useState(null);

    useEffect(()=> {
        setUser(JSON.parse(window.sessionStorage.getItem('user')));
    }, []);
    
    return (
        <>
            {user && 
                <div>
                    <div>{`Username: ${user?.username}`}</div>
                    <div>{`Email: ${user?.attributes?.email}`}</div>
                </div>
            }
        </>
    );

}

export default Profile;