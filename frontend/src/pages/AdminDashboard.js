import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "jobs", label: "Jobs", icon: "💼" },
  { key: "applications", label: "Applicants", icon: "📄" },
  { key: "webinars", label: "Webinars", icon: "🎥" },
];

function StatCard({ icon, label, value, color }) {

  return (

    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-info">

        <span className="stat-label">
          {label}
        </span>

        <span
          className="stat-value"
          style={{ color }}
        >
          {String(value).padStart(2, "0")}
        </span>

      </div>

    </div>
  );
}

function AdminDashboard() {

  const navigate = useNavigate();

  const [activeNav, setActiveNav] =
    useState("dashboard");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  /* JOB STATES */

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] =
    useState("");

    const [applyLink, setApplyLink] =
useState("");

  /* WEBINAR STATES */

  const [webinarTitle, setWebinarTitle] =
    useState("");

  const [speaker, setSpeaker] =
    useState("");

  const [webinarDate, setWebinarDate] =
    useState("");

  const [webinarTime, setWebinarTime] =
    useState("");

  const [webinarLink, setWebinarLink] =
    useState("");

  /* DATA */

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] =
    useState([]);

  const [webinars, setWebinars] =
    useState([]);

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

  /* FETCH APPLICATIONS */

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8082/api/applications"
      );

      setApplications(res.data);

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
    fetchApplications();
    fetchWebinars();

  }, []);

  /* ADD JOB */

  const addJob = async () => {

    if (
      !title ||
      !company ||
      !location ||
      !description ||
!applyLink
    ) {

      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8082/api/jobs",
        {
          title,
          company,
          location,
          description,
applyLink
        }
      );

      alert("Job Added Successfully");

      setTitle("");
      setCompany("");
      setLocation("");
      setDescription("");
      setApplyLink("");

      fetchJobs();

    } catch (error) {

      console.log(error);

    }
  };

  /* DELETE JOB */

  const deleteJob = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8082/api/jobs/${id}`
      );

      fetchJobs();

    } catch (error) {

      console.log(error);

    }
  };

  /* ADD WEBINAR */

  const addWebinar = async () => {

    if (
      !webinarTitle ||
      !speaker ||
      !webinarDate ||
      !webinarTime ||
      !webinarLink
    ) {

      alert("Please fill all webinar fields");
      return;
    }

    try {

      await axios.post(
        "http://localhost:8082/api/webinars",
        {
          title: webinarTitle,
          speaker: speaker,
          date: webinarDate,
          time: webinarTime,
          link: webinarLink
        }
      );

      alert("Webinar Added");

      setWebinarTitle("");
      setSpeaker("");
      setWebinarDate("");
      setWebinarTime("");
      setWebinarLink("");

      fetchWebinars();

    } catch (error) {

      console.log(error);

    }
  };

  /* LOGOUT */

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  /* CONTENT */

  const renderContent = () => {

    switch (activeNav) {

      /* DASHBOARD */

      case "dashboard":

        return (

          <div className="dashboard-content">

            <h2 className="section-title">
              Dashboard Overview
            </h2>

            <div className="stats-grid">

              <StatCard
                icon="💼"
                label="Total Jobs"
                value={jobs.length}
                color="#2563eb"
              />

              <StatCard
                icon="📄"
                label="Applications"
                value={applications.length}
                color="#7c3aed"
              />

              <StatCard
                icon="👥"
                label="Users"
                value="10"
                color="#059669"
              />

              <StatCard
                icon="🎥"
                label="Webinars"
                value={webinars.length}
                color="#ea580c"
              />

            </div>

          </div>
        );

      /* JOBS */

      case "jobs":

        return (

          <div className="dashboard-content">

            <h2 className="section-title">
              Job Management
            </h2>

            <div className="form-card">

              <h3 className="form-title">
                Add New Job
              </h3>

              <div className="form-grid">

                <input
                  className="form-input"
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

                <input
                  className="form-input"
                  placeholder="Company"
                  value={company}
                  onChange={(e) =>
                    setCompany(e.target.value)
                  }
                />

                <input
                  className="form-input"
                  placeholder="Location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                />

                <textarea
                  className="form-input"
                  placeholder="Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                ></textarea>

                <input
  className="form-input"
  placeholder="Apply Link"
  value={applyLink}
  onChange={(e) =>
    setApplyLink(e.target.value)
  }
/>

              </div>

              <button
                className="btn-primary"
                onClick={addJob}
              >
                + Add Job
              </button>

            </div>

            <h3 className="sub-title">
              Posted Jobs
            </h3>

            <div className="table-wrapper">

              <table className="data-table">

                <thead>

                  <tr>

                    <th>#</th>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Description</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {jobs.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="empty-row"
                      >
                        No Jobs Found
                      </td>

                    </tr>

                  ) : (

                    jobs.map((job, index) => (

                      <tr key={job.id}>

                        <td>{index + 1}</td>
                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>{job.description}</td>

                        <td>

                          <button
                            className="btn-danger"
                            onClick={() =>
                              deleteJob(job.id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        );

      /* APPLICATIONS */

      case "applications":

        return (

          <div className="dashboard-content">

            <h2 className="section-title">
              Job Applicants
            </h2>

            <div className="table-wrapper">

              <table className="data-table">

                <thead>

                  <tr>

                    <th>#</th>
                    <th>User ID</th>
                    <th>Job ID</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {applications.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="empty-row"
                      >
                        No Applications Found
                      </td>

                    </tr>

                  ) : (

                    applications.map((app, index) => (

                      <tr key={app.id}>

                        <td>{index + 1}</td>
                        <td>{app.userId}</td>
                        <td>{app.jobId}</td>
                        <td>{app.status}</td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        );

      /* WEBINARS */

      case "webinars":

        return (

          <div className="dashboard-content">

            <h2 className="section-title">
              Webinar Management
            </h2>

            <div className="form-card">

              <h3 className="form-title">
                Add Webinar
              </h3>

              <div className="form-grid">

                <input
                  className="form-input"
                  placeholder="Webinar Title"
                  value={webinarTitle}
                  onChange={(e) =>
                    setWebinarTitle(e.target.value)
                  }
                />

                <input
                  className="form-input"
                  placeholder="Speaker Name"
                  value={speaker}
                  onChange={(e) =>
                    setSpeaker(e.target.value)
                  }
                />

                <input
                  className="form-input"
                  placeholder="Date"
                  value={webinarDate}
                  onChange={(e) =>
                    setWebinarDate(e.target.value)
                  }
                />

                <input
                  className="form-input"
                  placeholder="Time"
                  value={webinarTime}
                  onChange={(e) =>
                    setWebinarTime(e.target.value)
                  }
                />

                <input
                  className="form-input"
                  placeholder="Meeting Link"
                  value={webinarLink}
                  onChange={(e) =>
                    setWebinarLink(e.target.value)
                  }
                />

              </div>

              <button
                className="btn-primary"
                onClick={addWebinar}
              >
                + Add Webinar
              </button>

            </div>

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
                    <b>Speaker:</b>
                    {" "}
                    {webinar.speaker}
                  </p>

                  <p>
                    <b>Date:</b>
                    {" "}
                    {webinar.date}
                  </p>

                  <p>
                    <b>Time:</b>
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
        );

      default:
        return null;
    }
  };

  return (

    <div className="admin-layout">

      <header className="top-navbar">

        <div className="navbar-left">

          <button
            className="hamburger"
            onClick={() =>
              setSidebarOpen(!sidebarOpen)
            }
          >
            ☰
          </button>

          <span className="brand-name">
            ADMIN PANEL
          </span>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </header>

      <div className="body-layout">

        <aside
          className={`sidebar ${
            sidebarOpen ? "open" : "closed"
          }`}
        >

          <nav className="sidebar-nav">

            {NAV_ITEMS.map((item) => (

              <button
                key={item.key}
                className={`nav-item ${
                  activeNav === item.key
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActiveNav(item.key)
                }
              >

                <span className="nav-icon">
                  {item.icon}
                </span>

                {sidebarOpen && (

                  <span className="nav-label">
                    {item.label}
                  </span>

                )}

              </button>
            ))}

          </nav>

        </aside>

        <main className="main-content">

          {renderContent()}

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;