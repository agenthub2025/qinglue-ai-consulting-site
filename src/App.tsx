import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  Clock3,
  Compass,
  LineChart,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

const navItems = [
  { label: "服务", id: "services" },
  { label: "方案", id: "solutions" },
  { label: "诊断", id: "diagnostic" },
  { label: "方法", id: "method" },
  { label: "联系", id: "contact" },
];

const scenarios = [
  {
    label: "洞察扫描",
    title: "发现真正值得 AI 化的业务断点",
    detail: "用行业、经营、流程与数据四层扫描，锁定最短路径的价值场景。",
    rgb: "33, 87, 255",
  },
  {
    label: "战略重构",
    title: "把 AI 能力嵌入战略与组织节奏",
    detail: "从场景优先级、模型路线、组织分工到治理边界，形成可执行蓝图。",
    rgb: "25, 183, 162",
  },
  {
    label: "增长执行",
    title: "将试点系统化为持续进化的增长闭环",
    detail: "围绕营收、效率与决策质量，搭建可复盘、可迭代的运营仪表盘。",
    rgb: "240, 166, 56",
  },
];

const metrics = [
  { value: 12, suffix: "周", label: "从诊断到首个可运行闭环" },
  { value: 30, suffix: "+", label: "高价值 AI 场景拆解模板" },
  { value: 3, suffix: "层", label: "业务、数据、治理同步设计" },
];

const services: Array<{
  icon: LucideIcon;
  title: string;
  summary: string;
  deliverables: string[];
}> = [
  {
    icon: BrainCircuit,
    title: "AI 引擎洞察",
    summary: "识别企业现有数据、流程与决策链条里的 AI 杠杆点。",
    deliverables: ["AI 场景雷达", "数据可用性地图", "投入产出优先级"],
  },
  {
    icon: Compass,
    title: "战略重构工作坊",
    summary: "把大模型能力翻译成可被董事会、业务线与团队执行的战略路径。",
    deliverables: ["战略路线图", "组织协同机制", "90 天试点计划"],
  },
  {
    icon: Workflow,
    title: "智能流程原型",
    summary: "用轻量原型验证自动化、知识库、智能助手与决策系统的真实收益。",
    deliverables: ["MVP 原型", "流程改造蓝图", "人机协同规范"],
  },
  {
    icon: ShieldCheck,
    title: "AI 治理与增长运营",
    summary: "建立模型使用边界、质量评估、复盘机制和持续增长仪表盘。",
    deliverables: ["治理手册", "价值仪表盘", "迭代评审机制"],
  },
];

const solutions = [
  {
    label: "董事会决策",
    headline: "把复杂经营变量压缩成可行动的选择",
    copy: "为高层建立 AI 辅助战略驾驶舱，持续跟踪市场信号、风险假设与资源配置。",
    bars: [78, 62, 88, 54],
    insight: "适合战略周期缩短、外部变量剧烈变化的企业。",
  },
  {
    label: "市场增长",
    headline: "从客户洞察到增长动作，形成快速闭环",
    copy: "整合客户声音、渠道数据与销售线索，让增长团队更快找到可复制打法。",
    bars: [64, 86, 72, 91],
    insight: "适合线索转化、复购、渠道效率需要系统提升的团队。",
  },
  {
    label: "运营提效",
    headline: "把重复判断和跨部门流转交给智能流程",
    copy: "围绕知识检索、工单处理、报告生成和流程审核，降低人工等待与返工。",
    bars: [91, 58, 79, 83],
    insight: "适合流程多、协同重、知识分散的服务型与制造型企业。",
  },
  {
    label: "模型治理",
    headline: "让 AI 被安全、可控、可审计地规模化使用",
    copy: "建立权限、数据、提示词、评估和审计机制，避免试点成功但无法推广。",
    bars: [57, 80, 67, 93],
    insight: "适合已开始使用大模型、但缺少统一标准和风险边界的组织。",
  },
];

const processSteps = [
  {
    title: "战略访谈",
    tag: "Week 01",
    detail: "与创始人、高管和关键业务负责人对齐增长目标、组织阻力与优先级。",
  },
  {
    title: "场景建模",
    tag: "Week 02-03",
    detail: "建立场景价值模型，确定 AI 介入点、数据需求、收益指标和风险边界。",
  },
  {
    title: "原型共创",
    tag: "Week 04-08",
    detail: "快速搭建可被业务人员使用的原型，用真实流程验证效率与决策质量。",
  },
  {
    title: "系统落地",
    tag: "Week 09-12",
    detail: "把原型沉淀为流程、仪表盘、角色分工和治理规范，进入持续运营。",
  },
  {
    title: "增长复盘",
    tag: "Always-on",
    detail: "按月复盘收益、风险和新增机会，让 AI 能力跟着业务节奏迭代。",
  },
];

const sliderLabels = [
  { key: "data", label: "数据可用度" },
  { key: "automation", label: "流程可自动化" },
  { key: "speed", label: "业务响应速度" },
  { key: "governance", label: "治理成熟度" },
] as const;

type SliderKey = (typeof sliderLabels)[number]["key"];
type SliderState = Record<SliderKey, number>;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Logo() {
  return (
    <div className="brand-lockup" aria-label="擎略 AI Consulting">
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span className="brand-text">
        <strong>擎略</strong>
        <small>AI Consulting</small>
      </span>
    </div>
  );
}

function MetricCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(value);
      return undefined;
    }

    const animate = (time: number) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / 900, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frame = window.requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="metric-value">
      {display}
      {suffix}
    </span>
  );
}

function IntelligenceCanvas({ active }: { active: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    const pointer = { x: 0.68, y: 0.5, active: false };
    const activeColor = scenarios[active].rgb;

    const seeded = (index: number) => {
      const value = Math.sin(index * 999) * 10000;
      return value - Math.floor(value);
    };

    const nodes = Array.from({ length: 42 }, (_, index) => ({
      x: 0.1 + seeded(index + 1) * 0.82,
      y: 0.12 + seeded(index + 6) * 0.76,
      r: 2 + seeded(index + 11) * 3.6,
      pace: 0.3 + seeded(index + 15) * 0.7,
      phase: seeded(index + 19) * Math.PI * 2,
      type: index % 7,
    }));

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      time += reducedMotion ? 0 : 0.016;
      context.clearRect(0, 0, width, height);

      const lineSpacing = Math.max(72, width / 13);
      context.strokeStyle = "rgba(247,245,239,0.08)";
      context.lineWidth = 1;

      for (let x = -lineSpacing; x < width + lineSpacing; x += lineSpacing) {
        context.beginPath();
        context.moveTo(x + Math.sin(time + x * 0.01) * 4, 0);
        context.lineTo(x + width * 0.16, height);
        context.stroke();
      }

      const positioned = nodes.map((node, index) => {
        const drift = Math.sin(time * node.pace + node.phase) * 0.018;
        const x = (node.x + drift) * width;
        const y = (node.y + Math.cos(time * node.pace + node.phase) * 0.014) * height;
        const pullX = pointer.active ? (pointer.x * width - x) * 0.028 : 0;
        const pullY = pointer.active ? (pointer.y * height - y) * 0.028 : 0;
        return { ...node, x: x + pullX, y: y + pullY, index };
      });

      positioned.forEach((a, index) => {
        for (let next = index + 1; next < positioned.length; next += 1) {
          const b = positioned[next];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 158) {
            const alpha = (1 - distance / 158) * 0.22;
            context.strokeStyle = `rgba(${activeColor}, ${alpha})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.stroke();
          }
        }
      });

      positioned.forEach((node) => {
        const emphasis = node.type === active + 1 ? 1 : 0;
        context.beginPath();
        context.fillStyle = emphasis
          ? `rgba(${activeColor}, 0.95)`
          : "rgba(247,245,239,0.72)";
        context.arc(node.x, node.y, node.r + emphasis * 2, 0, Math.PI * 2);
        context.fill();
        if (emphasis) {
          context.strokeStyle = `rgba(${activeColor}, 0.35)`;
          context.lineWidth = 6;
          context.stroke();
        }
      });

      context.strokeStyle = `rgba(${activeColor}, 0.42)`;
      context.lineWidth = 1.5;
      context.beginPath();
      context.ellipse(pointer.x * width, pointer.y * height, 92, 52, -0.42, 0, Math.PI * 2);
      context.stroke();

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="intelligence-canvas" aria-hidden="true" />;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [activeSolution, setActiveSolution] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [sliders, setSliders] = useState<SliderState>({
    data: 72,
    automation: 58,
    speed: 64,
    governance: 49,
  });
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    contact: "",
    interest: "AI 战略诊断",
    message: "",
  });
  const [formFeedback, setFormFeedback] = useState<{ type: "idle" | "error" | "success"; text: string }>({
    type: "idle",
    text: "",
  });

  useReveal();

  const score = useMemo(() => {
    return Math.round(
      sliders.data * 0.31 +
        sliders.automation * 0.27 +
        sliders.speed * 0.21 +
        sliders.governance * 0.21
    );
  }, [sliders]);

  const maturity = useMemo(() => {
    if (score >= 78) return { label: "规模增长期", copy: "适合建立跨部门 AI 运营中台，把试点收益复制到更多业务线。" };
    if (score >= 58) return { label: "系统试点期", copy: "适合选择 2-3 个高价值场景，快速做可衡量的原型验证。" };
    return { label: "基础唤醒期", copy: "建议先梳理数据资产、流程断点和组织角色，形成清晰试点边界。" };
  }, [score]);

  const radarPoints = useMemo(() => {
    const values = sliderLabels.map(({ key }) => sliders[key]);
    return values
      .map((value, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
        const radius = 18 + (value / 100) * 72;
        const x = 100 + Math.cos(angle) * radius;
        const y = 100 + Math.sin(angle) * radius;
        return `${x},${y}`;
      })
      .join(" ");
  }, [sliders]);

  const activeServiceItem = services[activeService];
  const ActiveServiceIcon = activeServiceItem.icon;
  const activeSolutionItem = solutions[activeSolution];

  const handleSlider = (key: SliderKey, value: number) => {
    setSliders((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.contact.trim()) {
      setFormFeedback({ type: "error", text: "请留下姓名和联系方式，方便擎略团队确认沟通时间。" });
      return;
    }

    setFormFeedback({
      type: "success",
      text: "已记录预约意向。页面演示环境未连接后台，后续可接入表单服务或企业微信。",
    });
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <header className="site-header">
        <Logo />
        <nav className="desktop-nav" aria-label="主导航">
          {navItems.map((item) => (
            <button key={item.id} type="button" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="ghost-button small" type="button" onClick={() => scrollToSection("diagnostic")}>
            <Sparkles size={17} aria-hidden="true" />
            AI 诊断
          </button>
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={menuOpen ? "关闭导航" : "打开导航"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="移动导航">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                scrollToSection(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          ))}
        </nav>
      </header>

      <main id="main">
        <section className="hero-section" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src={`${import.meta.env.BASE_URL}assets/qinglue-ai-strategy-hero.png`}
            alt=""
            aria-hidden="true"
          />
          <IntelligenceCanvas active={activeScenario} />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">QingLue AI Consulting · Elevate & Strategy</p>
            <h1 id="hero-title">擎略 AI Consulting</h1>
            <p className="hero-claim">擎动 AI 引擎，重构商业战略</p>
            <p className="hero-copy">
              擎略把大模型能力、数据洞察和管理咨询合成一套可落地的增长操作系统，
              帮企业从“尝试 AI”走向“用 AI 改变决策、效率与收入结构”。
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => scrollToSection("contact")}>
                预约策略工作坊
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button className="secondary-button" type="button" onClick={() => scrollToSection("solutions")}>
                查看解决方案
                <LineChart size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="scenario-switcher" aria-label="战略状态切换">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.label}
                  className={activeScenario === index ? "is-active" : ""}
                  type="button"
                  aria-pressed={activeScenario === index}
                  onClick={() => setActiveScenario(index)}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
            <div className="scenario-note" aria-live="polite">
              <strong>{scenarios[activeScenario].title}</strong>
              <span>{scenarios[activeScenario].detail}</span>
            </div>
          </div>
          <div className="hero-metrics" aria-label="项目关键指标">
            {metrics.map((metric) => (
              <div key={metric.label} className="hero-metric">
                <MetricCounter value={metric.value} suffix={metric.suffix} />
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section intro-band" aria-labelledby="intro-title">
          <div className="section-inner intro-grid">
            <div>
              <p className="section-kicker">Brand Thesis</p>
              <h2 id="intro-title">AI 咨询不止是工具采购，而是重写企业的战略操作系统。</h2>
            </div>
            <p>
              擎略关注的是 AI 进入业务后的真实变化：决策速度是否提升，流程是否缩短，
              组织是否愿意使用，价值是否被连续追踪。我们用咨询方法定义方向，用原型验证收益，
              用治理机制帮助企业规模化。
            </p>
          </div>
        </section>

        <section id="services" className="section services-section" aria-labelledby="services-title">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Services</p>
              <h2 id="services-title">从洞察到增长的 AI 战略服务</h2>
              <p>每个模块都可以独立启动，也可以组合成 12 周的 AI 增长闭环项目。</p>
            </div>

            <div className="services-layout" data-reveal>
              <div className="service-list" role="list" aria-label="服务列表">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.title}
                      className={`service-card ${activeService === index ? "is-active" : ""}`}
                      type="button"
                      role="listitem"
                      aria-pressed={activeService === index}
                      onClick={() => setActiveService(index)}
                    >
                      <Icon size={25} aria-hidden="true" />
                      <span>
                        <strong>{service.title}</strong>
                        <small>{service.summary}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <article className="service-detail">
                <div className="service-detail-head">
                  <ActiveServiceIcon size={36} aria-hidden="true" />
                  <div>
                    <p className="section-kicker">Selected Module</p>
                    <h3>{activeServiceItem.title}</h3>
                  </div>
                </div>
                <p>{activeServiceItem.summary}</p>
                <div className="deliverable-grid">
                  {activeServiceItem.deliverables.map((item) => (
                    <span key={item}>
                      <CheckCircle2 size={17} aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="solutions" className="section solutions-section" aria-labelledby="solutions-title">
          <div className="section-inner">
            <div className="section-heading light" data-reveal>
              <p className="section-kicker">Solution Cockpit</p>
              <h2 id="solutions-title">把 AI 放进业务场景，而不是停在演示现场</h2>
              <p>选择一个业务视角，查看对应的价值曲线、落地重点和组织收益。</p>
            </div>

            <div className="solution-tabs" role="tablist" aria-label="解决方案">
              {solutions.map((solution, index) => (
                <button
                  key={solution.label}
                  id={`solution-tab-${index}`}
                  className={activeSolution === index ? "is-active" : ""}
                  type="button"
                  role="tab"
                  aria-selected={activeSolution === index}
                  aria-controls="solution-panel"
                  onClick={() => setActiveSolution(index)}
                >
                  {solution.label}
                </button>
              ))}
            </div>

            <div
              id="solution-panel"
              className="solution-panel"
              role="tabpanel"
              aria-labelledby={`solution-tab-${activeSolution}`}
              data-reveal
            >
              <div className="solution-copy">
                <p className="section-kicker">Active Scenario</p>
                <h3>{activeSolutionItem.headline}</h3>
                <p>{activeSolutionItem.copy}</p>
                <div className="insight-line">
                  <Target size={19} aria-hidden="true" />
                  {activeSolutionItem.insight}
                </div>
              </div>
              <div className="chart-panel" aria-label={`${activeSolutionItem.label}价值曲线`}>
                {activeSolutionItem.bars.map((bar, index) => (
                  <span key={`${activeSolutionItem.label}-${index}`} style={{ height: `${bar}%` }}>
                    <i>{bar}</i>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="diagnostic" className="section diagnostic-section" aria-labelledby="diagnostic-title">
          <div className="section-inner diagnostic-grid">
            <div className="diagnostic-copy" data-reveal>
              <p className="section-kicker">AI Readiness</p>
              <h2 id="diagnostic-title">AI 成熟度诊断器</h2>
              <p>
                企业的 AI 成熟度不是单一技术分数，而是数据、流程、响应速度与治理能力的组合。
                擎略用这四个维度判断最适合的启动方式。
              </p>
              <div className="score-output" aria-live="polite">
                <span>{score}</span>
                <div>
                  <strong>{maturity.label}</strong>
                  <p>{maturity.copy}</p>
                </div>
              </div>
            </div>

            <div className="diagnostic-panel" data-reveal>
              <div className="radar-wrap" aria-hidden="true">
                <svg viewBox="0 0 200 200" role="img">
                  <polygon className="radar-grid" points="100,18 182,100 100,182 18,100" />
                  <polygon className="radar-grid small" points="100,48 152,100 100,152 48,100" />
                  <line x1="100" y1="18" x2="100" y2="182" />
                  <line x1="18" y1="100" x2="182" y2="100" />
                  <polygon className="radar-value" points={radarPoints} />
                </svg>
              </div>
              <div className="slider-stack">
                {sliderLabels.map(({ key, label }) => (
                  <label key={key} className="range-field">
                    <span>
                      {label}
                      <strong>{sliders[key]}</strong>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliders[key]}
                      onChange={(event) => handleSlider(key, Number(event.target.value))}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="method" className="section method-section" aria-labelledby="method-title">
          <div className="section-inner">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Method</p>
              <h2 id="method-title">擎略五步落地法</h2>
              <p>少做一次性演示，多做可被组织接住、可被经营复盘的系统。</p>
            </div>
            <div className="method-layout" data-reveal>
              <div className="step-rail" role="list" aria-label="落地步骤">
                {processSteps.map((step, index) => (
                  <button
                    key={step.title}
                    className={activeStep === index ? "is-active" : ""}
                    type="button"
                    role="listitem"
                    aria-pressed={activeStep === index}
                    onClick={() => setActiveStep(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {step.title}
                  </button>
                ))}
              </div>
              <article className="step-detail">
                <div className="step-tag">
                  <Clock3 size={18} aria-hidden="true" />
                  {processSteps[activeStep].tag}
                </div>
                <h3>{processSteps[activeStep].title}</h3>
                <p>{processSteps[activeStep].detail}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section proof-section" aria-labelledby="proof-title">
          <div className="section-inner proof-grid" data-reveal>
            <div>
              <p className="section-kicker">Outcomes</p>
              <h2 id="proof-title">让 AI 项目从“亮眼展示”走向“经营结果”</h2>
            </div>
            <div className="proof-items">
              <article>
                <Zap size={24} aria-hidden="true" />
                <strong>决策提速</strong>
                <span>把散落数据转化为经营假设与优先级判断。</span>
              </article>
              <article>
                <CircuitBoard size={24} aria-hidden="true" />
                <strong>流程重构</strong>
                <span>用智能助手、知识库和自动化减少重复判断。</span>
              </article>
              <article>
                <BarChart3 size={24} aria-hidden="true" />
                <strong>价值追踪</strong>
                <span>让收益、风险、使用率和迭代节奏被持续看见。</span>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section" aria-labelledby="contact-title">
          <div className="section-inner contact-grid">
            <div className="contact-copy" data-reveal>
              <p className="section-kicker">Start</p>
              <h2 id="contact-title">预约一次 AI 战略工作坊</h2>
              <p>
                留下你的业务背景，擎略可以从一个高价值场景开始，帮助团队判断
                AI 应该先解决什么、如何验证收益、如何进入规模化。
              </p>
              <div className="contact-signal">
                <MessageCircle size={20} aria-hidden="true" />
                <span>建议准备：当前业务目标、主要流程瓶颈、已有数据和正在尝试的 AI 工具。</span>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} data-reveal>
              <div className="form-row">
                <label>
                  姓名
                  <input
                    value={formState.name}
                    onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                    autoComplete="name"
                  />
                </label>
                <label>
                  公司
                  <input
                    value={formState.company}
                    onChange={(event) => setFormState({ ...formState, company: event.target.value })}
                    autoComplete="organization"
                  />
                </label>
              </div>
              <label>
                联系方式
                <input
                  value={formState.contact}
                  onChange={(event) => setFormState({ ...formState, contact: event.target.value })}
                  autoComplete="tel"
                />
              </label>
              <label>
                关注方向
                <select
                  value={formState.interest}
                  onChange={(event) => setFormState({ ...formState, interest: event.target.value })}
                >
                  <option>AI 战略诊断</option>
                  <option>业务流程自动化</option>
                  <option>增长与客户洞察</option>
                  <option>AI 治理与组织落地</option>
                </select>
              </label>
              <label>
                业务背景
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                />
              </label>
              <button className="primary-button full" type="submit">
                提交预约
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <p className={`form-feedback ${formFeedback.type}`} aria-live="polite">
                {formFeedback.text}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Logo />
        <p>擎略 AI Consulting · Elevate & Strategy</p>
        <button className="ghost-button small" type="button" onClick={() => scrollToSection("contact")}>
          联系擎略
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </footer>
    </div>
  );
}

export default App;
