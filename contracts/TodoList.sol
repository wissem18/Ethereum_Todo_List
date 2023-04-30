// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract TodoList {
    uint public taskCount = 0;
    struct Task {
        uint id;
        string content;
        bool isCompleted;
    }
    mapping(uint => Task) public taskList;
    constructor() public{
     createTask("Do homeworks");
    }
event TaskCreated(uint id,string content,bool isCompleted);
    function createTask(string memory _content) public {
        taskCount++;
        taskList[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount,_content,false);
    }
    event taskCompleted(uint id,bool isCompleted);
    function toggleCompleted(uint _id)public {
        Task memory _toggledTask=taskList[_id];
        _toggledTask.isCompleted=!_toggledTask.isCompleted;
        taskList[_id]=_toggledTask;  
        emit taskCompleted(_id, _toggledTask.isCompleted);
    }
}
