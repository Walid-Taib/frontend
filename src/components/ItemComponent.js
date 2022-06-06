import React  ,{Component} from "react";

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class Item extends Component{
    constructor(props){
        super(props)
    }
    renderDish=(dish)=>{
        if(dish){
            return(
                <div>
                    <Card>
                        <CardImg src={dish.image} />
                        <CardBody>
                            <CardTitle></CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else{
            return(
                <div>no dishes selected</div>
            )
        }
    }
    renderComments=(comments)=>{
        console.log('comments')
        if(comments){  
            const list =comments.map((comment)=>{
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>{comment.author},  {comment.date}</p>
                    </div>
                )
            })
            return(
                <div>
                    <h1>Comments</h1>
                    {list}
                </div>
            )
        }
        else{
            return(<div></div>)
        }
    }

    render(){
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.comments)}
                </div>
            </div>
            </div>
        );
    }
}


export default Item;