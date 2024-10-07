import { z, defineCollection } from 'astro:content';


// 2. Define your collection(s)
const blog = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      tags: z.array(z.string()),
      image: z.string().optional(),
    }),
});

// const projects = defineCollection({
//     type: 'content',
//     schema: z.object({
//       title: z.string(),
//     //   slug: z.string()
//     //   client: z.string(),
//     //   subClient: z.string(),
//     //   timeperiod: z.string(),
//     //   tags: z.array(z.string()),
//     //   image: z.string().optional(),
//     }),
// });

// const skills = defineCollection({
//     type: 'content',
//     schema: z.object({
//       title: z.string(),
//       tags: z.array(z.string()),
//       image: z.string().optional(),
//     }),
// });


// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blog,
//   'projects': projects,
//   'skills': skills,
};