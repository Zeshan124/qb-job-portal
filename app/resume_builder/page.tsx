"use client";

import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Divider,
  message,
  Tag,
  Upload,
  Tooltip,
  Switch,
  Radio,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  DownloadOutlined,
  EyeOutlined,
  UploadOutlined,
  SaveOutlined,
  LinkedinOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  FileTextOutlined,
  RightOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { jsPDF } from "jspdf";
import { Heading } from "@/paths";
import moment from "moment";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface EducationItem {
  degree: string;
  institution: string;
  date: string[];
  description: string;
  gpa?: string;
}

interface ExperienceItem {
  position: string;
  company: string;
  date: string[];
  description: string;
  achievements?: string[];
  isPresent?: boolean;
}

interface SkillItem {
  name: string;
  level: string;
}

interface ProjectItem {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
}

interface LanguageItem {
  name: string;
  proficiency: string;
}

interface ResumeData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  photo?: string;
  summary?: string;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  skills?: SkillItem[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: LanguageItem[];
  interests?: string[];
  template?: string;
  accentColor?: string;
}

export default function ResumeBuilder() {
  const [form] = Form.useForm();
  const [resumeData, setResumeData] = useState<ResumeData>({
    education: [
      { degree: "", institution: "", date: [], description: "", gpa: "" },
    ],
    experience: [
      {
        position: "",
        company: "",
        date: [],
        description: "",
        achievements: [],
        isPresent: false,
      },
    ],
    skills: [{ name: "", level: "Beginner" }],
    projects: [{ name: "", description: "", technologies: [] }],
    certifications: [{ name: "", issuer: "", date: "", expiry: "" }],
    languages: [{ name: "", proficiency: "Basic" }],
    interests: [],
    template: "modern",
    accentColor: "#2563eb", // Default blue
  });

  const [previewReady, setPreviewReady] = useState(false);
  const [achievementInputs, setAchievementInputs] = useState<{
    [key: number]: string;
  }>({});
  const [techInputs, setTechInputs] = useState<{ [key: number]: string }>({});
  const [interestInput, setInterestInput] = useState("");

  const handlePresentChange = (checked: boolean, index: number) => {
    if (!resumeData.experience) return;

    const updatedExperience = [...resumeData.experience];
    if (!updatedExperience[index]) return;

    updatedExperience[index].isPresent = checked;

    if (checked) {
      updatedExperience[index].date[1] = ""; // clear end date if Present
    } else {
      updatedExperience[index].date[1] = ""; // still assign empty string instead of null
    }

    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const handleStartDateChange = (
    dates: any,
    dateStrings: [string, string],
    index: number
  ) => {
    if (!resumeData.experience) return;

    const updatedExperience = [...resumeData.experience];
    if (!updatedExperience[index]) return;

    updatedExperience[index].date = [
      dateStrings[0] ? moment(dateStrings[0]).format("MM/DD/YYYY") : "",
      dateStrings[1] ? moment(dateStrings[1]).format("MM/DD/YYYY") : "",
    ];

    if (updatedExperience[index].isPresent && !dates[1]) {
      updatedExperience[index].date[1] = moment().format("MM/DD/YYYY");
    }

    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const colorOptions = [
    { label: "Blue", value: "#2563eb" },
    { label: "Teal", value: "#0d9488" },
    { label: "Purple", value: "#7c3aed" },
    { label: "Red", value: "#dc2626" },
    { label: "Green", value: "#16a34a" },
    { label: "Amber", value: "#d97706" },
    { label: "Gray", value: "#4b5563" },
  ];

  const onFinish = (values: ResumeData) => {
    setResumeData(values);
    setPreviewReady(true);
    message.success({
      content: "Resume data updated successfully!",
      style: {
        marginTop: "4vh",
      },
    });
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPosition = 15;
    const leftMargin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const lineHeight = 7;
    const contentWidth = pageWidth - leftMargin * 2;

    const primaryColor = resumeData.accentColor || "#2563eb";
    const secondaryColor = "#4b5563";

    if (resumeData.template === "modern") {
      doc.setFillColor(primaryColor);
      doc.rect(0, 0, pageWidth, 3, "F");

      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#000000");
      doc.text(resumeData.name || "", leftMargin, yPosition + 10);
      yPosition += 15;

      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(secondaryColor);
      doc.text(resumeData.title || "", leftMargin, yPosition);
      yPosition += 10;

      // Contact info in horizontal layout
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      let contactX = leftMargin;
      const contactInfo = [];

      if (resumeData.email) contactInfo.push(`Email: ${resumeData.email}`);
      if (resumeData.phone) contactInfo.push(`Phone: ${resumeData.phone}`);
      if (resumeData.location)
        contactInfo.push(`Location: ${resumeData.location}`);
      if (resumeData.linkedin)
        contactInfo.push(`LinkedIn: ${resumeData.linkedin}`);
      if (resumeData.website)
        contactInfo.push(`Website: ${resumeData.website}`);
      if (resumeData.github) contactInfo.push(`GitHub: ${resumeData.github}`);

      const contactWidth = (pageWidth - leftMargin * 2) / 3;

      for (let i = 0; i < contactInfo.length; i++) {
        if (i > 0 && i % 3 === 0) {
          contactX = leftMargin;
          yPosition += 5;
        }
        doc.text(contactInfo[i], contactX, yPosition);
        contactX += contactWidth;
      }

      yPosition += 10;
    } else if (resumeData.template === "professional") {
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text(resumeData.name || "", leftMargin, yPosition + 10);
      yPosition += 15;

      // Title
      doc.setFontSize(16);
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#000000");
      doc.text(resumeData.title || "", leftMargin, yPosition);
      yPosition += 12;

      // Contact in two columns
      doc.setFontSize(10);
      doc.setTextColor(secondaryColor);

      const col1 = leftMargin;
      const col2 = leftMargin + contentWidth / 2;

      let row = 0;
      if (resumeData.email) {
        doc.text(`Email: ${resumeData.email}`, col1, yPosition + row * 6);
        row++;
      }

      if (resumeData.phone) {
        doc.text(
          `Phone: ${resumeData.phone}`,
          row % 2 === 0 ? col1 : col2,
          yPosition + Math.floor(row / 2) * 6
        );
        row++;
      }

      if (resumeData.location) {
        doc.text(
          `Location: ${resumeData.location}`,
          row % 2 === 0 ? col1 : col2,
          yPosition + Math.floor(row / 2) * 6
        );
        row++;
      }

      if (resumeData.linkedin) {
        doc.text(
          `LinkedIn: ${resumeData.linkedin}`,
          row % 2 === 0 ? col1 : col2,
          yPosition + Math.floor(row / 2) * 6
        );
        row++;
      }

      if (resumeData.website) {
        doc.text(
          `Website: ${resumeData.website}`,
          row % 2 === 0 ? col1 : col2,
          yPosition + Math.floor(row / 2) * 6
        );
        row++;
      }

      if (resumeData.github) {
        doc.text(
          `GitHub: ${resumeData.github}`,
          row % 2 === 0 ? col1 : col2,
          yPosition + Math.floor(row / 2) * 6
        );
        row++;
      }

      yPosition += Math.ceil(row / 2) * 6 + 6;
    } else {
      // Minimal template
      doc.setFontSize(26);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#000000");
      doc.text(resumeData.name || "", leftMargin, yPosition + 10);
      yPosition += 15;

      // Title and contact on same line
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(secondaryColor);

      const contactParts = [];
      if (resumeData.title) contactParts.push(resumeData.title);
      if (resumeData.email) contactParts.push(resumeData.email);
      if (resumeData.phone) contactParts.push(resumeData.phone);

      doc.text(contactParts.join(" | "), leftMargin, yPosition);
      yPosition += 10;

      // Second line of contact info if needed
      const contactParts2 = [];
      if (resumeData.location) contactParts2.push(resumeData.location);
      if (resumeData.linkedin) contactParts2.push(resumeData.linkedin);
      if (resumeData.website) contactParts2.push(resumeData.website);

      if (contactParts2.length > 0) {
        doc.text(contactParts2.join(" | "), leftMargin, yPosition);
        yPosition += 8;
      }
    }

    // Add divider
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPosition, pageWidth - leftMargin, yPosition);
    yPosition += 8;

    // Summary
    if (resumeData.summary) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text("Professional Summary", leftMargin, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor("#000000");

      const summaryLines = doc.splitTextToSize(
        resumeData.summary,
        contentWidth
      );
      doc.text(summaryLines, leftMargin, yPosition);
      yPosition += summaryLines.length * 5 + 10;
    }

    // Experience
    if (
      resumeData.experience &&
      resumeData.experience.length > 0 &&
      resumeData.experience[0].position
    ) {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text("Professional Experience", leftMargin, yPosition);
      yPosition += 6;

      resumeData.experience.forEach((exp) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 15;
        }

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#000000");
        doc.text(exp.position, leftMargin, yPosition);

        const dateText =
          exp.date && exp.date.length === 2
            ? `${moment(exp.date[0]).format("MM/DD/YYYY")} - ${
                exp.date[1]
                  ? moment(exp.date[1]).format("MM/DD/YYYY")
                  : "Present"
              }`
            : "";

        if (dateText) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.text(
            dateText,
            pageWidth - leftMargin - doc.getTextWidth(dateText),
            yPosition
          );
        }

        yPosition += 5;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);
        doc.text(exp.company, leftMargin, yPosition);
        yPosition += 5;

        if (exp.description) {
          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(exp.description, contentWidth);
          doc.text(descLines, leftMargin, yPosition);
          yPosition += descLines.length * 5;
        }

        // Key Achievements
        // if (exp.achievements && exp.achievements.length > 0) {
        //   yPosition += 3;
        //   doc.setFont("helvetica", "italic");
        //   doc.text("Key Achievements:", leftMargin, yPosition);
        //   yPosition += 4;

        //   doc.setFont("helvetica", "normal");

        //   exp.achievements.forEach((achievement, i) => {
        //     const bulletText = `• ${achievement}`;
        //     const bulletLines = doc.splitTextToSize(
        //       bulletText,
        //       contentWidth - 5
        //     );
        //     doc.text(bulletLines, leftMargin + 3, yPosition);
        //     yPosition += bulletLines.length * 5;
        //   });
        // }

        // yPosition += 8;
      });
    }

    // Education
    if (
      resumeData.education &&
      resumeData.education.length > 0 &&
      resumeData.education[0].degree
    ) {
      // Check if we need a page break
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 15;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text("Education", leftMargin, yPosition);
      yPosition += 6;

      resumeData.education.forEach((edu) => {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#000000");
        doc.text(edu.degree, leftMargin, yPosition);

        const dateText =
          edu.date && edu.date.length === 2
            ? `${moment(edu.date[0]).format("MM/DD/YYYY")} - ${
                edu.date[1]
                  ? moment(edu.date[1]).format("MM/DD/YYYY")
                  : "Present"
              }`
            : "";

        if (dateText) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.text(
            dateText,
            pageWidth - leftMargin - doc.getTextWidth(dateText),
            yPosition
          );
        }

        yPosition += 6;

        doc.setFont("helvetica", "italic");
        doc.setFontSize(10);

        let institutionText = edu.institution;
        if (edu.gpa) {
          institutionText += ` | GPA: ${edu.gpa}`;
        }

        doc.text(institutionText, leftMargin, yPosition);
        yPosition += 5;

        if (edu.description) {
          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(edu.description, contentWidth);
          doc.text(descLines, leftMargin, yPosition);
          yPosition += descLines.length * 5;
        }

        yPosition += 5;
      });

      yPosition += 3;
    }

    // Two Column Layout for Skills & Languages
    if (
      (resumeData.skills && resumeData.skills.length > 0) ||
      (resumeData.languages && resumeData.languages.length > 0)
    ) {
      // Check if we need a page break
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 15;
      }

      const startY = yPosition;
      const col1Width = contentWidth / 2 - 5;
      const col2X = leftMargin + col1Width + 10;

      // Skills in column 1
      if (
        resumeData.skills &&
        resumeData.skills.length > 0 &&
        resumeData.skills[0].name
      ) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor);
        doc.text("Skills", leftMargin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor("#000000");

        let skillText = "";
        const skillsByLevel: { [key: string]: string[] } = {
          Expert: [],
          Advanced: [],
          Intermediate: [],
          Beginner: [],
        };

        resumeData.skills.forEach((skill) => {
          if (skill.name) {
            if (skillsByLevel[skill.level]) {
              skillsByLevel[skill.level].push(skill.name);
            }
          }
        });

        let skillY = yPosition;

        for (const level in skillsByLevel) {
          if (skillsByLevel[level].length > 0) {
            doc.setFont("helvetica", "bold");
            doc.text(`${level}:`, leftMargin, skillY);
            skillY += 5;

            doc.setFont("helvetica", "normal");
            const skillsText = skillsByLevel[level].join(", ");
            const skillLines = doc.splitTextToSize(skillsText, col1Width);
            doc.text(skillLines, leftMargin + 3, skillY);
            skillY += skillLines.length * 5 + 3;
          }
        }

        yPosition = skillY;
      }

      let languageY = startY;

      // Languages in column 2
      if (
        resumeData.languages &&
        resumeData.languages.length > 0 &&
        resumeData.languages[0].name
      ) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor);
        doc.text("Languages", col2X, languageY);
        languageY += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor("#000000");

        resumeData.languages.forEach((lang) => {
          if (lang.name) {
            doc.text(`${lang.name} - ${lang.proficiency}`, col2X, languageY);
            languageY += 5;
          }
        });
      }

      // Interests can go in column 2 as well if there's space
      if (resumeData.interests && resumeData.interests.length > 0) {
        languageY += 8;

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(primaryColor);
        doc.text("Interests", col2X, languageY);
        languageY += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor("#000000");

        const interestsText = resumeData.interests.join(", ");
        const interestLines = doc.splitTextToSize(interestsText, col1Width);
        doc.text(interestLines, col2X, languageY);
        languageY += interestLines.length * 5;
      }

      yPosition = Math.max(yPosition, languageY) + 5;
    }

    // Projects
    if (
      resumeData.projects &&
      resumeData.projects.length > 0 &&
      resumeData.projects[0].name
    ) {
      // Check if we need a page break
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 15;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text("Projects", leftMargin, yPosition);
      yPosition += 6;

      resumeData.projects.forEach((project) => {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#000000");
        doc.text(project.name, leftMargin, yPosition);
        yPosition += 5;

        // Technologies
        if (project.technologies && project.technologies.length > 0) {
          doc.setFontSize(9);
          doc.setFont("helvetica", "italic");
          const techText = `Technologies: ${project.technologies.join(", ")}`;
          const techLines = doc.splitTextToSize(techText, contentWidth);
          doc.text(techLines, leftMargin, yPosition);
          yPosition += techLines.length * 4;
        }

        // Project description
        if (project.description) {
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          const descLines = doc.splitTextToSize(
            project.description,
            contentWidth
          );
          doc.text(descLines, leftMargin, yPosition);
          yPosition += descLines.length * 5;
        }

        // Project link
        if (project.link) {
          doc.setFontSize(9);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(primaryColor);
          doc.text(`Link: ${project.link}`, leftMargin, yPosition);
          doc.setTextColor("#000000");
          yPosition += 4;
        }

        yPosition += 5;
      });

      yPosition += 3;
    }

    // Certifications
    if (
      resumeData.certifications &&
      resumeData.certifications.length > 0 &&
      resumeData.certifications[0].name
    ) {
      // Check if we need a page break
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 15;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor);
      doc.text("Certifications", leftMargin, yPosition);
      yPosition += 6;

      resumeData.certifications.forEach((cert) => {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#000000");
        doc.text(cert.name, leftMargin, yPosition);

        // Format date and expiry using moment
        const dateText = cert.date
          ? `${moment(cert.date).format("MM/DD/YYYY")}${
              cert.expiry
                ? ` - ${moment(cert.expiry).format("MM/DD/YYYY")}`
                : ""
            }`
          : "";

        if (dateText) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(9);
          doc.text(
            dateText,
            pageWidth - leftMargin - doc.getTextWidth(dateText),
            yPosition
          );
        }

        yPosition += 5;

        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(`Issuer: ${cert.issuer}`, leftMargin + 3, yPosition);
        yPosition += 7;
      });
    }

    // Footer
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(secondaryColor);
    const footerText = "Resume generated with Qist Bazaar Resume Builder";
    doc.text(
      footerText,
      pageWidth / 2 - doc.getTextWidth(footerText) / 2,
      doc.internal.pageSize.getHeight() - 10
    );

    doc.save("professional-resume.pdf");
    message.success({
      content: "Resume downloaded successfully!",
      style: {
        marginTop: "20vh",
      },
    });
  };

  const handleTechInputChange = (index: number, value: string) => {
    setTechInputs({
      ...techInputs,
      [index]: value,
    });
  };

  const addTechnology = (index: number) => {
    const projects = form.getFieldValue("projects");
    const tech = techInputs[index];

    if (!tech || tech.trim() === "") {
      return;
    }

    const updatedProjects = [...projects];
    updatedProjects[index].technologies = [
      ...(updatedProjects[index].technologies || []),
      tech,
    ];

    form.setFieldsValue({
      projects: updatedProjects,
    });

    setTechInputs({
      ...techInputs,
      [index]: "",
    });
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const projects = form.getFieldValue("projects");
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies = updatedProjects[
      projectIndex
    ].technologies.filter((_: any, i: number) => i !== techIndex);

    form.setFieldsValue({
      projects: updatedProjects,
    });
  };

  return (
    <div className="my-10">
      <Heading
        mainHeading="Create Your Perfect Resume"
        subHeading="Build a professional resume in just 60 seconds."
      />

      <div className="my-6 w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>

      <div
        className=""
        style={{
          padding: "32px",
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={resumeData}
          layout="vertical"
        >
          {/* Personal Information Section */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <UserOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Personal Information
          </Divider>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <Form.Item
              label="Full Name"
              name="name"
              style={{ marginBottom: "16px" }}
            >
              <Input
                placeholder="John Doe"
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label="Professional Title"
              name="title"
              style={{ marginBottom: "16px" }}
            >
              <Input
                placeholder="Software Engineer"
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              style={{ marginBottom: "16px" }}
            >
              <Input
                placeholder="john.doe@example.com"
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              style={{ marginBottom: "16px" }}
            >
              <Input
                placeholder="+1 234 567 890"
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              style={{ marginBottom: "16px" }}
            >
              <Input
                placeholder="New York, USA"
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Item>
            <Form.Item
              label="LinkedIn"
              name="linkedin"
              style={{ marginBottom: "16px" }}
            >
              <Input
                placeholder="https://linkedin.com/in/johndoe"
                style={{ borderRadius: "8px", padding: "10px" }}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Professional Summary"
            name="summary"
            style={{ marginBottom: "24px" }}
          >
            <TextArea
              rows={4}
              placeholder="A passionate software engineer with 5+ years of experience..."
              style={{ borderRadius: "8px", padding: "10px" }}
            />
          </Form.Item>

          {/* Education Section */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <FileTextOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Education
          </Divider>
          <Form.List name="education">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "12px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        label="Degree"
                        name={[field.name, "degree"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="Bachelor of Science in Computer Science"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Institution"
                        name={[field.name, "institution"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="University of Example"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Date"
                        name={[field.name, "date"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <RangePicker
                          picker="month"
                          style={{ borderRadius: "8px", width: "100%" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="GPA"
                        name={[field.name, "gpa"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="3.8"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item
                      label="Description"
                      name={[field.name, "description"]}
                      style={{ marginBottom: "16px" }}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Relevant coursework, achievements, etc."
                        style={{ borderRadius: "8px", padding: "10px" }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        type="dashed"
                        onClick={() => remove(field.name)}
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: "8px", width: "100%" }}
                      >
                        Remove Education
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ borderRadius: "8px", marginTop: "16px" }}
                >
                  Add Education
                </Button>
              </>
            )}
          </Form.List>

          {/* Experience Section */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <ThunderboltOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Experience
          </Divider>
          <Form.List name="experience">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "12px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        label="Position"
                        name={[field.name, "position"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="Software Engineer"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Company"
                        name={[field.name, "company"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="Tech Corp Inc."
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Date"
                        name={[field.name, "date"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <RangePicker
                          style={{ borderRadius: "8px", width: "100%" }}
                          value={
                            resumeData.experience?.[0]?.date?.length
                              ? [
                                  dayjs(
                                    resumeData.experience[0].date[0],
                                    "MM/DD/YYYY"
                                  ),
                                  resumeData.experience[0].date[1] === "Present"
                                    ? undefined
                                    : dayjs(
                                        resumeData.experience[0].date[1],
                                        "MM/DD/YYYY"
                                      ),
                                ]
                              : undefined
                          }
                          onChange={(dates, dateStrings) =>
                            handleStartDateChange(dates, dateStrings, 0)
                          }
                        />
                      </Form.Item>
                      <Form.Item
                        label="Present"
                        name={[field.name, "isPresent"]}
                        valuePropName="checked"
                        style={{ marginBottom: "16px" }}
                      >
                        <Checkbox
                          checked={
                            resumeData.experience?.[index]?.isPresent ?? false
                          }
                          onChange={(e) =>
                            handlePresentChange(e.target.checked, index)
                          }
                        >
                          Currently Employed
                        </Checkbox>
                      </Form.Item>
                    </div>
                    <Form.Item
                      label="Description"
                      name={[field.name, "description"]}
                      style={{ marginBottom: "16px" }}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Describe your role and responsibilities..."
                        style={{ borderRadius: "8px", padding: "10px" }}
                      />
                    </Form.Item>
                    {/* <Form.Item
                      label="Achievements"
                      style={{ marginBottom: "16px" }}
                    >
                      <Input
                        placeholder="Add an achievement and press Enter"
                        style={{ borderRadius: "8px", padding: "10px" }}
                      />
                    </Form.Item> */}
                    {fields.length > 1 && (
                      <Button
                        type="dashed"
                        onClick={() => remove(field.name)}
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: "8px", width: "100%" }}
                      >
                        Remove Experience
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ borderRadius: "8px", marginTop: "16px" }}
                >
                  Add Experience
                </Button>
              </>
            )}
          </Form.List>

          {/* Skills Section */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <RightOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Skills
          </Divider>
          <Form.List name="skills">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "12px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        label="Skill Name"
                        name={[field.name, "name"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="JavaScript"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Skill Level"
                        name={[field.name, "level"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Select style={{ borderRadius: "8px", width: "100%" }}>
                          <Option value="Beginner">Beginner</Option>
                          <Option value="Intermediate">Intermediate</Option>
                          <Option value="Advanced">Advanced</Option>
                          <Option value="Expert">Expert</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="dashed"
                        onClick={() => remove(field.name)}
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: "8px", width: "100%" }}
                      >
                        Remove Skill
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ borderRadius: "8px", marginTop: "16px" }}
                >
                  Add Skill
                </Button>
              </>
            )}
          </Form.List>

          {/* Projects Section */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <GlobalOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Projects
          </Divider>
          <Form.List name="projects">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "12px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        label="Project Name"
                        name={[field.name, "name"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="E-commerce Website"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Project Link"
                        name={[field.name, "link"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="https://example.com/project"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item
                      label="Description"
                      name={[field.name, "description"]}
                      style={{ marginBottom: "16px" }}
                    >
                      <TextArea
                        rows={3}
                        placeholder="Describe the project and your contributions..."
                        style={{ borderRadius: "8px", padding: "10px" }}
                      />
                    </Form.Item>
                    {/* <Form.Item
                      label="Technologies"
                      style={{ marginBottom: "16px" }}
                    >
                      <Input
                        value={techInputs[index] || ""}
                        onChange={(e) =>
                          handleTechInputChange(index, e.target.value)
                        }
                        onPressEnter={() => addTechnology(index)}
                        placeholder="Add a technology and press Enter"
                        style={{ borderRadius: "8px", padding: "10px" }}
                      />
                      {(
                        form.getFieldValue("projects")?.[index]?.technologies ||
                        []
                      ).map((tech: string, techIndex: number) => (
                        <Tag
                          key={techIndex}
                          closable
                          onClose={() => removeTechnology(index, techIndex)}
                          style={{
                            marginTop: "8px",
                            borderRadius: "8px",
                            padding: "6px 12px",
                          }}
                        >
                          {tech}
                        </Tag>
                      ))}
                    </Form.Item> */}
                    {fields.length > 1 && (
                      <Button
                        type="dashed"
                        onClick={() => remove(field.name)}
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: "8px", width: "100%" }}
                      >
                        Remove Project
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ borderRadius: "8px", marginTop: "16px" }}
                >
                  Add Project
                </Button>
              </>
            )}
          </Form.List>

          {/* Certifications Section */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <MailOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Certifications
          </Divider>
          <Form.List name="certifications">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "12px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        label="Certification Name"
                        name={[field.name, "name"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="AWS Certified Developer"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Issuer"
                        name={[field.name, "issuer"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="Amazon Web Services"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Date"
                        name={[field.name, "date"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <DatePicker
                          picker="month"
                          style={{ borderRadius: "8px", width: "100%" }}
                        />
                      </Form.Item>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="dashed"
                        onClick={() => remove(field.name)}
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: "8px", width: "100%" }}
                      >
                        Remove Certification
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ borderRadius: "8px", marginTop: "16px" }}
                >
                  Add Certification
                </Button>
              </>
            )}
          </Form.List>

          {/* Languages Section */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <EnvironmentOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Languages
          </Divider>
          <Form.List name="languages">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div
                    key={field.key}
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      border: "1px solid #e8e8e8",
                      borderRadius: "12px",
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      <Form.Item
                        label="Language"
                        name={[field.name, "name"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Input
                          placeholder="English"
                          style={{ borderRadius: "8px", padding: "10px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Proficiency"
                        name={[field.name, "proficiency"]}
                        style={{ marginBottom: "16px" }}
                      >
                        <Select style={{ borderRadius: "8px", width: "100%" }}>
                          <Option value="Basic">Basic</Option>
                          <Option value="Intermediate">Intermediate</Option>
                          <Option value="Fluent">Fluent</Option>
                          <Option value="Native">Native</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="dashed"
                        onClick={() => remove(field.name)}
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: "8px", width: "100%" }}
                      >
                        Remove Language
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  style={{ borderRadius: "8px", marginTop: "16px" }}
                >
                  Add Language
                </Button>
              </>
            )}
          </Form.List>

          {/* Template and Color Selection */}
          <Divider
            orientation="left"
            style={{
              color: resumeData.accentColor,
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            <SaveOutlined
              style={{ marginRight: "10px", color: resumeData.accentColor }}
            />{" "}
            Template & Color
          </Divider>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "24px",
            }}
          >
            <Form.Item
              label="Template"
              name="template"
              style={{ marginBottom: "16px" }}
            >
              <Radio.Group>
                <Radio value="modern">Modern</Radio>
                <Radio value="professional">Professional</Radio>
                <Radio value="minimal">Minimal</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Accent Color"
              name="accentColor"
              style={{ marginBottom: "16px" }}
            >
              <Select style={{ borderRadius: "8px", width: "100%" }}>
                {colorOptions.map((color) => (
                  <Option key={color.value} value={color.value}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: color.value,
                          marginRight: "8px",
                          borderRadius: "4px",
                        }}
                      />
                      {color.label}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Save and Download Buttons */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              style={{
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "500",
              }}
            >
              Save Resume
            </Button>
            <Button
              type="default"
              onClick={downloadPDF}
              icon={<DownloadOutlined />}
              style={{
                marginLeft: "12px",
                borderRadius: "8px",
                padding: "10px 20px",
                fontWeight: "500",
              }}
            >
              Download PDF
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
