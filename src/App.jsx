import { useMemo, useState } from "react";
import {
  Brain,
  Search,
  FolderKanban,
  Sparkles,
  FileText,
  GraduationCap,
  Monitor,
  Globe,
  Sheet,
  Presentation,
  Chrome,
  Bot,
  Eye,
  Share2,
  Clock3,
  Wand2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  LibraryBig,
  PencilRuler,
  Route,
  Box,
} from "lucide-react";

const palette = {
  bg: "#F4EDE3",
  surface: "#FFF9F2",
  surface2: "#F8F0E5",
  line: "#D8CCBC",
  text: "#2B241D",
  muted: "#6B6258",
  accent: "#A26B3D",
  accent2: "#C28B58",
  olive: "#6E7766",
  rust: "#9B5F4B",
  sand: "#E8D7C5",
  inkSoft: "#433A31",
};

const featureGroups = [
  {
    title: "Core chat",
    icon: Brain,
    items: ["Normal chat", "Model selection", "Uploads", "Prompting", "Styles"],
    note: "Best for everyday writing, thinking, drafting, and question answering.",
  },
  {
    title: "Persistent context",
    icon: FolderKanban,
    items: ["Projects", "Project instructions", "Project knowledge", "RAG for larger projects", "Memory"],
    note: "Best when you do related work over time and want Claude to keep its footing.",
  },
  {
    title: "Standalone deliverables",
    icon: Sparkles,
    items: ["Artifacts", "Word", "PDF", "Excel", "PowerPoint"],
    note: "Best when the output should become a reusable document, app, chart, or file.",
  },
  {
    title: "Search and reasoning",
    icon: Search,
    items: ["Extended thinking", "Web search", "Research", "Citations", "Current information"],
    note: "Best when the task needs deeper reasoning, live information, or a broader investigation.",
  },
  {
    title: "Automation surfaces",
    icon: Bot,
    items: ["Cowork", "Cowork plugins", "Recurring tasks", "Claude in Chrome"],
    note: "Best when Claude should help execute a broader desktop or browser workflow.",
  },
  {
    title: "Work integrations",
    icon: Box,
    items: ["Excel", "PowerPoint", "GitHub", "Connected context", "Cross-tool workflows"],
    note: "Best when the real work lives in files, decks, workbooks, or repositories.",
  },
];

const learningPaths = [
  {
    id: "start",
    label: "Start here",
    icon: GraduationCap,
    summary: "New users who want to understand what Claude is, what to click, and which feature to use first.",
    steps: ["What Claude can do", "Which mode to choose", "How to prompt", "How to upload files", "How to avoid common mistakes"],
  },
  {
    id: "daily",
    label: "Daily work",
    icon: FileText,
    summary: "People who use Claude for school, work, reports, analysis, and repeated projects.",
    steps: ["Projects", "Artifacts", "Memory", "Styles", "File creation", "Shareable outputs"],
  },
  {
    id: "advanced",
    label: "Advanced use",
    icon: Monitor,
    summary: "Users who want research, visual explanations, automation surfaces, and more structured control.",
    steps: ["Extended thinking", "Web search", "Research", "Skills", "Cowork", "Claude in Chrome", "Office workflows"],
  },
];

const modeRows = [
  {
    mode: "Normal chat",
    bestFor: "Quick drafting, asking questions, rewriting, summarizing, brainstorming.",
    useWhen: "The job is mostly one conversation and does not need persistent structure.",
    avoidWhen: "You need durable context or a reusable deliverable surface.",
  },
  {
    mode: "Project",
    bestFor: "Ongoing work with repeat instructions and a knowledge base.",
    useWhen: "You keep returning to the same class, client, startup, or topic.",
    avoidWhen: "The task is one-off and does not need stored context.",
  },
  {
    mode: "Artifact",
    bestFor: "A document, app, chart, tool, or output you expect to reuse or refine.",
    useWhen: "The output should stand on its own outside the chat.",
    avoidWhen: "You only need a short answer or explanation.",
  },
  {
    mode: "Extended thinking",
    bestFor: "Hard reasoning, planning, and difficult multi-step tasks.",
    useWhen: "The task is conceptually hard rather than just information-heavy.",
    avoidWhen: "The question is simple and does not need extra depth.",
  },
  {
    mode: "Web search",
    bestFor: "Current facts, fresh updates, recent news, live references.",
    useWhen: "The answer depends on information that may have changed.",
    avoidWhen: "You only want analysis of your own source files.",
  },
  {
    mode: "Research",
    bestFor: "Broader, agentic investigation with citations and more systematic coverage.",
    useWhen: "The question needs multiple searches and angles, not just one fact lookup.",
    avoidWhen: "A fast direct answer would do.",
  },
  {
    mode: "Cowork",
    bestFor: "Desktop task execution across files and tools.",
    useWhen: "The work is closer to a job flow than a normal chat exchange.",
    avoidWhen: "You only need an answer, not action.",
  },
  {
    mode: "Claude in Chrome",
    bestFor: "Browser-side reading, navigation, and repetitive web tasks.",
    useWhen: "The browser itself is the work surface.",
    avoidWhen: "The task can be solved inside chat without website interaction.",
  },
];

const compareCards = [
  {
    title: "Memory vs Projects vs Skills",
    icon: LibraryBig,
    rows: [
      ["Memory", "Your broader cross-chat preferences and context outside projects."],
      ["Projects", "A persistent workspace with knowledge and instructions for one domain of work."],
      ["Skills", "A reusable procedure Claude can apply for a recurring task pattern."],
    ],
  },
  {
    title: "Web search vs Extended thinking vs Research",
    icon: Route,
    rows: [
      ["Web search", "Fast current facts and straightforward live lookups."],
      ["Extended thinking", "More deliberate reasoning and planning before answering."],
      ["Research", "A broader agentic investigation with multiple searches and citations."],
    ],
  },
  {
    title: "Chat vs Artifact vs File",
    icon: PencilRuler,
    rows: [
      ["Chat", "A conversational answer inside the thread."],
      ["Artifact", "A standalone output in a dedicated window, meant to be refined or reused."],
      ["File", "An exported deliverable such as Word, PDF, Excel, or PowerPoint."],
    ],
  },
];

const modules = [
  {
    id: "what-claude-does",
    title: "1. What Claude can do",
    icon: Brain,
    summary: "Claude is no longer just a chatbot. It can answer questions, analyze files, create deliverables, search the web, generate custom visuals, use persistent context, and assist across desktop or browser workflows.",
    bullets: [
      "Understand and analyze text, tables, documents, and uploaded images.",
      "Create and edit Word, PDF, Excel, and PowerPoint files.",
      "Build Artifacts such as reports, diagrams, React tools, and shareable content.",
      "Use Projects, memory, and styles to keep work more consistent over time.",
      "Search the web and run broader Research flows with citations.",
    ],
    prompt: "Show me five things Claude can do for this exact task, ranked from simplest to most advanced.",
  },
  {
    id: "pick-mode",
    title: "2. Pick the right mode before you type",
    icon: Wand2,
    summary: "Many bad results come from using the wrong surface, not from using the wrong words. Deciding whether the job belongs in chat, a Project, an Artifact, Research, or Cowork often matters more than prompt phrasing alone.",
    bullets: [
      "Normal chat for quick work.",
      "Projects for recurring domains.",
      "Artifacts for standalone outputs.",
      "Research for broader investigation.",
      "Cowork or Chrome when the task needs action across tools or websites.",
    ],
    prompt: "Before answering, tell me which Claude mode is best for this task and why.",
  },
  {
    id: "prompt-better",
    title: "3. Prompt better in one minute",
    icon: FileText,
    summary: "The fastest way to improve Claude is to specify the deliverable, the allowed source, the audience, and the final format. That alone fixes a large share of weak outputs.",
    bullets: [
      "Say what you want made, not just what topic you care about.",
      "Say what sources Claude may use.",
      "Say who the answer is for.",
      "Say what final form you want: bullets, memo, table, script, checklist, deck, or study guide.",
    ],
    prompt: "Use only the uploaded source. Write a concise study guide for a beginner, then add three likely follow-up questions.",
  },
  {
    id: "files-artifacts",
    title: "4. Files and Artifacts",
    icon: Sparkles,
    summary: "When the result should become something you keep, edit, share, or download, move beyond plain chat. This is where Claude becomes much more useful for real work.",
    bullets: [
      "Use an Artifact when the output should stand on its own.",
      "Use file creation when you need a real document, workbook, or slide deck.",
      "Ask Claude what should remain chat-only and what should become an Artifact or file.",
    ],
    prompt: "Turn this into a clean Artifact first, then tell me whether it should also be exported as Word, PDF, Excel, or PowerPoint.",
  },
  {
    id: "projects-memory",
    title: "5. Projects, memory, and styles",
    icon: FolderKanban,
    summary: "These three are often confused. Projects organize a domain of work. Memory carries broader context across non-project chats. Styles shape how Claude speaks. Keeping them separate makes Claude much easier to control.",
    bullets: [
      "Projects are for a sustained body of work.",
      "Memory is for broader continuity across regular chats.",
      "Styles shape response presentation, such as concise, formal, or explanatory.",
    ],
    prompt: "Separate this setup into project instructions, memory-worthy preferences, and style preferences.",
  },
  {
    id: "skills",
    title: "6. Skills",
    icon: Box,
    summary: "Skills are reusable task procedures. They are not topic libraries. A Skill should help Claude do one kind of recurring work more reliably.",
    bullets: [
      "Best for repeatable workflows.",
      "Keep them narrower than Projects.",
      "Strong Skills include scope, examples, and clear boundaries.",
    ],
    prompt: "Design a Skill for this recurring task, including when to use it, when not to use it, and an example input-output pair.",
  },
  {
    id: "search-research",
    title: "7. Search, extended thinking, and Research",
    icon: Search,
    summary: "These are different tools, not different names for the same thing. Search helps with current information. Extended thinking helps with harder reasoning. Research helps with broader investigation.",
    bullets: [
      "Use web search for current facts.",
      "Use extended thinking for difficult reasoning or planning.",
      "Use Research for more systematic, multi-search answers with citations.",
      "Combine them only when the task genuinely needs both depth and freshness.",
    ],
    prompt: "Tell me whether this task needs web search, extended thinking, Research, or just normal chat, and explain why in one paragraph.",
  },
  {
    id: "visuals",
    title: "8. Visual explanations",
    icon: Eye,
    summary: "Long paragraphs are often the worst teaching medium. Claude can generate diagrams, charts, comparisons, and interactive visuals when a concept is easier to see than to read.",
    bullets: [
      "Ask for a diagram when the concept is structural or relational.",
      "Ask for a chart when a pattern matters more than prose.",
      "Ask for a side-by-side comparison when the reader needs fast scanning.",
      "Claude does not generate photos or illustrations like an image-generation model.",
    ],
    prompt: "Explain this with a diagram first, then a short legend, then a concise written explanation.",
  },
  {
    id: "share-privacy",
    title: "9. Sharing and privacy controls",
    icon: Share2,
    summary: "Claude supports shareable chat snapshots, artifact sharing, and incognito chats. These are important because the right privacy setting is part of good workflow design, not an afterthought.",
    bullets: [
      "Chats are private by default.",
      "Shared chats are snapshots, not fully live threads.",
      "Incognito chats are not saved to chat history or memory.",
      "Use a clean thread before you share.",
    ],
    prompt: "Make this conversation share-ready: clean up the wording, keep the final logic, and flag anything that should stay private.",
  },
  {
    id: "automation",
    title: "10. Cowork, Claude in Chrome, and advanced work surfaces",
    icon: Chrome,
    summary: "These surfaces matter when Claude should do more than just answer. They are for tasks where the real work happens across files, desktop tools, or web pages.",
    bullets: [
      "Cowork is for deeper desktop task execution.",
      "Claude in Chrome is for browser-based reading, navigation, and repeated web workflows.",
      "Use them when the work surface itself matters.",
    ],
    prompt: "Would this task be better in Cowork, Claude in Chrome, or normal chat? Explain the tradeoff and recommend one.",
  },
  {
    id: "office",
    title: "11. Excel and PowerPoint workflows",
    icon: Sheet,
    summary: "Claude is increasingly useful inside the tools people actually work in. For many users, the real question is not whether Claude can help, but whether it should help directly inside the workbook or deck.",
    bullets: [
      "Use Excel workflows for models, tables, formulas, and analysis.",
      "Use PowerPoint workflows for structure, slide logic, and cleaner presentation flow.",
      "Ask Claude to explain risks before editing complex business files.",
    ],
    prompt: "Explain the workbook or deck first, identify the highest-risk issues, and only then suggest edits.",
  },
  {
    id: "mistakes",
    title: "12. Common mistakes",
    icon: CheckCircle2,
    summary: "Readers lose attention when guides feel abstract. Users lose time when they misuse features. The table below captures the fastest fixes.",
    bullets: [
      "Using chat when the task needed a Project.",
      "Using Research for a simple factual lookup.",
      "Writing vague prompts with no output format.",
      "Forgetting privacy controls before sharing.",
      "Relying on long paragraphs when a diagram or table would teach faster.",
    ],
    prompt: "Review my workflow and tell me which feature I am probably underusing or misusing.",
  },
];

const mistakes = [
  ["I keep repeating the same context.", "Move the work into a Project or store the stable preferences in memory."],
  ["Claude’s answer is too generic.", "Add a concrete output format, source rule, and audience."],
  ["I want a polished result, not just a reply.", "Ask for an Artifact or a downloadable file."],
  ["I need current information.", "Use web search or Research instead of relying on static model knowledge."],
  ["The explanation is boring or too long.", "Ask for a diagram, chart, comparison table, or visual summary first."],
];

export default function ClaudeCompleteGuide() {
  const [activePath, setActivePath] = useState("start");
  const [openModule, setOpenModule] = useState("what-claude-does");

  const selectedPath = useMemo(
    () => learningPaths.find((path) => path.id === activePath) || learningPaths[0],
    [activePath]
  );

  return (
    <div className="min-h-screen" style={{ background: palette.bg, color: palette.text }}>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="mb-8 rounded-[32px] border p-8 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
          <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-start">
            <div>
              <div
                className="mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ borderColor: palette.line, color: palette.accent }}
              >
                Claude User Guide · Visual Edition
              </div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Learn Claude faster, with less reading fatigue</h1>
              <p className="mt-4 max-w-4xl text-base leading-7" style={{ color: palette.muted }}>
                This guide is designed for general users, not for internal reporting. It focuses on what readers actually need: what Claude can do, which mode to choose, what each major feature is for, and how to understand it quickly through diagrams, comparison tables, and cleaner visual structure.
              </p>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  ["Fewer walls of text", "More tables, maps, and comparison views."],
                  ["Cleaner product framing", "Less meta commentary, more user-facing explanation."],
                  ["Claude-like visual language", "Warm paper background with earth-tone accents for long-form readability."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border p-4" style={{ background: palette.surface2, borderColor: palette.line }}>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="mt-2 text-sm leading-6" style={{ color: palette.muted }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border p-5" style={{ background: "#FCF5EC", borderColor: palette.line }}>
              <div className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: palette.accent }}>At a glance</div>
              <div className="mt-4 space-y-3">
                {[
                  [Brain, "Ask, analyze, and rewrite"],
                  [FolderKanban, "Organize work with Projects and memory"],
                  [Sparkles, "Create Artifacts and real files"],
                  [Search, "Use search, thinking, and Research well"],
                  [Eye, "Explain with visuals, not just paragraphs"],
                  [Chrome, "Move into desktop or browser workflows when needed"],
                ].map(([Icon, label]) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border px-3 py-3" style={{ background: palette.surface, borderColor: palette.line }}>
                    <Icon className="h-5 w-5" style={{ color: palette.accent2 }} />
                    <span className="text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border p-6 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
            <div className="mb-4 flex items-center gap-3">
              <GraduationCap className="h-5 w-5" style={{ color: palette.accent }} />
              <h2 className="text-2xl font-semibold tracking-tight">Choose your learning path</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {learningPaths.map((path) => {
                const Icon = path.icon;
                const active = activePath === path.id;
                return (
                  <button
                    key={path.id}
                    onClick={() => setActivePath(path.id)}
                    className="rounded-2xl border p-4 text-left transition"
                    style={{
                      background: active ? "#F1E1CF" : palette.surface2,
                      borderColor: active ? palette.accent2 : palette.line,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" style={{ color: active ? palette.accent : palette.olive }} />
                      <div className="text-sm font-semibold">{path.label}</div>
                    </div>
                    <div className="mt-3 text-sm leading-6" style={{ color: palette.muted }}>{path.summary}</div>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 rounded-2xl border p-4" style={{ background: "#FCF5EC", borderColor: palette.line }}>
              <div className="text-sm font-semibold" style={{ color: palette.accent }}>Recommended sequence</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPath.steps.map((step) => (
                  <span key={step} className="rounded-full border px-3 py-1 text-sm" style={{ borderColor: palette.line, background: palette.surface }}>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border p-6 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
            <div className="mb-4 flex items-center gap-3">
              <Sparkles className="h-5 w-5" style={{ color: palette.accent }} />
              <h2 className="text-2xl font-semibold tracking-tight">What Claude can do</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featureGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.title} className="rounded-2xl border p-4" style={{ background: palette.surface2, borderColor: palette.line }}>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" style={{ color: palette.accent2 }} />
                      <div className="text-sm font-semibold">{group.title}</div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: palette.line, background: palette.surface }}>
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-sm leading-6" style={{ color: palette.muted }}>{group.note}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[28px] border p-6 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
          <div className="mb-4 flex items-center gap-3">
            <Wand2 className="h-5 w-5" style={{ color: palette.accent }} />
            <h2 className="text-2xl font-semibold tracking-tight">Which mode should you use?</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-2xl">
              <thead>
                <tr>
                  {[
                    "Mode",
                    "Best for",
                    "Use when",
                    "Avoid when",
                  ].map((head, index) => (
                    <th
                      key={head}
                      className="border px-4 py-3 text-left text-sm font-semibold"
                      style={{
                        background: index === 0 ? "#F1E1CF" : "#F8F0E5",
                        borderColor: palette.line,
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modeRows.map((row, index) => (
                  <tr key={row.mode}>
                    {[row.mode, row.bestFor, row.useWhen, row.avoidWhen].map((value, cellIndex) => (
                      <td
                        key={`${row.mode}-${cellIndex}`}
                        className="border px-4 py-3 align-top text-sm leading-6"
                        style={{ background: index % 2 === 0 ? palette.surface : "#FCF5EC", borderColor: palette.line }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          {compareCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-[28px] border p-5 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" style={{ color: palette.accent }} />
                  <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {card.rows.map(([label, desc]) => (
                    <div key={label} className="rounded-2xl border p-4" style={{ background: palette.surface2, borderColor: palette.line }}>
                      <div className="text-sm font-semibold">{label}</div>
                      <div className="mt-1 text-sm leading-6" style={{ color: palette.muted }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <section className="mb-8 rounded-[28px] border p-6 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
          <div className="mb-4 flex items-center gap-3">
            <Clock3 className="h-5 w-5" style={{ color: palette.accent }} />
            <h2 className="text-2xl font-semibold tracking-tight">Fast modules</h2>
          </div>
          <p className="mb-5 max-w-3xl text-sm leading-6" style={{ color: palette.muted }}>
            These modules are intentionally collapsible so readers can scan first and only expand what matters. That keeps the guide comprehensive without turning it into a wall of text.
          </p>
          <div className="space-y-3">
            {modules.map((module) => {
              const Icon = module.icon;
              const open = openModule === module.id;
              return (
                <div key={module.id} className="rounded-2xl border overflow-hidden" style={{ borderColor: palette.line, background: open ? "#FCF5EC" : palette.surface2 }}>
                  <button
                    onClick={() => setOpenModule(open ? "" : module.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0" style={{ color: palette.accent2 }} />
                      <div>
                        <div className="text-base font-semibold">{module.title}</div>
                        <div className="mt-1 text-sm leading-6" style={{ color: palette.muted }}>{module.summary}</div>
                      </div>
                    </div>
                    {open ? <ChevronUp className="h-5 w-5" style={{ color: palette.muted }} /> : <ChevronDown className="h-5 w-5" style={{ color: palette.muted }} />}
                  </button>

                  {open && (
                    <div className="border-t px-5 py-5" style={{ borderColor: palette.line, background: palette.surface }}>
                      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                        <div>
                          <div className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: palette.accent }}>Key points</div>
                          <ul className="mt-3 space-y-2 text-sm leading-6">
                            {module.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-2">
                                <span className="mt-[9px] h-1.5 w-1.5 rounded-full" style={{ background: palette.accent2 }} />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl border p-4" style={{ background: "#FFF9F2", borderColor: palette.line }}>
                          <div className="text-sm font-semibold" style={{ color: palette.rust }}>Try this prompt</div>
                          <div className="mt-3 text-sm leading-6" style={{ color: palette.inkSoft }}>{module.prompt}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-8 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[28px] border p-6 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
            <div className="mb-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5" style={{ color: palette.accent }} />
              <h2 className="text-2xl font-semibold tracking-tight">Common mistakes and fast fixes</h2>
            </div>
            <div className="space-y-3">
              {mistakes.map(([mistake, fix]) => (
                <div key={mistake} className="rounded-2xl border p-4" style={{ background: palette.surface2, borderColor: palette.line }}>
                  <div className="text-sm font-semibold">{mistake}</div>
                  <div className="mt-2 text-sm leading-6" style={{ color: palette.muted }}>{fix}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border p-6 shadow-sm" style={{ background: palette.surface, borderColor: palette.line }}>
            <div className="mb-4 flex items-center gap-3">
              <Share2 className="h-5 w-5" style={{ color: palette.accent }} />
              <h2 className="text-2xl font-semibold tracking-tight">10 prompts worth reusing</h2>
            </div>
            <div className="space-y-3">
              {[
                "Tell me which Claude mode fits this task best before you answer.",
                "Use only the uploaded source and separate facts from inference.",
                "Turn this into an Artifact and tell me whether it should also become a file.",
                "Search our previous chats for this topic and summarize decisions and next steps.",
                "Explain this with a diagram first, then a concise written explanation.",
                "Tell me whether this task needs web search, extended thinking, or Research.",
                "Design a Skill for this recurring task with examples and limits.",
                "Review this answer like a skeptical editor and point out what is vague or weak.",
                "Make this conversation share-ready and flag anything that should stay private.",
                "Explain the workbook or deck first, then identify the highest-risk issues before editing.",
              ].map((prompt, index) => (
                <div key={prompt} className="rounded-2xl border p-4 text-sm leading-6" style={{ background: palette.surface2, borderColor: palette.line }}>
                  <span className="mr-2 font-semibold" style={{ color: palette.accent }}>{index + 1}.</span>
                  {prompt}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
