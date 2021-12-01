// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const accounts = await hre.ethers.getSigners();
  console.log('first signer : ' , accounts[0].address);
  

  const contractName = "SushiToken"
  const poc = await hre.ethers.getContractFactory(contractName);
  // const wantTokenAddr = "0x334D2DB8B952534769dAdfE6FFE85e10E077c3dd";

  try{
    const deployed_poc  = await poc.deploy()
    if( deployed_poc.deployed() ){
      console.info(`deploy success, address (${deployed_poc.address})`)
    }else{
      console.info("fail to deployment")
    }
  }catch(e){
    console.error(`deploy fail`, e)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
