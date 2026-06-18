package com.example.demo.service;

import com.example.demo.model.Webinar;
import com.example.demo.repository.WebinarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebinarService {

    @Autowired
    private WebinarRepository webinarRepository;

    public Webinar addWebinar(Webinar webinar) {

        return webinarRepository.save(webinar);
    }

    public List<Webinar> getAllWebinars() {

        return webinarRepository.findAll();
    }
}