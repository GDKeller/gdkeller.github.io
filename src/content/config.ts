import { z, defineCollection } from "astro:content";

const jobs = defineCollection({
  type: "content",
  schema: z.object({
    company: z.string(),
    position: z.string(),
    startMonthYear: z.string().optional(),
    endMonthYear: z.string().optional(),
    tech: z.array(z.string()).optional(),
    companyWebsite: z.string().url().optional(),
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
  type: "content",
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
    clientWebsite: z.string().url().optional(),
    subClient: z.string().optional(),
    timeperiod: z.string().optional(),
    startMonthYear: z.string().optional(),
    endMonthYear: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageAlign: z.enum(["left", "right"]).optional(),
    tech: z.array(z.string()).optional(),
  }),
});

const skills = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const featured = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  jobs: jobs,
  projects: projects,
  skills: skills,
  featured: featured,
};
