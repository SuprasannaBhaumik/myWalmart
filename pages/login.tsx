import { useState } from 'react';
import {Auth} from 'aws-amplify';
import {useRouter} from 'next/router';
import { CognitoUser } from 'amazon-cognito-identity-js';

function LoginPage() {

    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = () => {


        Auth.signIn(username, password).then( async (result: CognitoUser) => {

            //await result.authenticateUser

            router.push('/home');

        });

    }

    const forgotPassword = () => {

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
        </div>
    );
}

export default LoginPage;

