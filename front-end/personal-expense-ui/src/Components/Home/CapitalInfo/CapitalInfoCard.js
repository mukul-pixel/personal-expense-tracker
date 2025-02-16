function CapitalInfoCard({ name, amount, onOpenIncome, onOpenExpense }) {
    const capitalizeName = name.charAt(0).toUpperCase()+name.slice(1)
    return ( 
    <>
    <div className = 'card-wrapper col-span-1 h-60'>
        <div className = {`ledger-details-wrapper flex flex-col justify-between h-3/4 rounded-2xl p-3 ${name === 'expense' ? 'bg-red-300' : 'bg-green-300 text-green-700'}  ${name === 'expense' ? 'text-red-700' : 'text-green-700'}` }>
            <div className = 'capital-category text-2xl row-span-2 font-semibold'>
                {capitalizeName} -
            </div>
            <div className = 'capital-amount text-3xl row-span-1 font-bold'>
                <pre>Rs {amount}</pre>
            </div>
        </div>
        <button onClick = {name === 'expense'? onOpenExpense:onOpenIncome} className = {`ledger-buttons border w-full flex justify-between items-center rounded-xl py-1 px-4  mt-2 ${name === 'expense' ? 'border-red-200' : 'border-green-200'}`}>
            <div className = 'ledger-button-text'>
                <pre>Add {capitalizeName}</pre>
            </div>
            <div className = 'ledger-button-icon font-semibold text-end m-2'>
                +
            </div>
        </button>
    </div>
    </> 
    );
}

export default CapitalInfoCard;