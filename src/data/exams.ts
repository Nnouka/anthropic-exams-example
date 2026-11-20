// Topics copied from the official exam guides' content blueprints.
// Foundations: guide effective December 7, 2026. Professional: guide effective November 2026.

export type Domain = { name: string; weight: number; skills: string[] };
export type Exam = {
  id: string;
  title: string;
  code: string;
  effective: string;
  guideUrl: string; // official exam guide PDF, linked from the Partner Academy certifications page
  domains: Domain[];
};

export const exams: Exam[] = [
  {
    id: 'foundations',
    title: 'Claude Certified Developer – Foundations',
    code: 'CCDV-F',
    effective: 'Guide effective December 7, 2026',
    guideUrl:
      'https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946771/Claude_Certified_Developer_-_Foundations_Exam_Guide_Updated_Dec_7.pdf',
    domains: [
      {
        name: 'Agents and Workflows',
        weight: 17,
        skills: [
          'Architecture and Runtime Selection',
          'Agent SDK Construction and Hooks',
          'Agent Pattern Diagnosis',
        ],
      },
      {
        name: 'Applications and Integration',
        weight: 20,
        skills: [
          'Messages API Mechanics',
          'Application Boundary and Surface Behavior',
          'Configuration and SDLC Integration',
          'Integration Resilience',
        ],
      },
      {
        name: 'Claude Code',
        weight: 8,
        skills: ['Claude Code Operation', 'Claude Code Customization and Extension'],
      },
      {
        name: 'Eval, Testing, and Debugging',
        weight: 10,
        skills: ['Evaluation Design', 'Failure-Mode Diagnosis'],
      },
      {
        name: 'Model Selection and Optimization',
        weight: 12,
        skills: [
          'Generation Mechanics and Model Options',
          'Model Tier Selection and Release Planning',
          'Cost Diagnosis and Optimization',
        ],
      },
      {
        name: 'Prompt and Context Engineering',
        weight: 15,
        skills: [
          'Context Management for Long-Running Sessions',
          'Prompt Revision',
          'Structured Output and Defensive Parsing',
          'Grounding and Source Citation',
        ],
      },
      {
        name: 'Security and Safety',
        weight: 8,
        skills: [
          'Prompt Injection and Jailbreak Defense',
          'Deterministic Guardrails and Least Privilege',
          'API Key and Credential Handling',
        ],
      },
      {
        name: 'Tools and MCP',
        weight: 10,
        skills: [
          'Tool Design and Response Shaping',
          'MCP Server Development and Integration',
          'Capability Mechanism Selection',
        ],
      },
    ],
  },
  {
    id: 'professional',
    title: 'Claude Certified Developer – Professional',
    code: 'CCDV-P',
    effective: 'Guide effective November 2026',
    guideUrl:
      'https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794947325/Claude_Certified_Developer-Professional_Exam_Guide.pdf',
    domains: [
      {
        name: 'Advanced Agent Architecture and Orchestration',
        weight: 17,
        skills: [
          'Multi-Agent Orchestration',
          'Durable Execution and State Management',
          'Architecture Selection at Scale',
          'Context and Memory Architecture',
        ],
      },
      {
        name: 'Production Integration, Reliability, and Knowledge Grounding',
        weight: 20,
        skills: [
          'Reliability Engineering for Claude Services',
          'Scale and Throughput Management',
          'Production MCP and Change Management',
          'Retrieval and Knowledge Grounding at Scale',
        ],
      },
      {
        name: 'Observability and Production Monitoring',
        weight: 12,
        skills: [
          'Telemetry and Instrumentation',
          'Production Monitoring and Alerting',
          'Trace Analysis at Scale',
        ],
      },
      {
        name: 'Advanced Debugging and Incident Response',
        weight: 10,
        skills: ['Complex Failure Diagnosis', 'Incident Response and Learning Loops'],
      },
      {
        name: 'Evaluation Engineering and Quality Assurance',
        weight: 12,
        skills: [
          'Evaluation System Design',
          'LLM-as-Judge Engineering',
          'Online Quality Measurement',
        ],
      },
      {
        name: 'Cost and Latency Optimization at Scale',
        weight: 8,
        skills: ['Cost Architecture at Scale', 'Latency Engineering'],
      },
      {
        name: 'Runtime Guardrails and Production Security',
        weight: 11,
        skills: [
          'Runtime Guardrail Systems',
          'Threat Defense and Adversarial Testing for Agentic Systems',
          'Identity, Secrets, and Audit at Scale',
        ],
      },
      {
        name: 'Agent Fleet Operations for Software Delivery',
        weight: 10,
        skills: [
          'Parallel Agent Orchestration for Engineering Work',
          'Verification and AI Code Review Operations',
          'Unattended and Event-Driven Agent Operations',
          'Organization-Wide Coding Agent Configuration',
        ],
      },
    ],
  },
];
