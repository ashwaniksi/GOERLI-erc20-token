require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const GOERLI_RPC_URL =
  process.env.GOERLI_RPC_URL ||
  "https://eth-goerli.alchemyapi.io/v2/your-api-key"
const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL ||
  "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY
// optional
const MNEMONIC = process.env.MNEMONIC || "your mnemonic"

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY =
  process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"
//const REPORT_GAS = process.env.REPORT_GAS.toLowerCase() = "true"

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // // If you want to do some forking, uncomment this
      // forking: {
      //   url: MAINNET_RPC_URL
      // },
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      //accounts: {
      //     mnemonic: MNEMONIC,
      // },
      saveDeployments: true,
      chainId: 5,
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      //   accounts: {
      //     mnemonic: MNEMONIC,
      //   },
      saveDeployments: true,
      chainId: 1,
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 137,
    },
  },
  etherscan: {
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      //polygon: POLYGONSCAN_API_KEY,
    },
  },
  /*gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },*/
  contractSizer: {
    runOnCompile: false,
    only: ["OurToken"],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    user1: {
      default: 1,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
}
/*
hh deploy 
Nothing to compile
deploying "OurToken" (tx: 0xdd49e2c21cdeac8bc21721587c9a87c5fe4986c43ce5b7ceacac49f883799aa6)...: deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 with 1176368 gas
ourToken deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3

hh deploy --network goerli
Nothing to compile
deploying "OurToken" (tx: 0x141cd36833ddb2e6f4ddd1642268bd47a1414219bd6d2f8d672d087a52c7267b)...: deployed at 0x890150AE24E1C55C430E23cffA8d8A66BDf0791c with 1176368 gas
ourToken deployed at 0x890150AE24E1C55C430E23cffA8d8A66BDf0791c
Verifying contract...
Nothing to compile
NomicLabsHardhatPluginError: More than one contract was found to match the deployed bytecode.
Please use the contract parameter with one of the following contracts:
  * @openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20
  * contracts/OurToken.sol:OurToken

For example:

  hardhat verify --contract contracts/Example.sol:ExampleContract <other args>

If you are running the verify subtask from within Hardhat instead:

  await run("verify:verify", {
    <other args>,
    contract: "contracts/Example.sol:ExampleContract"
  };
    at inferContract (/home/ashwani/hh-Javascript/hh-erc20/node_modules/@nomiclabs/hardhat-etherscan/src/index.ts:594:11)
    at SimpleTaskDefinition.action (/home/ashwani/hh-Javascript/hh-erc20/node_modules/@nomiclabs/hardhat-etherscan/src/index.ts:729:31)
    at Environment._runTaskDefinition (/home/ashwani/hh-Javascript/hh-erc20/node_modules/hardhat/src/internal/core/runtime-environment.ts:311:14)
    at Environment.run (/home/ashwani/hh-Javascript/hh-erc20/node_modules/hardhat/src/internal/core/runtime-environment.ts:159:14)
    at SimpleTaskDefinition.verifySubtask [as action] (/home/ashwani/hh-Javascript/hh-erc20/node_modules/@nomiclabs/hardhat-etherscan/src/index.ts:267:60)
    at Environment._runTaskDefinition (/home/ashwani/hh-Javascript/hh-erc20/node_modules/hardhat/src/internal/core/runtime-environment.ts:311:14)
    at Environment.run (/home/ashwani/hh-Javascript/hh-erc20/node_modules/hardhat/src/internal/core/runtime-environment.ts:159:14)
    at verify (/home/ashwani/hh-Javascript/hh-erc20/helper-functions.js:9:5)
    at Object.module.exports [as func] (/home/ashwani/hh-Javascript/hh-erc20/deploy/01-deploy-token.js:26:5)
    at DeploymentsManager.executeDeployScripts (/home/ashwani/hh-Javascript/hh-erc20/node_modules/hardhat-deploy/src/DeploymentsManager.ts:1219:22)

 */