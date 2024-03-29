import React, { Component } from 'react'
import UserService from '../services/UserService'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                users: []
        }
        this.addUser = this.addUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    deleteUser(id){
        UserService.deleteUser(id).then( res => {
            this.setState({users: this.state.users.filter(user => user.id !== id)});
        });
    }
    viewUser(user){
        // this.props.history.push(`/view-user/${id}`);
        this.props.navigate("/userDetails", { state: { user: user } });
    }

    componentDidMount(){
        UserService.getUsers().then((res) => {
            this.setState({ users: res.data});
        });
    }

	addUser() {
		this.props.navigate("/newUserForm");
		// this.props.history.push('/add-user/_add');
	}
    
    render() {
        return (
            <div>
                 <h2 className="text-center">Users List</h2>
                 <div className = "row">
					<button className="btn btn-primary" onClick={this.addUser}>
					{" "}
					Add User
					</button></div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> User Name</th>
                                    <th> Password</th>
                                    <th> Email Address</th>
                                    <th> User Type</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.users.map(
                                        user => 
                                        <tr key = {user.id}>
                                             <td> {user.userName} </td>   
                                             <td> {user.userPW}</td>
                                             <td> {user.email}</td>
                                             <td> {user.userType}</td>
                                             <td>
                                                 <button
												  onClick={() => this.viewUser(user)}
												  className="btn btn-info"
												 >
												   View{" "}
												 </button>
												 <button 
                                                    style={{marginLeft: "10px"}} 
                                                    onClick={ () => {if(window.confirm('Confirm to Delete?'))this.deleteUser(user.id)}} 
                                                    className="btn btn-danger"
                                                 >
                                                    Delete 
                                                 </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>

            </div>
        )
    }
}

export default ListUserComponent
