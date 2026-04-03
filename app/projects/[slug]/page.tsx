import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/lib/projects";
import CaseStudyTemplate from "@/components/CaseStudyTemplate";
import SwayamCaseStudy from "@/components/SwayamCaseStudy";
import KodexCaseStudy from "@/components/KodexCaseStudy";

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

  if (slug === 'swayam') {
    return <SwayamCaseStudy project={project} />;
  }

  if (slug === 'kodex') {
    return <KodexCaseStudy project={project} />;
  }

  return <CaseStudyTemplate project={project} />;
}
