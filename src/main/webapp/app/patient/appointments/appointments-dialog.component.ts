import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import { Appointment, IAppointment } from './appointments.model';
import {AppointmentsPopupService} from './appointments-popup.service';
import {AppointmentsService} from './appointments.service';
import {HttpResponse} from '../../../../../../node_modules/@angular/common/http';

@Component({
    selector: 'jhi-appointments-dialog',
    templateUrl: './appointments-dialog.component.html'
})
export class AppointmentsDialogComponent implements OnInit {

    appointment: Appointment;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private appointmentsService: AppointmentsService,
        private eventManager: JhiEventManager,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }
    previousState() {
        this.router.navigate(['/patient-appointments']);
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(
            this.appointmentsService.create(this.appointment));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Appointment>>) {
        result.subscribe((res: HttpResponse<Appointment>) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: HttpResponse<Appointment>) {
        this.eventManager.broadcast({ name: 'appointmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        this.previousState();
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-appointments-popup',
    template: ''
})
export class AppointmentsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private appointmentsPopupService: AppointmentsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(() => {
            this.appointmentsPopupService
                .open(AppointmentsDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
