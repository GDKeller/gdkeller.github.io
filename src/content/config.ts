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
    imageMaxHeight: z.string().optional(),
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

const current = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
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
