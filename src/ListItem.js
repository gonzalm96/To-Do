import React from 'react';
import Icon from '@material-ui/core/Icon';
import './App.css';


class ListItems extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: 0
        }
        this.createListItem = this.createListItem.bind(this);
        // this.showListType = this.showListType.bind(this);
        this.whichItem = this.whichItem.bind(this);
        // this.showDelete = this.showDelete.bind(this);
    }

    whichItem(id){
        console.log(id);
        this.props.check(id);
    }

    getClass(bool){
        if(bool === false){
            return "unchecked";
        }
        else{
            return "checked";
        }
    }

    createListItem(item) {
        return <li onClick={() => this.whichItem(item.id)} key={item.id}> 
                <Icon className={this.getClass(item.done)} fontSize="small" color="primary">done</Icon>
                <span className="itemText">{item.text}</span>
               </li>
    }

    // showListType(type) {
    //     console.log(type);
    //     console.log(this.props.masterList.length > this.props.currList.length);
    //     console.log(this.props.masterList.length == this.props.currList.length);

    //     const allBttn = document.getElementById("one"); 
    //     const actvBttn = document.getElementById("two");
    //     const cmpltBttn = document.getElementById("three");

    //     cmpltBttn.style.color = "#4D5693";

    //     if (type == 0) {
    //         cmpltBttn.style.color = "#4D5693";
    //         allBttn.style.color = "#55BBDD";
    //         actvBttn.style.color = "#4D5693";
    //         this.props.changeList(0);
    //         this.setState({
    //             type:0
    //         });
    //     } else if (type == 1) {
    //         cmpltBttn.style.color = "#4D5693";
    //         allBttn.style.color = "#4D5693";
    //         actvBttn.style.color = "#55BBDD";
    //         this.props.changeList(1);
    //         this.setState({
    //             type:1
    //         });
    //     } else if (type == 2) {
    //         cmpltBttn.style.color = "#55BBDD";
    //         allBttn.style.color = "#4D5693";
    //         actvBttn.style.color = "#4D5693";
    //         this.props.changeList(2);
    //         this.setState({
    //             type:2
    //         });
    //     }
    //     //condition to reset the bottom buttons
    //     else if (type == -1) {
    //         cmpltBttn.style.color = "#4D5693";
    //         allBttn.style.color = "#4D5693";
    //         actvBttn.style.color = "#4D5693";
    //         this.setState({
    //             type: 0
    //         });
    //     }
        
    // }

    // showDelete(){
    //     if(this.state.type == 2){
    //         console.log("it does indeed == 2");
    //         //delete the list of completed and send user back to all tasks list
    //         this.props.delete(this.state.type);
    //         this.setState({
    //             type: 0
    //         });
    //         this.showListType(-1);
    //     }
    //     else{
    //         this.props.delete();
    //     }
    // }


    render(){
        let todoList = this.props.currList;
        let listItems = todoList.map(this.createListItem);
        
        //bring this out into App.js next time you touch this, will make color switching that much easier!!
        // const listFooter = 
        //         <div>
        //             <div className="footer">
        //                 <p>{todoList.length} items left</p>
        //                 <button onClick={() => this.showDelete(this.state.type)}>Clear Completed</button>
        //             </div>
        //             <div className="mobile_footer">
        //                  <button id="one" onClick={() => this.showListType(0)}>All</button>
        //                 <button id="two" onClick={() => this.showListType(1)}>Active</button>
        //                 <button id="three" onClick={() => this.showListType(2)}>Completed</button>
        //             </div>
        //         </div>;
        
        return(
            <div>
                <ul className = "listWrapper" >
                     { listItems }
                </ul>
                {/* <div>{ listFooter }</div> */}
            </div>
        );
    }
}

export default ListItems;