// The words and pictures in the certification book. This is the only file you
// need to edit to fill it in.
//
// Each certificate:
//   id      a short name with no spaces (also used to find its picture, see below)
//   title   shown big at the top of the page
//   issuer  who gave it, and `issued` when ("Mar 2026") - leave `issued` out if unknown
//   note    one or two sentences about it (optional)
//   skills  up to four short tags (optional)
//   link    { label, url } for the button under the picture (optional)
//
// Pictures: drop the image into src/assets/certifications/ and name it after the
// certificate's id (for example comptia-itf-plus.png). It shows up by itself, no code
// needed. Until then the page shows a placeholder, or the `image` link if there is one.
//
// To add a certificate, copy one block. The book grows by itself:
// the cover is page 1, then one page per certificate, in this order.

export const cover = {
  title: "My little achievement library",
  subtitle: "Certificates I'm proud of",
  hint: "Turn the page to explore each certificate.",
};

const list = [
  {
    id: "comptia-itf-plus",
    title: "CompTIA IT Fundamentals+ (ITF+)",
    issuer: "CompTIA",
    note: "Covers the basics of computing, IT infrastructure, software, databases and security.",
    skills: ["Computing basics", "Software development", "Databases", "Security"],
    link: { label: "View credential", url: "https://www.credly.com/badges/696afc89-4457-41b1-9f2c-7146f05c5644" },
    image: "https://images.credly.com/images/a49be93a-34ff-4224-996c-b2c976a5dc9d/linkedin_thumb_blob",
  },
  {
    id: "generative-ai-for-beginners",
    title: "Generative AI for Beginners",
    issuer: "Simplilearn SkillUp",
    note: "A beginner course on generative AI and large language models, about 4 hours of self-paced lessons.",
    skills: ["Generative AI", "Large language models", "Prompt engineering", "Responsible AI"],
    link: { label: "View course", url: "https://www.simplilearn.com/generative-ai-for-beginners-free-course-skillup" },
  },
  {
    id: "introduction-to-figma",
    title: "Introduction to Figma",
    issuer: "Simplilearn SkillUp",
    note: "A beginner course on the Figma interface, mockups and prototyping, about 2 hours of self-paced lessons.",
    skills: ["UI/UX design", "Figma", "Mockups", "Prototyping"],
    link: { label: "View course", url: "https://www.simplilearn.com/free-figma-course-with-certificate-course-skillup" },
  },
  {
    id: "endpoint-security",
    title: "Endpoint Security",
    issuer: "Cisco",
    note: "Shows a broad understanding of basic network security concepts, operating systems and endpoint security.",
    skills: ["Network security", "Operating systems", "Endpoint security"],
    link: { label: "View credential", url: "https://www.credly.com/badges/3c50fa6b-9f9e-465a-ad82-925524252277" },
    image: "https://images.credly.com/images/0ca5f542-fb5e-4a22-9b7a-c1a1ce4c3db7/linkedin_thumb_EndpointSecurity.png",
  },
  {
    id: "agentblazer-champion-workshop",
    title: "Agentblazer Champion Workshop",
    issuer: "Salesforce",
    issued: "Nov 2025",
    note: "Completion certificate for the Salesforce Agentblazer Champion Workshop.",
    link: { label: "View certificate", url: "https://smartbridgecourseassets.s3.ap-south-1.amazonaws.com/Philippines/ABC_Oct/ABC_Oct_Certificates/Agentblazer_Champion_Workshop_October_Certificate_Set1-156.pdf" },
  },

  // ---- from my LinkedIn ----
  {
    id: "aws-cloud-club-core-team",
    title: "AWS Cloud Club Core Team",
    issuer: "Amazon Web Services",
    issued: "Dec 2025",
    skills: ["Community building", "Organization", "Leadership"],
    link: { label: "View credential", url: "https://www.credly.com/badges/bde9347b-b055-4f56-b195-fe3b465e5cac" },
  },
  {
    id: "aws-academy-cloud-foundations",
    title: "AWS Academy Graduate: Cloud Foundations",
    issuer: "Amazon Web Services",
    issued: "Mar 2026",
    skills: ["Solution architecture", "Cloud computing"],
    link: { label: "View credential", url: "https://www.credly.com/badges/47ca25a8-9f07-45c7-8ae7-d36cdee662fc" },
  },
  {
    id: "aws-sbg-core-team-member",
    title: "AWS SBG Core Team Member",
    issuer: "Amazon Web Services",
    issued: "Aug 2026",
    skills: ["Community building", "Organization", "Leadership"],
    link: { label: "View credential", url: "https://www.credly.com/badges/508461fd-02be-4fb2-a423-9179e6253966" },
  },
  {
    id: "cyber-threat-management",
    title: "Cyber Threat Management",
    issuer: "Cisco",
    issued: "Sep 2026",
    skills: ["Disaster recovery", "Risk management", "Compliance (GRC)"],
    link: { label: "View credential", url: "https://www.credly.com/badges/21095eb5-5ef2-431c-8af2-5da73d5f3535" },
  },
  {
    id: "prompt-engineering-for-chatgpt",
    title: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University",
    issued: "Aug 2026",
    link: { label: "View credential", url: "https://www.coursera.org/account/accomplishments/verify/DPARHE3M76M9" },
  },
  {
    id: "data-analytics-essentials",
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    issued: "Mar 2026",
    skills: ["Microsoft Excel", "SQL"],
    link: { label: "View credential", url: "https://www.credly.com/badges/8406ca6d-bb14-4307-9c62-b9713a771c3d" },
  },
  {
    id: "introduction-to-ai",
    title: "Introduction to Artificial Intelligence (AI)",
    issuer: "IBM",
    issued: "Jan 2026",
    link: { label: "View credential", url: "https://www.coursera.org/account/accomplishments/records/UFUYPC71ZA2M" },
  },
  {
    id: "ask-questions-data-driven-decisions",
    title: "Ask Questions to Make Data-Driven Decisions",
    issuer: "Google",
    issued: "Jan 2026",
    link: { label: "View credential", url: "https://www.coursera.org/account/accomplishments/verify/1U9BI1N08T65" },
  },
  {
    id: "foundations-data-everywhere",
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Google",
    issued: "Dec 2025",
    link: { label: "View credential", url: "https://www.coursera.org/account/accomplishments/verify/H1P3R0125MSN" },
  },
];

// Pictures dropped into src/assets/certifications/, found by their file name.
const pictures = import.meta.glob("../assets/certifications/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" });
const pictureFor = (id) =>
  Object.entries(pictures).find(([path]) => path.split("/").pop().replace(/\.\w+$/, "") === id)?.[1];

export const certificates = list.map((certificate) => ({
  ...certificate,
  image: pictureFor(certificate.id) ?? certificate.image ?? null,
}));
