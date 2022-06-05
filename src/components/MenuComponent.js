import React ,{Component} from "react";
import {  Media } from "reactstrap";
import { DISHES } from "../shared/dishes";
import Item from "./ItemComponent";
class MenuComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            dishes:DISHES,
            selected:null
        }
    
    }
 


    render(){
        const menu=this.state.dishes.map((dish)=>{
            return(
                <div key="dish.id" className="col-12 mt-5" onClick={()=>this.props.onClick(dish.id)}>
                    <Media tag="li">
                        <Media middle left>
                            <Media src={dish.image} alt={dish.name}/>
                        </Media>
                        <Media body className="ml-5">
                            <Media heading> {dish.name}</Media>
                            <p>{dish.description}</p>
                        </Media>

                    </Media>
                </div>
            )
        })
        return(
            <div className="container">
                <div className="row">
                    {menu}
                    
                </div>

            </div>
        )
    }
}

export default MenuComponent;