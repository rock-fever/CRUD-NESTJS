import{React, Component} from 'react'

class Header extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var LoggedIn = false
        if(localStorage.getItem('token') != null) LoggedIn = true;
        if(LoggedIn == false)
            document.querySelector('.logout-btn').style.display = 'none';
    }
    render(){
        function logout(){
            localStorage.clear()
            window.location.href = "http://localhost:3001/login"
        }
        return (
            <>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="/">Assignment</a>
                    <button class="logout-btn btn btn-outline-danger ml-auto my-2 my-sm-0" onClick={logout} type="submit">Logout</button>
                </nav>
            </>
        )
    }
}
export default Header