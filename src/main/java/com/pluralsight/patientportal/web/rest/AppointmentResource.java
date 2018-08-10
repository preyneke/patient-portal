package com.pluralsight.patientportal.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.pluralsight.patientportal.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.pluralsight.patientportal.domain.Appointment;
import com.pluralsight.patientportal.service.AppointmentService;
import com.pluralsight.patientportal.service.UserService;
import com.pluralsight.patientportal.web.rest.util.HeaderUtil;

/**
 * REST Controller for managing appointments
 */
@RestController
@RequestMapping("/api")
public class AppointmentResource {

    private final Logger log = LoggerFactory.getLogger(AppointmentResource.class);

   private static List<Appointment>appointments = new ArrayList<>();

    public AppointmentResource() {

    }

    /**
     * GET  /appointments : get all the appointments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of appointments in body
     */
    @GetMapping("/appointments")
    @Timed
    public List<Appointment> getAllAppointments() {
        return appointments;
    }

    /**
     * POST  /appointments : Create a new appointment.
     *
     * @param appointment the appointment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new appointment, or with status 400 (Bad Request) if the appointment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/appointments")
    @Timed
    public ResponseEntity<Appointment> createAppointment(@Valid @RequestBody Appointment appointment) throws Exception {
        appointment.setId(appointments.size());
        appointments.add(appointment);
        return ResponseEntity.created(new URI("/api/appointments"+ appointment.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("appointment",appointment.getId().toString())).body(appointment);
    }
}
