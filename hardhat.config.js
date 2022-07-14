require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
const { task } = require("hardhat/config");

// tasks
require("./tasks/block-number");
require("./tasks/say-hello");

const RINKEBY_RPC_URL =
  process.env.RINKEBY_RPC_URL || "https://eth-rinkeby.alchemyapi.io/v2/example";
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || "0xa";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";
const GEORLI_RPC_URL = process.env.GEORLI_RPC_URL || "key";
const GEORLI_PRIVATE_KEY = process.env.GEORLI_PRIVATE_KEY || "key";

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";

/** @type import('hardhat/config').HardhatUserConfig */

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
console.log("CIIN mar", COINMARKETCAP_API_KEY);

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
      // check chain ids from chainlist.org
      chainId: 4,
    },
    georli: {
      url: GEORLI_RPC_URL,
      accounts: [GEORLI_PRIVATE_KEY],
      // check chain ids from chainlist.org
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    currency: "NGN",
    coinmarketcap: "1decbea8-0636-48b5-89ba-b7dc2ecb8109",
    enabled: true,
    outputFile: "gas-reporter.txt",
    noColors: true,
    token: "MATIC",
  },
};
