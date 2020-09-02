import React, { Component } from 'react'
import axios from 'axios'
import User from './User'
import { takeNameInitials, formatPhone, pagination } from './functions'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      openUser: false,
      user: {},
      //Array of user after pagination
      currentUsers: [],
      currentPage: 1,
      passCurrentPage: 1,
      itemPerPage: 3,
      total: 0,
      pageNumbers: [],
      activeItem: 1
    }
    // Bind the this context to the handler function
    this.switchComponent = this.switchComponent.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    let { currentPage, itemPerPage } = this.state

    axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
      let apiResult = users && users["data"] && users["data"].length > 0 ? users["data"] : []
      if (apiResult.length > 0) {
        let { currentUsers, pageNumbers } = pagination(currentPage, itemPerPage, apiResult)
        this.setState({ ...this.state, users: apiResult, total: apiResult.length, currentUsers: currentUsers, pageNumbers: pageNumbers })
      }
    }).catch(err => console.log('err', err))
  }

  /**
   * View detail function
  */
  viewUser(user) {
    this.setState({ ...this.state, user, openUser: true })
  }

  async switchComponent() {
    await this.setState({ ...this.state, openUser: false })
  }

  onPageChange(event, pageNumber) {
    let { itemPerPage, users } = this.state
    let { currentUsers } = pagination(pageNumber, itemPerPage, users)
    this.setState({ ...this.state, currentUsers: currentUsers, activeItem: pageNumber, currentPage: pageNumber })
  }

  prePage() {
    let { currentPage, itemPerPage, users } = this.state
    if (currentPage && currentPage > 1) {
      let pageNumber = currentPage - 1
      let { currentUsers } = pagination(pageNumber, itemPerPage, users)

      this.setState({ ...this.state, currentUsers: currentUsers, activeItem: pageNumber, currentPage: pageNumber })
    } else {
      alert("You are at first page!")
    }

  }
  nextPage() {
    let { currentPage, itemPerPage, users, pageNumbers } = this.state
    let lastItem = pageNumbers[pageNumbers.length - 1];
    if (lastItem && lastItem > currentPage) {
      let pageNumber = currentPage + 1
      //Call the helper function
      let { currentUsers } = pagination(pageNumber, itemPerPage, users)
      this.setState({ ...this.state, currentUsers: currentUsers, activeItem: pageNumber, currentPage: pageNumber })
    } else {
      alert("You are at last page!")
    }
  }

  render() {
    let { users, openUser, user, currentUsers, pageNumbers, activeItem } = this.state

    return (
      <React.Fragment>
        {
          !openUser ?
            <React.Fragment>
              <h2>List of users</h2>
              {
                currentUsers && currentUsers.length > 0 ?
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentUsers.map((user, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>{user.id}</td>
                              <td>{takeNameInitials(user.name)}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{formatPhone(user.phone)}</td>
                              <td>{user.company.name}</td>
                              <td><button onClick={(e) => { this.viewUser(user) }}>View</button></td>
                            </tr>
                          </React.Fragment>
                        ))
                      }
                    </tbody>
                  </table>
                  :
                  <div>No records found!</div>
              }
              <div className="center">
                <div className="pagination">
                  {/* <a href="#">&laquo;</a> */}
                  <a className="pagination-number" onClick={e => { this.prePage() }} >Prev</a>
                  {
                    pageNumbers && pageNumbers.length > 0 ?
                      pageNumbers.map((item, index) => (
                        <React.Fragment key={index}>
                          <a className={activeItem === item ? "pagination-number active" : "pagination-number"} onClick={e => { this.onPageChange(e, item) }} >{item}</a>
                        </React.Fragment>
                      ))
                      :
                      ""
                  }
                  {/* <a >&raquo;</a> */}
                  <a className="pagination-number" onClick={e => { this.nextPage() }} >Next</a>
                </div>
              </div>
            </React.Fragment>
            :
            ""
        }
        {
          openUser ?
            <User user={user} action={this.switchComponent} />
            : ""
        }
      </React.Fragment>
    )
  }
}

export default List