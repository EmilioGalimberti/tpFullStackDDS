import { DataTypes } from "sequelize"
import { sequelize } from "../data/configdb.js";

export const Album = sequelize.define("Album",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull:true
    }
    ,
    autor:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    cantidad_canciones:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    fechaLanzamiento: {
        type: DataTypes.DATE,
        allowNull: false,
    }
    },{
        timestamps: false,
        sequelize
    }
)