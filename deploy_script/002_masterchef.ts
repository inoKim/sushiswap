require("dotenv/config")
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
async function deploy_masterchef() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const accounts = await hre.ethers.getSigners();
  console.log('first signer : ' , accounts[0].address);
  

  const contractName = "MasterChef"
  const poc = await hre.ethers.getContractFactory(contractName);

  try{
    const deployed_poc  = await poc.deploy(
      "0x193D369b4957c76eFc0191Da9D08Af64CBc85bFF" ,// process.env.ROPSTEN_SUSHI,
      "0x341CD5348c73E5F6155d9e40f437C0C465CBa9Da", //process.env.DEV_ADDRESS,
      100,
      11600000, // Dec 07 2021 23:43:21 GMT+0900 (한국 표준시)
      11523840 , // Tue Nov 30 2021 14:00:23 GMT+0900 (한국 표준시)
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
deploy_masterchef()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
