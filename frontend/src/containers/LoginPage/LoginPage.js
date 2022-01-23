import Header from "../../components/Header/Header";
import './LoginPage.css'
import $ from 'jquery'

function LoginPage() {

    function doLogin(e){
        const validateEmail = (email) => {
            return String(email)
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
        };
        const email = document.getElementById('Email').value
        const password = document.getElementById('Password').value
        if(password.length != 0 && validateEmail(email)){
            $.ajax({
                type: 'POST',
                url: "http://localhost:3000/login",
                data: {
                    email: email,
                    password: password
                },
                crossDomain:true,
                dataType: "text",
                success: function(resultData) { 
                    var token = resultData.split('"')[3]
                    window.localStorage.setItem('token', token)
                    window.location.href = "/"
                },
                error: function(err){
                    alert('Invalid Credentials!')
                }
            });
        }
        else alert('Invalid Credentials!')
    }
    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="form-title mx-auto">Login Form</h1>
                <form className="login-form mt-5 mx-auto">
                    <div className="form-group">
                        <label for="Email">Email address</label>
                        <input type="email" className="form-control" id="Email" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="password" className="form-control" name="password" id="Password" placeholder="Password" />
                    </div>
                    <div className="btn btn-primary" onClick={doLogin}>Submit</div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;