import React from 'react'
import { Link } from 'react-router-dom'

const Forget = () => {
    return (
        <section>
            <div className="">
            <form className="form-signin">       
            <h2 className="form-signin-heading">Enter Your Email</h2>
            <p>Email will be sent to ur mail address with reset link</p>
            <input type="email" className="form-control" placeholder="abc@def.com" required="" autofocus="" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
            <Link to="/" className="forgpass">Login</Link>
            
            </form>
            
            </div>
        </section>
    )
}

export default Forget
