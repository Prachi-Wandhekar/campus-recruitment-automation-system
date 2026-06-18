package com.example.demo.controller;

import com.example.demo.model.Webinar;
import com.example.demo.service.WebinarService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/webinars")
@CrossOrigin(origins = "*")
public class WebinarController {

    @Autowired
    private WebinarService webinarService;

    @PostMapping
    public Webinar addWebinar(
            @RequestBody Webinar webinar) {

        return webinarService.addWebinar(webinar);
    }

    @GetMapping
    public List<Webinar> getAllWebinars() {

        return webinarService.getAllWebinars();
    }
}