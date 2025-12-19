import UserDetailPage from "@/components/AdminDashboard/UserManagement/UserDetail"

const page = ({ params }: { params: { id: string } }) => {
  return (
    <UserDetailPage params={params} />
  )
}

export default page