import React,{Component} from 'react';
import './Search.css';
import ReactPaginate from 'react-paginate';
import Loader from "react-loader-spinner";
class Search extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            offset: 0,
            response: [],
            perPage: 5,
            currentPage: 0,
            checkStatus:true,
            checkStatus1:true
      };
    }
    componentDidMount()
    {
        this.getDataFromApi();

    }
    getDataFromApi()
    {
        fetch("https://images-api.nasa.gov/search?q="+this.props.location.state).then((res2)=>res2.json()).then((res)=>{
            this.setState({checkStatus:false})
            const data=res.collection.items;
            if(data.length===0)
            {
                this.setState({checkStatus1:false})
            }
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({response:slice});
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage)
                })
            })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getDataFromApi()
        });

    };
    render()
    {
        let data='';
        if(this.state.response)
        {
            data=this.state.response.map((d)=>{
                return (
                 <div key={d.href}>
                    <div  className="col-md-7" style={{marginBottom:"10px"}}>
                         <img alt="" src={d.links?d.links[0].href:null} style={{height:"auto",width:"100%"}}/></div>
                     <div className="col-md-5" style={{textAlign:"center",top:"100px",margin:"auto"}}> 
                         <h4 style={{fontWeight:"bold"}}>{d.data[0].date_created.substr(0,10)}</h4>
                         <h5 style={{fontWeight:"bold"}}>{d.data[0].title}</h5>
                     </div>
                 </div>
                 )
                });
        }
        
        return(
            <div className="container">
            {this.state.checkStatus?
                <div className="loader">
                <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
            </div>:
            <>
            {this.state.checkStatus1?
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="text-success">Search Results for {this.props.location.state}</h1>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={()=>{this.props.history.push("/")}} style={{margin:"20px"}}>Back to Home Page</button>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8" style={{height:"480px",overflow:"scroll",overflowX:"hidden"}}>
                        {data}
                    </div>  
                    <div className="col-md-2"></div>
                    <ReactPaginate previousLabel={"prev"} nextLabel={"next"} breakLabel={"..."} breakClassName={"break-me"} pageCount={this.state.pageCount} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={this.handlePageClick} containerClassName={"pagination"} subContainerClassName={"pages pagination"} activeClassName={"active"}/>
                </div></div>:
                <div className="error">
                    <h1 className="text-center"  >Sorry no results found for the keyword {this.props.location.state}</h1>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push("/")}} style={{margin:"20px"}}>Back to Home Page</button>
                </div>}
            </>}
            </div>
        )
    }
}
export default Search;