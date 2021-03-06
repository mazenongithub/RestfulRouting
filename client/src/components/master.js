import React, { Component } from 'react';
import * as apiCalls from './api';
import _ from 'lodash';

class Master extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allusers: {},
            user_id: '',
            firstname: '',
            lastname: ''
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }


    componentDidMount() {

        this.loadUsers();

    }
    handleClick() {
        var firstname = this.state.firstname;
        var lastname = this.state.lastname;
        var _id = this.state.user_id;
        var values;
        if (this.state.user_id) {
            values = { _id, firstname, lastname }
            this.editUser(values);
        }
        else {


            values = { firstname, lastname };


            //alert(values.firstname);
            this.addUser(values);
        }

    }

    handleDelete() {
        var user_id = this.state.user_id;
        this.deleteUser(user_id);
    }

    async deleteUser(user_id) {
        let deleteUser = await apiCalls.deleteUser(user_id);
        const allusers = this.state.allusers.filter(myusers => myusers._id !== deleteUser._id);
        console.log(allusers);
        this.setState({ firstname: '', lastname: "", user_id: "", allusers: {} });
        this.setState({ allusers: allusers });
    }
    async loadUsers() {
        //
        let allusers = await apiCalls.fetchURL();
        console.log(allusers);
        let allmyusers = {};
        allusers.map((myusers) => {
            return allmyusers = [...allmyusers, myusers]
        })

        this.setState({ allusers: allmyusers });
        console.log(this.state.allusers)
    }

    async addUser(val) {
        let newUser = await apiCalls.createUser(val);
        console.log(newUser);
        this.setState({ allusers: [...this.state.allusers, newUser], user_id: newUser._id, firstname: newUser.firstname, lastname: newUser.lastname })

    }

    async editUser(val) {
        let editUser = await apiCalls.createUser(val);
        console.log(editUser);
        this.setState({ user_id: editUser._id, firstname: editUser.firstname, lastname: editUser.lastname });

        for (var i = 0; i < this.state.allusers.length; i++) {
            if (this.state.allusers[i]._id === this.state.user_id) {

                this.state.allusers[i].firstname = this.state.firstname;
                this.state.allusers[i].lastname = this.state.lastname;

            }

        }

        this.setState({ allusers: this.state.allusers })

    }


    loadallusers() {
        return _.map(this.state.allusers, myUsers => {
            return (<option value={myUsers._id}>{myUsers.firstname} {myUsers.lastname} </option>)
        })

    }

    afterSetStateFinished() {

        if (this.state.user_id) {

            _.map(this.state.allusers, myUser => {


                if (myUser._id === this.state.user_id) {
                    this.setState({ firstname: myUser.firstname, lastname: myUser.lastname })

                }


            })

        }
        else {

            this.setState({ firstname: '', lastname: '' })
        }

    }


    render() {


        return (

            <table width="95%" border="0" cellPadding="5">
  <tbody>
  <tr>
    <th colSpan="2"><select name="user_id" className="user_id" id="user_id" value={this.state.user_id}
    onChange={event => this.setState({user_id: event.target.value}, () => {
    this.afterSetStateFinished();
})
    }> <option value=""> Enter New </option>{this.loadallusers()}</select></th>
  </tr>
  <tr>
    <td width="28%">First Name</td>
    <td width="72%"><input type="text" name="firstname" id="firstname" value={this.state.firstname} onChange={event => this.setState({firstname: event.target.value})} /></td>
  </tr>
  <tr>
    <td>Last Name</td>
    <td><input type="text" name="lastname" id="lastname" value={this.state.lastname} onChange={event => this.setState({lastname: event.target.value})} /> </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td><button onClick={this.handleClick}> Insert/Update </button> <input type="button" value="Delete" id="btndelete" onClick={this.handleDelete} /></td>
  </tr>
  </tbody>
</table>


        ) // End Return




    } // End Render 


} //End Component



export default Master;
