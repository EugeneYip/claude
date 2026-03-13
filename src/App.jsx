import { useMemo, useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   ICON SYSTEM — Pure SVG, zero dependencies
   ═══════════════════════════════════════════════════════════════ */
const ICON_PATHS = {
  brain: [
    "M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a3 3 0 003 3h2a3 3 0 003-3v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z",
    "M9.5 9a2.5 2.5 0 015 0",
    "M12 2v3M8 5.5L6 4M16 5.5l2-1.5",
  ],
  search: [
    "M11 4a7 7 0 110 14 7 7 0 010-14z",
    "M21 21l-4.35-4.35",
  ],
  folder: [
    "M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z",
    "M9 13h6M9 16h4",
  ],
  sparkles: [
    "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z",
    "M18 14l.75 2.25L21 17l-2.25.75L18 20l-.75-2.25L15 17l2.25-.75L18 14z",
  ],
  fileText: [
    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z",
    "M14 2v6h6M8 13h8M8 17h6M8 9h2",
  ],
  graduation: [
    "M2 10l10-5 10 5-10 5-10-5z",
    "M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5",
    "M22 10v6",
  ],
  monitor: [
    "M3 4h18a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z",
    "M8 20h8M12 16v4",
  ],
  globe: [
    "M12 2a10 10 0 100 20 10 10 0 000-20z",
    "M2 12h20",
    "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z",
  ],
  grid: [
    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  ],
  presentation: [
    "M2 3h20v14H2V3z",
    "M12 17v4M8 21h8",
    "M7 8l3 3 2-2 5 5",
  ],
  browser: [
    "M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z",
    "M3 8h18",
    "M6 5.5h.01M8.5 5.5h.01M11 5.5h.01",
  ],
  bot: [
    "M4 8a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z",
    "M9 12h.01M15 12h.01",
    "M9 16h6",
    "M12 2v4",
  ],
  eye: [
    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
    "M12 9a3 3 0 110 6 3 3 0 010-6z",
  ],
  share: [
    "M18 5a3 3 0 11-6 0 3 3 0 016 0zM6 12a3 3 0 11-6 0 3 3 0 016 0zM18 19a3 3 0 11-6 0 3 3 0 016 0z",
    "M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98",
  ],
  clock: [
    "M12 2a10 10 0 100 20 10 10 0 000-20z",
    "M12 6v6l4 2",
  ],
  wand: [
    "M15 4l5 5-11 11H4v-5L15 4z",
    "M18 2l4 4",
    "M2 22l3-3",
  ],
  checkCircle: [
    "M12 2a10 10 0 100 20 10 10 0 000-20z",
    "M8 12l3 3 5-5",
  ],
  chevronDown: ["M6 9l6 6 6-6"],
  chevronUp: ["M18 15l-6-6-6 6"],
  library: [
    "M4 19V5a2 2 0 012-2h4v16H6a2 2 0 01-2-2z",
    "M10 3h4v16h-4z",
    "M14 3h4a2 2 0 012 2v12a2 2 0 01-2 2h-4V3z",
  ],
  pencilRuler: [
    "M3 21l4-4M7 17l-4 4",
    "M14.5 2.5l7 7-9.5 9.5H5v-7L14.5 2.5z",
    "M12 8l4 4",
  ],
  route: [
    "M3 17a2 2 0 104 0 2 2 0 00-4 0zM17 7a2 2 0 104 0 2 2 0 00-4 0z",
    "M7 17h4a4 4 0 004-4V9",
    "M17 9V7",
  ],
  box: [
    "M12 2l9 5v10l-9 5-9-5V7l9-5z",
    "M12 22V12M12 12L3 7M12 12l9-5",
  ],
  arrowRight: ["M5 12h14M13 6l6 6-6 6"],
  lightbulb: [
    "M9 18h6M10 22h4",
    "M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z",
  ],
  alertTriangle: [
    "M12 2L1 21h22L12 2z",
    "M12 9v4M12 17h.01",
  ],
  zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  target: [
    "M12 2a10 10 0 100 20 10 10 0 000-20z",
    "M12 6a6 6 0 100 12 6 6 0 000-12z",
    "M12 10a2 2 0 100 4 2 2 0 000-4z",
  ],
  layers: [
    "M12 2l10 6-10 6L2 8l10-6z",
    "M2 12l10 6 10-6",
    "M2 17l10 6 10-6",
  ],
  terminal: [
    "M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z",
    "M7 8l4 4-4 4M13 16h4",
  ],
  bookmark: ["M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"],
};

function Icon({ name, size = 20, color = "currentColor", strokeWidth = 1.8, style = {} }) {
  const paths = ICON_PATHS[name];
  if (!paths) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════ */
const C = {
  bg: "#F2EBE1",
  surface: "#FFFBF5",
  surface2: "#F7F0E6",
  surface3: "#FFF8EE",
  line: "#DDD2C3",
  lineLight: "#E8DECE",
  text: "#2A231C",
  textSecondary: "#5C5347",
  muted: "#8A7E73",
  accent: "#A0593A",
  accentHover: "#B86D4A",
  accentSoft: "#C28E6F",
  accentBg: "#F5E6D8",
  olive: "#5D6B53",
  oliveBg: "#E8EDDF",
  rust: "#904A36",
  rustBg: "#F4DDD4",
  navy: "#3B4A5E",
  navyBg: "#DDE4ED",
  sand: "#E3D3C0",
  inkSoft: "#3E362E",
  shadow: "0 1px 3px rgba(42,35,28,0.06), 0 4px 12px rgba(42,35,28,0.04)",
  shadowLg: "0 2px 6px rgba(42,35,28,0.08), 0 8px 24px rgba(42,35,28,0.06)",
};

const radius = { sm: 12, md: 20, lg: 28, xl: 32 };

/* ═══════════════════════════════════════════════════════════════
   CONTENT DATA — Expanded depth
   ═══════════════════════════════════════════════════════════════ */
const featureGroups = [
  {
    title: "Core chat",
    icon: "brain",
    color: C.accent,
    items: ["Conversational Q&A", "Model selection", "File uploads", "Prompt engineering", "Custom styles"],
    note: "The foundation. Every interaction starts here: writing, thinking, drafting, rewriting, and question answering.",
  },
  {
    title: "Persistent context",
    icon: "folder",
    color: C.olive,
    items: ["Projects", "Project instructions", "Project knowledge", "RAG pipelines", "Cross-chat memory"],
    note: "When you return to the same work repeatedly, persistent context prevents Claude from starting over every time.",
  },
  {
    title: "Standalone deliverables",
    icon: "sparkles",
    color: C.rust,
    items: ["Artifacts", "Word (.docx)", "PDF", "Excel (.xlsx)", "PowerPoint (.pptx)"],
    note: "Move beyond chat replies. Create real documents, applications, charts, and files you can download and share.",
  },
  {
    title: "Search and reasoning",
    icon: "search",
    color: C.navy,
    items: ["Extended thinking", "Web search", "Deep research", "Source citations", "Real-time information"],
    note: "Different tools for different depth levels. A quick fact check and a multi-source investigation require different modes.",
  },
  {
    title: "Automation surfaces",
    icon: "bot",
    color: "#6B5B8D",
    items: ["Cowork", "Cowork plugins", "Recurring tasks", "Claude in Chrome"],
    note: "When Claude should act, not just answer. These surfaces let Claude execute across your desktop and browser.",
  },
  {
    title: "Work integrations",
    icon: "box",
    color: "#5A7A6B",
    items: ["Excel formulas", "Slide logic", "GitHub repos", "Connected context", "Cross-tool workflows"],
    note: "Claude works inside the tools you already use. The real value is in files, decks, workbooks, and repositories.",
  },
];

const learningPaths = [
  {
    id: "start",
    label: "Start here",
    icon: "graduation",
    audience: "New users",
    summary: "Understand what Claude is, what to click first, and how to get useful results immediately.",
    steps: ["What Claude can do", "Which mode to choose", "Prompting fundamentals", "Uploading files", "Avoiding common mistakes"],
    color: C.accent,
  },
  {
    id: "daily",
    label: "Daily work",
    icon: "fileText",
    audience: "Regular users",
    summary: "Use Claude consistently for school, work, reports, analysis, and ongoing projects.",
    steps: ["Projects setup", "Artifacts and files", "Memory configuration", "Style customization", "Shareable outputs", "Workflow patterns"],
    color: C.olive,
  },
  {
    id: "advanced",
    label: "Advanced use",
    icon: "terminal",
    audience: "Power users",
    summary: "Research, visual explanations, automation, structured control, and multi-tool orchestration.",
    steps: ["Extended thinking", "Web search strategy", "Research mode", "Custom skills", "Cowork", "Claude in Chrome", "Office workflows"],
    color: C.navy,
  },
];

const modeRows = [
  {
    mode: "Normal chat",
    icon: "brain",
    bestFor: "Quick drafting, answering questions, rewriting, summarizing, and brainstorming.",
    useWhen: "The job fits within one conversation and does not need persistent structure.",
    avoidWhen: "You need durable context across sessions or a reusable deliverable.",
    level: "Beginner",
  },
  {
    mode: "Project",
    icon: "folder",
    bestFor: "Ongoing work with repeat instructions, a knowledge base, and stable context.",
    useWhen: "You return to the same class, client, startup, or topic regularly.",
    avoidWhen: "The task is one-off and does not need stored context.",
    level: "Intermediate",
  },
  {
    mode: "Artifact",
    icon: "sparkles",
    bestFor: "A document, app, chart, tool, or output you expect to refine, reuse, or share.",
    useWhen: "The output should stand on its own outside the chat thread.",
    avoidWhen: "You only need a short answer or inline explanation.",
    level: "Beginner",
  },
  {
    mode: "Extended thinking",
    icon: "brain",
    bestFor: "Hard reasoning, step-by-step planning, and complex multi-constraint tasks.",
    useWhen: "The task is conceptually difficult, not just information-heavy.",
    avoidWhen: "The question is straightforward and does not need deliberate reasoning depth.",
    level: "Intermediate",
  },
  {
    mode: "Web search",
    icon: "search",
    bestFor: "Current facts, live data, recent news, and real-time references.",
    useWhen: "The answer depends on information that may have changed since training.",
    avoidWhen: "You only want analysis of your own uploaded source files.",
    level: "Beginner",
  },
  {
    mode: "Research",
    icon: "globe",
    bestFor: "Broader, agentic investigation with multiple searches, citations, and systematic coverage.",
    useWhen: "The question needs multiple angles and sources, not a single fact lookup.",
    avoidWhen: "A fast direct answer or a one-search lookup would suffice.",
    level: "Advanced",
  },
  {
    mode: "Cowork",
    icon: "layers",
    bestFor: "Desktop task execution across local files, apps, and tools.",
    useWhen: "The work is closer to a job flow than a conversational exchange.",
    avoidWhen: "You only need an answer, not action on external systems.",
    level: "Advanced",
  },
  {
    mode: "Claude in Chrome",
    icon: "browser",
    bestFor: "Browser-side reading, form filling, navigation, and repetitive web tasks.",
    useWhen: "The browser itself is the primary work surface.",
    avoidWhen: "The task can be solved entirely inside chat without website interaction.",
    level: "Advanced",
  },
];

const compareCards = [
  {
    title: "Memory vs Projects vs Skills",
    icon: "library",
    color: C.olive,
    rows: [
      { label: "Memory", desc: "Your broader cross-chat preferences and facts. Carries forward automatically outside of Projects.", tag: "Passive" },
      { label: "Projects", desc: "A persistent workspace with instructions and knowledge for one domain. Resets context per project.", tag: "Workspace" },
      { label: "Skills", desc: "A reusable procedure Claude applies for a recurring task pattern. Narrower than a Project.", tag: "Procedure" },
    ],
  },
  {
    title: "Web search vs Thinking vs Research",
    icon: "route",
    color: C.navy,
    rows: [
      { label: "Web search", desc: "Fast current facts: one question, one lookup, real-time data.", tag: "Speed" },
      { label: "Extended thinking", desc: "More deliberate internal reasoning before responding. No external data.", tag: "Depth" },
      { label: "Research", desc: "Agentic multi-search investigation with citations and systematic coverage.", tag: "Breadth" },
    ],
  },
  {
    title: "Chat vs Artifact vs File",
    icon: "pencilRuler",
    color: C.rust,
    rows: [
      { label: "Chat reply", desc: "A conversational answer inside the thread. Ephemeral and inline.", tag: "Quick" },
      { label: "Artifact", desc: "A standalone output in a dedicated panel, meant to be refined or reused.", tag: "Reusable" },
      { label: "Exported file", desc: "A downloadable deliverable: Word, PDF, Excel, PowerPoint, or code.", tag: "Portable" },
    ],
  },
];

const modules = [
  {
    id: "what-claude-does",
    title: "What Claude can do",
    icon: "brain",
    number: "01",
    summary: "Claude is a general-purpose AI assistant that can analyze, write, code, create files, search the web, generate visuals, and assist across desktop and browser workflows.",
    bullets: [
      "Understand and analyze text, tables, uploaded documents, and images.",
      "Create and edit Word, PDF, Excel, and PowerPoint files directly.",
      "Build Artifacts: reports, diagrams, React applications, and shareable content.",
      "Use Projects, memory, and styles for consistency across sessions.",
      "Search the web and run deep Research flows with source citations.",
      "Generate visual explanations, diagrams, charts, and interactive widgets.",
    ],
    proTip: "Treat Claude as a collaborator with tools, not a search engine. The more specific your deliverable request, the more useful the output.",
    pitfall: "Asking a vague question and expecting Claude to guess the right format. Always specify what you want made.",
    prompt: "Show me five things Claude can do for this exact task, ranked from simplest to most advanced.",
  },
  {
    id: "pick-mode",
    title: "Pick the right mode before you type",
    icon: "wand",
    number: "02",
    summary: "Many bad results come from using the wrong surface, not from writing the wrong prompt. Choosing the right mode matters more than phrasing alone.",
    bullets: [
      "Normal chat: Quick one-off exchanges, brainstorming, and inline answers.",
      "Projects: Recurring work domains with stable instructions and knowledge.",
      "Artifacts: Standalone outputs meant to be refined, downloaded, or shared.",
      "Research: Multi-angle investigation requiring citations and systematic coverage.",
      "Cowork or Chrome: When Claude should take action across tools or web pages.",
    ],
    proTip: "Ask Claude directly: 'Which mode is best for this task?' before diving into the work.",
    pitfall: "Using normal chat for work that should live in a Project. You end up repeating context in every new conversation.",
    prompt: "Before answering, tell me which Claude mode is best for this task and why.",
  },
  {
    id: "prompt-better",
    title: "Prompt better in one minute",
    icon: "target",
    number: "03",
    summary: "The fastest way to improve Claude's output: specify the deliverable, the allowed source, the audience, and the final format. That alone fixes a large share of weak results.",
    bullets: [
      "State what you want made, not just what topic you care about.",
      "Specify what sources Claude should use (uploads only, web search, or both).",
      "Name the audience: beginner, executive, technical peer, or general reader.",
      "Define the final form: memo, table, script, checklist, slide outline, or study guide.",
      "Set constraints: word count, tone, structure, or exclusions.",
    ],
    proTip: "The format of your prompt should mirror the format of the output you want. Want a table? Show a table skeleton. Want structured sections? Use headers in your prompt.",
    pitfall: "Writing 'tell me about X' with no format, source, or audience specification, then being disappointed by generic paragraphs.",
    prompt: "Use only the uploaded source. Write a concise study guide for a beginner, structured as a numbered checklist, under 500 words. Add three likely follow-up questions at the end.",
  },
  {
    id: "files-artifacts",
    title: "Files and Artifacts",
    icon: "sparkles",
    number: "04",
    summary: "When the result should become something you keep, edit, share, or download, move beyond plain chat. This is where Claude becomes useful for real work.",
    bullets: [
      "Use Artifacts when the output should stand on its own: reports, apps, charts, interactive tools.",
      "Use file creation when you need a real document (.docx), workbook (.xlsx), or slide deck (.pptx).",
      "Artifacts render live in the conversation; files are downloaded separately.",
      "You can iterate on an Artifact across multiple messages in the same conversation.",
      "Ask Claude whether something should remain chat-only or become an Artifact or file.",
    ],
    proTip: "Start with an Artifact for fast iteration, then export to a file format once the content is finalized.",
    pitfall: "Keeping everything in chat and then struggling to extract the final version later.",
    prompt: "Turn this into a clean Artifact first. Then tell me whether it should also be exported as Word, PDF, Excel, or PowerPoint, and why.",
  },
  {
    id: "projects-memory",
    title: "Projects, memory, and styles",
    icon: "folder",
    number: "05",
    summary: "These three features are often confused. Projects organize a workspace. Memory stores broader context. Styles control how Claude speaks. Keeping them separate makes Claude easier to control.",
    bullets: [
      "Projects: A persistent workspace for one domain. Includes custom instructions and uploaded knowledge files.",
      "Memory: Broader personal context that carries across non-project chats. Updated passively or by request.",
      "Styles: Controls Claude's tone and presentation — concise, formal, explanatory, or custom.",
      "Project instructions override memory when they conflict.",
      "You can have multiple Projects for different work domains running in parallel.",
    ],
    proTip: "Write project instructions like you are onboarding a new team member: role, constraints, preferred output formats, and explicit exclusions.",
    pitfall: "Putting everything into memory instead of using a Project. Memory is for broad preferences, not domain-specific work instructions.",
    prompt: "Separate this setup into three categories: what belongs in project instructions, what should be stored in memory, and what is a style preference.",
  },
  {
    id: "skills",
    title: "Skills",
    icon: "zap",
    number: "06",
    summary: "Skills are reusable task procedures. They are not topic libraries. A Skill tells Claude how to do one kind of recurring work more reliably, every time.",
    bullets: [
      "Best for repeatable workflows: weekly reports, code reviews, content formatting, data cleaning.",
      "Keep them narrower than Projects. One Skill, one task type.",
      "Strong Skills include: scope definition, input/output examples, and clear boundaries on what not to do.",
      "Skills can be attached to Projects or used independently.",
      "Version and test Skills over time — the first version is rarely the best.",
    ],
    proTip: "Include a negative example in your Skill: 'Do NOT do this.' Negative boundaries are often more useful than positive instructions.",
    pitfall: "Making a Skill too broad. A 'writing skill' is too vague. A 'weekly status report from Jira tickets' is well-scoped.",
    prompt: "Design a Skill for this recurring task. Include: when to use it, when not to use it, the expected input format, and one example input-output pair.",
  },
  {
    id: "search-research",
    title: "Search, extended thinking, and Research",
    icon: "search",
    number: "07",
    summary: "These are different tools, not synonyms. Search retrieves current information. Extended thinking deepens reasoning. Research runs a multi-source investigation. Using the wrong one wastes time.",
    bullets: [
      "Web search: For current facts, live data, quick verifications. One question, one lookup.",
      "Extended thinking: For harder reasoning, planning, and step-by-step analysis. No external data, just deeper processing.",
      "Research: For broader agentic investigation. Multiple searches, cross-referencing, citations, and systematic coverage.",
      "Combine them only when the task genuinely requires both current data and deep analysis.",
      "Research is slower and uses more capacity. Do not use it for simple questions.",
    ],
    proTip: "If you need a single current fact, use web search. If you need a full literature-style review, use Research. If you need Claude to think harder about something you already provided, use extended thinking.",
    pitfall: "Using Research to look up a single fact. That is a web search task, and Research will be slower for no benefit.",
    prompt: "Tell me whether this task needs web search, extended thinking, Research, or just normal chat. Explain your reasoning in one paragraph.",
  },
  {
    id: "visuals",
    title: "Visual explanations",
    icon: "eye",
    number: "08",
    summary: "Long paragraphs are often the worst teaching medium. Claude can generate diagrams, charts, comparisons, and interactive visuals when a concept is easier to see than to read.",
    bullets: [
      "Ask for a diagram when the concept involves structure, hierarchy, or relationships.",
      "Ask for a chart when a pattern or trend matters more than a narrative.",
      "Ask for a side-by-side comparison when the reader needs to scan and decide quickly.",
      "Claude generates SVG diagrams and HTML widgets, not photographic images.",
      "Combine visuals with concise text: diagram first, explanation second.",
    ],
    proTip: "Say 'explain this visually first, then in text' to get the diagram before the prose. Claude defaults to text otherwise.",
    pitfall: "Asking Claude for a 'picture' when you mean a diagram. Be specific about the visual format you want: flowchart, Venn diagram, comparison table, bar chart, or timeline.",
    prompt: "Explain this concept with a diagram first, then a short legend, then a concise written explanation of no more than three paragraphs.",
  },
  {
    id: "share-privacy",
    title: "Sharing and privacy controls",
    icon: "share",
    number: "09",
    summary: "Claude supports shareable chat snapshots, artifact sharing, and incognito mode. The right privacy setting is part of good workflow design, not an afterthought.",
    bullets: [
      "All chats are private by default. Nothing is shared unless you explicitly share it.",
      "Shared chats are static snapshots, not live collaborative threads.",
      "Incognito chats are not saved to history or used for memory.",
      "Clean up a thread before sharing: remove test messages, clarify the final answer.",
      "Projects can be shared with team members on supported plans.",
    ],
    proTip: "Start a clean new chat for the final version of anything you plan to share. Sharing a messy exploratory thread undermines the output.",
    pitfall: "Sharing a raw conversation with 15 back-and-forth iterations. The recipient sees confusion, not clarity.",
    prompt: "Make this conversation share-ready: keep only the final logic, clean up the wording, and flag anything that should stay private.",
  },
  {
    id: "automation",
    title: "Cowork, Chrome, and advanced surfaces",
    icon: "layers",
    number: "10",
    summary: "These surfaces exist for when Claude should act, not just answer. Use them when the real work happens across files, desktop tools, or web pages.",
    bullets: [
      "Cowork: Deeper desktop task execution. Claude works with your files and local tools directly.",
      "Claude in Chrome: Browser-based reading, navigation, form filling, and repetitive web tasks.",
      "Cowork plugins extend Claude's reach into specific applications and data sources.",
      "Use these when the task involves action on external systems, not just generating text.",
      "Normal chat remains better for pure thinking, drafting, and analysis tasks.",
    ],
    proTip: "Start the task in normal chat to plan, then move to Cowork or Chrome to execute. Planning and execution benefit from different surfaces.",
    pitfall: "Trying to do everything in Cowork when a simple chat prompt would have been faster and more reliable.",
    prompt: "Would this task be better handled in Cowork, Claude in Chrome, or normal chat? Explain the tradeoff for each and recommend one.",
  },
  {
    id: "office",
    title: "Excel and PowerPoint workflows",
    icon: "grid",
    number: "11",
    summary: "Claude works inside the tools you already use. For many users, the real question is not whether Claude can help, but whether it should work directly inside the workbook or deck.",
    bullets: [
      "Excel: Claude can build models, write formulas, create charts, clean data, and structure analysis.",
      "PowerPoint: Claude can generate slide outlines, improve flow, add speaker notes, and restructure decks.",
      "Always ask Claude to explain the file first before it edits. Blind edits on complex business files are risky.",
      "Use file creation to build new workbooks and decks. Use integrations to modify existing ones.",
      "Combine with web search for competitive data or market context to enrich the deliverable.",
    ],
    proTip: "Ask Claude to audit the file before editing: 'Explain this workbook's structure and identify the three highest-risk issues before making changes.'",
    pitfall: "Letting Claude edit a complex financial model without reviewing its plan first. Always ask for the plan, then approve the edits.",
    prompt: "Explain the workbook or deck structure first. Identify the highest-risk issues. Only then suggest edits, and explain each one.",
  },
  {
    id: "mistakes",
    title: "Common mistakes and fast fixes",
    icon: "alertTriangle",
    number: "12",
    summary: "Most poor results come from a small set of repeatable errors. Recognizing and fixing them is the fastest path to better outputs.",
    bullets: [
      "Using chat when the task needed a Project with persistent instructions.",
      "Using Research for a simple factual lookup that web search handles in seconds.",
      "Writing vague prompts with no specified output format, audience, or source constraints.",
      "Forgetting privacy controls before sharing a conversation externally.",
      "Relying on long paragraphs when a diagram, table, or chart would communicate faster.",
    ],
    proTip: "After getting a weak result, ask: 'Did I use the right mode? Did I specify the format? Did I name the audience?' One of these is usually the fix.",
    pitfall: "Blaming the model when the real issue was an underspecified prompt or the wrong mode selection.",
    prompt: "Review my current workflow and tell me which Claude feature I am probably underusing or misusing. Be direct.",
  },
];

const mistakes = [
  { problem: "I keep repeating the same context every session.", fix: "Move the work into a Project with stored instructions, or save stable preferences in memory.", icon: "folder" },
  { problem: "Claude's answers feel too generic and surface-level.", fix: "Add a concrete output format, specify your sources, and name the audience.", icon: "target" },
  { problem: "I want a polished deliverable, not just a chat reply.", fix: "Ask for an Artifact or request a downloadable file (.docx, .pdf, .xlsx, .pptx).", icon: "sparkles" },
  { problem: "I need current, up-to-date information.", fix: "Enable web search or use Research mode instead of relying on static model knowledge.", icon: "globe" },
  { problem: "The explanation is too long and hard to follow.", fix: "Request a diagram, chart, comparison table, or visual summary before the prose.", icon: "eye" },
  { problem: "I do the same kind of task every week and results vary.", fix: "Create a Skill with a clear procedure, examples, and boundaries.", icon: "zap" },
];

const promptLibrary = [
  { text: "Tell me which Claude mode fits this task best before you answer.", tag: "Mode" },
  { text: "Use only the uploaded source. Separate facts from inferences.", tag: "Source" },
  { text: "Turn this into an Artifact, then tell me whether it should also be exported as a file.", tag: "Output" },
  { text: "Search our previous conversations for this topic and summarize decisions and next steps.", tag: "Memory" },
  { text: "Explain this with a diagram first, then a concise written explanation underneath.", tag: "Visual" },
  { text: "Tell me whether this task needs web search, extended thinking, or Research.", tag: "Mode" },
  { text: "Design a Skill for this recurring task with examples, limits, and one input-output pair.", tag: "Skill" },
  { text: "Review this answer like a skeptical editor. Point out anything vague, weak, or unsupported.", tag: "Quality" },
  { text: "Make this conversation share-ready and flag anything that should stay private.", tag: "Privacy" },
  { text: "Explain the workbook or deck first, identify the highest-risk issues, then suggest edits.", tag: "Office" },
];

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES (injected once)
   ═══════════════════════════════════════════════════════════════ */
function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById("claude-guide-styles")) return;
    const style = document.createElement("style");
    style.id = "claude-guide-styles";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
      .cg-root * { box-sizing: border-box; }
      .cg-root { font-family: 'DM Sans', sans-serif; line-height: 1.6; -webkit-font-smoothing: antialiased; }
      .cg-root h1,.cg-root h2,.cg-root h3,.cg-root h4 { font-family: 'Outfit', sans-serif; line-height: 1.2; }
      .cg-root button { cursor: pointer; font-family: inherit; }
      .cg-root table { border-collapse: separate; border-spacing: 0; }
      .cg-root [id^="section-"] { scroll-margin-top: 72px; }
      .cg-card { transition: box-shadow 0.2s ease, transform 0.15s ease; }
      .cg-card:hover { box-shadow: 0 2px 8px rgba(42,35,28,0.1), 0 8px 24px rgba(42,35,28,0.06); }
      .cg-expand { overflow: hidden; transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease; }
      .cg-tag { display: inline-flex; align-items: center; padding: 2px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; }
      .cg-section-num { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 48px; line-height: 1; opacity: 0.07; position: absolute; top: -8px; right: 16px; pointer-events: none; }
      @media (max-width: 768px) {
        .cg-hide-mobile { display: none !important; }
        .cg-section-num { font-size: 36px; }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
  return null;
}

/* ═══════════════════════════════════════════════════════════════
   SMALL COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function Badge({ children, color = C.accent, bg = C.accentBg }) {
  return (
    <span className="cg-tag" style={{ color, background: bg }}>
      {children}
    </span>
  );
}

function SectionTitle({ icon, children, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={18} color={C.accent} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: C.text, margin: 0 }}>{children}</h2>
      </div>
      {sub && <p style={{ marginTop: 8, marginLeft: 48, fontSize: 14, color: C.muted, maxWidth: 640, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

function Card({ children, style: s = {}, className = "", hover = true }) {
  return (
    <div
      className={hover ? `cg-card ${className}` : className}
      style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: radius.lg, padding: 24, boxShadow: C.shadow, ...s }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ClaudeCompleteGuide() {
  const [activePath, setActivePath] = useState("start");
  const [openModule, setOpenModule] = useState("what-claude-does");
  const [activeNav, setActiveNav] = useState("");
  const containerRef = useRef(null);

  const selectedPath = useMemo(
    () => learningPaths.find((p) => p.id === activePath) || learningPaths[0],
    [activePath]
  );

  const navItems = [
    { id: "paths", label: "Learning paths" },
    { id: "features", label: "Feature map" },
    { id: "modes", label: "Mode selector" },
    { id: "compare", label: "Comparisons" },
    { id: "modules", label: "Deep dive" },
    { id: "mistakes", label: "Fixes" },
    { id: "prompts", label: "Prompt library" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(n => document.getElementById(`section-${n.id}`)).filter(Boolean);
      let current = "";
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= 120) {
          current = sec.id.replace("section-", "");
        }
      }
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="cg-root" ref={containerRef} style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      <GlobalStyles />

      {/* ─── HERO ─── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 0" }}>
        <header style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: radius.xl, padding: "48px 40px", boxShadow: C.shadowLg, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: C.accentBg, opacity: 0.4 }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 140, height: 140, borderRadius: "50%", background: C.oliveBg, opacity: 0.3 }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 14px", borderRadius: 100, border: `1px solid ${C.line}`, background: C.surface2, marginBottom: 20 }}>
              <Icon name="bookmark" size={14} color={C.accent} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent }}>Claude User Guide · Comprehensive Edition</span>
            </div>

            <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: C.text, margin: 0, maxWidth: 800, letterSpacing: "-0.02em" }}>
              Learn Claude faster,<br />with less reading fatigue
            </h1>

            <p style={{ marginTop: 16, fontSize: 16, color: C.textSecondary, maxWidth: 640, lineHeight: 1.75 }}>
              What Claude can do, which mode to choose, what each feature is for, and how to understand it through diagrams, comparisons, and clear visual structure — not walls of text.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 32 }}>
              {[
                ["eye", "Tables, maps, and comparisons", "Visual-first teaching"],
                ["target", "User-facing explanations", "Practical, not theoretical"],
                ["wand", "Warm, readable design", "Built for sustained focus"],
              ].map(([icon, title, sub]) => (
                <div key={title} style={{ background: C.surface2, border: `1px solid ${C.lineLight}`, borderRadius: radius.md, padding: "16px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Icon name={icon} size={16} color={C.accentSoft} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{title}</span>
                  </div>
                  <span style={{ fontSize: 13, color: C.muted }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </header>
      </div>

      {/* ─── STICKY NAV ─── */}
      <div className="cg-hide-mobile" style={{ position: "sticky", top: 0, zIndex: 50, padding: "12px 24px", background: `${C.bg}ee`, backdropFilter: "blur(12px)", marginTop: 24 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 4, overflowX: "auto", borderRadius: radius.md, background: C.surface, border: `1px solid ${C.line}`, padding: 4 }}>
          {navItems.map(n => (
            <a
              key={n.id}
              href={`#section-${n.id}`}
              onClick={e => { e.preventDefault(); document.getElementById(`section-${n.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              style={{
                padding: "8px 16px", borderRadius: 14, fontSize: 13, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap",
                background: activeNav === n.id ? C.accentBg : "transparent",
                color: activeNav === n.id ? C.accent : C.textSecondary,
                transition: "all 0.15s ease",
              }}
            >
              {n.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 64px" }}>

        {/* ─── LEARNING PATHS ─── */}
        <section id="section-paths" style={{ marginBottom: 48 }}>
          <SectionTitle icon="graduation" sub="Three tracks based on your experience level. Pick one and follow its recommended sequence.">
            Choose your learning path
          </SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
            {learningPaths.map(path => {
              const active = activePath === path.id;
              return (
                <button
                  key={path.id}
                  onClick={() => setActivePath(path.id)}
                  style={{
                    textAlign: "left", border: `2px solid ${active ? path.color : C.line}`, borderRadius: radius.lg, padding: 24,
                    background: active ? C.surface : C.surface2, boxShadow: active ? C.shadowLg : "none",
                    transition: "all 0.2s ease", position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: active ? `${path.color}18` : C.surface, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${active ? path.color + "40" : C.line}` }}>
                      <Icon name={path.icon} size={16} color={active ? path.color : C.muted} />
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: C.text, fontFamily: "Outfit, sans-serif" }}>{path.label}</div>
                    </div>
                    <Badge color={path.color} bg={`${path.color}15`}>{path.audience}</Badge>
                  </div>
                  <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65, margin: "8px 0 0" }}>{path.summary}</p>
                </button>
              );
            })}
          </div>

          <Card style={{ marginTop: 16, background: C.surface3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Icon name="route" size={16} color={selectedPath.color} />
              <span style={{ fontSize: 13, fontWeight: 700, color: selectedPath.color, fontFamily: "Outfit, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {selectedPath.label} — Recommended sequence
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {selectedPath.steps.map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ background: C.surface, border: `1px solid ${C.line}`, borderRadius: 100, padding: "5px 14px", fontSize: 13, fontWeight: 500, color: C.text }}>
                    <span style={{ color: selectedPath.color, fontWeight: 700, marginRight: 6 }}>{i + 1}</span>{step}
                  </span>
                  {i < selectedPath.steps.length - 1 && (
                    <Icon name="arrowRight" size={14} color={C.line} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ─── FEATURE MAP ─── */}
        <section id="section-features" style={{ marginBottom: 48 }}>
          <SectionTitle icon="sparkles" sub="Six capability groups. Understanding which group a task belongs to helps you pick the right tools.">
            What Claude can do
          </SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: 16 }}>
            {featureGroups.map(group => (
              <Card key={group.title} style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${group.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={group.icon} size={16} color={group.color} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: "Outfit, sans-serif" }}>{group.title}</h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                  {group.items.map(item => (
                    <span key={item} style={{ padding: "3px 11px", borderRadius: 100, fontSize: 12, fontWeight: 500, background: C.surface2, border: `1px solid ${C.lineLight}`, color: C.inkSoft }}>
                      {item}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, margin: 0 }}>{group.note}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── MODE SELECTOR ─── */}
        <section id="section-modes" style={{ marginBottom: 48 }}>
          <SectionTitle icon="wand" sub="The most common source of bad results is using the wrong surface. This table helps you choose.">
            Which mode should you use?
          </SectionTitle>

          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 700 }}>
                <thead>
                  <tr>
                    {["Mode", "Best for", "Use when", "Avoid when", "Level"].map((h, i) => (
                      <th key={h} style={{
                        padding: "14px 18px", textAlign: "left", fontSize: 12, fontWeight: 700,
                        fontFamily: "Outfit, sans-serif", letterSpacing: "0.06em", textTransform: "uppercase",
                        color: C.accent, background: i === 0 ? C.accentBg : C.surface2,
                        borderBottom: `2px solid ${C.line}`,
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modeRows.map((row, ri) => (
                    <tr key={row.mode}>
                      <td style={{ padding: "14px 18px", borderBottom: `1px solid ${C.lineLight}`, background: ri % 2 === 0 ? C.surface : C.surface3, fontWeight: 600, fontSize: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Icon name={row.icon} size={15} color={C.accentSoft} />
                          {row.mode}
                        </div>
                      </td>
                      {[row.bestFor, row.useWhen, row.avoidWhen].map((val, ci) => (
                        <td key={ci} style={{ padding: "14px 18px", borderBottom: `1px solid ${C.lineLight}`, background: ri % 2 === 0 ? C.surface : C.surface3, fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>
                          {val}
                        </td>
                      ))}
                      <td style={{ padding: "14px 18px", borderBottom: `1px solid ${C.lineLight}`, background: ri % 2 === 0 ? C.surface : C.surface3 }}>
                        <Badge
                          color={row.level === "Beginner" ? C.olive : row.level === "Intermediate" ? C.navy : C.rust}
                          bg={row.level === "Beginner" ? C.oliveBg : row.level === "Intermediate" ? C.navyBg : C.rustBg}
                        >
                          {row.level}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* ─── COMPARISONS ─── */}
        <section id="section-compare" style={{ marginBottom: 48 }}>
          <SectionTitle icon="route" sub="Frequently confused features, side by side. Scan these when you are unsure which tool to reach for.">
            Feature comparisons
          </SectionTitle>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 16 }}>
            {compareCards.map(card => (
              <Card key={card.title} style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${card.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name={card.icon} size={16} color={card.color} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, fontFamily: "Outfit, sans-serif" }}>{card.title}</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {card.rows.map(row => (
                    <div key={row.label} style={{ background: C.surface2, border: `1px solid ${C.lineLight}`, borderRadius: radius.sm, padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{row.label}</span>
                        <Badge color={card.color} bg={`${card.color}12`}>{row.tag}</Badge>
                      </div>
                      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{row.desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── DEEP DIVE MODULES ─── */}
        <section id="section-modules" style={{ marginBottom: 48 }}>
          <SectionTitle icon="layers" sub="Twelve modules, each self-contained. Expand only what you need. Scan first, read second.">
            Deep dive modules
          </SectionTitle>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {modules.map(mod => {
              const isOpen = openModule === mod.id;
              return (
                <div key={mod.id} style={{ background: isOpen ? C.surface : C.surface2, border: `1px solid ${isOpen ? C.accentSoft + "60" : C.line}`, borderRadius: radius.lg, overflow: "hidden", boxShadow: isOpen ? C.shadowLg : C.shadow, transition: "all 0.2s ease", position: "relative" }}>
                  <div className="cg-section-num">{mod.number}</div>

                  <button
                    onClick={() => setOpenModule(isOpen ? "" : mod.id)}
                    style={{ width: "100%", textAlign: "left", padding: "20px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, background: "transparent", border: "none", position: "relative", zIndex: 1 }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, flex: 1 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: isOpen ? C.accentBg : C.surface, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${isOpen ? C.accent + "30" : C.lineLight}`, flexShrink: 0, marginTop: 2 }}>
                        <Icon name={mod.icon} size={17} color={isOpen ? C.accent : C.muted} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: "Outfit, sans-serif", color: C.text, margin: 0 }}>
                          <span style={{ color: C.accentSoft, marginRight: 8, fontSize: 14 }}>{mod.number}.</span>
                          {mod.title}
                        </h3>
                        <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65, margin: "6px 0 0", maxWidth: 680 }}>{mod.summary}</p>
                      </div>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: C.surface, border: `1px solid ${C.lineLight}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4 }}>
                      <Icon name={isOpen ? "chevronUp" : "chevronDown"} size={16} color={C.muted} />
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: `1px solid ${C.lineLight}`, padding: "24px 24px 28px", background: C.surface }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 20 }}>
                        {/* Left: Key points */}
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.accent, marginBottom: 14 }}>Key points</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {mod.bullets.map((b, i) => (
                              <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: C.text, lineHeight: 1.6 }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accentSoft, flexShrink: 0, marginTop: 9 }} />
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Tips and prompt */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          {/* Pro tip */}
                          <div style={{ background: C.oliveBg, border: `1px solid ${C.olive}30`, borderRadius: radius.sm, padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                              <Icon name="lightbulb" size={14} color={C.olive} />
                              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.olive }}>Pro tip</span>
                            </div>
                            <p style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.65, margin: 0 }}>{mod.proTip}</p>
                          </div>

                          {/* Pitfall */}
                          <div style={{ background: C.rustBg, border: `1px solid ${C.rust}30`, borderRadius: radius.sm, padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                              <Icon name="alertTriangle" size={14} color={C.rust} />
                              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.rust }}>Common pitfall</span>
                            </div>
                            <p style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.65, margin: 0 }}>{mod.pitfall}</p>
                          </div>

                          {/* Try this prompt */}
                          <div style={{ background: C.surface3, border: `1px solid ${C.line}`, borderRadius: radius.sm, padding: "14px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                              <Icon name="terminal" size={14} color={C.accent} />
                              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.accent }}>Try this prompt</span>
                            </div>
                            <p style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>"{mod.prompt}"</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── MISTAKES & PROMPTS ─── */}
        <section id="section-mistakes" style={{ marginBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 24 }}>

            {/* Mistakes */}
            <div>
              <SectionTitle icon="checkCircle" sub="Most poor results come from a small set of repeatable errors.">
                Common mistakes and fast fixes
              </SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {mistakes.map((m, i) => (
                  <Card key={i} style={{ padding: 18 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: C.rustBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                        <Icon name={m.icon} size={15} color={C.rust} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 4 }}>{m.problem}</div>
                        <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>{m.fix}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Prompt library */}
            <div id="section-prompts">
              <SectionTitle icon="terminal" sub="Copy-paste these into any Claude conversation to get better results immediately.">
                10 prompts worth reusing
              </SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {promptLibrary.map((p, i) => (
                  <Card key={i} style={{ padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ display: "flex", gap: 10, flex: 1 }}>
                        <span style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, color: C.accentSoft, fontSize: 15, lineHeight: "22px", flexShrink: 0 }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>{p.text}</span>
                      </div>
                      <Badge color={C.navy} bg={C.navyBg}>{p.tag}</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ textAlign: "center", padding: "32px 0 0", borderTop: `1px solid ${C.lineLight}` }}>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
            Claude User Guide
             <br />
            © 2026 EugeneYip.com All Rights Reserved. 
          </p>
        </footer>
      </div>
    </div>
  );
}
