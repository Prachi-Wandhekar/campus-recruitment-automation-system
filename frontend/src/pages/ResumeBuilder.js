import { useState } from "react";
import jsPDF from "jspdf";

function ResumeBuilder() {

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: ""
  });

  const [showResume, setShowResume] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const generateResume = () => {
    setShowResume(true);
  };

  // PDF Download
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text("RESUME", 90, 10);

    doc.text(`Name: ${data.name}`, 10, 30);
    doc.text(`Email: ${data.email}`, 10, 40);
    doc.text(`Phone: ${data.phone}`, 10, 50);

    doc.text(`Skills: ${data.skills}`, 10, 70);
    doc.text(`Education: ${data.education}`, 10, 90);
    doc.text(`Experience: ${data.experience}`, 10, 110);

    doc.save("resume.pdf");
  };

  return (
    <div>
      <h2>Resume Builder</h2>

      {!showResume ? (
        <div>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />

          <textarea name="skills" placeholder="Skills" onChange={handleChange}></textarea>
          <textarea name="education" placeholder="Education" onChange={handleChange}></textarea>
          <textarea name="experience" placeholder="Experience" onChange={handleChange}></textarea>

          <button onClick={generateResume}>Generate Resume</button>
        </div>
      ) : (
        <div>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
          <p>{data.phone}</p>

          <h3>Skills</h3>
          <p>{data.skills}</p>

          <h3>Education</h3>
          <p>{data.education}</p>

          <h3>Experience</h3>
          <p>{data.experience}</p>

          <button onClick={downloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}

export default ResumeBuilder;