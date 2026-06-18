package com.example.demo.service;


import com.example.demo.model.Job;
import com.example.demo.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.UserRepository;

import java.util.List;

@Service
public class JobService {
	
	@Autowired
	private EmailService emailService;

    @Autowired
    private JobRepository jobRepository;
    
    @Autowired   // ✅ ADD THIS
    private UserRepository userRepository;

    public Job addJob(Job job) {

        Job savedJob = jobRepository.save(job);

        // 🔥 SEND EMAIL TO ALL USERS
        userRepository.findAll().forEach(user -> {

            String subject = "New Job Posted!";
            String body = "Job: " + job.getTitle() +
                          "\nCompany: " + job.getCompany() +
                          "\nLocation: " + job.getLocation();

            emailService.sendEmail(user.getEmail(), subject, body);
        });

        return savedJob;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}