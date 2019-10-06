import React from 'react';
import PageWrapper from '../wrappers/PageWrapper';
import Widget from '../../components/indexes/Widget';
import CustomClock from '../../components/clock/CustomClock';

import TinyAreaChart from '../../components/charts/TinyAreaChart';
import { subscribeToTotalOfUsers, subscribeToTotalOfOrders } from '../../modules/services/dashboard';

const Home = () => {
    return <PageWrapper>
        <div className="container-fluid">
            <div className="row m-2 d-flex justify-content-between">
                <Widget Chart={TinyAreaChart} icon="user-circle" iconColor="text-accent" label="Usuários" subscription={subscribeToTotalOfUsers} />
                <Widget Chart={TinyAreaChart} icon="shopping-cart" iconColor="text-accent" label="Total de Pedidos" subscription={subscribeToTotalOfOrders} />
                <Widget Chart={TinyAreaChart} icon="hand-holding-usd" iconColor="text-accent" label="Meta de Vendas" value={"1.7M"} />
                <Widget Chart={TinyAreaChart} icon="coins" iconColor="text-accent" label="Vendas do Dia" value={"45K"} />
            </div>               
            <div className="row pl-4 pr-4 pt-1">
                <div className="col-xl-12 pl-2 pr-2">
                    <div className="pt-2 pb-2 h-100">
                        <CustomClock />
                    </div>                        
                </div>
            </div>
        </div>
    </PageWrapper>
}

export default Home;