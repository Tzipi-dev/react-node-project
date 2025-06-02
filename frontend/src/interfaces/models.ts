

export interface User {
    name: string,
    password: string,
    phone: string,
    email: string,
    _id?: string 
}
export enum Category {
  תכשיטים_ושעונים = "תכשיטים_ושעונים",
  תיקים_ומזוודות = "תיקים_ומזוודות",
  ארנקים_וכספים = "ארנקים_וכספים",
  טלפונים_ואלקטרוניקה = "טלפונים_ואלקטרוניקה",
  יהדות = "יהדות",
  ביגוד = "ביגוד",
  בעלי_חיים = "בעלי_חיים",
  ציוד_רפואי = "ציוד_רפואי",
  אחר = "אחר"
  }
  
export interface Lost{
    category: Category,
    name: string,
    city: string,
    street: string,
    owner:  User
    date: Date,
    _id?: string 
}
export interface Found{
    category:Category,
    name: string,
    city: string,
    street: string,
    owner: User,
    date: Date,
   
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
    

}
export interface FieldFillByUser_Lost{
   
    name: string,
    city: string,
    street: string,
    date: string,
    

}
export enum Filters{
      הכל,
      אבדות,
      מציאות
}
export type UpdateFoundPayload = Partial<Found> & { _id: string };