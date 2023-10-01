// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";


contract BuyMeCoffee is Ownable {
    
    function buyCoffee () public payable returns (string memory message) {
        return "Thanks For Buying Me a Coffee";
    }

    function withdraw () public onlyOwner payable {
        require(address(this).balance > 0, "Contract Balance is 0");
        payable(msg.sender).transfer(address(this).balance);
    }


    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}