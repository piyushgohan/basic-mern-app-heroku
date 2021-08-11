
import './App.css';
import Navbar from "./components/Navbar"
import Home from './components/Home ';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Contact from './components/Contact';
import { Route, Switch } from "react-router-dom";
import About from './components/About';
import Logout from './components/Logout';
import { reducer , initialState} from './components/Reducer';
import { createContext } from 'react';
import { useReducer } from 'react'


export const UserContext = createContext()

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
 

  return (
    <div className="App">
     <UserContext.Provider value={{state, dispatch}}>
      <Navbar />

         <Switch>

           <Route exact path="/">
               <Home />
           </Route>

           <Route exact path="/signup">
               <Signup />
           </Route>

           <Route exact path="/signin">
                <Signin />
           </Route>

           <Route exact path="/contact">
                <Contact />
           </Route>

           <Route exact path="/about">
                <About/>
           </Route>

           <Route exact path="/logout">
                <Logout/>
           </Route>

       </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
