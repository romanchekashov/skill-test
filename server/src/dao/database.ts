import {DataTypes, Sequelize} from "sequelize";
import {UserEntity, UserEntityInit} from "./models/UserEntity";
import {CategoryEntity, CategoryEntityInit} from "./models/CategoryEntity";
import {TestAnswerEntityInit} from "./models/test/TestItemAnswerEntity";
import {TestItemEntityInit} from "./models/test/TestItemEntity";
import {TestEntityInit} from "./models/test/TestEntity";
import {TestCategoryEntityInit} from "./models/test/TestCategoryEntity";
import {isProd, md5} from "../utils/utils";

let sequelize: Sequelize;

const sequelizeDB = (): Sequelize => {
    if (!sequelize) {
        const dbName = `skilltest-${isProd() ? "prod" : "dev"}`;

        // setup a new database using database credentials set in .env
        sequelize = new Sequelize(dbName,
            process.env.DB_USER || "",
            process.env.DB_PASSWORD || "",
            {
                host: "0.0.0.0",
                dialect: "sqlite",
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000,
                },
                // Data is stored in the file `database.sqlite` in the folder `db`.
                // Note that if you leave your app public, this database file will be copied if
                // someone forks your app. So don't use it to store sensitive information.
                storage: `./db/${dbName}.sqlite`,
            });

        // authenticate with the database
        sequelize
            .authenticate()
            .then(function (err) {
                console.log("Connection established.");
                // define new table: 'users'
                UserEntityInit(sequelize);
                TestAnswerEntityInit(sequelize);
                TestItemEntityInit(sequelize);
                CategoryEntityInit(sequelize);
                TestEntityInit(sequelize);
                TestCategoryEntityInit(sequelize);

                setup();
            })
            .catch(function (err) {
                console.log("Unable to connect to database: ", err);
            });

        // populate database with default users
        // https://sequelize.org/master/manual/model-basics.html
        function setup() {
            console.log(`=====${process.env.NODE_ENV}=====`);
            if (isProd()) {
                // This creates the table if it doesn't exist (and does nothing if it already exists)
                sequelize.sync();
            } else {
                // Using 'force: true' for demo purposes. It drops the table users if it already exists and then creates a new one.
                sequelize.sync({force: true}).then(() => {
                    // Add default users to the database
                    UserEntity.create({
                        username: "roman",
                        password: md5(process.env.USER_ADMIN_PASSWORD || ""),
                    }); // create a new entry in the users table

                    ['web', 'programming', 'devops']
                        .forEach(name => CategoryEntity.create({name}));
                });
            }
        }
    }
    return sequelize;
};

export const getBooleanAttribute = (defaultValue: boolean = false): any => ({
    type: new DataTypes.INTEGER,
    defaultValue: defaultValue ? 1 : 0,
    validate: {
        min: 0,
        max: 1
    },
    allowNull: false,
});

export const getIntPrimaryKey = (): any => ({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
});

export default sequelizeDB;
