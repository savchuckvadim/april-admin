import { Route, Routes } from "react-router-dom"
import style from './Main.module.scss'
import NavMenuContainer from "./Nav-Menu/Nav-Menu-Container"
import ClientContainer from "./Clients/Client/ClientContainer"
import FieldsContainer from "./Fields/FieldsContainer"
import ClientsContainer from "./Clients/ClientsContainer"
import ProductsContainer from "./Products/ProductsContainer"
import ComplectsContainer from "./Complects/ComplectsContainer"
import SuppliesContainer from "./Supply/SuppliesContainer"
import RegionsContainer from "./Region/RegionsContainer"
import ContractsContainer from "./Contracts/ContractsContainer"
import ConsaltingContainer from "./Consalting/ConsaltingContainer"
import LegalTechContainer from "./LegalTech/LegalTechContainer"
import PriceContainer from "./Price/PriceContainer"
import Error from "../Elements/Error/Error"




const Main = () => {

    return (

        <main id={style.main}>
            <div className={style.container}>
                <div id={style.left__area}>
                    <div id={style.left__menu}>
                        <NavMenuContainer />
                    </div>
                </div>
                <div id={style.main__area}>
                    <Routes>


                        <Route path="fields" element={<FieldsContainer />} />

                        <Route path="clients" element={<ClientsContainer />} >

                        </Route>
                        <Route path="clients/add" element={<ClientContainer />} />
                        <Route path="clients/:clientId" element={<ClientContainer isNew={false} />} />
                        <Route path="clients/:add" element={<ClientContainer isNew={true} />} />
                        <Route path="clients/:error" element={<Error />} />
                        <Route path="products/" element={<ProductsContainer />} />
                        <Route path="supplies/" element={<SuppliesContainer />} />
                        <Route path="complects/" element={<ComplectsContainer />} />
                        <Route path="regions/" element={<RegionsContainer />} />
                        <Route path="contracts/" element={<ContractsContainer />} />
                        <Route path="consalting/" element={<ConsaltingContainer />} />
                        <Route path="legaltech/" element={<LegalTechContainer />} />
                        <Route path="prices/" element={<PriceContainer />} />
                    </Routes>

                </div>
            </div>



        </main>

    )
}

export default Main