const hre = require("hardhat");
const { ethers } = require("hardhat");



async function main() {

  const BuyMeCoffee = await hre.ethers.deployContract("BuyMeCoffee");
  await BuyMeCoffee.waitForDeployment();

  console.log(`BuyMeCoffee deployed to: ${BuyMeCoffee.target}`);



  /*-----BuyCoffee-Function-----*/
  const buyCoffee = await BuyMeCoffee.buyCoffee({ value: ethers.parseEther("0.001") })
  console.log("Buy Function Starts Here")
  console.log(buyCoffee)
  await buyCoffee.wait()
  console.log(`{Contract Balance: ${await ethers.provider.getBalance(BuyMeCoffee.target)}}`)
  console.log("Buy Function Ends Here.")
  

  /*-----Withdraw-Function-----*/
  const withdraw = await BuyMeCoffee.withdraw()
  console.log('Withdraw Function Starts Here')
  console.log(withdraw)
  console.log(`{Contract Balance: ${await ethers.provider.getBalance(BuyMeCoffee.target)}}`)
  console.log('Withdraw Functions Ends Here.')


  /*----GetBalance-Function-----*/
  const getBalance = await BuyMeCoffee.getBalance()
  console.log(`Contract Balance is: ${getBalance}`)
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});