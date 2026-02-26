import { use } from "react";
import UserDetailPage from "@/components/AdminDashboard/UserManagement/UserDetail";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return <UserDetailPage userId={id} />;
};

export default page;
