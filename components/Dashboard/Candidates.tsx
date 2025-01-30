// components/Dashboard/Candidates.tsx
import { Table } from "antd";
import "antd/dist/reset.css"; // For newer versions

const Candidates = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
    },
    {
      title: "Cover Letter",
      dataIndex: "coverLetter",
      key: "coverLetter",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      resume: "Resume.pdf",
      coverLetter: "CoverLetter.docx",
      availability: "2025-02-01 10:00 AM",
    },
    // Add more data here
  ];

  return (
    <div className="p-5">
      <h1>Applied Candidates</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Candidates;