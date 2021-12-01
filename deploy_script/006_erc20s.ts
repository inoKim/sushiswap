require("dotenv/config")
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
async function deploy_someERC20s() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const accounts = await hre.ethers.getSigners();
  console.log('first signer : ' , accounts[0].address);
  

  const contractName = "ERC20Mock"
  const poc = await hre.ethers.getContractFactory(contractName);


  try{
    const decimal = hre.ethers.BigNumber.from(10).pow(18)
    const deployed_A  = await poc.deploy("ATOKEN" ,"ATK" , hre.ethers.BigNumber.from(40000000).mul(decimal) )
    const deployed_B  = await poc.deploy("BTOKEN" ,"BTK" , hre.ethers.BigNumber.from(40000000).mul(decimal) )
    const deployed_C  = await poc.deploy("CTOKEN" ,"CTK" , hre.ethers.BigNumber.from(40000000).mul(decimal) )
    const deployed_D  = await poc.deploy("DTOKEN" ,"DTK" , hre.ethers.BigNumber.from(40000000).mul(decimal) )
    const deployed_E  = await poc.deploy("ETOKEN" ,"ETK" , hre.ethers.BigNumber.from(40000000).mul(decimal) )
    if( deployed_A.deployed()  && deployed_B.deployed()  &&  deployed_C.deployed()  &&  deployed_D.deployed()  &&  deployed_E.deployed()){
      console.log(`TokenA\'s address (${deployed_A.address}`);
      console.log(`TokenB\'s address (${deployed_B.address}`);
      console.log(`TokenC\'s address (${deployed_C.address}`);
      console.log(`TokenD\'s address (${deployed_D.address}`);
      console.log(`TokenE\'s address (${deployed_E.address}`);
    }else{
      console.info("fail to deployment")
    }
  }catch(e){
    console.error(`deploy fail`, e)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy_someERC20s()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
