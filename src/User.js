import React, { Component } from 'react'
import { takeNameInitials, formatPhone } from './functions'

class User extends Component {
  render() {
    let { user } = this.props

    return (
      <React.Fragment>
        <h2>Single user detail</h2>
        <button onClick={() => this.props.action()}>Back</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company Name</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {
              <tr>
                <td>{user.id}</td>
                <td>{takeNameInitials(user.name)}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatPhone(user.phone)}</td>
                <td>{user.company.name}</td>
              </tr>
            }
          </tbody>
        </table>

      </React.Fragment>
    )
  }
}

export default User 