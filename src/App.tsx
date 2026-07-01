import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Clock,
  Compass,
  Factory,
  LineChart,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  UsersRound,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "服务", id: "services" },
  { label: "方法", id: "about" },
  { label: "现场", id: "field" },
  { label: "联系", id: "contact" },
];

const services: Array<{
  icon: LucideIcon;
  title: string;
  summary: string;
  detail: string;
  image: string;
  accent: "orange" | "dark";
}> = [
  {
    icon: BrainCircuit,
    title: "AI 引擎洞察",
    summary: "识别企业现有数据、流程与决策链条里的 AI 杠杆点。",
    detail: "AI 场景雷达 / 数据可用性地图 / 投入产出优先级",
    image: "qinglue-ai-dashboard-visual.png",
    accent: "orange",
  },
  {
    icon: Compass,
    title: "战略重构工作坊",
    summary: "把大模型能力翻译成可被董事会、业务线与团队执行的战略路径。",
    detail: "战略路线图 / 组织协同机制 / 90 天试点计划",
    image: "qinglue-consulting-workshop.png",
    accent: "dark",
  },
  {
    icon: Workflow,
    title: "智能流程原型",
    summary: "用轻量原型验证自动化、知识库、智能助手与决策系统的真实收益。",
    detail: "MVP 原型 / 流程改造蓝图 / 人机协同规范",
    image: "qinglue-smart-factory-consulting.png",
    accent: "dark",
  },
  {
    icon: ShieldCheck,
    title: "AI 治理与增长运营",
    summary: "建立模型使用边界、质量评估、复盘机制和持续增长仪表盘。",
    detail: "治理手册 / 价值仪表盘 / 迭代评审机制",
    image: "qinglue-factory-command-center.png",
    accent: "orange",
  },
];

const stats = [
  { value: "12周", label: "从诊断到首个可运行闭环" },
  { value: "30+", label: "高价值 AI 场景拆解模板" },
  { value: "3层", label: "业务、数据、治理同步设计" },
];

const fieldPoints = [
  { icon: Factory, title: "制造现场", copy: "把 AI 场景放进真实产线、设备、工单和质量数据里验证。" },
  { icon: UsersRound, title: "顾问共创", copy: "与管理层和一线负责人共同定义收益、阻力和落地节奏。" },
  { icon: LineChart, title: "增长闭环", copy: "用可追踪指标把试点收益沉淀为持续运营机制。" },
];

const contactItems = [
  { icon: Mail, label: "邮箱", value: "hello@qinglue.ai", href: "mailto:hello@qinglue.ai" },
  { icon: CalendarDays, label: "预约", value: "AI 战略工作坊 / 诊断电话", href: "mailto:hello@qinglue.ai?subject=预约擎略 AI 战略工作坊" },
  { icon: MapPin, label: "服务", value: "全国远程协同 + 重点项目驻场", href: null },
  { icon: Clock, label: "响应", value: "1 个工作日内完成初步沟通", href: null },
];

const ShaderBackdrop = lazy(async () => {
  const { ChromaFlow, FilmGrain, FlutedGlass, Shader, Swirl } = await import("shaders/react");

  return {
    default: function ShaderBackdropComponent() {
      return (
        <Shader className="shader-canvas" colorSpace="srgb" toneMapping="neutral" disableTelemetry>
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} speed={1} blend={50} />
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
            intensity={1}
            opacity={0.7}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} animated />
        </Shader>
      );
    },
  };
});

function asset(name: string) {
  return `${import.meta.env.BASE_URL}assets/${name}`;
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useShanghaiTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("zh-CN", {
          timeZone: "Asia/Shanghai",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23",
        }).format(new Date())
      );
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function TextRoll({ children }: { children: string }) {
  return (
    <span className="text-roll" aria-hidden="true">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
}

function ActionButton({
  children,
  variant = "orange",
  onClick,
}: {
  children: string;
  variant?: "orange" | "dark" | "light";
  onClick?: () => void;
}) {
  return (
    <button className={`roll-button ${variant}`} type="button" onClick={onClick}>
      <span className="sr-only">{children}</span>
      <TextRoll>{children}</TextRoll>
      <span className="button-orb" aria-hidden="true">
        <ArrowRight size={16} />
      </span>
    </button>
  );
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

function MobileMenu({
  open,
  close,
  time,
}: {
  open: boolean;
  close: () => void;
  time: string;
}) {
  return (
    <div className={`mobile-sheet-wrap ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button className="mobile-backdrop" type="button" aria-label="关闭导航" onClick={close} />
      <div className="mobile-sheet">
        <div className="sheet-time">
          <Clock size={14} />
          {time} 上海时间
        </div>
        <nav aria-label="移动导航">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                scrollToSection(item.id);
                close();
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <ActionButton variant="orange" onClick={() => scrollToSection("contact")}>
          预约工作坊
        </ActionButton>
      </div>
    </div>
  );
}

function ShaderField() {
  return (
    <div className="shader-field" aria-hidden="true">
      <div className="shader-fallback" />
      <Suspense fallback={null}>
        <ShaderBackdrop />
      </Suspense>
    </div>
  );
}

function PartnerMark() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
    </svg>
  );
}

function StrategyPanel({ imageUrl }: { imageUrl: string }) {
  return (
    <div
      className="strategy-panel"
      style={{
        backgroundImage: `linear-gradient(145deg, rgba(255, 255, 255, 0.66), rgba(255, 255, 255, 0.22)), url("${imageUrl}")`,
      }}
      aria-hidden="true"
    >
      <div className="panel-topline">
        <span>AI Strategy Map</span>
        <span>QingLue</span>
      </div>
      <div className="panel-orbit">
        <span />
        <span />
        <span />
      </div>
      <div className="panel-grid">
        {stats.map((item) => (
          <span key={item.label}>
            <strong>{item.value}</strong>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ImageFigure({
  className,
  src,
  alt,
  label,
  caption,
}: {
  className: string;
  src: string;
  alt: string;
  label: string;
  caption: string;
}) {
  return (
    <figure className={`image-card ${className}`}>
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>
        <strong>{label}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useShanghaiTime();
  const dashboardImage = asset("qinglue-ai-dashboard-visual.png");
  const workshopImage = asset("qinglue-consulting-workshop.png");
  const factoryImage = asset("qinglue-smart-factory-consulting.png");
  const commandImage = asset("qinglue-factory-command-center.png");

  const navButtons = useMemo(
    () =>
      navItems.map((item) => (
        <button key={item.label} type="button" onClick={() => scrollToSection(item.id)}>
          {item.label}
        </button>
      )),
    []
  );

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>

      <main id="main">
        <header className="site-header">
          <div className="nav-pill">
            <Logo />
            <nav className="desktop-nav" aria-label="主导航">
              {navButtons}
            </nav>
            <div className="header-actions">
              <span className="availability">开放 Q1 AI 战略项目</span>
              <span className="time-badge">
                <Clock size={14} />
                {time} 上海
              </span>
              <ActionButton variant="dark" onClick={() => scrollToSection("contact")}>
                预约策略电话
              </ActionButton>
              <button
                className="menu-toggle"
                type="button"
                aria-label={menuOpen ? "关闭导航" : "打开导航"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((value) => !value)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                <span>{menuOpen ? "Close" : "Menu"}</span>
              </button>
            </div>
          </div>
        </header>

        <MobileMenu open={menuOpen} close={() => setMenuOpen(false)} time={time} />

        <section className="hero-section" aria-labelledby="hero-title">
          <ShaderField />

          <div className="hero-content">
            <div className="hero-copy-block">
              <p className="hero-label">QingLue AI Consulting</p>
              <h1 id="hero-title">
                擎动 AI 引擎
                <br className="desktop-break" />
                <span className="mobile-space"> </span>
                重构商业战略
                <br className="desktop-break" />
                <span className="mobile-space"> </span>
                让增长持续进化。
              </h1>
              <p className="hero-subcopy">
                擎略把大模型能力、数据洞察和管理咨询合成一套可落地的增长操作系统，
                帮企业从“尝试 AI”走向“用 AI 改变决策、效率与收入结构”。
              </p>
              <div className="hero-actions">
                <ActionButton variant="orange" onClick={() => scrollToSection("contact")}>
                  预约策略工作坊
                </ActionButton>
                <button className="partner-badge" type="button" onClick={() => scrollToSection("field")}>
                  <PartnerMark />
                  <span>Elevate & Strategy</span>
                  <strong>AI 引擎</strong>
                </button>
              </div>
            </div>
            <StrategyPanel imageUrl={dashboardImage} />
          </div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="container">
            <div className="badge-row">
              <span className="number-badge">1</span>
              <span className="pill-label">Introducing QingLue</span>
            </div>
            <h2 id="about-title">
              AI 咨询不止是工具采购，
              <br />
              而是重写企业的战略操作系统。
            </h2>
            <div className="about-grid">
              <ImageFigure
                className="small"
                src={factoryImage}
                alt="擎略顾问在智能制造工厂现场与负责人查看数据"
                label="走进现场"
                caption="从产线、流程与人员协作里找到真实断点"
              />
              <div className="about-copy">
                <p>
                  擎略关注的是 AI 进入业务后的真实变化：决策速度是否提升，流程是否缩短，
                  组织是否愿意使用，价值是否被连续追踪。
                </p>
                <p>
                  我们用咨询方法定义方向，用原型验证收益，用治理机制帮助企业规模化，
                  让 AI 项目从演示走到日常经营。
                </p>
                <ActionButton variant="orange" onClick={() => scrollToSection("services")}>
                  查看服务模块
                </ActionButton>
              </div>
              <ImageFigure
                className="large"
                src={workshopImage}
                alt="擎略 AI 咨询顾问与企业团队共创战略路线图"
                label="顾问共创"
                caption="把战略目标、数据条件和组织节奏放在同一张路线图上"
              />
            </div>
          </div>
        </section>

        <section id="field" className="field-section" aria-labelledby="field-title">
          <div className="container field-layout">
            <div className="field-copy">
              <div className="badge-row">
                <span className="number-badge">2</span>
                <span className="pill-label">Factory intelligence</span>
              </div>
              <h2 id="field-title">面向厂家和实体业务的 AI 转型现场。</h2>
              <p>
                对制造、供应链、渠道和服务型企业来说，AI 不是一个独立系统，
                而是嵌入订单、排产、质量、知识和客户响应的经营能力。
              </p>
              <div className="field-points">
                {fieldPoints.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title}>
                      <Icon size={20} />
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.copy}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
            <figure className="field-visual">
              <img src={commandImage} alt="擎略团队在制造运营中心复盘 AI 运营数据" loading="lazy" />
              <figcaption>
                <strong>Manufacturing AI Ops</strong>
                <span>从单点试点到多部门协同运营</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="services" className="work-section" aria-labelledby="services-title">
          <div className="container">
            <div className="badge-row">
              <span className="number-badge">3</span>
              <span className="pill-label">AI strategy modules</span>
            </div>
            <h2 id="services-title">从洞察到增长的 AI 战略服务</h2>
            <div className="cards-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article className={`work-card ${service.accent}`} key={service.title}>
                    <div className="card-visual">
                      <img src={asset(service.image)} alt="" loading="lazy" />
                      <div className="card-scrim" />
                      <Icon size={34} />
                      <button className="hover-expand" type="button" aria-label={`了解${service.title}`}>
                        <span>{index % 2 === 0 ? "Learn more" : "View module"}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                    <p>{service.summary}</p>
                    <h3>{service.title}</h3>
                    <div className="deliverable-line">
                      <CheckCircle2 size={16} />
                      {service.detail}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact-panel">
              <div className="contact-intro">
                <div className="badge-row">
                  <span className="number-badge">4</span>
                  <span className="pill-label">Start</span>
                </div>
                <h2 id="contact-title">预约一次 AI 战略工作坊</h2>
                <p>
                  建议准备：当前业务目标、主要流程瓶颈、已有数据和正在尝试的 AI 工具。
                  擎略会先帮你判断“哪些场景值得做、如何做、怎么衡量”。
                </p>
                <ActionButton variant="orange" onClick={() => window.open("mailto:hello@qinglue.ai?subject=预约擎略 AI 战略工作坊", "_self")}>
                  联系擎略
                </ActionButton>
              </div>
              <div className="contact-grid">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <Icon size={20} />
                      <span>
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </span>
                    </>
                  );

                  return item.href ? (
                    <a className="contact-item" href={item.href} key={item.label}>
                      {content}
                    </a>
                  ) : (
                    <div className="contact-item" key={item.label}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
            <footer className="site-footer">
              <Logo />
              <span>Elevate & Strategy · AI engine for strategic growth</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
