// import react from "react";
import { useState } from "react";
import AddLedgerModal from "../../Modals/AddLedgerModal";
import axios from "axios";

function AddLedgerCard() {
    const [isIncomeModalOpen,setIsIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen,setIsExpenseModalOpen] = useState(false);

    const [expenseCategory, setExpenseCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    const user_id = localStorage.getItem('email');

    const handleIncomeSubmit = (e)=>{
        e.preventDefault();
        console.log(incomeAmount);
        axios.post('http://127.0.0.1:5000/add_ledger/addIncome',{incomeAmount:incomeAmount,user_id:user_id})
        .then(res=>{
            if(res.status === 200){
                console.log("income added successfully");
            }else{
                console.log("error: ", res.data)
            }
        })
        .catch(
            error=>{console.error(error)}
        )
    }

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        console.log(expenseCategory,expenseAmount);
        axios.post('http://127.0.0.1:5000/add_ledger/addExpense',{category:expenseCategory,amount:expenseAmount, user_id:user_id})
        .then(res=>{
            if(res.status === 200){
                console.log("responses added successfully");
            }else{
                console.log("error: ",res.data);
            }
        })
        .catch(error => {
            console.error(error)
        })
    }

    return ( 
        <>
        <div className = 'add-ledger-wrap grid grid-cols-4 gap-4 p-7 my-4'>
            <div className = 'add-ledger-card h-30 flex items-center border rounded-md justify-center col-span-2'>
                <button onClick = {()=>{setIsIncomeModalOpen(true)}}> 
                    <span className = 'text-xl'>⟳</span> 
                    income
                </button>
            </div>
            <div className = 'add-ledger-card h-30 flex items-center border rounded-md justify-center col-span-2'>
                <button onClick = {()=>{setIsExpenseModalOpen(true)}}> 
                    <span className = 'text-xl'>+</span> 
                    expense
                </button>
            </div>

            {/* Income Modal */}
            {isIncomeModalOpen && (
                <AddLedgerModal
                    title="Income Details"
                    isOpen={isIncomeModalOpen}
                    onClose={() => setIsIncomeModalOpen(false)}
                >
                <label className="text-bold mt-2" htmlFor="income-input">
                Update/Add Income
                </label>
                <input
                    className="income-input border w-full p-2 my-2 rounded-md"
                    placeholder="Add income"
                    type = 'number'
                    onChange = {(e)=>{setIncomeAmount(e.target.value)}}
                />
                <div className="update-btn-wrapper my-4 text-center">
                    <button onClick = {handleIncomeSubmit} className="btn update-btn py-2 px-6 bg-blue-500 rounded-md">
                    UPDATE
                    </button>
                </div>
                </AddLedgerModal>
            )}

            {isExpenseModalOpen && (
                <AddLedgerModal
                title="Expense Details"
                isOpen={isExpenseModalOpen}
                onClose={() => setIsExpenseModalOpen(false)}
              >
                <label className="text-bold mt-2" htmlFor="expense-category-select">
                  Select Expense Category
                </label>
                <select
                  id="expense-category-select"
                  className="expense-category-select border w-full p-2 my-2 rounded-md"
                  onChange = { (e)=> setExpenseCategory(e.target.value)}
                >
                  <option value="">Choose an expense type...</option>
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="utilities">Utilities</option>
                  <option value="others">Others</option>
                </select>
        
                <label className="text-bold mt-2" htmlFor="expense-amount-input">
                  Add Expense Amount
                </label>
                <input
                  className="expense-amount-input border w-full p-2 my-2 rounded-md"
                  placeholder="Expense amount"
                  type = 'number'
                  onChange = { (e)=> setExpenseAmount(e.target.value)}
                />
                
                <div className="update-btn-wrapper my-4 text-center">
                  <button onClick = {handleExpenseSubmit} className="btn update-btn py-2 px-6 bg-blue-500 rounded-md">
                    ADD
                  </button>
                </div>
              </AddLedgerModal>
            )}
        </div>
        </>
     );
}

export default AddLedgerCard;