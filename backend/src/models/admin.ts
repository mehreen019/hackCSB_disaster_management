// models/Admin.ts
import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'admin' },
 
 // permissions: { type: [String], default: ['manage_users', 'manage_disasters', 'view_reports'] }
 
});

export const Admin = model('Admin', adminSchema);
