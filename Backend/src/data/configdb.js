import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("data","","",{
    dialect: "sqlite",
    storage: "src/data/data.sqlite"
})
