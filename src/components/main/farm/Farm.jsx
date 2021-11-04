import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
// import Mainbox from "./Mainbox";
import Farmbox from "./Farmbox";
import Orders from "./Orders";
import PerformStake from "./Performstake";
import Stake from "./Stake";
import Unstake from "./Unstake";

function Farm(props) {
  let { path } = useRouteMatch();
  const {
    creoBal,
    lpBal,
    stake,
    unStake,
    creolp,
    lplp,
    lpcreo,
    harvest,
    creoToken,
    lpToken,
    approve,
    approving,
    staking,
    unstaking,
    provider,
    explorer,
    address,
    harvestingcreolpPool,
    harvestinglplpPool,
    harvestinglpcreoPool,
  } = props;
  return (
    <main className="main">
      <div className="container">
        <Switch>
          <Route exact path={path}>
            <Farmbox
              creoBal={creoBal}
              creolp={creolp}
              lplp={lplp}
              lpcreo={lpcreo}
            />
          </Route>
          <Route exact path={`${path}/stake`}>
            <Stake />
          </Route>
          <Route path={`${path}/stake/:stakeId`}>
            <PerformStake
              approving={approving}
              staking={staking}
              provider={provider}
              explorer={explorer}
              address={address}
              creoBal={creoBal}
              lpBal={lpBal}
              stake={stake}
              approve={approve}
              creolp={creolp}
              lplp={lplp}
              lpcreo={lpcreo}
              creoToken={creoToken}
              lpToken={lpToken}
            />
          </Route>
          <Route path={`${path}/unstake/:unstakeId`}>
            <Unstake
              explorer={explorer}
              creoBal={creoBal}
              lpBal={lpBal}
              unStake={unStake}
              creolp={creolp}
              lplp={lplp}
              lpcreo={lpcreo}
              unstaking={unstaking}
            />
          </Route>
          <Route path={`${path}/orders`}>
            <Orders
              creolp={creolp}
              lplp={lplp}
              lpcreo={lpcreo}
              explorer={explorer}
              harvest={harvest}
              harvestingcreolpPool={harvestingcreolpPool}
              harvestinglplpPool={harvestinglplpPool}
              harvestinglpcreoPool={harvestinglpcreoPool}
            />
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default Farm;
