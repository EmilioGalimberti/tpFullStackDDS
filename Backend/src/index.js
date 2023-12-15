
import { router} from "./routers/routers.js";
import express from 'express';
import { sequelize } from "./data/configdb.js";
import {routerAlumno} from "./routers/alumnoRouter.js";
import routerAlbum from "./routers/router.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', router);
app.use("/",routerAlumno)
app.use('/', routerAlbum.routerAlbum)

export const port = 3000;

app.listen(port, async()=>{
    console.log('Api Rest en puerto ', port)
    await sequelize.sync()
})
