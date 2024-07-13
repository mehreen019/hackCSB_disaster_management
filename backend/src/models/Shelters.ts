// models/Authority.ts
import { Schema, model } from 'mongoose';
import { randomUUID } from "crypto";

const ShelterSchema = new Schema({
  name: { type: String, required: true },
  lat: { type: String, required: true, unique:true },
  lng: { type: String, required: true, unique: true }
  //permissions: { type: [String], default: ['view_safety_places', 'manage_safety_places'] }

});

const SheltersSchema = new Schema({
    id: { type: String, unique:true },
    shelters: [ShelterSchema]
});

export const ShelterList = model('Shelter', SheltersSchema);