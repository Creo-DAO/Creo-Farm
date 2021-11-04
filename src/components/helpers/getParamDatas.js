import utils from "web3-utils";
export function gettokenBalData(addr = String) {
  let method = utils.sha3(`balanceOf(address)`).slice(0, 10),
    param1 = utils.padLeft(addr.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getAllowanceData(addr1 = String, addr2 = String) {
  let method = utils.sha3(`allowance(address,address)`).slice(0, 10),
    param1 = utils.padLeft(addr1.substring(2), 64),
    param2 = utils.padLeft(addr2.substring(2), 64),
    arr = [method, param1, param2];
  const data = arr.join("");
  return data;
}
export function getPerfromApprovalData(spender = String, amount = Number) {
  const bigAmt = amount.toString();
  let method = utils.sha3(`approve(address,uint256)`).slice(0, 10),
    amt = utils.toHex(bigAmt),
    param1 = utils.padLeft(spender.substring(2), 64),
    param2 = utils.padLeft(amt.substring(2), 64),
    arr = [method, param1, param2];
  const data = arr.join("");
  return data;
}
export function getPerfromStakeData(amount = Number) {
  const bigAmt = amount.toString();
  let method = utils.sha3(`stake(uint256)`).slice(0, 10),
    amt = utils.toHex(bigAmt),
    param1 = utils.padLeft(amt.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getPerfromUnstakeData(amount = Number) {
  const bigAmt = amount.toString();
  let method = utils.sha3(`unstake(uint256)`).slice(0, 10),
    amt = utils.toHex(bigAmt),
    param1 = utils.padLeft(amt.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getPerfromHarvestData() {
  let method = utils.sha3(`withdrawYield()`).slice(0, 10);
  const data = method;
  return data;
}
export function getisStakingData(addr = String) {
  let method = utils.sha3(`isStaking(address)`).slice(0, 10),
    param1 = utils.padLeft(addr.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getstakingBalData(addr = String) {
  let method = utils.sha3(`stakingBalance(address)`).slice(0, 10),
    param1 = utils.padLeft(addr.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getstartTimeData(addr = String) {
  let method = utils.sha3(`startTime(address)`).slice(0, 10),
    param1 = utils.padLeft(addr.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getstakedTimeData(addr = String) {
  let method = utils.sha3(`stakedTime(address)`).slice(0, 10),
    param1 = utils.padLeft(addr.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getrewardBalData(addr = String) {
  let method = utils.sha3(`rewardBalance(address)`).slice(0, 10),
    param1 = utils.padLeft(addr.substring(2), 64),
    arr = [method, param1];
  const data = arr.join("");
  return data;
}
export function getAprData() {
  let method = utils.sha3(`APR()`).slice(0, 10);
  const data = method;
  return data;
}
export function getfarmActiveData() {
  let method = utils.sha3(`farmActive()`).slice(0, 10);
  const data = method;
  return data;
}
export function getfarmBalData() {
  let method = utils.sha3(`farmBalance()`).slice(0, 10);
  const data = method;
  return data;
}

// 0xd9a45c353b750c92568c4138ade24648ccdfb074;
// 0x04c061cfe47e5800082a51a49f26a800dde00a18;
// 6f49712b
