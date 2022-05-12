
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile }   from "firebase/auth"
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router";

const app = initializeApp(firebaseConfig);

function Login() {
  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new GoogleAuthProvider();

  const auth = getAuth();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  ///console.log(from);
 
  const handleSignIn = () => {
    signInWithPopup(auth,googleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(signedInUser);
      setLoggedInUser(signedInUser);
      navigate(from, { replace: true });
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  const handleFbSignIn = () => {
    signInWithPopup(auth,fbProvider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log('fb user after sign in', user);
      navigate(from, { replace: true });
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      setUser(signedOutUser);
      
    }).catch(err => {
      // An error happened.
    });
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber =  /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(auth,user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name);
        varifyEmail();
      })
      .catch( error => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(auth,user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo);
        navigate(from, { replace: true });
        console.log('sign in user info', res.user);
      })
      .catch(function(error) {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    e.preventDefault();
  }

  const updateUserName = name =>{


    updateProfile(auth.currentUser,{
      displayName: name
    }).then(function() {
      console.log('user name updated successfully!!!')
    }).catch(function(error) {
      console.log(error)
    });
  }

  const varifyEmail=()=>{
    ///console.log("Email sent");
   const auth = getAuth();
    sendEmailVerification(auth.currentUser)
     .then(() => {
    // Email verification sent!
    // ...
  });
  }

  return (
    <div style={{textAlign: "center"}}>
      { user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={handleFbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}!</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
    </div>
  );
}

export default Login;