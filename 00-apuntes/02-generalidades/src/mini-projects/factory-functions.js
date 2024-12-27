function createTask(description) {
  return { description, complete: false }
}

const task = createTask('Learning Node.js')

console.log(task)
