// import {Link} from 'react-router-dom';
import CategoryChart from './ExpenseChart/CategoryChart';
import IncomeChart from './IncomeChart';
import SavingsChart from './SavingsChart/SavingsChart';

function AnalyseCard({prop}) {
    // const url_suffix = ('analyse_'+String(prop)).toLowerCase();

    return ( 
        <>
        {/* <Link to = {`/analyse/${url_suffix}`} > */}
            <div className = 'card-wrapper flex rounded-md border p-2 col-span-1 h-100'>
                {/* <div className = 'capital-category text-2xl'>
                    Analyse Your {prop}
                </div> */}
                {prop === 'Income'?(
                    <IncomeChart/>
                ):
                prop === 'Expense'?(
                    <CategoryChart/>
                ):(
                    <SavingsChart/> 
                )}
            </div>
        {/* </Link> */}
        </>
     );
}

export default AnalyseCard;