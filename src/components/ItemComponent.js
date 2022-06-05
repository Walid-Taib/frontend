import React  ,{Component} from "react";
import { Card, CardImg, CardBody,CardText,CardTitle} from "reactstrap";

class Item extends Component{
    constructor(props){
        super(props)
    }
    renderDish=(dish)=>{
        if(dish){
            return(
                <div>
                    <Card>
                        <CardImg src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
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
    renderComments=(dish)=>{
        if(dish){  
            const list =dish.comments.map((comment)=>{
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
        return(
            <div className="container">
                <div className="row">        
                    <div className="col-12 col-md-5">  
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5"> 
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            </div>
        )
    }
}


export default Item;