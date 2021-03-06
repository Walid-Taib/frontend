import React ,{Component} from "react";
import {Navbar, NavbarBrand} from 'reactstrap'
import '../App.css'
import MenuComponent from "./MenuComponent";
import { postComment, fetchDishes, fetchComments, fetchPromos ,fetchLeaders } from '../redux/ActionCreators';

import Item from "./ItemComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Route,Redirect,Switch,withRouter} from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import { actions } from "react-redux-form";


const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders:()=> dispatch(fetchLeaders())



});


const mapStateToProps=state=>{
  return{
    dishes:state.dishes,
    leaders:state.leaders,
    promotions:state.promotions,
    comments:state.comments
  }
}

class MainComponent extends Component{
  constructor(props) {
    super(props);


  } 
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }




      render() {
        const DishWithId = ({match}) => {
          return(
              <Item  dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}/>
          );
        };
        const HomePage = () => {
          return(
              <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leaderErrmes={this.props.leaders.errMess}
              leadersLoading={this.props.leaders.isLoading}
              
              />
          );
        }
        return (
          <div>
            <Header/>
            <Switch>
                <Route path='/home' component={HomePage}/>
                <Route exact path='/menu' component={() => <MenuComponent dishes={this.props.dishes.dishes} />} />
                <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders.leaders} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>}/>
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                <Redirect to="/home" />
            </Switch>
            <Footer/>
          </div>
        );
      }
    }
    
    

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));

