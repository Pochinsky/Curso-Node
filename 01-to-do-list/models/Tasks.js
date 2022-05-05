const Task = require("./Task");

/* It creates a new task object, and adds it to the list of tasks */
class Tasks {
  _list = {};

  constructor() {
    this._list = {};
    /**
     * list:{
     *      'uuid-123456-789101-1': {
     *          { id:'uuid-123456-789101-1',desc:'algo',completedIn:123 },
     *          ...
     *      },
     *      ...
     *  }
     */
  }

  /**
   * It returns an array of all the values in the object.
   * @returns {Array} An array of all the values in the list object.
   */
  get listArray() {
    const listArr = [];
    Object.keys(this._list).forEach((key) => listArr.push(this._list[key]));
    return listArr;
  }

  /**
   * It creates a new task object, and adds it to the list of tasks
   * @param {string} desc - The description of the task.
   */
  createTask(desc) {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  /**
   * It takes an array of tasks and saves them to the list
   * @param {Array} tasks - An array of tasks to save.
   */
  saveTasksFromArray(tasks) {
    tasks.forEach((task) => (this._list[task.id] = task));
  }

  /**
   * It removes a task from the list
   * @param {string} id - The id of the task to remove.
   */
  removeTask(id) {
    if (this._list[id]) delete this._list[id];
  }

  /**
   * It prints a list of all the tasks in the list, with their index, description and completion status
   */
  listTasks() {
    console.log();
    Object.values(this._list).forEach((task, i) => {
      const number = `${i + 1}.`.green;
      const taskDesc = task.desc;
      const completed =
        task.completedIn === null ? `Pendiente`.red : `Completada`.green;
      console.log(`${number} ${taskDesc} :: ${completed}`);
    });
  }

 /**
  * This function takes a boolean as an argument and loops through the listArray, printing out the task
  * description and completion date if the task is completed, or just the task description if the task
  * is not completed
  * @param {boolean} status - true or false
  */
 listStatusTasks(status) {
    console.log();
    let i = 0;
    this.listArray.forEach((task) => {
      const taskDesc = task.desc;
      const completed = task.completedIn === null ? false : true;
      const completedIn = task.completedIn;
      if (status && completed) {
        i++;
        const number = `${i}.`.green;
        console.log(`${number} ${taskDesc} :: ${completedIn.green}`);
      }
      if (!status && !completed) {
        i++;
        const number = `${i}.`.green;
        console.log(`${number} ${taskDesc}`);
      }
    });
  }

  /**
   * It toggles the status of the tasks in the list
   * @param {Array} ids - An array of ids of the tasks to be toggled.
   */
  toggleStatusTasks(ids) {
    /* Toggling the status of the tasks in the list. */
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedIn) task.completedIn = new Date().toISOString();
    });
    /* Setting the completedIn property of the task to null if the task is not in the ids array. */
    this.listArray.forEach((task) => {
      if (!ids.includes(task.id)) this._list[task.id].completedIn = null;
    });
  }
}

module.exports = Tasks;
