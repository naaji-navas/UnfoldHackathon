require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {  // Change from mumbai to amoy
      url: "https://rpc-amoy.polygon.technology/", 
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 80002  // Amoy testnet chain ID
    }
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY  // Update to polygonAmoy
    }
  }
};