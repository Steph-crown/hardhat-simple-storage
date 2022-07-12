const { ethers } = require("hardhat");
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
    console.log("Deployed SimpleStorage contract at:", simpleStorage.address);
  });

  // initial states
  it("should start with a fav color of ''", async () => {
    const currentFavCOlor = await simpleStorage.retrieveMyFavColor();
    const expectedFavColor = "";
    expect(currentFavCOlor).to.equal(expectedFavColor);
  });

  it("should start with no friends", async () => {
    const currentFriends = await simpleStorage.retrieveFriends();
    const expectedFriends = [];
    expect(currentFriends).to.deep.equal(expectedFriends);
  });

  it("should store a favorite color", async () => {
    const color = "Blue";
    const txResponse = await simpleStorage.store(color);
    await txResponse.wait(1);
    const currentFavColor = await simpleStorage.retrieveMyFavColor();
    const expectedFavColor = color;
    expect(currentFavColor).to.equal(expectedFavColor);
  });

  it("should store a friend", async () => {
    const friend = "Biliki";
    const color = "blue";
    const txResponse = await simpleStorage.addFriend(friend, color);
    await txResponse.wait(1);
    const currentFriends = await simpleStorage.retrieveFriends();
    console.log("current friends", currentFriends[0]);
    const expectedFriends = [{ name: friend, favoriteColor: color }];
    expect(currentFriends).to.deep.equal(expectedFriends);
  });
});
