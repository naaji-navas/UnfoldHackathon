// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SkillVerificationNFT is ERC721, Ownable {
    // Mapping to store projects
    mapping(uint256 => Project) public projects;
    
    // Mapping to track user's verified projects
    mapping(address => uint256[]) public userProjects;

    struct Project {
        address submitter;
        string projectTitle;
        string projectDescription;
        string projectURL;
        string videoURL;
        address verifier;
        bool isVerified;
        uint256 verifiedTimestamp;
    }

    constructor() ERC721("SkillVerificationBadge", "SVB") Ownable(msg.sender) {}

    function submitProject(
        string memory _title, 
        string memory _description, 
        string memory _projectURL,
        string memory _videoURL
    ) public returns (uint256) {
        // Create a unique project ID
        bytes32 hash = keccak256(abi.encodePacked(block.timestamp, _title, msg.sender, _description));
        
        // Convert bytes32 to uint256
        uint256 projectId = uint256(uint256(hash));

        projects[projectId] = Project({
            submitter: msg.sender,
            projectTitle: _title,
            projectDescription: _description,
            projectURL: _projectURL,
            videoURL: _videoURL,
            verifier: address(0),
            isVerified: false,
            verifiedTimestamp: 0
        });

        userProjects[msg.sender].push(projectId);
            return projectId;
        }

    // Function for anonymous verification
    function verifyProject(
        uint256 _projectId, 
        bool _isVerified
    ) public {
        require(projects[_projectId].isVerified == false, "Project already verified");
        
        // Update project verification status
        projects[_projectId].isVerified = _isVerified;
        projects[_projectId].verifier = msg.sender;
        projects[_projectId].verifiedTimestamp = block.timestamp;

        // Mint NFT if verified
        if (_isVerified) {
            _safeMint(projects[_projectId].submitter, _projectId);
        }
    }

    // Get project details
    function getProjectDetails(uint256 _projectId) public view returns (Project memory) {
        return projects[_projectId];
    }

    // Get user's verified projects
    function getUserProjects(address _user) public view returns (uint256[] memory) {
        return userProjects[_user];
    }
}
