const cron = require("node-cron");
const shell = require("shelljs");
import fs from "fs";

/**
 * https://www.digitalocean.com/community/tutorials/nodejs-cron-jobs-by-examples
 * [*\/30 * * * * *] - every 30 sec
 * [0 23 * * *] - every day at 23:00
 * https://stackoverflow.com/questions/24718706/backup-restore-a-dockerized-postgresql-database
 *
 * Backup:
 * docker exec -t your-db-container pg_dumpall -c -U postgres | gzip > dump_`date +%d-%m-%Y"_"%H_%M_%S`.gz
 *
 * Restore:
 * gunzip < your_dump.gz | docker exec -i your-db-container psql -U postgres
 *
 * gunzip < your_dump.gz | docker exec -i skill-test_pg_db_1 psql -U postgres
 */

const backupDir = "./backup";
const backupFileName = 'dump_`date +%d-%m-%Y"_"%H_%M_%S`.gz';
const dbContainer = "skill-test_pg_db_1";
const backup = `docker exec -t ${dbContainer} pg_dumpall -c -U postgres | gzip > ${backupDir}/${backupFileName}`;

// create backups dir if doesn't exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

cron.schedule("0 23 * * *", function () {
  console.log(new Date(), "Database backup start");

  removeOldBackups();

  if (shell.exec(backup).code !== 0) {
    console.log(new Date(), "Database backup error");
    shell.echo("Database backup error");
  } else {
    console.log(new Date(), "Database backup complete");
    shell.echo("Database backup complete");
  }
});

const removeOldBackups = () => {
  const files: string[] = fs.readdirSync(backupDir);
  if (files.length > 4) {
    files.slice(0, files.length - 4).forEach((file) => {
      fs.unlink(`${backupDir}/${file}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
      });
    });
  }
};
