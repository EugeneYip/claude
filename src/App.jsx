import React, { useCallback, useEffect, useMemo, useState } from "react";

const ICON_PATHS = {
  bookOpen: [
    "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",
    "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  ],
  brain: [
    "M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a3 3 0 003 3h2a3 3 0 003-3v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z",
    "M9.5 9a2.5 2.5 0 015 0",
    "M12 2v3",
  ],
  search: ["M11 4a7 7 0 110 14 7 7 0 010-14z", "M21 21l-4.35-4.35"],
  globe: [
    "M12 2a10 10 0 100 20 10 10 0 000-20z",
    "M2 12h20",
    "M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z",
  ],
  folderOpen: [
    "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
    "M2 10h20",
  ],
  sparkles: [
    "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z",
    "M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75z",
  ],
  fileText: [
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
    "M14 2v6h6",
    "M16 13H8",
    "M16 17H8",
    "M10 9H8",
  ],
  layers: ["M12 2l10 6-10 6L2 8l10-6z", "M2 12l10 6 10-6", "M2 17l10 6 10-6"],
  workflow: [
    "M3 3h4v4H3z",
    "M17 3h4v4h-4z",
    "M10 17h4v4h-4z",
    "M5 7v3a4 4 0 0 0 4 4h2",
    "M19 7v3a4 4 0 0 1-4 4h-2",
  ],
  code: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6", "M14 4l-4 16"],
  table: ["M3 3h18v18H3z", "M3 9h18", "M3 15h18", "M9 3v18", "M15 3v18"],
  route: [
    "M3 17a2 2 0 104 0 2 2 0 00-4 0z",
    "M17 7a2 2 0 104 0 2 2 0 00-4 0z",
    "M7 17h4a4 4 0 004-4V9",
    "M17 9V7",
  ],
  terminal: [
    "M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z",
    "M7 8l4 4-4 4",
    "M13 16h4",
  ],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  target: [
    "M12 2a10 10 0 100 20 10 10 0 000-20z",
    "M12 6a6 6 0 100 12 6 6 0 000-12z",
    "M12 10a2 2 0 100 4 2 2 0 000-4z",
  ],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 110 6 3 3 0 010-6z"],
  alertTriangle: ["M12 2L1 21h22L12 2z", "M12 9v4", "M12 17h.01"],
  checkCircle: ["M12 2a10 10 0 100 20 10 10 0 000-20z", "M8 12l3 3 5-5"],
  chevronDown: ["M6 9l6 6 6-6"],
  chevronUp: ["M18 15l-6-6-6 6"],
  bookmark: ["M5 3h14a1 1 0 011 1v17l-8-4-8 4V4a1 1 0 011-1z"],
  lightbulb: ["M9 18h6", "M10 22h4", "M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"],
  arrowRight: ["M5 12h14", "M13 6l6 6-6 6"],
  library: [
    "M4 19V5a2 2 0 012-2h4v16H6a2 2 0 01-2-2z",
    "M10 3h4v16h-4z",
    "M14 3h4a2 2 0 012 2v12a2 2 0 01-2 2h-4V3z",
  ],
  zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  image: ["M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5z", "M8.5 9.5h.01", "M21 15l-5-5L5 21"],
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
        <path key={`${name}-${i}`} d={d} />
      ))}
    </svg>
  );
}

function GlobalStyles() {
  useEffect(() => {
    if (document.getElementById("claude-guide-styles-v5")) return;
    const style = document.createElement("style");
    style.id = "claude-guide-styles-v5";
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      * { box-sizing: border-box; }
      .cg-shell { font-family: 'DM Sans', system-ui, sans-serif; }
      .cg-display { font-family: 'Fraunces', Georgia, serif; }
      .cg-mono { font-family: 'JetBrains Mono', monospace; }
      .cg-shell input, .cg-shell button { font-family: inherit; }
      .cg-shell [id^="section-"] { scroll-margin-top: 96px; }
      .cg-scroll-hide { scrollbar-width: none; }
      .cg-scroll-hide::-webkit-scrollbar { display: none; }
      .cg-wrap-anywhere { overflow-wrap: anywhere; word-break: break-word; }
      .cg-code-card { overflow-wrap: anywhere; word-break: break-word; }
      .cg-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .cg-reference-row { display: grid; grid-template-columns: 120px 140px 1fr; gap: 12px; align-items: start; }
      .cg-nav-button { min-width: max-content; }
      .cg-svg { max-width: 100%; height: auto; }
      @media (max-width: 960px) {
        .cg-grid-hero, .cg-grid-2, .cg-grid-3, .cg-grid-4 { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 840px) {
        .cg-sticky-desktop { display: none !important; }
      }
      @media (max-width: 720px) {
        .cg-reference-row { grid-template-columns: 1fr; gap: 6px; }
        .cg-toolbar { flex-direction: column; align-items: stretch !important; }
        .cg-toolbar-search { min-width: 0 !important; width: 100% !important; }
        .cg-chip-row { width: 100%; overflow-x: auto; flex-wrap: nowrap !important; padding-bottom: 2px; }
        .cg-chip-row button { flex: 0 0 auto; }
      }
      @media (max-width: 640px) {
        .cg-card-pad { padding: 18px !important; }
        .cg-heading-lg { font-size: 22px !important; }
        .cg-heading-xl { font-size: 28px !important; }
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  return null;
}

const C = {
  cream: "#FBF6EF",
  creamDark: "#F3EADF",
  creamWarm: "#F8EEE2",
  paper: "#FFFaf4",
  ink: "#1E1A17",
  inkLight: "#685E55",
  inkMuted: "#988A7E",
  border: "#E5D8C9",
  borderLight: "#EFE3D7",
  copperDeep: "#6B3B2A",
  copper: "#A0593A",
  copperLight: "#F4E3D7",
  clay: "#B2643D",
  rose: "#B5484B",
  navy: "#3B4A5E",
  purple: "#6549A8",
  gold: "#C08A2E",
  shadow: "0 1px 3px rgba(30,26,23,0.06), 0 4px 14px rgba(30,26,23,0.04)",
  shadowLg: "0 2px 8px rgba(30,26,23,0.08), 0 10px 28px rgba(30,26,23,0.06)",
};

const VERIFIED_DATE = "March 17, 2026";

const LEVELS = [
  { key: "all", label: "All" },
  { key: "foundation", label: "Foundation" },
  { key: "core", label: "Core" },
  { key: "power", label: "Power" },
  { key: "expert", label: "Expert" },
];

const PRINCIPLES = [
  { ico: "target", title: "Choose the right surface", desc: "Mode selection matters more than clever wording." },
  { ico: "lightbulb", title: "Ask clearly", desc: "State the goal, context, constraints, and final output." },
  { ico: "search", title: "Search when facts move", desc: "Use the live web for anything current, regulated, or changeable." },
  { ico: "sparkles", title: "Make real outputs", desc: "Turn important work into artifacts or files you can actually use." },
  { ico: "layers", title: "Separate planning from action", desc: "Chat for thinking. Cowork, Chrome, or Code for execution." },
  { ico: "eye", title: "Use visuals when they help", desc: "Tables, diagrams, and maps often explain faster than prose." },
];

const TOOL_CHOOSER = [
  { goal: "Quick answer, rewrite, or draft", tool: "Normal Chat", ico: "bookOpen", reason: "Best for fast one off work." },
  { goal: "Current fact, recent policy, latest product change", tool: "Web Search", ico: "globe", reason: "Use when reality may have changed." },
  { goal: "Ongoing class, client, or startup workflow", tool: "Project", ico: "folderOpen", reason: "Keeps files, instructions, and related chats together." },
  { goal: "Standalone output you will refine or share", tool: "Artifact", ico: "sparkles", reason: "Better than burying the final result in chat." },
  { goal: "Broad, sourced investigation", tool: "Research", ico: "search", reason: "Designed for multi source synthesis and citations." },
  { goal: "Desktop execution across files and apps", tool: "Cowork", ico: "layers", reason: "Best when the task is a workflow, not a sentence." },
  { goal: "Browser side reading, navigation, or form work", tool: "Claude in Chrome", ico: "workflow", reason: "Use when the website itself is the work surface." },
  { goal: "Repository, terminal, tests, refactors, or code review", tool: "Claude Code", ico: "code", reason: "Built for terminal first coding and codebase native work." },
];

const PROMPT_BLOCKS = [
  { label: "Goal", example: "Create a practical guide for general Claude users.", color: C.clay },
  { label: "Context", example: "Cover modern Claude surfaces, not just basic chat.", color: C.copper },
  { label: "Constraints", example: "User facing tone. Use tables and diagrams. Keep it readable.", color: C.purple },
  { label: "Output", example: "Decision table, feature map, detailed sections, and quick reference prompts.", color: C.navy },
  { label: "Quality", example: "Separate current facts from stable concepts. Flag surface specific limits.", color: C.rose },
  { label: "Verify", example: "Check official Anthropic docs for features that may have changed.", color: C.gold },
];

const CORE_FEATURES = [
  { title: "Projects", ico: "folderOpen", color: C.copper, description: "Persistent workspaces with project instructions, files, and focused chats.", when: "Use for any recurring domain of work." },
  { title: "Artifacts", ico: "sparkles", color: C.clay, description: "Standalone outputs that can be refined, shared, and reused.", when: "Use when the answer should become an object." },
  { title: "File Creation", ico: "fileText", color: C.navy, description: "Create Word, PDF, Excel, and PowerPoint files directly.", when: "Use when the deliverable format matters." },
  { title: "Memory", ico: "library", color: C.gold, description: "Broader cross chat preferences and continuity outside projects.", when: "Use for stable personal preferences and recurring context." },
  { title: "Skills", ico: "zap", color: C.purple, description: "Reusable task procedures for repeated workflows.", when: "Use when a task pattern repeats often." },
  { title: "Web Search", ico: "search", color: "#0284c7", description: "Pulls live information and cites sources.", when: "Use for anything current or changeable." },
  { title: "Research", ico: "globe", color: "#4338ca", description: "Broader multi source investigation with citations.", when: "Use for reports, not quick facts." },
  { title: "Custom Visuals", ico: "image", color: "#c026d3", description: "Inline diagrams, charts, and interactive visuals.", when: "Use when a concept is easier to see than to read." },
  { title: "Cowork", ico: "layers", color: "#7c3aed", description: "Desktop execution for knowledge work across files, apps, plugins, and scheduled tasks.", when: "Use when the job is a workflow, not just a prompt." },
  { title: "Claude in Chrome", ico: "workflow", color: "#0f766e", description: "Browser side reading, navigation, and web task execution.", when: "Use when the site itself is the working context." },
  { title: "Claude Code", ico: "code", color: "#374151", description: "Terminal first coding surface for repos, tests, refactors, and code review.", when: "Use when the real work lives in a codebase." },
];

const SURFACE_MATRIX = [
  { surface: "Normal Chat", best: "Fast questions, drafting, and rewriting", strengths: "Low friction and flexible", limits: "Weak for persistent context" },
  { surface: "Projects", best: "Ongoing domains of work", strengths: "Persistent instructions and files", limits: "Not ideal for one off jobs" },
  { surface: "Artifacts", best: "Standalone deliverables", strengths: "Reusable and visible", limits: "Still tied to a conversation" },
  { surface: "Web Search", best: "Current facts", strengths: "Live information", limits: "Not a deep research workflow by itself" },
  { surface: "Research", best: "Broader sourced investigation", strengths: "Multiple searches and citations", limits: "Slower and heavier than search" },
  { surface: "Cowork", best: "Desktop knowledge work execution", strengths: "Works across files and tools", limits: "Needs active scope control" },
  { surface: "Claude in Chrome", best: "Browser native workflows", strengths: "Reads pages and acts in context", limits: "Browser permissions and website risk" },
  { surface: "Claude Code", best: "Terminal and repo native coding", strengths: "Reads codebase, edits files, runs commands", limits: "Not the right tool for non code knowledge work" },
];

const ACTION_TRIAGE = [
  {
    title: "Cowork",
    color: C.purple,
    best: "Desktop knowledge work across local files, connectors, plugins, and recurring tasks.",
    useWhen: "The task is a multi step workflow and not centered on a browser page or a repo.",
    avoidWhen: "The core object is a codebase or the browser tab itself.",
  },
  {
    title: "Claude in Chrome",
    color: "#0f766e",
    best: "Browser native tasks where page context, navigation, or form interaction matters.",
    useWhen: "The work lives inside websites and page state matters.",
    avoidWhen: "A quick search would be enough or the real work is repo based.",
  },
  {
    title: "Claude Code",
    color: C.navy,
    best: "Terminal first coding, repository understanding, debugging, refactoring, and PR prep.",
    useWhen: "The main object is a codebase, shell, tests, or build pipeline.",
    avoidWhen: "The job is broad knowledge work without a repo at the center.",
  },
];

const COWORK_PLAYBOOKS = [
  {
    title: "Daily or weekly report generation",
    when: "You need recurring work across files, connectors, or web sources.",
    flow: ["Open Cowork", "State the output and cadence", "Install the right tool if needed", "Use /schedule for recurring runs", "Review every run like a real report"],
    risks: ["Leaving a scheduled task running after the job changed", "Letting task scope expand silently", "Giving access to more files than needed"],
  },
  {
    title: "Research across sources",
    when: "You need Claude to search connected sources, the web, and local material in one task.",
    flow: ["Define the question and output", "Limit the sources", "Ask for a plan first", "Approve the plan", "Require a report with open questions"],
    risks: ["Searching too broadly", "Mixing internal and external facts without labels", "Skipping source review"],
  },
  {
    title: "Recurring knowledge work",
    when: "The task repeats often enough that manual execution is wasteful.",
    flow: ["Start with a one off Cowork task", "Refine the prompt", "Turn it into a scheduled task", "Pause or delete it when the workflow changes"],
    risks: ["Automating an immature process too early", "Failing to review output quality over time", "Over trusting tools and connected sources"],
  },
];

const COWORK_ECOSYSTEM = [
  { node: "Cowork", desc: "The main workspace inside Claude Desktop for multi step knowledge work.", tag: "Core", color: C.purple },
  { node: "Extra tools", desc: "Add actions or deeper app behaviors inside Cowork flows.", tag: "Action", color: C.clay },
  { node: "Connected sources", desc: "Bring outside context into the workflow so Cowork can work with that information.", tag: "Context", color: C.copper },
  { node: "Recurring runs", desc: "Repeat a mature Cowork flow on a schedule after the one off version is already stable.", tag: "Automation", color: C.navy },
  { node: "Finished output", desc: "Reports, briefs, summaries, and artifacts that still need to be reviewed like real work.", tag: "Output", color: C.gold },
];

const CLAUDE_CODE_COOKBOOK = [
  {
    lane: "Repo onboarding lane",
    icon: "library",
    color: C.copper,
    objective: "Understand an unfamiliar repo before touching code.",
    triggers: ["New codebase", "Inherited project", "Returning after a long gap"],
    steps: ["Map entry points", "Identify core modules", "Trace request or execution flow", "Find highest risk areas", "Write down what is still unclear"],
    prompts: [
      "Give me a high level overview of this codebase.",
      "Map the entry points, core modules, and likely request flow.",
      "What are the three highest risk areas to understand before editing anything?",
    ],
    outputs: ["Repo map", "Risk list", "Open questions"],
  },
  {
    lane: "Bug triage lane",
    icon: "alertTriangle",
    color: C.rose,
    objective: "Move from symptom to the smallest safe fix with evidence.",
    triggers: ["Failing test", "Broken route", "Regression report"],
    steps: ["Describe the failure path", "Rank likely root causes", "Verify the most likely one", "Propose the smallest safe patch", "Run or update tests"],
    prompts: [
      "Reproduce the bug path conceptually before changing code.",
      "Rank likely root causes and tell me what evidence would confirm each.",
      "Propose the smallest safe fix first, with tests.",
    ],
    outputs: ["Root cause shortlist", "Patch", "Validation summary"],
  },
  {
    lane: "Refactor lane",
    icon: "sparkles",
    color: C.purple,
    objective: "Improve clarity and structure without changing behavior.",
    triggers: ["Hard to read module", "Growing technical debt", "Duplication"],
    steps: ["State invariants", "Define the refactor boundary", "Make the structural change", "Run or update tests", "Summarize what stayed the same"],
    prompts: [
      "Refactor this module for clarity without changing behavior.",
      "List the invariants you must preserve before editing.",
      "Tell me what changed structurally and what stayed behaviorally identical.",
    ],
    outputs: ["Refactored code", "Invariant list", "Diff explanation"],
  },
  {
    lane: "PR lane",
    icon: "fileText",
    color: C.navy,
    objective: "Turn a code change into a ship ready unit of work.",
    triggers: ["Ready to merge", "Need reviewer context", "Need concise delivery notes"],
    steps: ["Summarize the change", "List touched files", "Call out risks", "State follow up work", "Flag human review points"],
    prompts: [
      "Summarize this change as if writing a PR description.",
      "Highlight touched files, risks, and follow up work.",
      "Point out what still needs human review before merge.",
    ],
    outputs: ["PR description", "Risk notes", "Reviewer checklist"],
  },
  {
    lane: "MCP lane",
    icon: "workflow",
    color: C.clay,
    objective: "Extend Claude Code with outside tools or data sources in a controlled way.",
    triggers: ["Need issue tracker context", "Need external docs", "Need tool based actions"],
    steps: ["Define why MCP is actually needed", "Choose the minimum server set", "Configure MCP", "Test it in a narrow task", "Document how the repo should use it"],
    prompts: [
      "Tell me whether this task truly needs MCP or can stay repo local.",
      "Recommend the minimum MCP setup for this workflow.",
      "Document how this repo should use MCP and where it must not rely on it.",
    ],
    outputs: ["MCP plan", "Configured server path", "Usage policy"],
  },
];

const CLAUDE_CODE_PLAYBOOKS = [
  {
    title: "Understand an unfamiliar codebase",
    prompts: [
      "Give me a high level overview of this codebase.",
      "Map the main entry points, core modules, and likely request flow.",
      "Show me the highest risk areas to understand before editing anything.",
    ],
    useWhen: "You are new to a repository or returning after a gap.",
    why: "This prevents blind edits.",
  },
  {
    title: "Fix a bug with evidence before code changes",
    prompts: [
      "Reproduce the bug path conceptually before changing code.",
      "Trace likely root causes and rank them.",
      "Propose the smallest fix first, with tests.",
    ],
    useWhen: "You need controlled debugging rather than speculative rewrites.",
    why: "Claude Code is strongest when it reasons, traces, and then patches.",
  },
  {
    title: "Refactor with guardrails",
    prompts: [
      "Refactor this module for clarity without changing behavior.",
      "List the invariants you must preserve before editing.",
      "Run or update tests after the refactor and summarize what changed.",
    ],
    useWhen: "You want maintainability gains without scope creep.",
    why: "Refactors fail when behavioral boundaries are missing.",
  },
  {
    title: "Prepare a PR ready change",
    prompts: [
      "Make the code change, then summarize it as if writing a PR description.",
      "Highlight risks, touched files, and follow up work.",
      "Point out what still needs human review.",
    ],
    useWhen: "You want the output to fit directly into team workflow.",
    why: "This turns coding into shipping, not just editing.",
  },
];

const CLAUDE_CODE_REFERENCE = [
  { label: "Core entry", value: "claude", note: "Start an interactive Claude Code session in the project root." },
  { label: "Config UI", value: "/config", note: "Open Claude Code settings from the interactive REPL." },
  { label: "MCP", value: "claude mcp", note: "Configure Model Context Protocol servers for tools and data sources." },
  { label: "Agents", value: "claude agents", note: "List configured subagents grouped by source." },
  { label: "Auth status", value: "claude auth status", note: "Check whether Claude Code is authenticated." },
  { label: "Project guide", value: "CLAUDE.md", note: "Use a repo local file to shape how Claude Code should work in that codebase." },
  { label: "Skills", value: "SKILL.md", note: "Create a skill file so Claude Code can load reusable procedures." },
  { label: "Remote Control", value: "claude.ai/code", note: "Continue a local Claude Code session from browser or mobile while it is still running locally." },
];

const GUIDE_SECTIONS = [
  {
    id: "mental-model",
    level: "foundation",
    number: "01",
    title: "Start with the right mental model",
    ico: "brain",
    color: C.copper,
    summary: "Claude is not one feature. It is a set of surfaces. Results usually improve when you choose the right surface first and then write a clear task brief.",
    whyItMatters: "A lot of weak results come from using the wrong surface or skipping verification, not from bad prompts alone.",
    beginnerMoves: ["Assume the first answer is a draft.", "Ask which surface fits the task first.", "Name the deliverable, audience, and source boundaries."],
    advancedMoves: ["Separate planning, production, critique, and packaging.", "Move important work into Projects or Artifacts early.", "Use live search whenever facts may have changed."],
    commonMistakes: ["Treating every task like a normal chat.", "Expecting current accuracy without search.", "Confusing Memory, Projects, and Skills."],
    promptExamples: [
      { prompt: "Before answering, tell me which Claude surface is best for this task and why.", why: "It forces routing before generation." },
      { prompt: "Use only the uploaded file. Separate explicit facts from inference.", why: "It adds source discipline." },
      { prompt: "What assumptions did you make, and which ones are weakest?", why: "It adds self review." },
    ],
    beforeAfter: {
      before: "Tell me about Claude.",
      after: "Create a practical user guide to Claude that covers major surfaces, when to use each one, common mistakes, and a mode selection table. Use visual structure, not long blocks of prose.",
      improvement: "The stronger version defines scope, audience, deliverable, and presentation style.",
    },
    visual: "mental",
  },
  {
    id: "surface-map",
    level: "foundation",
    number: "02",
    title: "See the full Claude stack before going deeper",
    ico: "layers",
    color: C.clay,
    summary: "A complete guide should show the full Claude stack: chat, Projects, Artifacts, file creation, Memory, Skills, web search, Research, custom visuals, Cowork, Claude in Chrome, and Claude Code.",
    whyItMatters: "If Cowork and Claude Code are missing, the guide is incomplete.",
    beginnerMoves: ["Learn chat, Projects, and Artifacts first.", "Then learn search, Research, and visuals.", "Only then move to Cowork, Chrome, and Claude Code."],
    advancedMoves: ["Think in layers: conversation, workspace, deliverable, action surface, and coding surface.", "Use one surface for thought and another for execution.", "Do not collapse all work into one chat thread."],
    commonMistakes: ["Calling Claude just a chatbot.", "Ignoring surface specific strengths.", "Trying to use Claude Code for non code knowledge work."],
    promptExamples: [
      { prompt: "Map this task across chat, Projects, Artifacts, Cowork, Chrome, and Claude Code.", why: "It creates a surface aware plan." },
      { prompt: "What should stay in a Project and what should move to Claude Code?", why: "It separates knowledge work from repo work." },
    ],
    beforeAfter: {
      before: "Claude is a chatbot with file support.",
      after: "Claude is a multi surface system for conversation, persistent workspaces, standalone deliverables, current information retrieval, desktop execution, browser workflows, and terminal native coding.",
      improvement: "This reflects the product more accurately.",
    },
    visual: "layers",
  },
  {
    id: "cowork-guide",
    level: "expert",
    number: "03",
    title: "How to use Claude Cowork well",
    ico: "layers",
    color: C.purple,
    summary: "Cowork is the desktop action surface for knowledge work beyond coding. It lets Claude work across files, apps, web context, extra tools, connected sources, and recurring tasks.",
    whyItMatters: "You need to know when Cowork is better than chat and how to keep its scope under control.",
    beginnerMoves: ["Use Cowork when the job is a workflow, not just a reply.", "Start with a clear goal, output format, and scope limit.", "Ask for a plan before broad execution."],
    advancedMoves: ["Install only the tools and sources you actually need.", "Use /schedule after the one off version is stable.", "Review each scheduled run like real work."],
    commonMistakes: ["Giving access to more files than needed.", "Automating a workflow before the prompt is stable.", "Watching only the final answer instead of the task scope."],
    promptExamples: [
      { prompt: "Plan this Cowork task first. Tell me what files, tools, websites, and outputs you expect to touch. Wait for approval before you start.", why: "It adds a review gate before execution." },
      { prompt: "Convert this one off Cowork task into a weekly scheduled report. Keep the scope narrow and include a quality checklist at the end.", why: "It moves from manual execution to repeatable automation." },
    ],
    beforeAfter: {
      before: "Use Cowork to help with this.",
      after: "Use Cowork to produce a weekly competitor brief from my working folder, allowed web sources, and connected Slack channel. Show your plan first, keep the output to one page plus a risk list, and stop if you need broader file access.",
      improvement: "The stronger version gives Cowork a bounded mission, source limits, output shape, and a stop condition.",
    },
    visual: "agent",
  },
  {
    id: "claude-code-guide",
    level: "expert",
    number: "04",
    title: "How to use Claude Code well",
    ico: "code",
    color: C.navy,
    summary: "Claude Code is a terminal first coding surface that reads your codebase, edits files, runs commands, and integrates with development tools. Its natural home is repository native work.",
    whyItMatters: "Claude Code is not just Claude for programmers. It is its own working environment.",
    beginnerMoves: ["Start Claude Code in the project root.", "Ask for a codebase overview before editing.", "Use small, testable changes first."],
    advancedMoves: ["Use CLAUDE.md as a repo local operating guide.", "Add MCP servers when tools or data sources matter.", "Treat debugging, refactoring, and PR prep as separate phases."],
    commonMistakes: ["Editing before understanding the codebase.", "Running large refactors without stating invariants.", "Using Claude Code for broad non code knowledge work."],
    promptExamples: [
      { prompt: "Give me a high level overview of this codebase. Map the entry points, core modules, and likely request flow.", why: "This is the safest opening move in an unfamiliar repo." },
      { prompt: "Reproduce the bug path conceptually, rank likely root causes, then propose the smallest safe fix with tests.", why: "It creates a structured debugging flow." },
      { prompt: "Refactor this module for clarity without changing behavior. List the invariants you must preserve before editing.", why: "It sets a strong boundary for refactoring." },
    ],
    beforeAfter: {
      before: "Fix this code.",
      after: "Read this repository first, explain the likely bug path, identify the smallest safe fix, preserve existing behavior, run or update relevant tests, and summarize the change like a PR note.",
      improvement: "The stronger version adds understanding, scope control, behavior preservation, testing, and packaging.",
    },
    visual: "agent",
  },
];

const PROMPT_LIBRARY = [
  { text: "Tell me which Claude surface fits this task best before you answer.", tag: "Routing" },
  { text: "Use only the uploaded source. Separate explicit facts from inference.", tag: "Source" },
  { text: "Turn this into an Artifact, then tell me whether it should also be exported as a file.", tag: "Output" },
  { text: "Search official sources only and separate current facts from interpretation.", tag: "Current" },
  { text: "Explain this with a diagram first, then a short legend, then a concise explanation.", tag: "Visual" },
  { text: "Plan this Cowork task first. Tell me what files, tools, websites, and outputs you expect to touch. Wait for approval before you start.", tag: "Cowork" },
  { text: "Would this task be better in Cowork, Claude in Chrome, or Claude Code? Explain why for each and recommend one.", tag: "Action" },
  { text: "Give me a high level overview of this codebase before editing anything.", tag: "Code" },
  { text: "Reproduce the bug path conceptually, rank likely root causes, then propose the smallest safe fix with tests.", tag: "Debug" },
  { text: "Make this conversation share ready and flag anything that should stay private.", tag: "Privacy" },
  { text: "Document the MCP setup this repo actually needs, and justify every server you recommend.", tag: "MCP" },
  { text: "Convert this one off Cowork task into a recurring scheduled workflow with a final quality checklist.", tag: "Schedule" },
];

function runDataValidation() {
  const sectionIds = GUIDE_SECTIONS.map((s) => s.id);
  const sectionDuplicates = sectionIds.filter((id, index) => sectionIds.indexOf(id) !== index);
  const cookbookIds = CLAUDE_CODE_COOKBOOK.map((lane) => lane.lane);
  const cookbookDuplicates = cookbookIds.filter((id, index) => cookbookIds.indexOf(id) !== index);
  const missingIcons = [
    ...PRINCIPLES.map((x) => x.ico),
    ...TOOL_CHOOSER.map((x) => x.ico),
    ...CORE_FEATURES.map((x) => x.ico),
    ...GUIDE_SECTIONS.map((x) => x.ico),
    ...CLAUDE_CODE_COOKBOOK.map((x) => x.icon),
  ].filter((name) => !ICON_PATHS[name]);
  const brokenSections = GUIDE_SECTIONS.filter(
    (s) => !s.title || !s.summary || !Array.isArray(s.beginnerMoves) || !Array.isArray(s.promptExamples)
  );
  const invalidCookbook = CLAUDE_CODE_COOKBOOK.filter(
    (lane) => !lane.lane || !Array.isArray(lane.steps) || !Array.isArray(lane.prompts) || !Array.isArray(lane.outputs)
  );
  const invalidPromptLibrary = PROMPT_LIBRARY.filter((x) => !x.text || !x.tag);

  if (sectionDuplicates.length) console.warn("Duplicate section ids:", sectionDuplicates);
  if (cookbookDuplicates.length) console.warn("Duplicate cookbook lanes:", cookbookDuplicates);
  if (missingIcons.length) console.warn("Missing icon paths:", missingIcons);
  if (brokenSections.length) console.warn("Broken section data:", brokenSections.map((s) => s.id));
  if (invalidCookbook.length) console.warn("Broken cookbook data:", invalidCookbook.map((x) => x.lane));
  if (invalidPromptLibrary.length) console.warn("Broken prompt library rows:", invalidPromptLibrary);
}

function SectionVisual({ type }) {
  const s = { fill: "none", stroke: C.copperDeep, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const tx = (x, y, t, size = 10, bold = false, opacity = 1) => (
    <text x={x} y={y} textAnchor="middle" fill={C.copperDeep} style={{ fontSize: size, fontWeight: bold ? 700 : 500, opacity }}>
      {t}
    </text>
  );

  const visuals = {
    mental: (
      <svg viewBox="0 0 360 150" className="cg-svg">
        <rect x="24" y="12" width="122" height="42" rx="10" {...s} />
        <rect x="214" y="12" width="122" height="42" rx="10" {...s} />
        <rect x="119" y="102" width="122" height="40" rx="10" {...s} />
        <path d="M146 33h68" {...s} />
        <path d="M85 54l56 48M275 54l-56 48" {...s} />
        {tx(85, 38, "Your task", 10, true)}
        {tx(275, 38, "Claude draft", 10, true)}
        {tx(180, 127, "Your judgment", 10, true)}
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 360 150" className="cg-svg">
        {[
          [40, 10, 280, 24, "Chat"],
          [54, 40, 252, 24, "Projects"],
          [68, 70, 224, 24, "Artifacts"],
          [82, 100, 196, 24, "Cowork, Chrome, Code"],
        ].map(([x, y, w, h, l]) => (
          <g key={l}>
            <rect x={x} y={y} width={w} height={h} rx="8" {...s} />
            {tx(180, y + 16, l, 9, true)}
          </g>
        ))}
      </svg>
    ),
    action: (
      <svg viewBox="0 0 420 190" className="cg-svg">
        <rect x="138" y="8" width="144" height="34" rx="10" fill="none" stroke={C.copperDeep} strokeWidth="1.6" />
        <text x="210" y="29" textAnchor="middle" fill={C.copperDeep} style={{ fontSize: 11, fontWeight: 700 }}>Where is the real work?</text>
        <rect x="16" y="82" width="116" height="42" rx="10" fill="none" stroke={C.purple} strokeWidth="1.6" />
        <rect x="152" y="82" width="116" height="42" rx="10" fill="none" stroke="#0f766e" strokeWidth="1.6" />
        <rect x="288" y="82" width="116" height="42" rx="10" fill="none" stroke={C.navy} strokeWidth="1.6" />
        <text x="74" y="106" textAnchor="middle" fill={C.purple} style={{ fontSize: 10, fontWeight: 700 }}>Desktop work</text>
        <text x="210" y="106" textAnchor="middle" fill="#0f766e" style={{ fontSize: 10, fontWeight: 700 }}>Web pages</text>
        <text x="346" y="106" textAnchor="middle" fill={C.navy} style={{ fontSize: 10, fontWeight: 700 }}>Codebase</text>
        <path d="M210 42v24M210 66H74M210 66H346" fill="none" stroke={C.copperDeep} strokeWidth="1.4" strokeLinecap="round" />
        <rect x="16" y="148" width="116" height="28" rx="8" fill="none" stroke={C.purple} strokeWidth="1.6" />
        <rect x="152" y="148" width="116" height="28" rx="8" fill="none" stroke="#0f766e" strokeWidth="1.6" />
        <rect x="288" y="148" width="116" height="28" rx="8" fill="none" stroke={C.navy} strokeWidth="1.6" />
        <text x="74" y="166" textAnchor="middle" fill={C.purple} style={{ fontSize: 10, fontWeight: 700 }}>Cowork</text>
        <text x="210" y="166" textAnchor="middle" fill="#0f766e" style={{ fontSize: 10, fontWeight: 700 }}>Claude in Chrome</text>
        <text x="346" y="166" textAnchor="middle" fill={C.navy} style={{ fontSize: 10, fontWeight: 700 }}>Claude Code</text>
      </svg>
    ),
    ecosystem: (
      <svg viewBox="0 0 420 200" className="cg-svg">
        <rect x="142" y="12" width="136" height="34" rx="10" fill="none" stroke={C.purple} strokeWidth="1.7" />
        <text x="210" y="33" textAnchor="middle" fill={C.purple} style={{ fontSize: 11, fontWeight: 700 }}>Cowork</text>
        <rect x="18" y="82" width="112" height="38" rx="10" fill="none" stroke={C.clay} strokeWidth="1.6" />
        <text x="74" y="105" textAnchor="middle" fill={C.clay} style={{ fontSize: 10, fontWeight: 700 }}>Extra tools</text>
        <rect x="154" y="82" width="112" height="38" rx="10" fill="none" stroke={C.copper} strokeWidth="1.6" />
        <text x="210" y="105" textAnchor="middle" fill={C.copper} style={{ fontSize: 10, fontWeight: 700 }}>Connected sources</text>
        <rect x="290" y="82" width="112" height="38" rx="10" fill="none" stroke={C.navy} strokeWidth="1.6" />
        <text x="346" y="105" textAnchor="middle" fill={C.navy} style={{ fontSize: 10, fontWeight: 700 }}>Recurring runs</text>
        <rect x="142" y="154" width="136" height="30" rx="10" fill="none" stroke={C.gold} strokeWidth="1.6" />
        <text x="210" y="173" textAnchor="middle" fill={C.gold} style={{ fontSize: 10, fontWeight: 700 }}>Finished output</text>
        <path d="M210 46v22M210 68H74M210 68H346M74 120l98 32M210 120v34M346 120l-98 32" fill="none" stroke={C.copperDeep} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  };

  return visuals[type] || visuals.layers;
}

function Badge({ children, color, bg }) {
  return (
    <span style={{ borderRadius: 999, background: bg, color, padding: "4px 10px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: C.copperLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={18} color={C.clay} />
        </div>
        <h2 className="cg-display cg-heading-lg" style={{ margin: 0, fontSize: 28, color: C.ink }}>{title}</h2>
      </div>
      {subtitle ? <p style={{ margin: "10px 0 0 48px", fontSize: 14, lineHeight: 1.8, color: C.inkLight, maxWidth: 760 }}>{subtitle}</p> : null}
    </div>
  );
}

function FeatureCard({ title, ico, color, description, when }) {
  return (
    <div className="cg-card-pad" style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: "white", padding: 20, boxShadow: C.shadow, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, minWidth: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}14`, flexShrink: 0 }}>
          <Icon name={ico} size={17} color={color} />
        </div>
        <div className="cg-display cg-wrap-anywhere" style={{ fontSize: 16, fontWeight: 600, color: C.ink }}>{title}</div>
      </div>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: C.inkLight }}>{description}</p>
      <div style={{ marginTop: 12, borderRadius: 12, padding: "10px 12px", background: C.creamWarm, color: C.inkLight, fontSize: 12, lineHeight: 1.65 }}>
        <strong style={{ color }}>Use it when: </strong>{when}
      </div>
    </div>
  );
}

function MatrixCard({ item }) {
  return (
    <div className="cg-card-pad" style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: "white", padding: 18, boxShadow: C.shadow, minWidth: 0 }}>
      <div className="cg-display cg-wrap-anywhere" style={{ fontSize: 18, color: C.ink, marginBottom: 10 }}>{item.surface}</div>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: C.ink }}><strong>Best for: </strong>{item.best}</div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: C.inkLight }}><strong style={{ color: C.copper }}>Strength: </strong>{item.strengths}</div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: C.inkLight }}><strong style={{ color: C.rose }}>Limit: </strong>{item.limits}</div>
      </div>
    </div>
  );
}

function PlaybookCard({ title, when, flow, risks }) {
  return (
    <div className="cg-card-pad" style={{ borderRadius: 18, border: `1px solid ${C.borderLight}`, background: "white", padding: 18, minWidth: 0 }}>
      <div className="cg-display cg-wrap-anywhere" style={{ fontSize: 18, color: C.ink, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: C.inkLight, marginBottom: 12 }}><strong>Use it when: </strong>{when}</div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.copper, marginBottom: 8 }}>How it usually goes</div>
      <div style={{ display: "grid", gap: 8 }}>
        {flow.map((step, i) => (
          <div key={`${title}-flow-${i}`} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.7, color: C.ink }}>
            <span style={{ width: 22, height: 22, borderRadius: 999, background: C.copperLight, color: C.copper, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.rose, marginTop: 14, marginBottom: 8 }}>Watch for</div>
      <div style={{ display: "grid", gap: 8 }}>
        {risks.map((risk, i) => (
          <div key={`${title}-risk-${i}`} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.7, color: C.inkLight }}>
            <Icon name="alertTriangle" size={14} color={C.rose} style={{ marginTop: 2 }} />
            <span>{risk}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CookbookLaneCard({ lane }) {
  return (
    <div className="cg-card-pad" style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: "white", padding: 18, boxShadow: C.shadow, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ width: 34, height: 34, borderRadius: 12, background: `${lane.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={lane.icon} size={16} color={lane.color} />
          </div>
          <div className="cg-display cg-wrap-anywhere" style={{ fontSize: 18, color: C.ink }}>{lane.lane}</div>
        </div>
        <Badge color={lane.color} bg={`${lane.color}15`}>Pattern</Badge>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.75, color: C.ink, marginBottom: 12 }}><strong>Goal: </strong>{lane.objective}</div>
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 8 }}>When this pattern helps</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {lane.triggers.map((t, i) => (
              <span key={`${lane.lane}-trigger-${i}`} style={{ padding: "4px 10px", borderRadius: 999, border: `1px solid ${C.borderLight}`, background: C.paper, fontSize: 12, color: C.inkLight }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.copper, marginBottom: 8 }}>How to use it</div>
          <div style={{ display: "grid", gap: 8 }}>
            {lane.steps.map((step, i) => (
              <div key={`${lane.lane}-step-${i}`} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.75, color: C.ink }}>
                <span style={{ width: 22, height: 22, borderRadius: 999, background: C.copperLight, color: C.copper, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.navy, marginBottom: 8 }}>Try asking Claude Code</div>
          <div style={{ display: "grid", gap: 8 }}>
            {lane.prompts.map((prompt, i) => (
              <div key={`${lane.lane}-prompt-${i}`} className="cg-mono cg-code-card" style={{ borderRadius: 12, border: `1px solid ${C.borderLight}`, background: C.creamWarm, padding: 12, fontSize: 12, lineHeight: 1.7, color: C.ink }}>
                {prompt}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.clay, marginBottom: 8 }}>What you should get back</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {lane.outputs.map((o, i) => (
              <span key={`${lane.lane}-output-${i}`} style={{ padding: "4px 10px", borderRadius: 999, background: C.copperLight, color: C.clay, fontSize: 12, fontWeight: 600 }}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReferenceRow({ label, value, note }) {
  return (
    <div className="cg-reference-row" style={{ padding: "12px 0", borderTop: `1px solid ${C.borderLight}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{label}</div>
      <div className="cg-mono cg-wrap-anywhere" style={{ fontSize: 12, color: C.navy }}>{value}</div>
      <div style={{ fontSize: 13, lineHeight: 1.7, color: C.inkLight }}>{note}</div>
    </div>
  );
}

function GuideSectionCard({ section, isExpanded, onToggle }) {
  const extraCowork = section.id === "cowork-guide";
  const extraCode = section.id === "claude-code-guide";

  return (
    <section id={section.id} style={{ overflow: "hidden", borderRadius: 24, border: `1px solid ${C.border}`, background: "white", boxShadow: C.shadow, minWidth: 0 }}>
      <button onClick={onToggle} style={{ width: "100%", border: "none", background: "transparent", padding: 24, textAlign: "left", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ width: 46, height: 46, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "white", background: section.color, flexShrink: 0 }}>
          <Icon name={section.ico} size={18} color="white" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.inkMuted }}>{section.number} · {section.level}</div>
          <h3 className="cg-display cg-heading-lg cg-wrap-anywhere" style={{ margin: "4px 0 0", fontSize: 22, lineHeight: 1.18, color: C.ink }}>{section.title}</h3>
          {!isExpanded ? <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.7, color: C.inkLight }}>{section.summary}</p> : null}
        </div>
        <Icon name={isExpanded ? "chevronUp" : "chevronDown"} size={18} color={C.inkMuted} />
      </button>

      {isExpanded ? (
        <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: 24, background: C.paper }}>
          <div className="cg-grid-2" style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: C.ink }}>{section.summary}</p>
              <div style={{ borderRadius: 16, border: `1px solid ${C.borderLight}`, background: C.creamWarm, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 8 }}>Why this matters</div>
                <div style={{ fontSize: 13, lineHeight: 1.8, color: C.ink }}>{section.whyItMatters}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.copper, marginBottom: 8 }}>Start here</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {section.beginnerMoves.map((m, i) => (
                    <div key={`${section.id}-beginner-${i}`} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.75, color: C.ink }}>
                      <Icon name="checkCircle" size={15} color={C.copper} style={{ marginTop: 2 }} />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.navy, marginBottom: 8 }}>Go further</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {section.advancedMoves.map((m, i) => (
                    <div key={`${section.id}-advanced-${i}`} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.75, color: C.ink }}>
                      <Icon name="arrowRight" size={15} color={C.navy} style={{ marginTop: 2 }} />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.rose, marginBottom: 8 }}>Common mistakes</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {section.commonMistakes.map((m, i) => (
                    <div key={`${section.id}-mistake-${i}`} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.75, color: C.ink }}>
                      <Icon name="alertTriangle" size={15} color={C.rose} style={{ marginTop: 2 }} />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
              <div style={{ borderRadius: 16, border: `1px solid ${C.borderLight}`, background: C.creamWarm, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 10 }}>Visual guide</div>
                <SectionVisual type={section.id === "cowork-guide" || section.id === "claude-code-guide" ? "action" : section.visual} />
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {section.promptExamples.map((p, i) => (
                  <div key={`${section.id}-prompt-${i}`} className="cg-code-card" style={{ borderRadius: 14, border: `1px solid ${C.borderLight}`, background: "white", padding: 14 }}>
                    <div className="cg-mono cg-wrap-anywhere" style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>{p.prompt}</div>
                    <div style={{ marginTop: 6, fontSize: 11, lineHeight: 1.6, color: C.inkMuted }}>{p.why}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderRadius: 16, border: `1px solid ${C.borderLight}`, background: C.paper, padding: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 10 }}>Before and after</div>
                <div className="cg-grid-2" style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                  <div style={{ borderRadius: 12, border: "1px solid #fecaca", background: "#fef2f2", padding: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#dc2626", marginBottom: 6 }}>Weaker</div>
                    <div className="cg-mono cg-wrap-anywhere" style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>{section.beforeAfter.before}</div>
                  </div>
                  <div style={{ borderRadius: 12, border: "1px solid #bbf7d0", background: "#f0fdf4", padding: 12 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#16a34a", marginBottom: 6 }}>Stronger</div>
                    <div className="cg-mono cg-wrap-anywhere" style={{ fontSize: 12, lineHeight: 1.7, color: C.ink }}>{section.beforeAfter.after}</div>
                  </div>
                </div>
                <div style={{ marginTop: 10, display: "flex", gap: 8, fontSize: 12, lineHeight: 1.75, color: C.copper }}>
                  <Icon name="lightbulb" size={15} color={C.copper} style={{ marginTop: 2 }} />
                  <span>{section.beforeAfter.improvement}</span>
                </div>
              </div>
            </div>
          </div>

          {extraCowork ? (
            <div style={{ marginTop: 24, display: "grid", gap: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.purple }}>Common Cowork setups</div>
              <div className="cg-grid-3" style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
                {COWORK_PLAYBOOKS.map((pb, i) => (
                  <PlaybookCard key={`cowork-${i}`} {...pb} />
                ))}
              </div>
            </div>
          ) : null}

          {extraCode ? (
            <div style={{ marginTop: 24, display: "grid", gap: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.navy }}>Common Claude Code setups</div>
              <div className="cg-grid-2" style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
                {CLAUDE_CODE_PLAYBOOKS.map((pb, i) => (
                  <div key={`code-${i}`} className="cg-card-pad" style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: "white", padding: 18, minWidth: 0 }}>
                    <div className="cg-display cg-wrap-anywhere" style={{ fontSize: 18, color: C.ink, marginBottom: 6 }}>{pb.title}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.7, color: C.inkLight, marginBottom: 10 }}><strong>Use it when: </strong>{pb.useWhen}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.7, color: C.navy, marginBottom: 10 }}>{pb.why}</div>
                    <div style={{ display: "grid", gap: 8 }}>
                      {pb.prompts.map((prompt, j) => (
                        <div key={`code-prompt-${i}-${j}`} className="cg-mono cg-code-card" style={{ borderRadius: 12, border: `1px solid ${C.borderLight}`, background: C.creamWarm, padding: 12, fontSize: 12, lineHeight: 1.7, color: C.ink }}>
                          {prompt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cg-card-pad" style={{ borderRadius: 20, border: `1px solid ${C.border}`, background: "white", padding: 18 }}>
                <div className="cg-display" style={{ fontSize: 18, color: C.ink, marginBottom: 10 }}>Claude Code quick commands</div>
                <div>
                  {CLAUDE_CODE_REFERENCE.map((row, i) => (
                    <ReferenceRow key={`ref-${i}`} {...row} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

export default function ClaudeCompleteGuideReact() {
  const [level, setLevel] = useState("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(new Set(["mental-model", "surface-map", "cowork-guide", "claude-code-guide"]));
  const [activeNav, setActiveNav] = useState("");

  useEffect(() => {
    runDataValidation();
  }, []);

  const filteredSections = useMemo(() => {
    return GUIDE_SECTIONS.filter((s) => {
      if (level !== "all" && s.level !== level) return false;
      if (!query.trim()) return true;
      const haystack = [
        s.title,
        s.summary,
        s.whyItMatters,
        ...s.beginnerMoves,
        ...s.advancedMoves,
        ...s.commonMistakes,
        ...s.promptExamples.map((p) => p.prompt),
        s.beforeAfter.before,
        s.beforeAfter.after,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
  }, [level, query]);

  const sectionsByLevel = useMemo(() => {
    const groups = { foundation: [], core: [], power: [], expert: [] };
    filteredSections.forEach((section) => {
      groups[section.level].push(section);
    });
    return groups;
  }, [filteredSections]);

  const levelLabels = { foundation: "Foundation", core: "Core", power: "Power", expert: "Expert" };

  const toggleSection = useCallback((id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    const ids = ["tools", "prompt", "features", "matrix", "triage", "ecosystem", "cookbook", "sections", "scope"];
    const onScroll = () => {
      let current = "";
      ids.forEach((id) => {
        const el = document.getElementById(`section-${id}`);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      });
      setActiveNav(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "tools", label: "Tool chooser" },
    { id: "prompt", label: "Prompt structure" },
    { id: "features", label: "What Claude can do" },
    { id: "matrix", label: "Surface guide" },
    { id: "triage", label: "Cowork, Chrome, or Code" },
    { id: "ecosystem", label: "Cowork workflow" },
    { id: "cookbook", label: "Code workflows" },
    { id: "sections", label: "Guide sections" },
    { id: "scope", label: "Scope" },
  ];

  return (
    <div className="cg-shell" style={{ minHeight: "100vh", background: C.cream, color: C.ink }}>
      <GlobalStyles />
      <div style={{ maxWidth: 1220, margin: "0 auto", padding: "28px 24px 64px" }}>
        <header style={{ overflow: "hidden", borderRadius: 30, border: `1px solid ${C.borderLight}`, background: `linear-gradient(135deg, ${C.copperLight} 0%, ${C.cream} 40%, ${C.creamDark} 100%)`, boxShadow: C.shadowLg }}>
          <div className="cg-grid-hero" style={{ display: "grid", gap: 24, padding: "34px 34px 30px", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, border: `1px solid ${C.borderLight}`, background: "white", padding: "6px 14px", color: C.copperDeep, marginBottom: 18 }}>
                <Icon name="bookmark" size={14} color={C.copperDeep} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Claude User Guide</span>
              </div>
              <h1 className="cg-display cg-heading-xl" style={{ margin: 0, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.04, color: C.ink }}>A Master Guide to Claude</h1>
              <p style={{ marginTop: 16, maxWidth: 690, fontSize: 15, lineHeight: 1.88, color: C.inkLight }}>
                A practical guide to what Claude can do, when to use each surface, and how to get better results without wasting time.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 999, background: "white", padding: "7px 12px", fontSize: 11, fontWeight: 600, color: C.inkLight, boxShadow: C.shadow }}>
                  <Icon name="lightbulb" size={14} color={C.clay} />
                  Reviewed against official docs · {VERIFIED_DATE}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 999, background: "white", padding: "7px 12px", fontSize: 11, fontWeight: 600, color: C.inkLight, boxShadow: C.shadow }}>
                  <Icon name="layers" size={14} color={C.clay} />
                  Includes Cowork, Chrome, and Claude Code
                </span>
              </div>
            </div>

            <div className="cg-card-pad" style={{ borderRadius: 22, border: `1px solid ${C.borderLight}`, background: "white", padding: 20, boxShadow: C.shadow }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 12 }}>What Claude helps you do</div>
              <svg viewBox="0 0 420 190" className="cg-svg" style={{ color: C.copperDeep }}>
                {[
                  [16, 4, 120, 38, "Thinking", "chat, files"],
                  [150, 4, 120, 38, "Organizing", "projects, memory"],
                  [284, 4, 120, 38, "Making", "artifacts, exports"],
                  [16, 120, 120, 38, "Searching", "web, research"],
                  [150, 120, 120, 38, "Acting", "cowork, chrome"],
                  [284, 120, 120, 38, "Coding", "claude code"],
                ].map(([x, y, w, h, l, sub]) => (
                  <g key={l}>
                    <rect x={x} y={y} width={w} height={h} rx="10" fill="none" stroke={C.copperDeep} strokeWidth="1.6" />
                    <text x={x + w / 2} y={y + 18} textAnchor="middle" fill={C.copperDeep} style={{ fontSize: 10, fontWeight: 700 }}>{l}</text>
                    <text x={x + w / 2} y={y + 30} textAnchor="middle" fill={C.copperDeep} style={{ fontSize: 7, opacity: 0.45 }}>{sub}</text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </header>

        <div className="cg-sticky-desktop" style={{ position: "sticky", top: 0, zIndex: 30, paddingTop: 18, background: `${C.cream}ee`, backdropFilter: "blur(10px)" }}>
          <div className="cg-scroll-hide" style={{ display: "flex", gap: 6, overflowX: "auto", borderRadius: 18, background: "white", border: `1px solid ${C.border}`, padding: 6, boxShadow: C.shadow }}>
            {navItems.map((n) => (
              <a
                key={n.id}
                className="cg-nav-button"
                href={`#section-${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(`section-${n.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                style={{ textDecoration: "none", padding: "8px 14px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: activeNav === n.id ? C.clay : C.inkLight, background: activeNav === n.id ? C.copperLight : "transparent" }}
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>

        <section style={{ marginTop: 28 }}>
          <div style={{ marginBottom: 14, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted }}>Core principles</div>
          <div className="cg-grid-3" style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))" }}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="cg-card-pad" style={{ display: "flex", gap: 12, borderRadius: 18, border: `1px solid ${C.border}`, background: "white", padding: 16, boxShadow: C.shadow }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: C.copperDeep, display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                  <Icon name={p.ico} size={17} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{p.title}</div>
                  <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.7, color: C.inkLight }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="section-tools" style={{ marginTop: 28, borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
          <SectionTitle icon="route" title="Which Claude tool should you use?" subtitle="A lot of weak results start with the wrong surface, not the wrong prompt." />
          <div className="cg-table-wrap" style={{ borderRadius: 16, border: `1px solid ${C.borderLight}` }}>
            <table style={{ width: "100%", minWidth: 860 }}>
              <thead>
                <tr style={{ background: C.creamWarm }}>
                  {["Your goal", "Best tool", "Why"].map((head) => (
                    <th key={head} style={{ textAlign: "left", padding: "14px 16px", fontSize: 12, fontWeight: 700, color: C.ink, borderBottom: `1px solid ${C.border}` }}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOOL_CHOOSER.map((row, i) => (
                  <tr key={row.goal} style={{ background: i % 2 === 0 ? "white" : C.paper }}>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: C.ink, borderBottom: `1px solid ${C.borderLight}` }}>{row.goal}</td>
                    <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: C.copperDeep, borderBottom: `1px solid ${C.borderLight}` }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <Icon name={row.ico} size={15} color={C.copperDeep} />
                        {row.tool}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: 13, color: C.inkLight, borderBottom: `1px solid ${C.borderLight}` }}>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="section-prompt" style={{ marginTop: 28, borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
          <SectionTitle icon="lightbulb" title="Six parts of a strong prompt" subtitle="The best prompts are clear, specific, and easy to follow." />
          <div className="cg-grid-3" style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))" }}>
            {PROMPT_BLOCKS.map((b, i) => (
              <div key={b.label} className="cg-card-pad" style={{ borderRadius: 16, border: `1px solid ${C.borderLight}`, background: C.creamWarm, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", background: b.color, color: "white", fontSize: 11, fontWeight: 800 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{b.label}</span>
                </div>
                <div className="cg-mono cg-wrap-anywhere" style={{ fontSize: 11, lineHeight: 1.7, color: C.inkLight }}>{b.example}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="section-features" style={{ marginTop: 28, borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
          <SectionTitle icon="sparkles" title="What Claude can do" subtitle="This guide covers the full working stack, not just the chat window." />
          <div className="cg-grid-3" style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
            {CORE_FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <section id="section-matrix" style={{ marginTop: 28, borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
          <SectionTitle icon="table" title="How the main surfaces differ" subtitle="Use this when two Claude surfaces sound similar but work differently." />
          <div className="cg-grid-4" style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
            {SURFACE_MATRIX.map((item) => (
              <MatrixCard key={item.surface} item={item} />
            ))}
          </div>
        </section>

        <section id="section-triage" style={{ marginTop: 28, borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
          <SectionTitle icon="workflow" title="Cowork, Chrome, or Claude Code?" subtitle="These three surfaces may sound related, but each one is built for a different kind of work." />
          <div className="cg-grid-3" style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))" }}>
            {ACTION_TRIAGE.map((card) => (
              <div key={card.title} className="cg-card-pad" style={{ borderRadius: 18, border: `1px solid ${C.border}`, background: C.paper, padding: 18 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                  <div className="cg-display cg-wrap-anywhere" style={{ fontSize: 20, color: C.ink }}>{card.title}</div>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: card.color, flexShrink: 0 }} />
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: C.ink }}><strong>Best for: </strong>{card.best}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: C.inkLight }}><strong style={{ color: C.copper }}>Use it when: </strong>{card.useWhen}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.7, color: C.inkLight }}><strong style={{ color: C.rose }}>Avoid it when: </strong>{card.avoidWhen}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="cg-grid-2" style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", marginTop: 18 }}>
            <div className="cg-card-pad" style={{ borderRadius: 18, border: `1px solid ${C.borderLight}`, background: C.creamWarm, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 10 }}>A simple way to choose</div>
              <SectionVisual type="action" />
            </div>
            <div className="cg-card-pad" style={{ borderRadius: 18, border: `1px solid ${C.borderLight}`, background: "white", padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 10 }}>In plain English</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  "If the task is mostly reading, drafting, and organizing across desktop sources, start with Cowork.",
                  "If the website itself contains the context and the actions, use Claude in Chrome.",
                  "If the main object is a codebase, shell, tests, or a PR ready engineering change, use Claude Code.",
                  "Plan in chat when helpful, but execute in the surface where the real work actually lives.",
                ].map((item, i) => (
                  <div key={`rule-${i}`} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.75, color: C.ink }}>
                    <Icon name="arrowRight" size={15} color={C.clay} style={{ marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="section-ecosystem" style={{ marginTop: 28, borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
          <SectionTitle icon="layers" title="How Cowork fits into the bigger workflow" subtitle="Cowork becomes easier to use once you can see how tools, connected sources, recurring tasks, and outputs fit together." />
          <div className="cg-grid-2" style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
            <div className="cg-card-pad" style={{ borderRadius: 18, border: `1px solid ${C.borderLight}`, background: C.creamWarm, padding: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted, marginBottom: 10 }}>See the full picture</div>
              <SectionVisual type="ecosystem" />
            </div>
            <div style={{ display: "grid", gap: 12 }}>
              {COWORK_ECOSYSTEM.map((item, i) => (
                <div key={`ecosystem-${i}`} className="cg-card-pad" style={{ borderRadius: 16, border: `1px solid ${C.borderLight}`, background: "white", padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                    <div className="cg-display cg-wrap-anywhere" style={{ fontSize: 18, color: C.ink }}>{item.node}</div>
                    <Badge color={item.color} bg={`${item.color}15`}>{item.tag}</Badge>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.75, color: C.inkLight }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="section-cookbook" style={{ marginTop: 28, borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
          <SectionTitle icon="code" title="Practical Claude Code workflows" subtitle="Use these patterns when you want Claude Code to support real development work, not just a quick edit." />
          <div className="cg-grid-2" style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
            {CLAUDE_CODE_COOKBOOK.map((lane) => (
              <CookbookLaneCard key={lane.lane} lane={lane} />
            ))}
          </div>
        </section>

        <section id="section-sections" style={{ marginTop: 28 }}>
          <div className="cg-toolbar" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted }}>Guide sections</div>
              <h2 className="cg-display cg-heading-lg" style={{ margin: "6px 0 0", fontSize: 28, color: C.ink }}>Core topics in detail</h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <input className="cg-toolbar-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sections..." style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: "white", padding: "10px 12px", fontSize: 13, color: C.ink, minWidth: 220 }} />
              <div className="cg-chip-row" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {LEVELS.map((l) => (
                  <button key={l.key} onClick={() => setLevel(l.key)} style={{ borderRadius: 12, border: level === l.key ? `1px solid ${C.copperDeep}` : `1px solid ${C.border}`, background: level === l.key ? C.copperDeep : "white", color: level === l.key ? "white" : C.inkLight, padding: "10px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {l.label}
                  </button>
                ))}
                <button onClick={() => setExpanded(new Set(GUIDE_SECTIONS.map((s) => s.id)))} style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: "white", color: C.inkLight, padding: "10px 12px", fontSize: 12 }}>Expand</button>
                <button onClick={() => setExpanded(new Set())} style={{ borderRadius: 12, border: `1px solid ${C.border}`, background: "white", color: C.inkLight, padding: "10px 12px", fontSize: 12 }}>Collapse</button>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {Object.entries(sectionsByLevel).map(([lev, sections]) => {
              if (!sections.length) return null;
              return (
                <div key={lev}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ height: 1, background: C.border, flex: 1 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted }}>{levelLabels[lev]}</span>
                    <div style={{ height: 1, background: C.border, flex: 1 }} />
                  </div>
                  <div style={{ display: "grid", gap: 14 }}>
                    {sections.map((section) => (
                      <GuideSectionCard key={section.id} section={section} isExpanded={expanded.has(section.id)} onToggle={() => toggleSection(section.id)} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="section-scope" style={{ marginTop: 28 }}>
          <div className="cg-grid-2" style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))" }}>
            <div className="cg-card-pad" style={{ borderRadius: 24, border: `1px solid ${C.border}`, background: "white", padding: 24, boxShadow: C.shadow }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.inkMuted }}>In this guide</div>
              <h3 className="cg-display cg-heading-lg" style={{ margin: "10px 0 0", fontSize: 24, color: C.ink }}>What this guide includes</h3>
              <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
                {[
                  "The main Claude surfaces that ordinary users are most likely to use.",
                  "How Projects, Artifacts, search, Research, Cowork, Chrome, and Claude Code differ.",
                  "Practical workflows, common mistakes, and faster ways to decide what to use.",
                  "A user guide, not an API manual or admin reference.",
                  "A layout tuned to stay readable on smaller screens.",
                ].map((item, i) => (
                  <div key={`scope-${i}`} style={{ borderRadius: 14, background: C.creamWarm, padding: "12px 14px", fontSize: 13, lineHeight: 1.75, color: C.inkLight }}>{item}</div>
                ))}
              </div>
            </div>
            <div className="cg-card-pad" style={{ borderRadius: 24, border: "1px solid #ead8c8", background: `linear-gradient(135deg, ${C.copperLight}, #fbf2e8)`, padding: 24, boxShadow: C.shadow }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.copperDeep }}>Bottom line</div>
              <h3 className="cg-display cg-heading-xl" style={{ margin: "10px 0 0", fontSize: 28, color: C.copperDeep }}>Use Claude with intent</h3>
              <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.9, color: C.copperDeep }}>
                Start with the right surface. Give Claude a clear job. Check the parts that matter. Then turn the result into something you can actually use, share, or keep building on.
              </p>
            </div>
          </div>
        </section>

        <footer style={{ marginTop: 32, padding: "28px 0 8px", borderTop: `1px solid ${C.borderLight}`, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: C.inkMuted, lineHeight: 1.7, margin: 0 }}>
            Claude User Guide
            <br />
            © 2026 EugeneYip.com All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
