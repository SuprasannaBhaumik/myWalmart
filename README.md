# myWalmart
Custom e-commerce store


- User signup and signin is performed using AWS Cognito user pool
- **aws-amplify** library is used to perform the: 
    -  signup (Auth.signUp), 
    -  confirm with confirmation code to complete the sign up process (Auth.confirmSignUp and Auth.resendSignUp).
    -  login (Auth.login)
    -  logout (Auth.logout)

- next js is used for routing, api management
    - pages folder contain routes, e.g.
        -  login.tsx handles /login, 
        -  signUp.tsx handles /signUp
    - It can handle custom routes via next/router programatically,      router.push('/login')
    - api folder is used for APIs.


