import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const jobs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/jobs" }),
  schema: z.object({
    company: z.string(),
    position: z.string(),
    startMonthYear: z.string().optional(),
    endMonthYear: z.string().optional(),
    tech: z.array(z.string()).optional(),
    companyWebsite: z.url().optional(),
    companyLogo: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    order: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    projectName: z.string(),
    client: z.string(),
    clientLogo: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    clientWebsite: z.url().optional(),
    subClient: z.string().optional(),
    timeperiod: z.string().optional(),
    startMonthYear: z.string().optional(),
    endMonthYear: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageAlign: z.enum(["left", "right"]).optional(),
    imageMaxHeight: z.string().optional(),
    tech: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const skills = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/skills" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const featured = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/featured" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const current = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/current" }),
  schema: z.object({
    title: z.string(),
    url: z.url().optional(),
    type: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    video: z.string().optional(),
    tech: z.array(z.string()).optional(),
    status: z.enum(["live", "beta", "launching-soon"]).optional(),
    brand: z.enum(["davant"]).optional(),
    order: z.number().optional(),
    focal: z.boolean().optional(),
  }),
});

export const collections = {
  jobs: jobs,
  projects: projects,
  skills: skills,
  featured: featured,
  current: current,
};
