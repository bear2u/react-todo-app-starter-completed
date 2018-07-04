pragma solidity ^0.4.21;

contract ToDoListContract {
    
    struct Item {
        uint idx;
        string content;
        bool isDone;
    }
    
    Item[] public Items;
    
    
    function addItem(string content) public {
        Items.push(Item({
            idx: Items.length + 1,
            content: content, 
            isDone: false
        }));
    }
    
    function updateItem(uint idx, string content, bool isDone) public {
        Item storage item = Items[idx];
        item.content = content;
        item.isDone = isDone;
    }
    
    function deleteItem(uint idx) public {
        delete Items[idx];
    }
    
    function getLength() public view returns(uint) {
        return Items.length;
    }
    
    function getItem(uint pos) public view returns(uint, string, bool) {
        Item memory item = Items[pos];
        return (item.idx, item.content, item.isDone);
    }
    
}
