import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./UserDashboard.css";
import logo from "../assets/logo.png";

function UserDashboard() {

  const [activeTab, setActiveTab] =
    useState("home");

  const [jobs, setJobs] = useState([]);

  const [webinars, setWebinars] =
    useState([]);

  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    skills: "",
    project: "",
    internship: "",
    certification: ""
  });

  /* FETCH JOBS */

  const fetchJobs = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8082/api/jobs"
      );

      setJobs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  /* FETCH WEBINARS */

  const fetchWebinars = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8082/api/webinars"
      );

      setWebinars(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchJobs();
    fetchWebinars();

  }, []);

  /* APPLY JOB */

  const applyJob = async (jobId) => {

    try {

      const storedUser =
        localStorage.getItem("user");

      const user = JSON.parse(storedUser);

      const application = {

        userId: user.id,
        jobId: jobId,
        status: "Applied"
      };

      await axios.post(
        "http://localhost:8082/api/applications",
        application
      );

      alert("Applied Successfully");

    } catch (error) {

      console.log(error);

      alert("Application Failed");
    }
  };

  /* HANDLE RESUME INPUT */

  const handleChange = (e) => {

    setResume({

      ...resume,

      [e.target.name]:
      e.target.value
    });
  };

  /* BUILD PDF RESUME */

  const buildResume = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text("Resume", 90, 20);

    doc.setFontSize(14);

    doc.text(
      `Name: ${resume.fullName}`,
      20,
      40
    );

    doc.text(
      `Email: ${resume.email}`,
      20,
      50
    );

    doc.text(
      `Phone: ${resume.phone}`,
      20,
      60
    );

    doc.text(
      `College: ${resume.college}`,
      20,
      70
    );

    doc.text("Skills:", 20, 90);

    doc.text(
      resume.skills,
      20,
      100
    );

    doc.text("Project:", 20, 120);

    doc.text(
      resume.project,
      20,
      130
    );

    doc.text("Internship:", 20, 150);

    doc.text(
      resume.internship,
      20,
      160
    );

    doc.text(
      "Certification:",
      20,
      180
    );

    doc.text(
      resume.certification,
      20,
      190
    );

    doc.save("Resume.pdf");
  };

  return (

    <div className="dashboard-container">

      {/* HEADER */}

      <div className="top-header">

        <img
          src={logo}
          alt="College Logo"
          className="college-logo"
        />

        <h2>
          Anuradha College Of
          Engineering And Technology
        </h2>

      </div>

      {/* MAIN CONTENT */}

      <div className="dashboard-content">

        {/* HOME */}

        {activeTab === "home" && (

          <div className="home-section">

            {/* JOBS */}

            <div className="card">

              <div className="card-header">

                <h3>
                  Latest Jobs
                </h3>

              </div>

              {jobs.map((job) => (

                <div
                  className="job-box"
                  key={job.id}
                >

                  <h4>
                    {job.title}
                  </h4>

                  <p>
                    {job.company}
                  </p>

                  <p>
                    {job.location}
                  </p>

                  <p>
                    {job.description}
                  </p>

                </div>
              ))}

            </div>

            {/* WEBINARS */}

            <div className="card">

              <div className="card-header">

                <h3>
                  Webinars
                </h3>

              </div>

              {webinars.map((webinar) => (

                <div
                  className="webinar-box"
                  key={webinar.id}
                >

                  <h4>
                    {webinar.title}
                  </h4>

                  <p>
                    Speaker:
                    {" "}
                    {webinar.speaker}
                  </p>

                  <p>
                    Date:
                    {" "}
                    {webinar.date}
                  </p>

                  <p>
                    Time:
                    {" "}
                    {webinar.time}
                  </p>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* JOBS PAGE */}

        {activeTab === "jobs" && (

          <div>

            <h2 className="section-title">
              Available Jobs
            </h2>

            {jobs.map((job) => (

              <div
                className="job-card"
                key={job.id}
              >

                <h3>
                  {job.title}
                </h3>

                <p>

                  <b>
                    Company:
                  </b>

                  {" "}

                  {job.company}

                </p>

                <p>

                  <b>
                    Location:
                  </b>

                  {" "}

                  {job.location}

                </p>

                <p>

                  <b>
                    Description:
                  </b>

                  {" "}

                  {job.description}

                </p>

                <div className="job-actions">

  <button
    className="apply-btn"
    onClick={() =>
      applyJob(job.id)
    }
  >
    Apply Job
  </button>

  <a
    href={job.applyLink}
    target="_blank"
    rel="noreferrer"
    className="apply-link-btn"
  >
    Open Apply Link
  </a>

</div>

              </div>
            ))}

          </div>
        )}

        {/* WEBINAR PAGE */}

        {activeTab === "webinars" && (

          <div className="webinar-page">

            <h2>
              Upcoming Webinars
            </h2>

            <div className="webinar-grid">

              {webinars.map((webinar) => (

                <div
                  className="webinar-card"
                  key={webinar.id}
                >

                  <h3>
                    {webinar.title}
                  </h3>

                  <p>

                    <b>
                      Speaker:
                    </b>

                    {" "}

                    {webinar.speaker}

                  </p>

                  <p>

                    <b>
                      Date:
                    </b>

                    {" "}

                    {webinar.date}

                  </p>

                  <p>

                    <b>
                      Time:
                    </b>

                    {" "}

                    {webinar.time}

                  </p>

                  <a
                    href={webinar.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join Webinar
                  </a>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* RESUME BUILDER */}

        {activeTab === "resume" && (

          <div className="resume-builder">

            <h1>
              Resume Builder
            </h1>

            <div className="resume-box">
              Basic Details
            </div>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <div className="resume-box">
              Contact Details
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <div className="resume-box">
              Education
            </div>

            <input
              type="text"
              name="college"
              placeholder="College Name"
              onChange={handleChange}
            />

            <div className="resume-box">
              Skills
            </div>

            <textarea
              name="skills"
              placeholder="Enter Skills"
              onChange={handleChange}
            ></textarea>

            <div className="resume-box">
              Internships
            </div>

            <textarea
              name="internship"
              placeholder="Enter Internship Details"
              onChange={handleChange}
            ></textarea>

            <div className="resume-box">
              Projects
            </div>

            <textarea
              name="project"
              placeholder="Enter Project Details"
              onChange={handleChange}
            ></textarea>

            <div className="resume-box">
              Certifications
            </div>

            <textarea
              name="certification"
              placeholder="Enter Certifications"
              onChange={handleChange}
            ></textarea>

            <button
              className="build-btn"
              onClick={buildResume}
            >
              Build Resume
            </button>

          </div>
        )}

      </div>

      {/* FOOTER */}

      <div className="footer-nav">

        <button
          onClick={() =>
            setActiveTab("home")
          }
        >
          Home
        </button>

        <button
          onClick={() =>
            setActiveTab("jobs")
          }
        >
          Jobs
        </button>

        <button
          onClick={() =>
            setActiveTab("webinars")
          }
        >
          Webinars
        </button>

        <button
          onClick={() =>
            setActiveTab("resume")
          }
        >
          Resume Building
        </button>

      </div>

    </div>
  );
}

export default UserDashboard;