// import AddLedgerCard from "./AddLedger/AddLedgerCard";
import AnalyseCategories from "./Analyse/AnalyseCategories";
import CapitalDetails from "./CapitalInfo/CapitalDetails";
import Greetings from "./Greetings/Greetings";
import Homenavbar from "./Homenavbar";


function Home() {
    return ( <>
        <Homenavbar/>
        <Greetings/>
        <CapitalDetails/>
        {/* <AddLedgerCard/> */}
        <AnalyseCategories/>
    </>
    );
}

export default Home;