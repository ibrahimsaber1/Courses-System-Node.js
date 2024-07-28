// console.log("test conection");

// console.log(process.argv);

// if (process.argv[2] == "add") {
//   console.log(`you are adding ${process.argv[3]} to the course list`);
// }

const { Command } = require("commander");
const program = new Command();

program
  .name("COURSES-SYSTEM-NODE.JS")
  .description("CLI to make courses")
  .version("0.8.0");

program
  .command("add")
  .alias("a")
  .description("adding a course")
  .argument("<title>", "add course title")
  .option("--price <price>", "add course price")
  .action((param, option) => {
    console.log("param, option", param, option);
  });
program.parse(process.argv);
