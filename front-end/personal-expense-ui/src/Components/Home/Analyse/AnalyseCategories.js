import AnalyseCard from "./AnalyseCard";

function AnalyseCategories() {

    const category_list = ["Income","Expense","Savings"];

    return ( 
    <>
    <div className = 'mt-4 p-7'>
        <div className = 'font-bold text-3xl my-2'>Summary</div>
        <div className = 'grid grid-cols-3 gap-4 py-2'>
            {category_list.map((item, index)=>(
                <AnalyseCard key = {index} prop = {item} />
            ))}
        </div>
        </div>
    </> 
    );
}

export default AnalyseCategories;