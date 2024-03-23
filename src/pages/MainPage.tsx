import { NavLink, Outlet } from "react-router-dom"

export default function MainPage () {
    return <>

        <nav style={{width: '100vw'}} className="navbar navbar-expand-lg navbar-dark bg-info">
            <div className="containter-fluid">
                <ul className="navbar-nav">
                <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/main/fruit">Fruit</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/main/vegetables">Vegetables</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    
        <body>
        <h1></h1>
        </body>

        
        <Outlet></Outlet>
    </>
}