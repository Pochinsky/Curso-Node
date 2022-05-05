const inquirer = require("inquirer");
require("colors");

/* An array of objects. Each object is a question that will be asked to the user. */
const questions = [
  {
    type: "list",
    name: "option",
    message: "Que desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: 2,
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: 3,
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: 4,
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: 5,
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: 6,
        name: `${"6.".green} Eliminar tarea(s)`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

/**
 * It shows a menu with options and returns the option selected by the user
 * @returns {number} The option selected by the user.
 */
const menu = async () => {
  console.log("================================".green);
  console.log("      Seleccione una opcion".white);
  console.log("================================\n".green);
  const opt = await inquirer.prompt(questions);
  return opt.option;
};

/**
 * It pauses the program until the user presses the enter key
 */
const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar...`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

/**
 * It asks the user a question and returns true if the user answers yes
 * @param {string} message - The message to display to the user.
 * @returns {boolean} The value of the ok property of the object returned by the inquirer.prompt function.
 */
const confirmation = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

/**
 * It asks the user for input, and returns the input
 * @returns {string} The value of the input
 */
const readInput = async () => {
  const question = [
    {
      type: "input",
      name: "Descripcion",
      validate(value) {
        if (value.length === 0) return "Por favor ingrese un valor";
        return true;
      },
    },
  ];
  const { Descripcion } = await inquirer.prompt(question);
  return Descripcion;
};

/**
 * It takes an array of tasks and returns a function that asks the user to select one of the tasks from
 * the array
 * @param {Array} tasks - An array of tasks to be displayed.
 * @returns {string} The id of the task to be removed.
 */
const listTasksToRemove = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const number = `${i + 1}.`.green;
    const taskDesc = task.desc;
    return {
      value: task.id,
      name: `${number} ${taskDesc}`,
    };
  });
  choices.unshift({
    value: 0,
    name: "0.".green + " Cancelar",
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Eliminar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

/**
 * It takes an array of tasks and returns an array of task ids
 * @param {Array} tasks - An array of tasks.
 * @returns {Array} The ids of the tasks that the user selected.
 */
const listTasksToFinish = async (tasks) => {
  const choices = tasks.map((task, i) => {
    const number = `${i + 1}.`.green;
    const taskDesc = task.desc;
    return {
      value: task.id,
      name: `${number} ${taskDesc}`,
      checked: task.completedIn === null ? false : true,
    };
  });
  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione las tareas a completar",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questions);
  return ids;
};

module.exports = {
  menu,
  pause,
  readInput,
  listTasksToRemove,
  confirmation,
  listTasksToFinish,
};
