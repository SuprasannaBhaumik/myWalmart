import { useState } from 'react';
import {Auth} from 'aws-amplify';
import {useRouter} from 'next/router';
import { CognitoUser } from 'amazon-cognito-identity-js';

function LoginPage() {

    Auth.configure( {
        userPoolId: 'ap-south-1_AVaN4EgAd',
        userPoolWebClientId: '4toogc6pd49ml9i6704ii6an7m',
        region: 'ap-south-1'
    });

    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const signUp = () => {

        router.push('/signUp');

    }

    const login = () => {

        Auth.signIn(username, password).then( async (result: any) => {

            const user: CognitoUser = await Auth.currentAuthenticatedUser();
            console.log(user);

            window.sessionStorage.setItem("user", JSON.stringify(user));

            //push the user to a redux store
            //index page has to pull the data from the redux store
            router.push('/');

        }).catch( err => console.error(err));

    }

    const forgotPassword = () => {
        router.push('/forgotPassword');
    }


    return (
        <div>
            <div>
                <label>Username : </label>
                <input type={'text'} onChange={e => setUsername(e.target.value)} placeholder={'Enter username'} value={username} />
            </div>
           
            <div>
                <label>Password : </label>
                <input type={'password'} onChange={e => setPassword(e.target.value)} placeholder={'Enter password'} value={password} />
            </div>
            
            <div>
                <button onClick={() => login()} >Login</button>
            </div>

            <div>
                <button onClick={() => forgotPassword()} >Forgot Password</button>
            </div>

            <div>
                <button onClick={() => signUp()} >Sign Up</button>
            </div>
        </div>
    );
}

export default LoginPage;

