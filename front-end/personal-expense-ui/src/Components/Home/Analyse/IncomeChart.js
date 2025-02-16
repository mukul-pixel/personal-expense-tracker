import { useState, useEffect } from "react";
import axios from "axios";

function IncomeChart() {
    const [chartUrl,setChartUrl] = useState();
    const user_email = localStorage.getItem('email');

    useEffect(()=>{
        if(user_email){
            fetchChart("bar",user_email);
        }
    },[user_email]);

    const fetchChart = (type,user_email) => {
        axios.get(`http://127.0.0.1:5000/income/analyse_income?type=${type}&user_email=${user_email}`, { responseType: 'blob' })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                console.log(imageUrl);
                setChartUrl(imageUrl);
            })
            .catch(error => console.error("Error fetching chart:", error));
    }
    return ( 
        <>
            <div className = 'income-chart-component-wrapper'>
                <h2 className = 'income-analyse-page-heading p-1 mx-5 text-3xl'>Income</h2>
                <div className='chart-image-wrapper flex h-auto justify-center item-center p-1'>
                    {chartUrl && <img src={chartUrl} alt="Expense Chart" style={{ width: "450px", height: "300px" }} />}
                </div>
                <div className = 'chart-button-wrapper grid grid-cols-3 gap-2 p-1 text-l mx-4'>
                    <button className = 'col-span-1 border rounded-2xl' onClick={() => fetchChart("bar",user_email)}>Bar Chart</button>
                    <button className = 'col-span-1 border rounded-2xl' onClick={() => fetchChart("line",user_email)}>Line Chart</button>
                    <button className = 'col-span-1 border rounded-2xl' onClick={() => fetchChart("line",user_email)}>Chart</button>
                </div>
            </div>
        </>
     );
}

export default IncomeChart;