const hre = require("hardhat");

async function main() {
  // Fetch the contract factory
  const SkillVerificationNFT = await hre.ethers.getContractFactory("SkillVerificationNFT");
  
  // Deploy the contract
  console.log("Deploying SkillVerificationNFT...");
  const skillVerificationNFT = await SkillVerificationNFT.deploy();
  
  // Wait for the contract to be deployed
  await skillVerificationNFT.waitForDeployment();
  
  // Log the contract address
  console.log("SkillVerificationNFT deployed to:", await skillVerificationNFT.getAddress());
}

// Error handling pattern
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
