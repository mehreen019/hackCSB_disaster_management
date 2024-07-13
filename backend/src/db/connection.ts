import {connect} from "mongoose";
import { disconnect } from "mongoose";

 async function connectToDatabase() {
    try {
        await connect("mongodb+srv://rakhi:1234@cluster0.lxebxw0.mongodb.net/hell?retryWrites=true&w=majority&appName=Cluster0");
    } catch (error) {
        throw new Error("Cannot connect to mongodb");
    }
} 

async function disconnectFromDatabase() {
   try {
      await disconnect();
   } catch (error) {
    throw new Error("Cannot connect to mongodb");
   }
    

}
export{connectToDatabase,disconnectFromDatabase};