require("colors");
const {
  menu,
  pause,
  readInput,
  listTasksToRemove,
  confirmation,
  listTasksToFinish,
} = require("./helpers/inquirer");
const { saveDatabase, readDatabase } = require("./helpers/Database");
const Tasks = require("./models/Tasks");

/**
 * It's a function that creates a new Tasks object, reads the database, saves the tasks from the
 * database, shows the menu, and depending on the option selected, it performs the corresponding action
 */
const main = async () => {
  let opt = -1;
  const tasks = new Tasks();
  const databaseTasks = readDatabase();
  if (databaseTasks) tasks.saveTasksFromArray(databaseTasks);
  do {
    console.clear();
    opt = await menu();
    switch (opt) {
      case 1:
        /* create task */
        const desc = await readInput("Descripcion:");
        tasks.createTask(desc);
        break;
      case 2:
        /* tasks listed */
        tasks.listTasks();
        break;
      case 3:
        /* list terminated tasks */
        tasks.listStatusTasks(true);
        break;
      case 4:
        /* list pending tasks */
        tasks.listStatusTasks(false);
        break;
      case 5:
        /* finished task */
        const ids = await listTasksToFinish(tasks.listArray);
        tasks.toggleStatusTasks(ids);
        break;
      case 6:
        /* remove task */
        const id = await listTasksToRemove(tasks.listArray);
        if (id !== 0) {
          const ok = await confirmation("Estas seguro de eliminar esta tarea?");
          if (ok) {
            tasks.removeTask(id);
            console.log(`Tarea borrada correctamente!`.cyan);
          }
        }
        break;
      default:
        break;
    }
    saveDatabase(tasks.listArray);
    await pause();
  } while (opt !== 0);
};

main();
