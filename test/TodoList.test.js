const { assert } = require("chai")

const TodoList=artifacts.require('./TodoList.sol')

contract('TodoList',(accounts)=>{
before(async()=>{
this.todoList=await TodoList.deployed()
})
it('deploys successfully',async()=>{
    const address=await this.todoList.address
    assert.notEqual(address,0x0)
    assert.notEqual(address,'')
    assert.notEqual(address,null)
    assert.notEqual(address,undefined)
})
it('list tasks',async()=>{
    const taskCount=await this.todoList.taskCount()
    const task=await this.todoList.taskList(taskCount)
    assert.equal(task.id.toNumber(),taskCount.toNumber())
    assert.equal(task.content,'Do homeworks')
    assert.equal(task.isCompleted,false)
    assert.equal(taskCount.toNumber(),1)
})
it('task created',async()=>{
    const result=await this.todoList.createTask('new task')
    const taskCount=await this.todoList.taskCount()
    assert.equal(taskCount,2)
    const event=result.logs[0].args
    assert.equal(event.id.toNumber(),2)
    assert.equal(event.content,'new task')
    assert.equal(event.isCompleted,false)
})
it('completed task',async()=>{
    const result=await this.todoList.toggleCompleted(1)
    const task=await this.todoList.taskList(1)
    assert.equal(task.isCompleted,true)
    const event=result.logs[0].args
    assert.equal(event.id.toNumber(),1)
    assert.equal(event.isCompleted,true)
})
})