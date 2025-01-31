
export interface Experience {
  _id?:string;
  companyName: string;
  fromDate: Date;
  toDate: Date;
  jobRole: string;
}

export interface Education {
  _id?:string;
  course: string;
  institutionName: string;
  fromDate: Date;
  toDate: Date;
  shortNote: string;
}

export interface User {
  _id:string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  professionalSummary: string;
  experience: Experience[];
  education: Education[];
  skills?:string[];
}
