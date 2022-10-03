import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function SignUp() {

    Auth.configure( {
        userPoolId: 'ap-south-1_AVaN4EgAd',
        userPoolWebClientId: '4toogc6pd49ml9i6704ii6an7m',
        region: 'ap-south-1'
    });

    const router = useRouter();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [popup, setPopup] = useState<boolean>(false);
    const [confirmationCode, setConfirmationCode] = useState<string>('');
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);

    const resumeSignUp = () => {
        
        Auth.confirmSignUp(username, confirmationCode).then(result => {
            setPopup(false);
            router.push('/login');
        }).catch(err => console.error(err));
    }

    const signUp = () => {

        //if both the passwords match
        if (password == confirmPassword) {

            //signup is performed
            Auth.signUp({username, password, attributes: {email}}).then((result: ISignUpResult) => {

                //1st time sign up experience, the confirmation code is to be verified
                if (!result.userConfirmed) {
                    // to display pop-up and get confirm code from email
                    setPopup(true);
                } else {
                    // if user is confirmed then 
                    setPopup(false);
                    router.push('/login');
                }
            });
        } else {
            setPasswordMismatch(true);
        }

    return (
        <div>

            <Popup open={passwordMismatch} onClose={() => setPasswordMismatch(false)}>
                <div>Password and Confirm password do not match. Kindly re-enter</div>
            </Popup>

            <Popup open={popup} onClose={() => setPopup(false)}>
                <div>Confirmation Code</div>
                <div>
                    <input type={'text'} value={confirmationCode} onChange={e => setConfirmationCode(e.target.value)}/>
                </div>
                <button onClick={() => resumeSignUp()}></button>
            </Popup>

            <div>
                <label>Username : </label>
                <input type={'text'} onChange={e => setUsername(e.target.value)} placeholder={'Enter username'} value={username} />
            </div>
            <div>
                <label>Email : </label>
                <input type={'email'} onChange={e => setEmail(e.target.value)} placeholder={'Enter username'} value={email} />
            </div>
            <div>
                <label>Password : </label>
                <input type={'password'} onChange={e => setPassword(e.target.value)} placeholder={'Enter password'} value={password} />
            </div>
            <div>
                <label>Confirm Password: </label>
                <input type={'password'} onChange={e => setConfirmPassword(e.target.value)} placeholder={'Cofirm password'} value={confirmPassword} />
            </div>
            <div>
                <button onClick={() => signUp()} >Sign Up</button>
            </div>
        </div>
    );
}

export default SignUp;

