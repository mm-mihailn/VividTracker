import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/InviteUserModalStyles.css'
export default class InviteUserModal extends Component {

  constructor()
  {
    super()
    this.state = {email: '', currentTenantUsers: [], errorMessage: '', valid: 'null'}
  }
  validateEmail(email)
  {
    let emailRegex = /^\S+@\S+\.\S+$/
    let isEmailValid = emailRegex.test(email)
    return isEmailValid
  }

  componentDidMount = async() =>
  {
    await this.getCurrentTenantData()
  } 

  getCurrentTenantData = async() =>
  {
    let currentURL = window.location.href.split('/')
    let currentTenantID = Number(currentURL[currentURL.length - 1])
    await fetch(`https://localhost:7091/api/users/${currentTenantID}`).then(async (res) =>{ 
      let result = await res.json()
      this.setState({'currentTenantUsers': result})
    })
    .catch((err) => {
      console.log(err)
    })

  }

  inviteUser = async(event) =>
  {
    event.preventDefault()
    if(this.validateEmail(this.state.email) == true)
    {
      this.setState({'valid': true})
      this.state.currentTenantUsers.some((user) => {
        if(user.email == this.state.email)
        {
          this.setState({'errorMessage':'This user has already been invited to this tenant.', 'valid': false})
        }
        else
        {
          // TODO: Add user to this tenant
        }
      })
      
    }
    else
    {
      this.setState({'errorMessage':'Invalid email, please check again.', 'valid': false})
    }
  }

  render() {
    return (
      <div className='InviteUserWrapper'>
        <div className='InviteUserModalWrapper'>
            <div className="container">
                    <div className="container" id="modal">
                        <span id="inviteUser" className="InviteNewUser pageText" data-bs-toggle="modal" data-bs-target="#myModal">
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
                                            <input type="text" name="userEmail" className={this.state.valid == false ? "form-control name name-error" : "form-control name"} id="name"
                                                onChange={(e) => this.setState({ 'email': e.target.value })}>
                                            </input>
                                            <div className="modal-footer border-0">
                                              {this.state.valid == false ?  
                                                <p className="error">{this.state.errorMessage}</p>
                                              :
                                              ""}
                                                <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal">
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
