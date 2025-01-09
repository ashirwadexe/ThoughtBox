import Card from "./Dashboard/Card"
import Navbar from "./Dashboard/Navbar"
import Sidebar from "./Dashboard/Sidebar"

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className="w-full">
        <Navbar/>
        <Card/>
      </div>
    </div>
  )
}

export default Dashboard