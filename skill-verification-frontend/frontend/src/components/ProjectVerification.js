import React, { useState, useEffect } from 'react';
import { useContract } from '../contexts/ContractContext';

function ProjectVerification() {
  const { contract, account } = useContract();
  const [projects, setProjects] = useState([]);
  const [verifiedProjects, setVerifiedProjects] = useState([]);

  useEffect(() => {
    if (contract) {
      fetchProjects();
    }
  }, [contract]);

  const fetchProjects = async () => {
    try {
      const projectCount = await contract.getProjectCount();
      const projects = [];

      for (let i = 0; i < projectCount; i++) {
        const project = await contract.getProject(i);
        projects.push(project);
      }

      setProjects(projects);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  const verifyProject = async (projectId) => {
    try {
      const tx = await contract.verifyProject(projectId);
      const receipt = await tx.wait();

      fetchProjects();
    } catch (error) {
      console.error("Failed to verify project", error);
    }
  };

  return (
    <div>
      <h2>Project Verification</h2>
      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Project Title</th>
            <th>Project Description</th>
            <th>Project URL</th>
            <th>Video URL</th>
            <th>Verified</th>
            <th>Verify</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.projectId}</td>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.projectUrl}</td>
              <td>{project.videoUrl}</td>
              <td>{project.verified ? 'Yes' : 'No'}</td>
              <td>
                {project.verified ? (
                  <button disabled>Verified</button>
                ) : (
                  <button onClick={() => verifyProject(project.projectId)}>Verify</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectVerification;