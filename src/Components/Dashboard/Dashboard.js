import React,{Component} from 'react';
import './Dashboard.css';
import swal from 'sweetalert';
import Loader from "react-loader-spinner";
class Dashboard extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            responseData:"",
            value:'',
            status:true
        }
    }
    componentDidMount()
    {
        fetch("https://api.nasa.gov/planetary/apod?api_key="+process.env.REACT_APP_API_KEY).then((res)=>res.json()).then((res2)=>{
            this.setState({responseData:res2,status:false})

        })
    }
    find()
    {
       if(this.state.value.length===0)
       {
        swal({
            title: "No Keyword to Search",
            text: "Please enter some text to search",
            icon: "warning",
            dangerMode: true,
          })
       }
       else
       {
        this.props.location.state=this.state.value;
        this.props.history.push({
            pathname: "/search",
            state: this.state.value
        })
           
       }
    }
    render()
    {
        return(
            <div>
            <h1 className="heading">NASA Media Search</h1>
            <br/><br/>
            {this.state.status?
            <div className="loader">
                <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
            </div>:<><div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-8">
                        <h3>{this.state.responseData.title}</h3>
                    </div>
                    <div className="col-md-4 col-sm-4" style={{textAlign:"center"}}>
                        <input className="searchbar" type="text" value={this.state.value} onChange={(e)=>{this.setState({value:e.target.value})}}/>
                        <button className="btn btn-primary" style={{marginBottom:"2px"}} onClick={()=>this.find()}>Search</button>
                    </div>
                </div>
            </div>
            <div className="container-fluid" style={{margin:"0",padding:"0"}}>
                <img src={this.state.responseData.url} className="imagemain" alt=""/>
            </div>
            <div className="container">
                <h4>{this.state.responseData.explanation}</h4>
                <h4 style={{textAlign:"center"}}>{this.state.responseData.date}</h4>
                <h4 style={{textAlign:"center"}}><span>&#169;{this.state.responseData.copyright}</span></h4>
            </div></>}
            </div>
        )
    }
}
export default Dashboard;