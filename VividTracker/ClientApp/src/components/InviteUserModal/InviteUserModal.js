import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Styles/InviteUserModalStyles.css'
import { endpoints } from '../../endpoints';
import authService from '../api-authorization/AuthorizeService';

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

  getCurrentTenantData = async(tenantId) =>
  {
    const token = await authService.getAccessToken();
    let currentURL = window.location.href.split('/')
    tenantId = Number(currentURL[currentURL.length - 1])
      await fetch(endpoints.getCurrentTenantData(tenantId), {
          headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
      })
        .then(async (res) => { 
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
      if(this.state.currentTenantUsers.length >= 1)
      {
        this.state.currentTenantUsers.some( async (user) => {
          if(user.email == this.state.email)
          {
            this.setState({'errorMessage':'This user has already been invited to this tenant.', 'valid': false})
          }
          else
          {
            const token = await authService.getAccessToken();
            let currentURL = window.location.href.split('/')
            let tenantId = Number(currentURL[currentURL.length - 1])
            let result = await fetch(endpoints.inviteUser(tenantId), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                    },
                body: JSON.stringify({email:this.state.email})
                })
                    .then((res) => {
                      console.log(res)
                    })
                    .catch((err) => {
                      console.log(err)
                    })
          }
        })
      }
      else
      {
            const token = await authService.getAccessToken();
            let currentURL = window.location.href.split('/')
            let tenantId = Number(currentURL[currentURL.length - 1])
            let result = await fetch(endpoints.inviteUser(tenantId), {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
               body: JSON.stringify({email:this.state.email})
                })
                    .then((res) => {
                      console.log(res)
                    })
                    .catch((err) => {
                      console.log(err)
                    })
      }
      window.location.reload()
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
                        <span className="InviteNewUser pageText" data-bs-toggle="modal" data-bs-target="#InviteUserModal">
                            InviteNewUser()
                        </span>
                    </div>
                    <div className="modal fade" id="InviteUserModal" role="dialog">
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
                                        <form>
                                            <label htmlFor="userEmail" id="label-text">Email:</label>
                                            <input 
                                              type="text" 
                                              name="userEmail" 
                                              className={this.state.valid == false ? "form-control name name-error" : "form-control name"} 
                                              id="name"
                                              onChange={(e) => this.setState({ 'email': e.target.value })}
                                            />
                                            <div className="modal-footer border-0">
                                              {this.state.valid == false ?  
                                                <p className="error">{this.state.errorMessage}</p>
                                              :
                                              ""}
                                                <button type="reset" id="close" className="btn btn-link" data-bs-dismiss="modal">
                                                  Cancel
                                                </button>
                                                <button type="submit" id="submit" method="post" className="btn" name="addTenant" onClick={(e) => this.inviteUser(e)}> 
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
