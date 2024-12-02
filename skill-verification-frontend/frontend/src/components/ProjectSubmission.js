import React, { useState } from 'react';
import { useContract } from '../contexts/ContractContext';

function ProjectSubmission() {
  const { contract, account, connectWallet } = useContract();
  
  // Form state
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    projectUrl: '',
    videoUrl: ''
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit project to blockchain
  const submitProject = async (e) => {
    e.preventDefault();
    
    // Ensure wallet is connected
    if (!contract) {
      await connectWallet();
      return;
    }

    try {
      const tx = await contract.submitProject(
        projectDetails.title,
        projectDetails.description,
        projectDetails.projectUrl,
        projectDetails.videoUrl
      );

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      
      // In ethers v6, event handling might be different
      // You may need to adjust how you extract the project ID
      console.log('Transaction receipt:', receipt);

      alert(`Project submitted successfully!`);
      
      // Reset form
      setProjectDetails({
        title: '',
        description: '',
        projectUrl: '',
        videoUrl: ''
      });
    } catch (error) {
      console.error(" submission failed", error);
      alert("Failed to submit project");
    }
  };

  return (
    <div>
      <h2>Submit Your Project</h2>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <form onSubmit={submitProject}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={projectDetails.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={projectDetails.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="url"
            name="projectUrl"
            placeholder="Project URL"
            value={projectDetails.projectUrl}
            onChange={handleInputChange}
            required
          />
          <input
            type="url"
            name="videoUrl"
            placeholder="Video URL"
            value={projectDetails.videoUrl}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit Project</button>
        </form>
      )}
    </div>
  );
}

export default ProjectSubmission;