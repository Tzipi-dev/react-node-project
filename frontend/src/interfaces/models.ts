

export interface User {
    name: String,
    password: String,
    phone: String,
    email: String,
    _id?: string 
}
export enum Categiry {
    תכשיטים_ושעונים = "תכשיטים ושעונים",
    תיקים_ומזוודות = "תיקים ומזוודות",
    ארנקים_וכספים = "ארנקים וכספים",
    טלפונים_ואלקטרוניקה = "טלפונים ואלקטרוניקה",
    יהדות = "יהדות",
    ביגוד = "ביגוד",
    בעלי_חיים = "בעלי חיים",
    ציוד_רפואי = "ציוד רפואי",
    אחר = "אחר"
  }
  
export interface Lost{
    categiry: Categiry,
    name: String,
    city: String,
    street: String,
    owner:  User|null,
    date: Date,
    identifying: Array<String>,
    _id?: string 
}
export interface Found{
    categiry:Categiry,
    name: String,
    city: string,
    street: string,
    owner: User|null,
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
  export enum Cities {
    אשדוד = 'אשדוד',
    אשקלון = 'אשקלון',
    נתיבות = 'נתיבות',
    בני_ברק = 'בני ברק',
    ירושלים = 'ירושלים',
    מודיעין_עילית = 'מודיעין עילית',
    אלעד = 'אלעד',
    בית_שמש = 'בית שמש',
    ביתר_עילית = 'ביתר עילית',
    חיפה = 'חיפה',
    כרמיאל = 'כרמיאל',
    צפת = 'צפת',
    טבריה = 'טבריה',
    פתח_תקווה = 'פתח תקווה',
    באר_שבע = 'באר שבע',
    תל_אביב = 'תל אביב',
    הרצליה = 'הרצליה',
    אילת = 'אילת',
    בת_ים = 'בת ים',
    גבעתיים = 'גבעתיים',
    דימונה = 'דימונה',
    הוד_השרון = 'הוד השרון',
    זכרון_יעקב = 'זכרון יעקב',
    חולון = 'חולון',
    חריש = 'חריש',
    רכסים = 'רכסים',
    נהריה = 'נהריה',
    קרית_שמונה = 'קרית שמונה',
    חדרה = 'חדרה',
    תפרח = 'תפרח',
    יסודות = 'יסודות',
    בית_חלקיה = 'בית חלקיה',
    לוד = 'לוד',
    מודיעין = 'מודיעין',
    יקנעם = 'יקנעם',
    יפו = 'יפו',
    ירוחם = 'ירוחם',
  }
  
export interface FieldFillByUser_Found{
   
    name: string,
    city: string,
    street: string,
    date: string,
    firstIdentity: string,
    secondIdentity: string,
    thirdIdentity: string,

}
export interface FieldFillByUser_Lost{
   
    name: string,
    city: string,
    street: string,
    date: string,
    firstIdentity: string,
    secondIdentity: string,
    thirdIdentity: string,

}