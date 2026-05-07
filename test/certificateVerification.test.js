const CertificateVerification = artifacts.require("CertificateVerification");

contract("CertificateVerification", (accounts) => {
  const [owner, verifier] = accounts;
  let instance;

  beforeEach(async () => {
    instance = await CertificateVerification.new();
  });

  it("adds a certificate with default unverified status", async () => {
    await instance.addCertificate(1, "Alice Johnson", "Blockchain 101", {
      from: owner,
    });

    const certificate = await instance.certificates(1);
    assert.equal(certificate.certificateId.toNumber(), 1, "ID should match");
    assert.equal(certificate.studentName, "Alice Johnson", "Student should match");
    assert.equal(certificate.courseName, "Blockchain 101", "Course should match");
    assert.equal(certificate.isVerified, false, "Should start unverified");
  });

  it("verifies an existing certificate", async () => {
    await instance.addCertificate(2, "Bob Smith", "Solidity Basics", {
      from: owner,
    });

    await instance.verifyCertificate(2, { from: verifier });

    const certificate = await instance.certificates(2);
    assert.equal(certificate.isVerified, true, "Should be verified");
  });

  it("reverts when adding a duplicate certificate", async () => {
    await instance.addCertificate(3, "Carol Lee", "Ethereum Intro", {
      from: owner,
    });

    try {
      await instance.addCertificate(3, "Carol Lee", "Ethereum Intro", {
        from: owner,
      });
      assert.fail("Expected revert for duplicate certificate");
    } catch (error) {
      assert(
        error.message.includes("Certificate already exists"),
        "Expected duplicate certificate error"
      );
    }
  });

  it("reverts when verifying a missing certificate", async () => {
    try {
      await instance.verifyCertificate(999, { from: verifier });
      assert.fail("Expected revert for missing certificate");
    } catch (error) {
      assert(
        error.message.includes("Certificate not found"),
        "Expected missing certificate error"
      );
    }
  });
});
