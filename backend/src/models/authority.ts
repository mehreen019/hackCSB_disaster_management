// models/Authority.ts
import { Schema, model } from 'mongoose';



const authoritySchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'authority' },
  
  //permissions: { type: [String], default: ['view_safety_places', 'manage_safety_places'] }
  
});

export const Authority = model('Authority', authoritySchema);
