import Header from "@/components/header"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>
        <main className="min-h-screen container">
            <Header />
            <Outlet />
        </main>

        <div className="text-center py-4 text-sm bg-gray-800 mt-10">
          Made with ❤️ by <a target="_blank" href="https://mursaleen.rf.gd">Mursaleen</a>
        </div>
    </div>
  )
}

export default AppLayout