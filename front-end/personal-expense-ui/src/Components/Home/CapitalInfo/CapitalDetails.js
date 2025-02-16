import { useEffect, useState } from "react";
import axios from "axios";
import CapitalInfoCard from "./CapitalInfoCard";
import SavingInfoCard from "./SavingInfoCard";
import AddLedgerModal from "../../Modals/AddLedgerModal";

function CapitalDetails() {
    const email = localStorage.getItem('email');
    const [categoryList, setCategoryList] = useState([
        { name: "income", amount: "0" },
        { name: "expense", amount: "0" },
        { name: "savings", amount: "0" }
    ]);
    
    const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [incomeAmount, setIncomeAmount] = useState("");
    const [expenseCategory, setExpenseCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/add_ledger/getLedgerInfo", {
            params: { email: email }
        })
        .then((response) => {
            const { current_income, total_expense } = response.data;
            setCategoryList([
                { name: "income", amount: current_income },
                { name: "expense", amount: total_expense },
                { name: "savings", amount: current_income - total_expense }
            ]);
        })
        .catch((error) => {
            console.error("Error fetching ledger info:", error);
        });
    }, [email]);

    const handleIncomeSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/add_ledger/addIncome', { incomeAmount, user_id: email })
            .then(res => {
                if (res.status === 200) {
                    console.log("Income added successfully");
                    setIsIncomeModalOpen(false);
                }
            })
            .catch(error => console.error(error));
    };

    const handleExpenseSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5000/add_ledger/addExpense', { category: expenseCategory, amount: expenseAmount, user_id: email })
            .then(res => {
                if (res.status === 200) {
                    console.log("Expense added successfully");
                    setIsExpenseModalOpen(false);
                }
            })
            .catch(error => console.error(error));
    };

    return (
        <>
            <div className='grid grid-cols-3  gap-4 p-7'>
                {categoryList.map((item, index) => (
                    item.name === 'savings' ?
                        <SavingInfoCard key={index} {...item} /> :
                        <CapitalInfoCard key={index} {...item} 
                            onOpenIncome={() => setIsIncomeModalOpen(true)}
                            onOpenExpense={() => setIsExpenseModalOpen(true)}
                        />
                ))}
            </div>

            {/* Income Modal */}
            {isIncomeModalOpen && (
                <AddLedgerModal title="Income Details" isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)}>
                    <label className="text-bold mt-2">Update/Add Income</label>
                    <input
                        className="border w-full p-2 my-2 rounded-md"
                        placeholder="Add income"
                        type='number'
                        onChange={(e) => setIncomeAmount(e.target.value)}
                    />
                    <button onClick={handleIncomeSubmit} className="py-2 px-6 bg-blue-500 rounded-md">UPDATE</button>
                </AddLedgerModal>
            )}

            {/* Expense Modal */}
            {isExpenseModalOpen && (
                <AddLedgerModal title="Expense Details" isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)}>
                    <label className="text-bold mt-2">Select Expense Category</label>
                    <select className="border w-full p-2 my-2 rounded-md" onChange={(e) => setExpenseCategory(e.target.value)}>
                        <option value="">Choose an expense type...</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="utilities">Utilities</option>
                        <option value="others">Others</option>
                    </select>
                    <label className="text-bold mt-2">Add Expense Amount</label>
                    <input
                        className="border w-full p-2 my-2 rounded-md"
                        placeholder="Expense amount"
                        type='number'
                        onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                    <button onClick={handleExpenseSubmit} className="py-2 px-6 bg-blue-500 rounded-md">ADD</button>
                </AddLedgerModal>
            )}
        </>
    );
}

export default CapitalDetails;
