

export interface User {
    name: String,
    password: String,
    phone: String,
    email: String,
    _id?: string 
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
    _id?: string 
}
export interface Found{
    categiry:Categiry,
    name: String,
    city: String,
    street: String,
    owner: User,
    date: Date,
    identifying: Array<String>,
    _id?: string 
}
export interface LogInUser{
    email: String,
    password: String,
    _id?:string 
}
export interface LoginResponse {
    accessToken: String;
    user: {
      email: String;
      name: String;
      password: String; 
      phone: String;
      _id: string ;
    };
  }