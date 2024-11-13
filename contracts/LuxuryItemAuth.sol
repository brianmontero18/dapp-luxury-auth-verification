// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LuxuryItemAuth {
    address public owner;

    struct Item {
        string manufacturer;
        address currentOwner;
        uint256 registeredAt;
        bool isAuthentic;
    }

    mapping(string => Item) public items;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerItem(string memory serialNumber, string memory manufacturer) public onlyOwner {
        require(bytes(serialNumber).length > 0, "Serial number cannot be empty");
        require(items[serialNumber].registeredAt == 0, "Item is already registered");

        items[serialNumber] = Item({
            manufacturer: manufacturer,
            currentOwner: msg.sender,
            registeredAt: block.timestamp,
            isAuthentic: true
        });
    }

    function verifyItem(string memory serialNumber) public view returns (string memory, address, uint256, bool) {
        require(items[serialNumber].registeredAt != 0, "Item not found");

        Item memory item = items[serialNumber];
        return (item.manufacturer, item.currentOwner, item.registeredAt, item.isAuthentic);
    }
}
