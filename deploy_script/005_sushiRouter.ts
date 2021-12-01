require("dotenv/config")
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
async function deploy_sushiRouter() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const accounts = await hre.ethers.getSigners();
  console.log('first signer : ' , accounts[0].address);
  

  const contractName = "UniswapV2Router02"
  const poc = await hre.ethers.getContractFactory(contractName);


  try{
    const deployed_poc  = await poc.deploy(
      process.env.ROPSTEN_FACTORY,
      process.env.ROPSTEN_WETH
    )
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
deploy_sushiRouter()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
