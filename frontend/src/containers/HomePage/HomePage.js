import './HomePage.css'
import Header from '../../components/Header/Header'
import React from 'react'
import $ from 'jquery'
import TableRow from '../../components/TableRow/TableRow'

class HomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {data: [],}
        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
        this.loadData = this.loadData.bind(this);
        this.processFile = this.processFile.bind(this)
    }
    rerenderParentCallback() {
        console.log('parent rerenders')
        this.loadData()
    }
   
    async processFile(){
        var success_creation = false
        document.querySelector('.loader').style.display = 'block';
        var myFile = document.querySelector('#hidden-fileinput').files[0];
        var reader = new FileReader();
        reader.addEventListener('load', function() {
            var lines=this.result.split("\n");
    
            var result = [];
        
            var headers=lines[0].split(",");
        
            for(var i=1;i<lines.length;i++){
        
                var obj = [];
                var currentline=lines[i].split(",");
        
                for(var j=0;j<headers.length;j++){
                    obj.push(currentline[j]);
                }
        
                result.push(obj);
            }
            var dataObj  = result
            var clearData = []
            for(var i = 0; i < dataObj.length; i++){
                if(dataObj[i][1]!= undefined){
                    var obj = {
                        name: dataObj[i][0],
                        code: dataObj[i][1],
                    };
                    clearData.push(obj)
                }
            }
            
            document.querySelector('.loader').style.display = 'none';
            $.ajaxSetup({async: false});
            $.ajax({
                type: 'POST',
                url: "http://localhost:3000/create/",
                crossDomain: true,
                data:{data: clearData},
                success: function (response) {
                    success_creation= true
                },
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
                },
                error: function (err) {
                    success_creation = false
                    console.log(err)
                }
            });
        });
        await reader.readAsText(myFile)
        console.log("hogay, " , success_creation)
        if(success_creation === true) {
            console.log("hogay, " , success_creation)
            this.rerenderParentCallback();
        }
    }

    loadData(){
        var state_data = []
        $.ajaxSetup({async: false});
        $.ajax({
            type: 'GET',
            url: "http://localhost:3000/getData",
            crossDomain: true,
            success: function (response) {
                response.forEach((ob)=>{
                    state_data.push(ob);
                })
            },
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            },
            error: function (err) {
                window.location.href = "/login"
            }
        });
        this.state.data = state_data
        this.forceUpdate()
        document.querySelector('.loader').style.display = 'none'
    }
    componentDidMount() {
       this.loadData()
    };
    render() { 
        function triggerFileClick(){
            $('#hidden-fileinput').click()
        }
        return (
            <div class="App">
                <Header />
                <div className='data-container mt-4'>
                    <div class="loader"></div>
                    <div className='import-csv'>
                        <input id="hidden-fileinput" type='file' onChange={() => { this.processFile(); }} accept=".csv" />
                        <button className='import-button mb-4 btn btn-success' onClick={triggerFileClick}>Import Data</button>
                    </div>
                    <table class="table table-stripped">
                        <thead class="text-center">
                            <tr>
                                <th scope="col">State</th>
                                <th scope="col">Code</th>
                                <th scope="col">Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((item, index) => (
                                <TableRow name={item.name} code={item.code} id={item.id} key={index} rerenderParentCallback={this.rerenderParentCallback}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default HomePage