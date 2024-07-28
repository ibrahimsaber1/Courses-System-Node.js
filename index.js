#!/usr/bin/env node

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------------------import the required modules for the project--------------------------------------
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";
import { json } from "stream/consumers";

const program = new Command();

const questions = [
  {
    type: "input",
    name: "title",
    message: "pleas Enter The Course Title: ",
  },
  {
    type: "number",
    name: "price",
    message: "pleas Enter The Course price: ",
  },
];

const course_path = "./courses.json";

program
  .name("COURSES-SYSTEM-NODE.JS")
  .description("CLI to make courses")
  .version("0.8.0");

// -----------------------------------the adding command ----------------------------------:)
program
  .command("add")
  .alias("a")
  .description("adding a course")
  // the blow comments takes argument and option but its only print them in the console :(
  // .argument("<title>", "add course title")
  // .option("--price <price>", "add course price")
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      console.log(answers);
      if (fs.existsSync(course_path)) {
        fs.readFile(course_path, "utf-8", (err, filecontent) => {
          if (err) {
            console.log("error", err);
            process.exit();
          }
          console.log("filecontent ==>", filecontent);
          const filecontentASJson = JSON.parse(filecontent);
          filecontentASJson.push(answers);
          fs.writeFile(
            course_path,
            JSON.stringify(filecontentASJson),
            "utf-8",
            () => {
              console.log("add course is done");
            }
          );
        });
      } else {
        fs.writeFile(course_path, JSON.stringify([answers]), "utf-8", () => {
          console.log("add course is done");
        });
      }
    });
  });

program
  .command("list")
  .alias("l")
  .description("list the course")
  .action(() => {
    fs.readFile(course_path, "utf-8", (err, content) => {
      if (err) {
        console.log("error", err);
        process.exit();
      }
      console.table(JSON.parse(content));
    });
  });
program.parse(process.argv);
