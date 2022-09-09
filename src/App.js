import React, { Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader,ModalFooter, ModalBody} from 'reactstrap';
import './App.css'

 
function searchingFor(search){
  return function(x){
    return x.name.toLowerCase().includes(search.toLowerCase()) || !search ;
  }
}

 class App extends Component {
  constructor(props){
    super(props);
    this.state={
    file:[],
    search:'',
    modal: false,
    imgurl:''
  }
 this.searchHandler = this.searchHandler.bind(this);
 this.toggle = this.toggle.bind(this);
}

searchHandler(event){
  this.setState({search: event.target.value})
}

toggle() {
  this.setState({
    modal: !this.state.modal
  });
}

handleModal(index1){
  this.state.file.map((allMeme,index) => {
    if(index === index1){
      this.setState({imgurl:allMeme.url});
      // console.log("img",this.state.imgurl);
    }
  })
  this.setState({modal:!this.state.modal})
}



componentDidMount() {
    axios.get('https://api.imgflip.com/get_memes').then(res =>{
    console.log(res.data.data.memes);
    this.setState({file:res.data.data.memes})
      })
    }

    

    render() { 
        return (
            <div>
        <form>  
        <input className= "input"  placeholder="Search bar.." onChange={this.searchHandler} type="text" ></input>
        </form>
         
    <table className="tabledata">
      <thead>
        <tr>
          <th>Sr no</th>
          <th>Name</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
       { (this.state.file.length > 0) ? this.state.file.filter(searchingFor(this.state.search)).map( (allMeme, index) =>{
          return(
        <tr key={index}>
          <td>{allMeme.id}</td>
          <td>{allMeme.name}</td>
          <td> <img src={allMeme.url} alt="" onClick={() => this.handleModal(index)}  width="100" height="100"/></td>
        </tr>
         )
        }) : <tr><td colSpan="3"></td></tr> }
      </tbody>
    </table>
    <Modal isOpen={this.state.modal} contentClassName="custom-modal-style">
          <ModalHeader toggle={this.toggle}>Meme</ModalHeader>
          <ModalBody>
         <img src={this.state.imgurl}  width="450" height="300"/>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
            </div>
        );
    }
}
 
 export default App;