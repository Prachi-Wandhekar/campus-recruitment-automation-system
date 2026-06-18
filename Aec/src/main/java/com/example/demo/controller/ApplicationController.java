package com.example.demo.controller;

import com.example.demo.model.Application;
import com.example.demo.service.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public Application applyJob(
            @RequestBody Application application) {

        return applicationService.applyJob(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {

        return applicationService.getAllApplications();
    }
}