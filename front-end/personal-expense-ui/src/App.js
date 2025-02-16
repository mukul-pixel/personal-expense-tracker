import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './Components/Login/Register';
import IncomeChart from './Components/Home/Analyse/IncomeChart';
import CategoryChart from './Components/Home/Analyse/ExpenseChart/CategoryChart';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/analyse/analyse_income' element={<IncomeChart/>}></Route>
          <Route path='/analyse/analyse_expense' element={<CategoryChart/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
