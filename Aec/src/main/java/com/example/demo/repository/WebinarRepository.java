package com.example.demo.repository;

import com.example.demo.model.Webinar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WebinarRepository
extends JpaRepository<Webinar, Long> {
}