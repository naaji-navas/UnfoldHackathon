import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

// Import your contract ABI (you'll get this from hardhat)
import SkillVerificationNFTABI from '../contracts/SkillVerificationNFT.json';

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  // Contract address from deployment
  const CONTRACT_ADDRESS = '0x2a68A4c8ee2C967d58Dd517CDeA84965dd8fE0ad';

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });

        // Set the first account
        setAccount(accounts[0]);

        // Create provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Create contract instance
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS, 
          SkillVerificationNFTABI, 
          signer
        );

        setContract(contractInstance);
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  return (
    <ContractContext.Provider value={{
      contract, 
      account, 
      connectWallet
    }}>
      {children}
    </ContractContext.Provider>
  );
};

// Custom hook for using the contract context
export const useContract = () => useContext(ContractContext);