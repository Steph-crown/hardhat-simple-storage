// imports
const { ethers, run, network } = require("hardhat");
// run allows us run any hardhat tag with parameters
// to get network config info

// async main
async function main() {
  const SimpleStorageContractFactory = await ethers.getContractFactory(
    "SimpleStorage"
  );
  console.log(network);

  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageContractFactory.deploy();

  await simpleStorage.deployed();
  console.log("SimpleStorage contract deployed at:", simpleStorage.address);

  // check chain id
  // if chain id is not hardhat chain id and etherscan api key exists
  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6); //wait 6 blocks
    await verify(simpleStorage.address, []);
  }
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("verified");
  } catch (err) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.error("Already verified");
    } else {
      console.log(err);
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
