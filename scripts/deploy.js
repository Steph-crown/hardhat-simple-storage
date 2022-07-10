// imports
const { ethers } = require("hardhat");

// async main
async function main() {
  const SimpleStorageContractFactory = await ethers.getContractFactory(
    "SimpleStorage"
  );

  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageContractFactory.deploy();

  await simpleStorage.deployed();
  console.log("SimpleStorage contract deployed at:", simpleStorage.address);
}

// main
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
