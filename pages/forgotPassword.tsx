import {useState} from 'react';
import {Auth} from 'aws-amplify';
import router from 'next/router';
import Popup from 'reactjs-popup';

export default function forgotPassword() {

    Auth.configure( {
        userPoolId: 'ap-south-1_AVaN4EgAd',
        userPoolWebClientId: '4toogc6pd49ml9i6704ii6an7m',
        region: 'ap-south-1'
    });

    const [username, setUsername] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [codePopup, setCodePopup] = useState<boolean>(false);


    const forgotPassword = () => {

        Auth.forgotPassword(username)
            .then( (result: any) => {
                setCodePopup(true);
            } )
            .catch(err => console.error(err))

     }

    const resumeForgotPassword = () => {
        Auth.forgotPasswordSubmit(username, code, newPassword)
            .then( (result: string) => {
                setCodePopup(false);
                console.log('password reset has been done. Please proceed to login')
                //router.push('/login');
            })
            .catch(err => console.error(err));

    } 


    return (

        <div>

            <Popup open={codePopup} onClose={() => setCodePopup(false)} >
                <div>
                    Please enter the code here:
                </div>
                <div>
                    <input 
                        type={'text'} 
                        value={code} 
                        onChange={e => setCode(e.target.value)} 
                    />
                </div>
                <div>
                    <input 
                        type={'password'} 
                        value={newPassword} 
                        onChange={e => setNewPassword(e.target.value)} 
                    />
                </div>
                <button onClick={() => resumeForgotPassword() }>Submit Passord</button>
            </Popup>


            <div>
                <span>
                    <label>Please provide the username : </label>
                </span>
                <span>
                    <input 
                        type={'text'} 
                        value={username} 
                        onChange={ e => setUsername(e.target.value)}
                    />
                </span>
                <div>
                    <button onClick={ () => forgotPassword()}>Reset Password</button>
                </div>
            </div>


        </div>

    );
}