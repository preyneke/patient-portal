
 export interface IAppointment  {

    id?: any;
    reason?: string;
    insuranceChange?: boolean;
    phoneNumber?: string;

}

export class Appointment implements IAppointment{
    constructor(
        public id?: any,
        public reason?: string,
        public insuranceChange?: boolean,
        public phoneNumber?: string,
    ) {
        this.insuranceChange = false;
    }


}
