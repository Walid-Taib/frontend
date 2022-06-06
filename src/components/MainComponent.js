import React ,{Component} from "react";
import {Navbar, NavbarBrand} from 'reactstrap'
import '../App.css'
import MenuComponent from "./MenuComponent";
import { DISHES } from "../shared/dishes";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";
import { COMMENTS } from "../shared/comments";
import Item from "./ItemComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Route,Redirect,Switch} from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";

class MainComponent extends Component{
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  } 
      render() {
        const DishWithId = ({match}) => {
          return(
              <Item dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
          );
        };
        const HomePage = () => {
          return(
              <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}              />
          );
        }
        return (
          <div>
            <Header/>
            <Switch>
                <Route path='/home' component={HomePage}/>
                <Route exact path='/menu' component={() => <MenuComponent dishes={this.state.dishes} />} />
                <Route exact path='/aboutus' component={()=><About leaders={this.state.leaders}/>}/>
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path="/contactus" component={()=><Contact/>}/>
                <Redirect to="/home" />
            </Switch>
            <Footer/>
          </div>
        );
      }
    }
    
    

export default MainComponent;

