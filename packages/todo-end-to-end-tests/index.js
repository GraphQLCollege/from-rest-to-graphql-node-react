const { spawn } = require("child_process");
console.log(__dirname + "/cypress/integration/example_spec.js")
const command = spawn(
  __dirname + "/node_modules/.bin/cypress",
  process.argv
    .slice(2)
    // .concat([`-s ${__dirname + "/cypress/integration/example_spec.js"}`])
);
command.stdout.on("data", function(chunk) {
  console.log(chunk.toString());
});
