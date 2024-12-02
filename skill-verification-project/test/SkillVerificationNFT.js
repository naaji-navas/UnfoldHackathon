const { ethers, network } = require("hardhat");
import { Transaction } from '../../skill-verification-frontend/frontend/node_modules/ethers/lib.esm/transaction/transaction';

// Your deployed contract address
const contractAddress = "0xe768bB5e91256248984aaad14E47105EdfD7b880";

async function main() {
  // Connect to the network
  const provider = new ethers.providers.JsonRpcProvider(process.env.MUMBAI_URL);
  
  // Create a wallet instance
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // Connect to the deployed contract
  const contract = new ethers.Contract(contractAddress, abi, wallet);



  // Example usage
  console.log("Connected to contract:", contract.address);

  // Submit a project
  const tx1 = await contract.submitProject(
    "Test Project",
    "This is a test project description.",
    "https://example.com/project-url",
    "https://example.com/video-url"
  );
  await tx1.wait();

  console.log("Project submitted");

  // Get the project ID
  const projectId = await contract.getUserProjects(wallet.address);
  const actualProjectId = projectId[0];

  console.log(`Project ID: ${actualProjectId}`);

  // Verify the project
  const tx2 = await contract.verifyProject(actualProjectId, true);
  await tx2.wait();

  console.log("Project verified");

  // Check if NFT was minted
  const balance = await contract.balanceOf(wallet.address);
  console.log(`NFT balance: ${balance}`);

  // Get project details
  const projectDetails = await contract.getProjectDetails(actualProjectId);
  console.log("Project details:", projectDetails);

  // Get user projects
  const userProjects = await contract.getUserProjects(wallet.address);
  console.log("User projects:", userProjects);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
