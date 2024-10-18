// src/app/kiosk/[id]/page.tsx
import fs from 'fs'
import path from 'path'
import KioskComponent from '../../components/KioskComponent' // Import the client component
import RedirectComponent from '../../components/RedirectComponent' // Import the redirect component
import { Project } from '../../types' // Adjust the path according to your structure

// Enable dynamic rendering
export const dynamic = 'force-dynamic' // Allows dynamic generation of pages without static generation

const KioskPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  // Read and parse the JSON file
  const filePath = path.join(process.cwd(), 'public', 'projects.json')
  const jsonData = fs.readFileSync(filePath, 'utf8')
  const projects: Project[] = JSON.parse(jsonData)

  // Find the project that matches the dynamic id
  const project = projects.find((p) => p.id.toString() === id)

  // If no project matches the ID, render the RedirectComponent
  if (!project) {
    return <RedirectComponent />
  }

  // Pass the specific project to the KioskComponent
  return <KioskComponent projects={[project]} />
}

export default KioskPage
