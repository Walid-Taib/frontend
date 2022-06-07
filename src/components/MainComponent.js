import React ,{Component} from "react";
import {Navbar, NavbarBrand} from 'reactstrap'
import '../App.css'
import MenuComponent from "./MenuComponent";
import { addComment ,fetchDishes} from '../redux/ActionCreators';

import Item from "./ItemComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Route,Redirect,Switch,withRouter} from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";



const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())}


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
    console.log("fetch did mount")
  }
      render() {
        const DishWithId = ({match}) => {
          return(
              <Item  dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              addComment={this.props.addComment}  />
          );
        };
        const HomePage = () => {
          return(
              <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}  
      
              
              dishesLoading={this.props.dishes.isLoading}
              dishesErrMess={this.props.dishes.errMess}/>
          );
        }
        return (
          <div>
            <Header/>
            <Switch>
                <Route path='/home' component={HomePage}/>
                <Route exact path='/menu' component={() => <MenuComponent dishes={this.props.dishes.dishes} />} />
                <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path="/contactus" component={()=><Contact/>}/>
                <Redirect to="/home" />
            </Switch>
            <Footer/>
          </div>
        );
      }
    }
    
    

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainComponent));

