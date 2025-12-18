'use client'

import { notFound } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Timeline } from 'vis-timeline/standalone'
import 'vis-timeline/styles/vis-timeline-graph2d.min.css'
import projectsData from '../../../data/projects.json'

const projects = projectsData.projects

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projects.find((p: any) => p.id === params.id)
  if (!project) notFound()

  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!timelineRef.current) return

    const items = project.milestones.map((m: any, i: number) => ({
      id: i + 1,
      content: m.phase,
      start: m.date.includes('-') ? m.date : `${m.date}-01-01`,
      type: m.exact ? 'box' : 'point',
      className: m.exact ? 'exact' : 'estimate'
    }))

    const options = {
      height: '300px',
      start: '2005-01-01',
      end: '2035-01-01',
      zoomable: true,
      format: {
        minorLabels: { year: 'YYYY' }
      }
    }

    new Timeline(timelineRef.current, items, options)
  }, [project])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-primary mb-6">{project.name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <p className="text-gray-600">Capacity</p>
          <p className="text-3xl font-bold">{project.capacity_mw} MW</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <p className="text-gray-600">River</p>
          <p className="text-xl font-semibold">{project.river}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <p className="text-gray-600">Type</p>
          <p className="text-xl">{project.type}</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <p className="text-gray-600">Status</p>
          <p className="text-xl font-medium">{project.status}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">Timeline</h2>
        <div ref={timelineRef} className="border rounded" />
        <p className="text-sm text-gray-500 mt-3">Box = Confirmed | Dot = Estimated</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Project Notes</h2>
        <p className="text-lg leading-relaxed">{project.notes}</p>
      </div>
    </div>
  )
}
