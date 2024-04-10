// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/*
FOR TEST ONLY
*/
contract HLTHY is ERC20, Ownable {
    mapping(address => bool) private _whitelist;

    event DividendPaid(address indexed to, uint256 amount);
    
    constructor() ERC20("THLTHY", "THLTHY") {
        _mint(msg.sender, 1000000 * 10**uint256(18));
    }

     // Custom function to add an address to the whitelist
    function addToWhitelist(address account) external onlyOwner {
        _whitelist[account] = true;
    }

    // Custom function to remove an address from the whitelist
    function removeFromWhitelist(address account) external onlyOwner {
        _whitelist[account] = false;
    }

    // Custom function to check if an address is whitelisted
    function isWhitelisted(address account) external view returns (bool) {
        return _whitelist[account];
    }

    // Custom function to transfer tokens with dividend payouts
    function transferWithDividend(address recipient, uint256 amount) external {
        require(_whitelist[msg.sender], "Sender is not whitelisted");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount <= balanceOf(msg.sender), "ERC20: transfer amount exceeds balance");

        _transfer(msg.sender, recipient, amount);

        // Emit an event for dividend payout
        emit DividendPaid(recipient, amount / 100); // Example: paying 1% of transferred amount as dividend
    }

    // Override transfer function to ensure only whitelisted addresses can transfer tokens
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        require(_whitelist[recipient], "Recipient is not whitelisted");
        super._transfer(sender, recipient, amount);
    }
}