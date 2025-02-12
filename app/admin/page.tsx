import { getServerSession } from "next-auth";
import { authOptions } from "@/Auth";
import AdminLogin from "@/components/Home/AdminLogin";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    return <meta http-equiv="refresh" content="0; url='/'" />;
  }

  return <AdminLogin />;
}
