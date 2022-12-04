//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MedicalRecords {
    uint records = [1,2,3];
    struct pendingRequest {
        hospitalName : string,
        approved : false,
    }
    pendingRequest  public R1;
    R1.hospitalName = "AIIMS";
    R1.approved = false;

    function  getR1() public returns (pendingRequest) {
        return R1;
    }
    function setR1(bool _approved) public {
        
    }
}