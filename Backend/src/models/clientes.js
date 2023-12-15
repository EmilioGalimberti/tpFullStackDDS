import { sequelize } from "../data/configdb.js";
import { DataTypes } from "sequelize";


export const Cliente = sequelize.define("Cliente",{
    ID_cliente:{
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: true
    },
    apellido:{
        type:DataTypes.STRING,
        allowNull: true
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    fechaNacimiento:{
        type: DataTypes.DATE,
        allowNull: true
    }

},{
    timestamps: false,
    sequelize
})