package com.example.demo.controller;

import com.example.demo.model.Job;
import com.example.demo.service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobService jobService;

    // ➕ ADD JOB (ADMIN)
    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    // 👀 GET ALL JOBS (USER)
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // ❌ DELETE JOB (ADMIN)
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return "Job deleted successfully";
    }
}