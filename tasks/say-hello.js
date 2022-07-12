const { task } = require("hardhat/config");

task("sayhello", "Prints hello", async (taskArgs, hre) => {
  console.log("hello world");
});
