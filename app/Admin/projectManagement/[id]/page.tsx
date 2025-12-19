import ProjectDetailPage from "@/components/AdminDashboard/ProjectManagement/ProjectDetailPage"


const page = ({ params }: { params: { id: string } }) => {
  return (
    <ProjectDetailPage params={params} />
  )
}

export default page