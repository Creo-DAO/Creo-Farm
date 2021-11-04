import utils from "web3-utils";
import * as getData from "./getParamDatas";

export async function getTokenBal(provider, contract, params = []) {
  const data = getData.gettokenBalData(params[0]);
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let bal = utils.hexToNumberString(response);
  bal = utils.fromWei(bal, "ether");
  return bal;
}
export async function getAllowance(provider, contract, params = []) {
  const data = getData.getAllowanceData(params[0], params[1]);
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let allowed = utils.hexToNumberString(response);
  allowed = utils.fromWei(allowed, "ether");
  return allowed;
}
export async function getIsStaking(provider, contract, params = []) {
  const data = getData.getisStakingData(params[0]);
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let isStaking = +response;
  isStaking = Boolean(isStaking);
  return isStaking;
}
export async function getStakingBal(provider, contract, params = []) {
  const data = getData.getstakingBalData(params[0]);
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let stakebal = utils.hexToNumberString(response);
  stakebal = utils.fromWei(stakebal, "ether");
  return stakebal;
}
export async function getApr(provider, contract) {
  const data = getData.getAprData();
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let apr = utils.hexToNumberString(response);
  apr = utils.fromWei(apr, "ether");
  return apr;
}
export async function getFarmActive(provider, contract) {
  const data = getData.getfarmActiveData();
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let active = +response;
  active = Boolean(active);
  return active;
}
export async function getFarmBal(provider, contract) {
  const data = getData.getfarmBalData();
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let farmBal = utils.hexToNumberString(response);
  farmBal = utils.fromWei(farmBal, "ether");
  return farmBal;
}
export async function getStartTime(provider, contract, params = []) {
  const data = getData.getstartTimeData(params[0]);
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let time = utils.hexToNumberString(response);
  return time;
}
export async function getStakedTime(provider, contract, params = []) {
  const data = getData.getstakedTimeData(params[0]);
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let time = utils.hexToNumberString(response);
  return time;
}
export async function getRewardsBal(provider, contract, params = []) {
  const data = getData.getrewardBalData(params[0]);
  let response = await provider.request({
    method: "eth_call",
    params: [
      {
        to: contract,
        data: data,
      },
      "latest",
    ],
  });
  let rewards = utils.hexToNumberString(response);
  rewards = utils.fromWei(rewards, "ether");
  return rewards;
}
export async function sendPerformApproval(provider, contract, params = []) {
  const data = getData.getPerfromApprovalData(params[1], params[2]);
  try {
    let response = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: params[0],
          to: contract,
          data: data,
        },
        "latest",
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
}
export async function sendPerformStake(provider, contract, params = []) {
  const data = getData.getPerfromStakeData(params[1]);
  try {
    let response = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: params[0],
          to: contract,
          data: data,
        },
        "latest",
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
}
export async function sendPerformUnstake(provider, contract, params = []) {
  const data = getData.getPerfromUnstakeData(params[1]);
  try {
    let response = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: params[0],
          to: contract,
          data: data,
        },
        "latest",
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
}
export async function sendPerformHarvest(provider, contract, params = []) {
  const data = getData.getPerfromHarvestData();
  try {
    let response = await provider.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: params[0],
          to: contract,
          data: data,
        },
        "latest",
      ],
    });
    return response;
  } catch (error) {
    return error;
  }
}
// ethereum
//   .request({
//     method: "eth_sendTransaction",
//     params: [
//       {
//         from: ethereum.selectedAddress,
//         to: '0x7e05da1094cc94f99afda2c256d815ee8f753d7f',
//         data: "0x095ea7b300000000000000000000000004c061CFe47E5800082A51a49F26A800dDe00A180000000000000000000000000000000000000000000000000000000000000064",
//       },
//     ],
//   })
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
// ethereum
//   .request({
//     method: "eth_call",
//     params: [
//       {
//         to: "0x04c061CFe47E5800082A51a49F26A800dDe00A18",
//         data: "0xb23a0612",
//       },
//       "latest",
//     ],
//   })
//   .then((res) => console.log(res));
// 0x70a08231000000000000000000000000d9a45c353b750c92568c4138ade24648ccdfb074;
