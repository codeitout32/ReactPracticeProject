import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const baseurl = "https://api.m3o.com/v1/user/Create"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [passError, setPerror] = useState(false)
    const [reqError, setRequred] = useState(false)
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

        try {
            console.log(user)
            const headers = {
                "Content-type": 'application/json' ,
                "Authorization": `Bearer ${process.env.REACT_APP_M3OTOKEN}`
              };

              const res = await axios.post('https://api.m3o.com/v1/user/Create', user, {headers});

            // const res = await axios({ method: "post", headers, url: "https://api.m3o.com/v1/user/Create",
            // data: user});
    
              console.log(res.data);
            return res.data;

        } 
        catch (error) {
            console.log(error.response.data);
        }      
    }


    // (
    //     '/bezkoder.com/tutorials',
    //     {
    //       title: title,
    //       description: description,
    //     },
    //     {
    //       headers: {
    //         "x-access-token": "token-value",
    //       },
    //     }
    //   );

    const handleSubmit =async (e) => {
        e.preventDefault();

        if(!username || (!email || !password)) {
            setRequred(true)
            return;}
        if(passError) return;
        
        setRequred(false)
        const userData = {username,email,password};
        console.log(userData);
        
        const final = await senData(userData);
        console.log(final);
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

            {reqError && <p className='alert-danger'>Input All fields!</p>} 
            {passError && <p className='alert-danger'>Password does not match!</p>} 

            <label className="checkbox">
                <input type="checkbox" value="remember-me" id="rememberMe" checked={accept} name="accept" onChange={handleChange} required /> I Accept Terms and Conditions
            </label>
            {/* <button onClick={checkPass}>Pass Check</button> */}
            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button> 
            <Link to="/" className="forgpass">Login</Link>  
            
            </form>
            
            </div>
        </section>
    )
}

export default Register
