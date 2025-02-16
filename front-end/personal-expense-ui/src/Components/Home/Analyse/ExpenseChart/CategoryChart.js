import { useState, useEffect } from "react";
import axios from "axios";

function CategoryChart() {
  
    const [chartUrl,setChartUrl] = useState();
    const user_email = localStorage.getItem('email');
    const [chartCategory,setChartCategory] = useState('category')

    useEffect(()=>{
        if(user_email){
            fetchChart("bar",user_email,chartCategory);
        }
    },[user_email]);

    const fetchChart = (type,user_email,chartCategory) => {
        axios.get(`http://127.0.0.1:5000/expense/analyse_expense?type=${type}&user_email=${user_email}&chart_category=${chartCategory}`, { responseType: 'blob' })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                console.log(imageUrl);
                setChartUrl(imageUrl);
            })
            .catch(error => console.error("Error fetching chart:", error));
    }
    return ( 
        <>
            <div className = 'expense-chart-component-wrapper'>
            <div className="expense-analyse-header flex justify-between items-center mx-5 p-1 ">
                <h2 className="expense-analyse-page-heading text-3xl">Expense</h2>
                
                {/* Dropdown for selecting chart type */}
                <div className="relative">
                    <select 
                        className="border rounded-md px-2 bg-white shadow-md cursor-pointer" 
                        value={chartCategory} 
                        onChange={(e) => setChartCategory(e.target.value)}
                    >
                        <option value="category">Category</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
                {/* <h2 className = 'expense-analyse-page-heading p-1 mx-5 text-3xl'>Expense</h2>
                {/* <div className = 'expense-chart-type grid grid-cols-2 gap-4 p-5 text-xl'>
                    <button className = 'col-span-1' onClick={() => setChartCategory("category")}>Category</button>
                    <button className = 'col-span-1' onClick={() => setChartCategory("monthly")}>Monthly</button>
                </div> */}
                <div className='chart-image-wrapper flex h-auto justify-center item-center p-1'>
                    {chartUrl && <img src={chartUrl} alt="Expense Chart" style={{ width: "450px", height: "300px" }} />}
                </div>
                <div className = 'chart-button-wrapper grid grid-cols-3 gap-2 p-1 mx-4 text-l'>
                    <button className = 'col-span-1 border rounded-2xl' onClick={() => fetchChart("bar",user_email,chartCategory)}>Bar Chart</button>
                    <button className = 'col-span-1 border rounded-2xl' onClick={() => fetchChart("line",user_email,chartCategory)}>Line Chart</button>
                    <button className = 'col-span-1 border rounded-2xl' onClick={() => fetchChart("pie",user_email,chartCategory)}>Pie Chart</button>
                </div>
            </div>
        </>
     );
}

export default CategoryChart;