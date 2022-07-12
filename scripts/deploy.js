// imports
const { ethers, run, network } = require("hardhat");
// run allows us run any hardhat tag with parameters
// to get network config info

// async main
async function main() {
  const SimpleStorageContractFactory = await ethers.getContractFactory(
    "SimpleStorage"
  );

  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageContractFactory.deploy();

  await simpleStorage.deployed();
  console.log("SimpleStorage contract deployed at:", simpleStorage.address);

  // check chain id
  // if chain id is not hardhat chain id and etherscan api key exists
  if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6); //wait 6 blocks
    console.log("waited");
    await verify(simpleStorage.address, []);
  }

  // interractions
  try {
    // get fav color
    const myFavColor = await simpleStorage.retrieveMyFavColor();
    console.log("my favorite color", myFavColor);

    const txResponse = await simpleStorage.store("Blue");
    await txResponse.wait(1);
    console.log("color stored");

    // updated fav color
    const updatedFavColor = await simpleStorage.retrieveMyFavColor();
    console.log("updated fav color", updatedFavColor);

    // get friends
    const friends = await simpleStorage.retrieveFriends();
    console.log("my friends", friends);

    const friendTxResponse = await simpleStorage.addFriend("Biliki", "blue");
    await friendTxResponse.wait(1);
    console.log("friend stored");

    const updatedFriends = await simpleStorage.retrieveFriends();
    console.log("updated fav color", updatedFriends);

    const anotherFriendTxResponse = await simpleStorage.addFriend(
      "Muller",
      "yellow"
    );
    await friendTxResponse.wait(1);
    console.log("friend stored");

    const anotherUpdatedFriends = await simpleStorage.retrieveFriends();
    console.log("updated fav color", anotherUpdatedFriends);

    // get friend's fav color
    const friendFavColor = await simpleStorage.getFriendFavoriteColor("Biliki");
    console.log("Biliki's favorite color", friendFavColor);
  } catch (err) {
    console.log("An error occured", err);
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
