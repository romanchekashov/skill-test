const liquibase = require("liquibase");

const args = process.argv.slice(2);
const command = args[0];
const command_param = args[1];

args.forEach(console.log);

const config = {
  contexts: "TEST,DEV",
  //   labels: "staging,Jira-1200",
  changeLogFile: "changelog.xml",
  url: "jdbc:postgresql://localhost:5432/skilltest-dev",
  classpath: "../node_modules/liquibase/lib/Drivers/postgresql-42.2.8.jar",
  username: "postgres",
  password: "postgres",
  logLevel: "debug",
  overwriteOutputFile: "true",
  logFile: "liquibase.log",
};

liquibase(config)
  .run(command, command_param)
  .then(() => console.log("success"))
  .catch((err) => console.error("fail", err));
