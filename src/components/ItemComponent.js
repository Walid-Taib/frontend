import React  ,{Component} from "react";

import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem ,    Button, Row, Col, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';

import { Control, LocalForm, Errors } from 'react-redux-form';
import { compose } from "redux";


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Commentform extends Component{
    constructor(props){
        super(props)
        this.state={
            isModalOpen:false
        }
        this.handleModal=this.handleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen})
    }
    handleSubmit(values){
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

    }


    render(){
        return(
            <div>
                <Button onClick={this.handleModal}>add Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.handleModal}>
                <ModalHeader toggle={this.handleModal}>Submit a Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="YourName" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".YourName" id="YourName" name="YourName"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".YourName"
                                        show="touched"
                                        comments={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Your comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit comment
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>

                </ModalBody>
                </Modal>
            </div>

        )
    }
}














class Item extends Component{
    constructor(props){
        super(props);



        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(values){
        console.log("the Current state :"+ JSON.stringify(values));
        alert("Current state is : " + JSON.stringify(values))
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
    renderComments=(comments , addComment, dishId )=>{
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
                    <Commentform dishId={dishId} addComment={addComment}/>
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
                    {this.renderComments(this.props.comments,this.props.addComment,this.props.dish.id)}
                </div>
            </div>
            </div>
        );
    }
}


export default Item;