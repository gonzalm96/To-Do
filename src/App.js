import React from 'react';
import ListItem from './ListItem';
import './App.css';

let index = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItems: [],
      listType: 0
    };

    //ensure 'this' keyword resolves properly to this specific class 
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.getSelectedList = this.getSelectedList.bind(this);
    // this.showListType = this.showListType.bind(this);
    // this.whichItem = this.whichItem.bind(this);
    // this.showDelete = this.showDelete.bind(this);
  }

  //event handler
  addItem(event) {
    if(this._inputElement.value !== ""){
      //new list object/item
      let newItem = {
        text: this._inputElement.value,
        done: false,
        id: index
      };

      if (this.state.listType === 2) {
        this.getSelectedList(0);
      }

      //setting state with new list composed of old list and new item 
      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem),
          currentItems: prevState.items.concat(newItem)
          // listType: 0
        };
      });

      

      this._inputElement.value = "";
      index++;
    }

    //reset event so that next input isn't all wonky :/
    event.preventDefault();
  }


  checkItem(id) {
    let filteredList = this.state.items;
    let checkedIndex = filteredList.findIndex(function(items){
      return items.id === id;
    });

    if(filteredList[checkedIndex].done === false){
      filteredList[checkedIndex].done = true;
    }else{
      filteredList[checkedIndex].done = false;
    }

    this.setState({
      items: filteredList
    });
  }
  
  //keep this for when you're actually deleting items
  deleteItem(type){
    console.log("this got called with type: " + type);
    //filter list based on if it is marked as done
    let filteredList = this.state.items.filter(function(item) { 
        return (item.done !== true);}
    );

    if(this.state.listType !== 2){
      this.setState({
        items: filteredList,
        currentItems: filteredList
      });
    }
    //create empty current list if viewing the completed list section
    else{
        this.setState({
          items: filteredList,
          currentItems: []
        });
    }
  }

  getSelectedList(listType){
    let currList;
    let type;

    const allBttn = document.getElementById("one");
    const actvBttn = document.getElementById("two");
    const cmpltBttn = document.getElementById("three");

    //show all list items
    if(listType === 0){
      console.log("all");
      currList = this.state.items;
      type = 0;
      //set color according to the user selection      
      cmpltBttn.style.color = "#4D5693";
      allBttn.style.color = "#55BBDD";
      actvBttn.style.color = "#4D5693";
    }
    //show active list items
    else if(listType === 1){
      currList = this.state.items.filter(function(item) { 
        return (item.done !== true);}
      );
      type = 1;
      //set color according to the user selection
      cmpltBttn.style.color = "#4D5693";
      allBttn.style.color = "#4D5693";
      actvBttn.style.color = "#55BBDD";
      console.log("active");
    }
    //show completed list items
    else if(listType === 2){
      currList = this.state.items.filter(function(item) { 
        return (item.done === true);}
      );
      //set color according to the user selection
      type = 2;

      cmpltBttn.style.color = "#55BBDD";
      allBttn.style.color = "#4D5693";
      actvBttn.style.color = "#4D5693";


      console.log("complete");
    }

    this.setState({
      currentItems: currList,
      listType: type
    });
  }

  //  showListType(type) {

  //    const allBttn = document.getElementById("one");
  //    const actvBttn = document.getElementById("two");
  //    const cmpltBttn = document.getElementById("three");

  //    if (type == 0) {
  //      cmpltBttn.style.color = "#4D5693";
  //      allBttn.style.color = "#55BBDD";
  //      actvBttn.style.color = "#4D5693";
  //      this.changeList(0);
  //    } else if (type == 1) {
      //  cmpltBttn.style.color = "#4D5693";
      //  allBttn.style.color = "#4D5693";
      //  actvBttn.style.color = "#55BBDD";
      //  this.changeList(1);

  //    } else if (type == 2) {
  //      cmpltBttn.style.color = "#55BBDD";
  //      allBttn.style.color = "#4D5693";
  //      actvBttn.style.color = "#4D5693";
  //      this.changeList(2);

  //    }
  //    //condition to reset the bottom buttons
  //    else if (type == -1) {
  //      cmpltBttn.style.color = "#4D5693";
  //      allBttn.style.color = "#4D5693";
  //      actvBttn.style.color = "#4D5693";
  //      this.setState({
  //        type: 0
  //      });
  //    }

  //  }

  //  showDelete() {
  //    if (this.state.type == 2) {
  //      console.log("it does indeed == 2");
  //      //delete the list of completed and send user back to all tasks list
  //      this.props.delete(this.state.type);
  //      this.setState({
  //        type: 0
  //      });
  //      this.showListType(-1);
  //    } else {
  //      this.props.delete();
  //    }
  //  }

  render(){
    // if(this.state.listType == 2 && this.state.currentItems.length == 0){
    //   this.getSelectedList(0);
    // }
    const listFooter = 
                <div>
                    <div className="footer">
                        <p>{this.state.currentItems.length} items left</p>
                        <button onClick={() => this.deleteItem(this.state.listType)}>Clear Completed</button>
                    </div>
                    <div className="mobile_footer">
                         <button id="one" onClick={() => this.getSelectedList(0)}>All</button>
                        <button id="two" onClick={() => this.getSelectedList(1)}>Active</button>
                        <button id="three" onClick={() => this.getSelectedList(2)}>Completed</button>
                    </div>
                </div>;

    return (
      <div>
        <div className="wrapper">
            < h1 > <strong> TODO </strong> </h1 >
            <form onSubmit={this.addItem}>
                <input ref={ (a) => this._inputElement = a } type='text' placeholder='New list item'/>
                <input type='submit' value='Add'/>
            </form>
            <ListItem masterList={ this.state.items } currList={ this.state.currentItems } changeList={ this.getSelectedList } check={ this.checkItem } delete={ this.deleteItem }/>
            { listFooter }
        </div>
      </div>
    );
  }
}

export default App;

// !this.state.currentItems.length ? this.state.items :