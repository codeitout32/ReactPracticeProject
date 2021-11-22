import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'



const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [passError, setPerror] = useState(false)
    const [accept, setAccept] = useState(false)
    const [input, setInput] = useState({
        username: '',
        email: '',
        pass: '',
        pass2: '',
        accept: false
    })


    useEffect(() => {
        checkPass();
    }, [password,password2])



    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // const {target:{name,type,value,checked}} = event;
        // const {username:name,type,value}
        console.log(name +"  "+ value);
        

        if(name == 'username') setUsername(value);
        if(name == 'email') setEmail(value);
        if(name == 'pass') setPassword(value);
        if(name == 'pass2') setPassword2(value);
        if(name == 'accept') setAccept(value);
        // if(type == 'checkbox'){ setAccept(checked)
        //     setInput((input2) => ({...input2,[name]:checked}))
        // }
        // else{
        //     setInput((input2) => ({...input2,[name]:value}))

        //     setTimeout(()=>checkPass(), 20);
        // }
    }




    const checkPass = () => {
        if (password != password2) setPerror(true);
        else setPerror(false);
        console.log(passError)
    }



    const senData = async (user) => {
        const rawpost = await fetch('http://localhost:5001/users/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await rawpost.json();
        console.log(data);

    }

    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(passError) return;

        const userData = {username,email,password};
        console.log(userData);

        senData(userData);
    }

  

    return (
        <section>
            <div className="">
            <form className="form-signin" onSubmit={handleSubmit}>       
            <h2 className="form-signin-heading">Register</h2>

            <input type="text" className="form-control" name="username" placeholder="Username" required="" autofocus="" 
            value={username}  onChange={handleChange} />

            <input type="email" className="form-control" name="email" placeholder="Email Address" required="" autofocus="" 
            value={email}  onChange={handleChange} />

            <input type="password" className="form-control" name="pass"  placeholder="Password" required=""  
            value={password}  onChange={handleChange} onKeyUp={handleChange} style={{marginBottom: 0}} />      

            <input type="password" className="form-control" name="pass2"  placeholder="Confirm Password" required=""
            value={password2}  onChange={handleChange} />  

            {passError && <p className='alert-danger'>Password does not match!</p>} 

            <label className="checkbox">
                <input type="checkbox" value="remember-me" id="rememberMe" checked={accept} name="accept" onChange={handleChange} required /> I Accept Terms and Conditions
            </label>
            <button onClick={checkPass}>Pass Check</button>
            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button> 
            <Link to="/" className="forgpass">Login</Link>  
            
            </form>
            
            </div>
        </section>
    )
}

export default Register
