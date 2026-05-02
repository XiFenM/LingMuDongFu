<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { gameHotspots, milestones, posts, profile, projects, skills } from './data/content';

const showPortalModal = ref(false);
const gameActive = ref(false);
const selectedHotspot = ref(gameHotspots[0]);
const copied = ref(false);
const menuOpen = ref(false);
const scrolled = ref(false);
const player = ref({ x: 50, y: 74 });

const leftSkills = computed(() => skills.filter((skill) => skill.side === 'left'));
const rightSkills = computed(() => skills.filter((skill) => skill.side === 'right'));

function openPortal() {
  showPortalModal.value = true;
}

function enterGame() {
  showPortalModal.value = false;
  gameActive.value = true;
  window.history.replaceState(null, '', '#game');
}

function exitGame() {
  gameActive.value = false;
  window.history.replaceState(null, '', window.location.pathname);
}

async function copyEmail() {
  await navigator.clipboard?.writeText(profile.email);
  copied.value = true;
  window.setTimeout(() => {
    copied.value = false;
  }, 1600);
}

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

function onKeydown(event: KeyboardEvent) {
  if (!gameActive.value) return;
  const step = 2.4;
  if (event.key === 'Escape') exitGame();
  if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') player.value.x = Math.max(12, player.value.x - step);
  if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') player.value.x = Math.min(88, player.value.x + step);
  if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') player.value.y = Math.max(16, player.value.y - step);
  if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') player.value.y = Math.min(84, player.value.y + step);
  if (event.key.toLowerCase() === 'e' || event.key === ' ') {
    const nearest = gameHotspots
      .map((hotspot) => ({
        hotspot,
        distance: Math.hypot(hotspot.x - player.value.x, hotspot.y - player.value.y),
      }))
      .sort((a, b) => a.distance - b.distance)[0];
    if (nearest.distance < 16) selectedHotspot.value = nearest.hotspot;
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll);
  window.addEventListener('keydown', onKeydown);
  if (window.location.hash === '#game') gameActive.value = true;
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <div class="app-shell">
    <header class="header-nav" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
      <a class="brand" href="#top" aria-label="回到首页">
        <span class="logo-mark">LYDT</span>
        <span class="brand-text">灵木洞天</span>
      </a>
      <button class="menu-toggle" type="button" aria-label="打开导航" @click="menuOpen = !menuOpen">
        <span></span>
        <span></span>
      </button>
      <nav class="nav-links" aria-label="主导航">
        <a href="#about" @click="menuOpen = false">关于</a>
        <a href="#skills" @click="menuOpen = false">技能</a>
        <a href="#projects" @click="menuOpen = false">项目</a>
        <a href="#blog" @click="menuOpen = false">博客</a>
        <a href="#contact" @click="menuOpen = false">联系</a>
      </nav>
      <div class="nav-actions">
        <a :href="profile.github" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a>
        <a :href="profile.linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        <a class="resume-button" href="#contact">简历</a>
      </div>
    </header>

    <main id="top">
      <section class="hero-section" aria-labelledby="hero-title">
        <div class="hero-bg" role="img" aria-label="灵木洞天树心洞府主视觉"></div>
        <div class="mist-layer"></div>
        <p class="vertical-charm">灵木无形 · 洞天自有须弥</p>
        <div class="hero-content">
          <p class="eyebrow">LINGMU DONGTIAN</p>
          <h1 id="hero-title">{{ profile.nameCn }} / {{ profile.nameEn }}</h1>
          <p class="hero-role">{{ profile.role }}</p>
          <p class="hero-intro">{{ profile.intro }}</p>
          <div class="tag-row">
            <span>PyTorch Internals</span>
            <span>CUDA</span>
            <span>Distributed Training</span>
          </div>
          <div class="hero-actions">
            <a class="button primary" href="#projects">查看项目</a>
            <a class="button secondary" href="#blog">阅读博客</a>
          </div>
        </div>
        <button class="portal-firefly" type="button" @click="openPortal">
          <span class="firefly-core"></span>
          <span class="portal-tip">这只灵萤似乎想带你去哪里</span>
        </button>
      </section>

      <section id="about" class="section">
        <div class="section-heading">
          <p>ABOUT ME</p>
          <h2>关于我</h2>
        </div>
        <div class="about-grid">
          <article class="card dark intro-card">
            <span class="emblem">木</span>
            <p>
              专注于 AI 基础设施和大模型系统方向，深入底层框架实现、GPU 并行与分布式训练。
              我相信优秀的工程设计来自可观察、可复现、可扩展的系统结构。
            </p>
          </article>
          <article class="card dark">
            <h3>我的专注</h3>
            <p>AI 框架内核、GPU 计算引擎、分布式训练系统、并行计算与性能优化、检索分析。</p>
          </article>
          <article class="card dark trait-card">
            <h3>我的特质</h3>
            <span>底层思考</span>
            <span>性能优化</span>
            <span>工程落地</span>
          </article>
        </div>
      </section>

      <section id="skills" class="section skill-section">
        <div class="section-heading">
          <p>SKILLS TREE</p>
          <h2>灵木技能树</h2>
        </div>
        <div class="skill-tree">
          <div class="skill-column">
            <article v-for="skill in leftSkills" :key="skill.id" class="skill-card card dark">
              <h3>{{ skill.title }}</h3>
              <p>{{ skill.note }}</p>
              <div class="skill-list">
                <span v-for="item in skill.skills" :key="item">{{ item }}</span>
              </div>
            </article>
          </div>
          <div class="tree-trunk" aria-hidden="true">
            <div class="trunk-logo">LYDT</div>
          </div>
          <div class="skill-column">
            <article v-for="skill in rightSkills" :key="skill.id" class="skill-card card dark">
              <h3>{{ skill.title }}</h3>
              <p>{{ skill.note }}</p>
              <div class="skill-list">
                <span v-for="item in skill.skills" :key="item">{{ item }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="projects" class="section">
        <div class="section-heading section-heading-row">
          <div>
            <p>FEATURED PROJECTS</p>
            <h2>精选项目</h2>
          </div>
          <a href="#projects">查看全部 →</a>
        </div>
        <div class="project-grid">
          <article v-for="(project, index) in projects" :key="project.id" class="project-card card paper">
            <span class="project-ribbon">其{{ ['一', '二', '三'][index] }}</span>
            <p class="project-type">{{ project.type }}</p>
            <h3>{{ project.title }}</h3>
            <p>{{ project.summary }}</p>
            <div class="tag-row paper-tags">
              <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>
            <strong>{{ project.metric }}</strong>
            <div class="card-actions">
              <a class="button paper-button" :href="project.links.detail">详情</a>
              <a class="button paper-ghost" :href="project.links.github" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </article>
        </div>
      </section>

      <section class="section timeline-section">
        <div class="section-heading">
          <p>TIMELINE</p>
          <h2>年轮时间线</h2>
        </div>
        <div class="timeline-layout">
          <div class="timeline-disc" role="img" aria-label="统一大年轮盘时间线">
            <img src="/assets/timeline-ring-disc.png" alt="" />
            <span class="disc-center">LYDT</span>
            <button
              v-for="milestone in milestones"
              :key="milestone.year"
              class="ring-marker"
              type="button"
              :style="{ left: `${milestone.x}%`, top: `${milestone.y}%` }"
              :aria-label="`${milestone.year} ${milestone.title}`"
            ></button>
          </div>
          <div class="milestone-list">
            <article v-for="milestone in milestones" :key="milestone.year" class="milestone">
              <strong>{{ milestone.year }}</strong>
              <h3>{{ milestone.title }}</h3>
              <p>{{ milestone.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="blog" class="section">
        <div class="section-heading section-heading-row">
          <div>
            <p>LATEST ARTICLES</p>
            <h2>最新技闻</h2>
          </div>
          <a href="#blog">查看全部 →</a>
        </div>
        <div class="blog-grid">
          <article v-for="post in posts" :key="post.title" class="blog-card card paper">
            <div class="ink-painting" aria-hidden="true"></div>
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <footer>
              <time>{{ post.date }}</time>
              <span>{{ post.category }}</span>
            </footer>
          </article>
        </div>
      </section>

      <section id="contact" class="section contact-section">
        <div class="contact-bg" role="img" aria-label="月窗茶室联系背景"></div>
        <div class="section-heading">
          <p>CONTACT</p>
          <h2>月窗茶室</h2>
          <span>欢迎交流 AI 框架、GPU 优化和工程合作。</span>
        </div>
        <div class="contact-grid">
          <button class="contact-card" type="button" @click="copyEmail">
            <span>✉</span>
            <strong>Email</strong>
            <small>{{ copied ? '已复制邮箱' : profile.email }}</small>
          </button>
          <a class="contact-card" :href="profile.github" target="_blank" rel="noreferrer">
            <span>GH</span>
            <strong>GitHub</strong>
            <small>github.com/yinjieshen</small>
          </a>
          <a class="contact-card" :href="profile.linkedin" target="_blank" rel="noreferrer">
            <span>in</span>
            <strong>LinkedIn</strong>
            <small>linkedin.com/in/yinjieshen</small>
          </a>
          <a class="contact-card resume-card" href="#contact">
            <span>▤</span>
            <strong>下载简历</strong>
            <small>PDF · 中文 / 英文</small>
          </a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <a class="brand" href="#top">
        <span class="logo-mark small">LYDT</span>
        <span class="brand-text">灵木洞天</span>
      </a>
      <p>© 2025 {{ profile.nameEn }}. All rights reserved.</p>
      <nav>
        <a href="#about">关于</a>
        <a href="#skills">技能</a>
        <a href="#projects">项目</a>
        <a href="#blog">博客</a>
        <a href="#contact">联系</a>
      </nav>
      <button class="footer-portal" type="button" @click="openPortal">树心深处，似乎还有一扇微微发光的小门。</button>
    </footer>

    <div v-if="showPortalModal" class="modal-backdrop" @click.self="showPortalModal = false">
      <section class="portal-modal" role="dialog" aria-modal="true" aria-labelledby="portal-title">
        <p class="eyebrow">HIDDEN PORTAL</p>
        <h2 id="portal-title">进入灵木洞天？</h2>
        <p>这是一个隐藏的 2D 探索彩蛋。你可以在树屋房间中查看项目、技能和笔记，也可以随时返回常规主页。</p>
        <div class="modal-actions">
          <button class="button primary" type="button" @click="enterGame">进入洞天</button>
          <button class="button secondary" type="button" @click="showPortalModal = false">还是看看主页</button>
        </div>
      </section>
    </div>

    <section v-if="gameActive" class="game-layer" aria-label="灵木洞天 2D 探索彩蛋">
      <div class="game-toolbar">
        <strong>灵木洞天</strong>
        <span>WASD / 方向键移动 · E 或 Space 交互 · Esc 返回</span>
        <button class="button secondary" type="button" @click="exitGame">返回主页</button>
      </div>
      <div class="game-board">
        <img src="/assets/game-map.png" alt="灵木洞天顶视角探索地图" />
        <button
          v-for="hotspot in gameHotspots"
          :key="hotspot.id"
          class="hotspot"
          type="button"
          :style="{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }"
          @click="selectedHotspot = hotspot"
        >
          {{ hotspot.label }}
        </button>
        <span class="player-orb" :style="{ left: `${player.x}%`, top: `${player.y}%` }"></span>
      </div>
      <aside class="game-panel">
        <p class="eyebrow">{{ selectedHotspot.label }}</p>
        <h2>{{ selectedHotspot.room }}</h2>
        <p>{{ selectedHotspot.detail }}</p>
        <small>{{ selectedHotspot.action }}</small>
      </aside>
    </section>
  </div>
</template>
