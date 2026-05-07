// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

/**
 * @title CertificateVerification
 * @dev Stores and verifies student certificates for demo purposes.
 */
contract CertificateVerification {
    // Certificate data stored on-chain.
    struct Certificate {
        uint256 certificateId;
        string studentName;
        string courseName;
        bool isVerified;
    }

    // Mapping from certificate ID to its details.
    mapping(uint256 => Certificate) public certificates;

    // Events make it easy to track changes in the blockchain logs.
    event CertificateAdded(uint256 certificateId, string studentName, string courseName);
    event CertificateVerified(uint256 certificateId);

    /**
     * @dev Adds a new certificate to the blockchain.
     */
    function addCertificate(
        uint256 certificateId,
        string memory studentName,
        string memory courseName
    ) public {
        require(certificateId != 0, "Certificate ID must be non-zero");
        require(certificates[certificateId].certificateId == 0, "Certificate already exists");

        certificates[certificateId] = Certificate({
            certificateId: certificateId,
            studentName: studentName,
            courseName: courseName,
            isVerified: false
        });

        emit CertificateAdded(certificateId, studentName, courseName);
    }

    /**
     * @dev Marks a certificate as verified.
     */
    function verifyCertificate(uint256 certificateId) public {
        require(certificates[certificateId].certificateId != 0, "Certificate not found");

        certificates[certificateId].isVerified = true;
        emit CertificateVerified(certificateId);
    }
}
