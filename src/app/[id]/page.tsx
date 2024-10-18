import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { Project } from '../types'
import QRCodeDisplay from '../components/QRCodeDisplay'
import ImageCycler from '../components/ImageCycle'

export const generateStaticParams = async () => {
  const filePath = path.join(process.cwd(), 'public', 'projects.json')
  const jsonData = fs.readFileSync(filePath, 'utf8')
  const projects: Project[] = JSON.parse(jsonData)

  return projects.map((project: Project) => ({
    id: project.id.toString(),
  }))
}

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const filePath = path.join(process.cwd(), 'public', 'projects.json')
  const jsonData = fs.readFileSync(filePath, 'utf8')
  const projects: Project[] = JSON.parse(jsonData)

  const project = projects.find(
    (proj: Project) => proj.id.toString() === params.id
  )

  if (!project) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-8 text-center text-white'>
        <div className='flex flex-col'>
          <h1 className='mb-4 text-4xl font-bold'>Project Not Found</h1>
          <p className='text-lg'>Redirecting to homepage in 5 seconds...</p>
          {/* You can also include a Link to redirect immediately */}
          <Link
            href='/'
            className='mt-4 inline-block rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-600'
          >
            Go to Home Now
          </Link>
        </div>
      </div>
    )
  }

  const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-8'>
      <div className='w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg'>
        <header className='bg-gray-800 p-6 text-white'>
          <div className='flex items-center justify-between'>
            <h1 className='text-4xl font-bold'>
              <Link href='/' className='hover:text-gray-400'>
                {project.title}
              </Link>
            </h1>
            <div className='ml-4 flex flex-wrap'>
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className='mb-2 mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <div className='p-6'>
          <div className='flex flex-col md:flex-row'>
            <div className='flex items-start p-4'>
              <div
                className='project-screenshot-wrapper mr-4 overflow-hidden rounded-lg'
                style={{ width: '400px', height: 'auto' }}
              >
                <ImageCycler images={project.screenshot} />
              </div>
            </div>

            <div className='flex flex-grow flex-col justify-start p-4'>
              <p className='mb-2 text-base md:text-lg'>
                {renderDescription(project.description)}
              </p>
            </div>
          </div>

          <div className='mt-6 flex items-end justify-between'>
            <QRCodeDisplay url={project.url} />

            <div className='flex justify-end space-x-4'>
              <Link
                href='/'
                className='inline-block rounded bg-gray-800 px-4 py-2 text-white hover:bg-gray-600'
              >
                Back to Home
              </Link>
              <a
                href={project.url}
                className='whitespace-nowrap rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500'
                target='_blank'
                rel='noopener noreferrer'
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
