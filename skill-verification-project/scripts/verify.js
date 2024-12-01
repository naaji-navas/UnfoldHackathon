const hre = require("hardhat");

async function main() {
  // Get the contract address from command line argument
  const contractAddress = process.argv[2];

  if (!contractAddress) {
    console.error("Please provide contract address");
    process.exit(1);
  }

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: []
    });
    console.log("Contract verified successfully!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });