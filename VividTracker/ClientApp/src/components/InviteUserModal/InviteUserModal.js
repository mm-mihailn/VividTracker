import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/InviteUserModalStyles.css'
export default class InviteUserModal extends Component {

  constructor()
  {
    super()
    this.state = {email: ''}
  }
  validateEmail(email)
  {
    let emailRegex = /^\S+@\S+\.\S+$/
    let isEmailValid = emailRegex.test(email)
    return isEmailValid
  }
  inviteUser(event)
  {
    event.preventDefault()
    console.log('Inviting user')
    console.log(this.validateEmail(this.state.email))
  }

  render() {
    return (
      <div className='InviteUserWrapper'>
        <div className='InviteUserModalWrapper'>
            <div className="container">
                    <div className="container" id="modal">
                        <span id="createTenant" className="InviteNewUser pageText" data-bs-toggle="modal" data-bs-target="#myModal">
                            InviteNewUser()
                        </span>
                    </div>
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header border-0">
                                    <button type="button" className="close" data-bs-dismiss="modal">&times;</button>
                                    <div className="title">
                                        <h4 className="modal-title" id="title">InviteNewUser()</h4>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <div id="myForm">
                                        <form onSubmit={(e) => this.inviteUser(e)}>
                                            <label htmlFor="userEmail" id="label-text">Email:</label>
                                            <input type="text" name="userEmail" className="form-control" id="name"
                                                onChange={(e) => this.setState({ 'email': e.target.value })}>
                                            </input>
                                            <div className="modal-footer border-0">
                                                <p id="error"></p>
                                                <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal"                                                  >Cancel
                                                  Cancel
                                                </button>
                                                <button type="submit" id="submit" method="post" className="btn" name="addTenant"> 
                                                  Add
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </div>
    )
  }
}
