const { spawn } = require("child_process");

const command = spawn(
  __dirname + "/node_modules/.bin/cypress",
  process.argv.slice(2)
);
command.stdout.on("data", function(chunk) {
  console.log(chunk.toString());
});
