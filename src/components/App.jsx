import React, { Component } from "react";
import "./styles/App.css";
import Navbar from "./header/Navbar";
import Farm from "./main/farm/Farm";
import Backdrop from "@mui/material/Backdrop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./footer/Footer";
import { Route, Switch } from "react-router-dom";
import FarmStats from "./main/farm-stats/FarmStats";
import utils from "web3-utils";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import getChainData from "./helpers/supportedChains";
import * as rpcCall from "./helpers/rpcmethodCall";
import copy from "copy-to-clipboard";
import Errorpage from "./main/farm/Error";

const initialState = {
  error: {
    open: false,
    message: null,
  },
  modalOpen: false,
  loading: false,
  approving: null,
  staking: null,
  unstaking: null,
  harvestingcreolpPool: null,
  harvestinglplpPool: null,
  harvestinglpcreoPool: null,
  address: "",
  provider: null,
  explorer: null,
  connected: false,
  chainId: 4,
  networkId: 4,
  result: null,
  creoToken: null,
  lpToken: null,
  creoBal: null,
  lpBal: null,
  creoLpFarm: null,
  lpLpFarm: null,
  lpCreoFarm: null,
  creolpPool: {
    active: false,
    farm: null,
    isStaking: null,
    farmAppr: null,
    stakingBal: null,
    apr: null,
    farmBal: null,
    earned: null,
  },
  lplpPool: {
    active: false,
    farm: null,
    isStaking: null,
    farmAppr: null,
    stakingBal: null,
    apr: null,
    farmBal: null,
    earned: null,
  },
  lpcreoPool: {
    active: false,
    farm: null,
    isStaking: null,
    farmAppr: null,
    stakingBal: null,
    apr: null,
    farmBal: null,
    earned: null,
  },
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions(),
    });
  }
  async componentDidMount() {
    await this.onConnect();
  }
  getNetwork() {
    return getChainData(this.state.chainId).network;
  }
  getProviderOptions() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.REACT_APP_INFURA_ID,
        },
      },
    };
    return providerOptions;
  }
  getEarned(stakingBal, startTime, stakedTime, apr) {
    let totalTime = +new Date() / 1000 - startTime;
    const allTime = totalTime + stakedTime;
    if (allTime > 1209600) {
      const excess = allTime - 1209600;
      totalTime -= excess;
    }
    let timeStaked = totalTime / 300;
    timeStaked = timeStaked.toFixed(0);
    const dailyInt = apr / 8736 / 100;
    const earned = stakingBal * dailyInt * timeStaked;
    return earned;
  }

  async onConnect() {
    const provider = await this.web3Modal.connect();
    await this.subscribeProvider(provider);

    const accounts = await provider.request({ method: "eth_accounts" });
    const address = accounts[0];

    const networkId = await provider.request({ method: "net_version" });
    const chainId = await provider.request({ method: "eth_chainId" });
    let explorer, creoToken, lpToken, creoLpFarm, lpLpFarm, lpCreoFarm;

    try {
      await getChainData(Number(chainId));
      if (+chainId === 4) {
        explorer = "https://rinkeby.etherscan.io/";
      } else if (+chainId === 97) {
        explorer = "https://testnet.bscscan.com/";
        creoToken = "0xb95f7560108684Be14982C54d64044021258331f";
        lpToken = "0x01c585d0e8F077F9Ec411b56e02EDf9e6c199b37";
        creoLpFarm = "0x26051b4A8DDDF32722f61Ea256D0d7424A417C7E";
        lpLpFarm = "0x349b83861f28B0Af908a124c84595D4025c06Cef";
        lpCreoFarm = "0x0382B6Dfeec3Fb97f00786f6D66b430caCB65E3c";
      } else if (+chainId === 56) {
        explorer = "https://bscscan.com/";
      }
      await this.setState({
        provider,
        explorer,
        connected: true,
        address,
        chainId,
        networkId,
        creoToken,
        lpToken,
        creoLpFarm,
        lpLpFarm,
        lpCreoFarm,
      });
      await this.getAccountAssets();
    } catch (err) {
      if (err !== undefined) {
        const message = err.message;
        if (message.includes("ChainId missing")) {
          this.setState({
            error: {
              open: true,
              message: "Unsupported Chain, please switch to BSC",
            },
          });
        } else if (message.includes("Cannot read properties")) {
          this.setState({
            error: {
              open: true,
              message:
                "Contracts not available for this chain.  Please switch chains and reload page.",
            },
          });
        }
      }
    }
  }
  async subscribeProvider(provider) {
    if (!provider.on) {
      return;
    }
    provider.on("disconnect", () => this.resetApp());
    provider.on("accountsChanged", async (accounts) => {
      await this.setState({ address: accounts[0] });
      await this.getAccountAssets();
    });
    provider.on("chainChanged", async (chainId) => {
      window.location.reload();
    });
  }
  async getPool(token, farm, address) {
    const { provider } = this.state;
    const apprv = await rpcCall.getAllowance(provider, token, [address, farm]);
    const isStaking = await rpcCall.getIsStaking(provider, farm, [address]);
    const stakingBal = await rpcCall.getStakingBal(provider, farm, [address]);
    const apr = await rpcCall.getApr(provider, farm);
    const active = await rpcCall.getFarmActive(provider, farm);
    const farmBal = await rpcCall.getFarmBal(provider, farm);
    const startTime = await rpcCall.getStartTime(provider, farm, [address]);
    const stakedTime = await rpcCall.getStartTime(provider, farm, [address]);
    const rewardsBal = await rpcCall.getRewardsBal(provider, farm, [address]);
    const earned = await this.getEarned(stakingBal, startTime, stakedTime, apr);
    return {
      farm,
      active,
      isStaking,
      farmAppr: apprv,
      stakingBal,
      apr,
      farmBal,
      earned: +earned + +rewardsBal,
    };
  }
  async getAccountAssets() {
    const {
      creoToken,
      address,
      lpToken,
      creoLpFarm,
      lpLpFarm,
      lpCreoFarm,
      provider,
    } = this.state;
    this.setState({ loading: true });
    if (
      creoToken &&
      address &&
      lpToken &&
      creoLpFarm &&
      lpLpFarm &&
      lpCreoFarm
    ) {
      const bal = await rpcCall.getTokenBal(provider, creoToken, [address]);
      const lpBal = await rpcCall.getTokenBal(provider, lpToken, [address]);
      const creolpPool = await this.getPool(creoToken, creoLpFarm, address);
      const lplpPool = await this.getPool(lpToken, lpLpFarm, address);
      const lpcreoPool = await this.getPool(lpToken, lpCreoFarm, address);
      await this.setState({
        loading: false,
        creoBal: bal,
        lpBal: lpBal,
        creolpPool,
        lplpPool,
        lpcreoPool,
      });
    } else {
      this.setState({
        loading: false,
        error: {
          open: true,
          message:
            "Contracts not available for this chain.  Please switch chains and reload page.",
        },
      });
      return;
    }
  }
  async resetApp() {
    await this.web3Modal.clearCachedProvider();
    this.setState({ ...initialState });
  }
  async stake(params, pool, tokenType) {
    const amount = params[0],
      checked = params[1];
    const { farm, active, farmBal } = this.state[pool];
    const { address, provider } = this.state;
    if (active === false) {
      this.setState({
        error: {
          open: true,
          message: "Farm is currently inactive.",
        },
      });
      return;
    } else if (checked === false) {
      this.setState({
        error: {
          open: true,
          message: `Please accept terms to continue.`,
        },
      });
      return;
    } else if (
      +utils.fromWei(amount, "ether") > +this.state[`${tokenType}Bal`]
    ) {
      this.setState({
        error: {
          open: true,
          message: `Insufficient ${tokenType} balance.`,
        },
      });
      return;
    } else if (+utils.fromWei(amount, "ether") < 5 && tokenType === "creo") {
      this.setState({
        error: {
          open: true,
          message: `Minimum amount to stake is 5 ${tokenType}.`,
        },
      });
      return;
    } else if (+farmBal < 1) {
      this.setState({
        error: {
          open: true,
          message: `Farm rewards fully claimed.`,
        },
      });
      return;
    } else if (+utils.fromWei(amount, "ether") <= 0) {
      this.setState({
        error: {
          open: true,
          message: `Cannot stake 0 amount`,
        },
      });
      return;
    } else {
      const resp = await rpcCall.sendPerformStake(provider, farm, [
        address,
        amount,
      ]);
      if (utils.isHexStrict(resp)) {
        this.setState({ staking: true });
        const hash = resp;
        let receipt = await provider.request({
          method: "eth_getTransactionReceipt",
          params: [hash],
        });
        let count = 0;
        while (receipt === null && count < 500) {
          receipt = await provider.request({
            method: "eth_getTransactionReceipt",
            params: [hash],
          });
          count++;
        }
        await this.getAccountAssets();
        // eslint-disable-next-line
        this.state[pool].currStkHash = hash;
        if (!receipt) {
          this.state[pool].currStkStatus = "toolong";
        } else {
          receipt.status === "0x1"
            ? // eslint-disable-next-line
              (this.state[pool].currStkStatus = "success")
            : // eslint-disable-next-line
              (this.state[pool].currStkStatus = "failed");
        }
        this.setState({ staking: false });
        setTimeout(() => {
          this.setState({ staking: null });
          // eslint-disable-next-line
          this.state[pool].currStkHash = null;
          // eslint-disable-next-line
          this.state[pool].currStkStatus = null;
        }, 7000);
      } else {
        this.setState({
          error: {
            open: true,
            message: `${resp.message}`,
          },
        });
      }
    }
  }
  async approve(amount, token, pool) {
    const { address, provider } = this.state;
    const { farm } = this.state[pool];
    if (!farm) {
      this.setState({
        error: {
          open: true,
          message: `No farm contract available`,
        },
      });
      return;
    }
    const resp = await rpcCall.sendPerformApproval(provider, token, [
      address,
      farm,
      amount,
    ]);
    if (utils.isHexStrict(resp)) {
      this.setState({ approving: true });
      const hash = resp;
      let receipt = await provider.request({
        method: "eth_getTransactionReceipt",
        params: [hash],
      });
      let count = 0;
      while (receipt === null && count < 500) {
        receipt = await provider.request({
          method: "eth_getTransactionReceipt",
          params: [hash],
        });
        count++;
      }
      await this.getAccountAssets();
      // eslint-disable-next-line
      this.state[pool].currApprHash = hash;
      if (!receipt) {
        this.state[pool].currApprStatus = "toolong";
      } else {
        receipt.status === "0x1"
          ? // eslint-disable-next-line
            (this.state[pool].currApprStatus = "success")
          : // eslint-disable-next-line
            (this.state[pool].currApprStatus = "failed");
      }
      this.setState({ approving: false });
      setTimeout(() => {
        this.setState({ approving: null });
        // eslint-disable-next-line
        this.state[pool].currApprHash = null;
        // eslint-disable-next-line
        this.state[pool].currApprStatus = null;
      }, 7000);
    } else {
      this.setState({
        error: {
          open: true,
          message: `${resp.message}`,
        },
      });
    }
  }
  async unStake(amount, pool) {
    const { farm, isStaking, stakingBal } = this.state[pool];
    const { address, provider } = this.state;
    if (isStaking === false) {
      this.setState({
        error: {
          open: true,
          message: "User not found in staking list.",
        },
      });
      return;
    } else if (+utils.fromWei(amount, "ether") <= 0) {
      this.setState({
        error: {
          open: true,
          message: "Cannot unstake 0 amount.",
        },
      });
      return;
    } else if (+utils.fromWei(amount, "ether") > +stakingBal || !stakingBal) {
      this.setState({
        error: {
          open: true,
          message: "Amount exceeds staking balance.",
        },
      });
      return;
    } else {
      const resp = await rpcCall.sendPerformUnstake(provider, farm, [
        address,
        amount,
      ]);
      if (utils.isHexStrict(resp)) {
        this.setState({ unstaking: true });
        const hash = resp;
        let receipt = await provider.request({
          method: "eth_getTransactionReceipt",
          params: [hash],
        });
        let count = 0;
        while (receipt === null && count < 500) {
          receipt = await provider.request({
            method: "eth_getTransactionReceipt",
            params: [hash],
          });
          count++;
        }
        await this.getAccountAssets();
        // eslint-disable-next-line
        this.state[pool].currUstkHash = hash;
        if (!receipt) {
          this.state[pool].currUstkStatus = "toolong";
        } else {
          receipt.status === "0x1"
            ? // eslint-disable-next-line
              (this.state[pool].currUstkStatus = "success")
            : // eslint-disable-next-line
              (this.state[pool].currUstkStatus = "failed");
        }
        this.setState({ unstaking: false });
        setTimeout(() => {
          this.setState({ unstaking: null });
          // eslint-disable-next-line
          this.state[pool].currUstkHash = null;
          // eslint-disable-next-line
          this.state[pool].currUstkStatus = null;
        }, 7000);
      } else {
        this.setState({
          error: {
            open: true,
            message: `${resp.message}`,
          },
        });
      }
    }
  }
  async harvest(pool) {
    const { farm } = this.state[pool];
    const { address, provider } = this.state;
    const resp = await rpcCall.sendPerformHarvest(provider, farm, [address]);
    if (utils.isHexStrict(resp)) {
      this.setState({ [`harvesting${pool}`]: true });
      const hash = resp;
      let receipt = await provider.request({
        method: "eth_getTransactionReceipt",
        params: [hash],
      });
      let count = 0;
      while (receipt === null && count < 500) {
        receipt = await provider.request({
          method: "eth_getTransactionReceipt",
          params: [hash],
        });
        count++;
      }
      await this.getAccountAssets();
      this.state[pool].currHrvHash = hash;
      if (!receipt) {
        this.state[pool].currHrvStatus = "toolong";
      } else {
        receipt.status === "0x1"
          ? // eslint-disable-next-line
            (this.state[pool].currHrvStatus = "success")
          : // eslint-disable-next-line
            (this.state[pool].currHrvStatus = "failed");
      }
      this.setState({ [`harvesting${pool}`]: false });
      setTimeout(() => {
        this.setState({ [`harvesting${pool}`]: null });
        // eslint-disable-next-line
        this.state[pool].currHrvHash = null;
        // eslint-disable-next-line
        this.state[pool].currHrvStatus = null;
      }, 7000);
    } else {
      this.setState({
        error: {
          open: true,
          message: `${resp.message}`,
        },
      });
    }
  }
  errorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      error: {
        open: false,
        message: null,
      },
    });
  };

  openModal() {
    return (e) => {
      e.preventDefault();
      this.setState({ modalOpen: true });
    };
  }
  modalClose = (e) => {
    this.setState({ modalOpen: false });
  };
  copyAddress = (e) => {
    e.preventDefault();
    copy(this.state.address);
    this.setState({
      error: {
        open: true,
        message: "Address copied",
      },
    });
  };
  render() {
    const onOpen =
      this.state.loading ||
      this.state.approving ||
      this.state.staking ||
      this.state.unstaking ||
      this.state.harvestingcreolpPool ||
      this.state.harvestinglplpPool ||
      this.state.harvestinglpcreoPool;
    return (
      <div>
        <Navbar
          connect={this.onConnect.bind(this)}
          acct={this.state.address}
          openModal={this.openModal.bind(this)}
        />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={onOpen || false}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Modal
          open={this.state.modalOpen}
          onClose={this.modalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className="py-3 px-2 addr-pop"
            sx={{
              outline: "none",
              borderRadius: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
            }}
          >
            <div className="d-flex justify-content-between">
              <h6> Account </h6>{" "}
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={this.modalClose}
              />
            </div>
            <Box
              className="p-2 mt-1"
              sx={{
                outline: "none",
                borderRadius: "10px",
                width: "95%",
                bgcolor: "background.paper",
                border: "1px solid #000",
                height: "100%",
              }}
            >
              <div className="d-flex justify-content-between">
                <p className="fw-bold m-0">
                  Connected{" "}
                  <CheckCircleIcon
                    className="fs-6"
                    style={{ color: "green" }}
                  />
                </p>
                <p
                  onClick={() => this.resetApp()}
                  className="border border-danger px-2 fw-bold m-0"
                  style={{ borderRadius: "30px", cursor: "pointer" }}
                >
                  {" "}
                  disconnect
                </p>
              </div>
              <div className="d-flex mt-2">
                <p className="m-0 fs-4 fw-bold">
                  {" "}
                  {[
                    this.state.address?.slice(0, 7),
                    this.state.address?.slice(-5),
                  ].join("...")}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p
                  onClick={this.copyAddress}
                  className=" px-2 fw-light fs-6 m-0"
                  style={{ borderRadius: "30px", cursor: "pointer" }}
                >
                  <ContentCopyIcon className="fs-6 fw-lighter" /> Copy Address
                </p>
                <a
                  href={`${this.state.explorer}address/${this.state.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className=" px-2 fw-light fs-6 m-0 text-decoration-none"
                  style={{
                    borderRadius: "30px",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  <OpenInNewIcon className="fs-6 fw-lighter" /> View on explorer
                </a>
              </div>
            </Box>
          </Box>
        </Modal>
        <Snackbar
          open={this.state.error.open}
          autoHideDuration={7000}
          onClose={this.errorClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={this.errorClose}
            severity="info"
            sx={{ width: "100%" }}
          >
            {this.state.error.message || "error"}
          </Alert>
        </Snackbar>
        <Switch>
          <Route
            path="/"
            component={() => (
              <Farm
                address={this.state.address}
                approving={this.state.approving}
                staking={this.state.staking}
                unstaking={this.state.unstaking}
                harvestingcreolpPool={this.state.harvestingcreolpPool}
                harvestinglplpPool={this.state.harvestinglplpPool}
                harvestinglpcreoPool={this.state.harvestinglpcreoPool}
                provider={this.state.provider}
                explorer={this.state.explorer}
                creoBal={this.state.creoBal}
                lpBal={this.state.lpBal}
                creoToken={this.state.creoToken}
                lpToken={this.state.lpToken}
                creolp={this.state.creolpPool}
                lplp={this.state.lplpPool}
                lpcreo={this.state.lpcreoPool}
                approve={this.approve.bind(this)}
                stake={this.stake.bind(this)}
                unStake={this.unStake.bind(this)}
                harvest={this.harvest.bind(this)}
              />
            )}
            exact
          />
          <Route
            path="/farms"
            component={() => (
              <Farm
                address={this.state.address}
                approving={this.state.approving}
                staking={this.state.staking}
                unstaking={this.state.unstaking}
                harvestingcreolpPool={this.state.harvestingcreolpPool}
                harvestinglplpPool={this.state.harvestinglplpPool}
                harvestinglpcreoPool={this.state.harvestinglpcreoPool}
                provider={this.state.provider}
                explorer={this.state.explorer}
                creoBal={this.state.creoBal}
                lpBal={this.state.lpBal}
                creoToken={this.state.creoToken}
                lpToken={this.state.lpToken}
                creolp={this.state.creolpPool}
                lplp={this.state.lplpPool}
                lpcreo={this.state.lpcreoPool}
                approve={this.approve.bind(this)}
                stake={this.stake.bind(this)}
                unStake={this.unStake.bind(this)}
                harvest={this.harvest.bind(this)}
              />
            )}
          />
          <Route
            path="/farm-stats"
            component={() => (
              <FarmStats
                creolp={this.state.creolpPool}
                lplp={this.state.lplpPool}
                lpcreo={this.state.lpcreoPool}
                creoBal={this.state.creoBal}
                lpBal={this.state.lpBal}
                connect={this.onConnect.bind(this)}
                acct={this.state.address}
                openModal={this.openModal.bind(this)}
              />
            )}
          />
          <Route path="*" component={Errorpage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
