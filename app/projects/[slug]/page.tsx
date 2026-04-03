import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";

// Generate static params for all projects
export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyTemplate project={project} />;
}
