function SavingInfoCard({name,amount}) {
    return (
        <>
            <div className = 'saving-info-wrapper flex flex-col justify-between rounded-2xl col-span-1 p-3 bg-indigo-200 text-indigo-800'>
                <div className = 'saving-header text-2xl font-semibold'>
                    {name.charAt(0).toUpperCase()+name.slice(1)}
                </div>
                <div className = 'saving-amount-wrapper text-4xl font-bold'>
                    <pre>Rs {amount}</pre>
                </div>
            </div>
        </>
      );
}

export default SavingInfoCard;