import { TMeta } from "../common";

export type TSpeciality = {
  id: string;
  title: string;
  icon: string;
};

export type TDoctorSpeciality = {
  specialitiesId: string;
  doctorId?: string;
  isDeleted?: boolean; // optional, if it’s not always returned
  specialities?: TSpeciality;
};

export type TDoctor = {
  id: string;
  email: string;
  name: string;
  profilePhoto: string | null;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean | string; // still safe because backend sends "false"
  createdAt: string;
  updatedAt: string;
  doctorSpecialities: TDoctorSpeciality[];
};

export type DoctorsResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: TMeta;
  data: TDoctor[];
};
