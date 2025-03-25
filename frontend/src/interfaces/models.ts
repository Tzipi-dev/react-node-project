import { ObjectId } from "mongodb";

export interface User {
    name: String,
    password: String,
    phone: String,
    email: String,
    _id?: ObjectId
}
enum Categiry{
'תכשיטים ושעונים',
 'תיקים ומזוודות',
  'ארנקים וכספים',
  'טלפונים ואלקטרוניקה',
  'יהדות',
  'ביגוד',
  'בעלי חיים',
  'ציוד רפואי',
  'אחר'
}
export interface Lost{
    categiry: Categiry,
    name: String,
    city: String,
    street: String,
    owner:  User,
    date: Date,
    _id?: ObjectId
}
export interface Found{
    categiry:Categiry,
    name: String,
    city: String,
    street: String,
    owner: User,
    date: Date,
    identifying: Array<String>,
    _id?: ObjectId
}
export interface LogInUser{
    email: String,
    password: String,
    _id?:ObjectId
}
