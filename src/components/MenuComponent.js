import React ,{Component} from "react";
import {  Media } from "reactstrap";
import { DISHES } from "../shared/dishes";
import Item from "./ItemComponent";
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderMenuItem ({dish, onClick}) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`} >
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

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
                    <RenderMenuItem dish={dish}/>
                </div>
            )
        })
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
        
    }
}

export default MenuComponent;