import {Component} from 'react'
import './TableRow.css'
import $ from 'jquery'

class tableRow extends Component{
    constructor(props){
        super(props)
        this.deleteState = this.deleteState.bind(this)
        this.updateState = this.updateState.bind(this)
        this.updateStatus = this.updateStatus.bind(this)
    }
    componentDidMount(){
        document.querySelector('.update_btn_' + this.props.id).setAttribute('disabled', "true")
    }

    updateStatus(){
        var name = this.props.name
        var code = this.props.code
        var id = this.props.id
        var state_input=  document.querySelector('.state-input-' + id)
        var code_input = document.querySelector('.code-input-' + id)
        var update_btn = document.querySelector('.update_btn_' + id)
      
        if(state_input.value === name && code_input.value === code){
            update_btn.setAttribute('disabled', 'true')
        }else{
            update_btn.removeAttribute('disabled')
        }
    }
    deleteState(){
        const id = this.props.id
        var success_deletion = false
        $.ajaxSetup({async: false});
        $.ajax({
            type: 'DELETE',
            url: "http://localhost:3000/delete/" + id,
            crossDomain: true,
            success: function (response) {
                success_deletion = true
            },
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
            error: function (err) {
                success_deletion = false
                console.log(err)
            }
        });
        if(success_deletion === true) {
            document.querySelector('.tableRow-'+this.props.id).remove()
            this.props.rerenderParentCallback();
        }
    }
    updateState(){
       
        const id = this.props.id
        var state_input=  document.querySelector('.state-input-' + id)
        var code_input = document.querySelector('.code-input-' + id)
        var update_btn = document.querySelector('.update_btn_' + id)
        const name = state_input.value
        const code = code_input.value

        var success_updation = false
        const dt = "name="+name+"&code="+code
        $.ajaxSetup({async: false});
        $.ajax({
            type: 'PUT',
            url: "http://localhost:3000/update/" + id + "?" + dt,
            crossDomain: true,
            success: function (response) {
                success_updation = true
                update_btn.setAttribute('disabled', 'true')
            },
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
            error: function (err) {
                success_updation = false
                console.log(err)
            }
        });
        if(success_updation === true) {
            this.props.rerenderParentCallback()
        }
    }
    render(){
    console.log('child renders')
        return(
            <tr className={"tableRow tableRow-"+ this.props.id + " text-center"}>
                <td className="tableRow-state-name">
                    <input type="text" class={"state-input-" + this.props.id} defaultValue ={this.props.name}  onChange={() => { this.updateStatus(); }} /> 
                </td>
                <td className="tableRow-state-code">
                    <input type="text" class={"code-input-" + this.props.id} defaultValue={this.props.code} onChange={() => { this.updateStatus(); }} /> 
                </td>
                <td>
                    <div class="tools">
                        <div class="tools-delete">
                            <img src="/delete.png" title = "delete" onClick={() => { this.deleteState(); }}></img>
                        </div>
                        <button class={"update_btn update_btn_" + this.props.id} onClick={() => { this.updateState(); }} >Update</button>
                    </div>
                </td>
            </tr>
        )
    }
}
export default tableRow