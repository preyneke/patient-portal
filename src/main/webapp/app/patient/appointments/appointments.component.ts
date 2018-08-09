import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {Appointment} from './appointments.model';
import {AppointmentsService} from './appointments.service';
import {HttpResponse} from '../../../../../../node_modules/@angular/common/http';

@Component({
    selector: 'jhi-patient-appointments',
    templateUrl: './appointments.component.html',
    styleUrls: ['./appointments.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {
    currentAppointment: any;
    appointments: Appointment[];
    eventSubscriber: Subscription;
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    page: any;

    constructor(
                private appointmentService: AppointmentsService,
                private alertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private parseLinks: JhiParseLinks
    ) {
    }

    loadAll() {
        this.appointmentService
            .query(

            )
            .subscribe(
                (res: HttpResponse<Appointment[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<Appointment[]>) => this.onError(res)
            );
    }
    ngOnInit() {
        this.loadAll();
        this.registerChangeInAppointments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Appointment) {
        return item.id;
    }
    registerChangeInAppointments() {
        this.eventManager.subscribe('appointmentsListModification', response => this.loadAll());    }
    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.appointments = data;
    }
    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
