// hardhat.config.js
require("dotenv/config")
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-solhint")
// require("@nomiclabs/hardhat-solpp")
require("@tenderly/hardhat-tenderly")
require("@nomiclabs/hardhat-waffle")
require("hardhat-abi-exporter")
require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("hardhat-gas-reporter")
require("hardhat-spdx-license-identifier")
require("hardhat-watcher")
require("solidity-coverage")

const { task } = require("hardhat/config")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const { removeConsoleLog } = require("hardhat-preprocessor")

const accounts = ["a515318d067530ba1dfbebcf00ad549eaa90b0d334dd324cdf3d739cb5311840"
, "b6b40f52f80f0114525c3ff36aa911b4b2042926c421c7beef037f1df108e2b1"
, "0826109c35ce56ff35173251d13223dc2861e4f8a72408041206cd8ef131d1e9"];

module.exports = {
  abiExporter: {
    path: "./build/abi",
    //clear: true,
    flat: true,
    // only: [],
    // except: []
  },
  defaultNetwork: "ropsten",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: ["contracts/mocks/", "contracts/libraries/"],
  },
  // hardhat: {
  //   forking: {
  //     url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
  //   },
  // },
  networks: {
    hardhat: {
      chainId: 31337,
      accounts,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      // accounts,
       accounts: accounts,
      chainId: 3,
      live: true,
      saveDeployments: true,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
    },
  },
  preprocess: {
    eachLine: removeConsoleLog((bre) => bre.network.name !== "hardhat" && bre.network.name !== "localhost"),
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
      },
    },
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
  tenderly: {
    project: process.env.TENDERLY_PROJECT,
    username: process.env.TENDERLY_USERNAME,
  },
  watcher: {
    compile: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
  },
}
