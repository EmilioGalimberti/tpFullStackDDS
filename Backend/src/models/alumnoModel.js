//Emilio Galimberti 90747
import { DataTypes } from "sequelize";
import { sequelize } from "../data/configdb.js";

export const Alumno = sequelize.define("Alumno",
{
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    
},
nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
    
},
edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
}
},
{
    timestamps: true, // no omite columnas de auditoría, si fuera false las omite
    sequelize
})