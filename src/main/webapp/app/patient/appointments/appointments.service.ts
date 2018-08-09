import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Appointment, IAppointment} from 'app/patient/appointments/appointments.model';
import { Observable, of } from 'rxjs';
import {createRequestOption} from 'app/shared/util/request-util';

@Injectable()
export class AppointmentsService {

    private resourceUrl = 'api/appointments';

    constructor(private http: HttpClient) {
    }

    create(appointment: Appointment): Observable<HttpResponse<Appointment>> {
        return this.http.post<Appointment>(this.resourceUrl, appointment, { observe: 'response' });

    }

    query(req?: any): Observable<HttpResponse<IAppointment[]>> {
        const options = createRequestOption(req);
        return this.http.get<IAppointment[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

}
