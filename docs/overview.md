# ALEC CARTER 博客项目架构概览

## 核心文件结构

### 页面组件
- `src/pages/home.tsx`: 主页面，包含所有sections

### 组件库
- `src/components/hero-section.tsx`: 英雄区域组件，包含动态图片效果
- `src/components/navigation.tsx`: 顶部导航栏组件
- `src/components/dynamic-image-stack.tsx`: 动态图片堆叠动画组件

### 样式系统
- `src/styles/globals.css`: 全局样式定义
- `tailwind.config.ts`: Tailwind配置，包含自定义颜色和动画

### 静态资源
- `public/images/`: 博客图片资源目录

## 动画架构
- 使用 Framer Motion 实现流畅的图片切换动画
- 每3秒执行一次图片轮播循环
- 5层图片堆叠，创建深度视觉效果

## 当前开发状态
- [x] 项目初始化
- [x] 全局样式配置
- [x] 导航栏组件
- [x] 动态图片堆叠组件
- [x] 英雄区域整合
- [x] 主页面重写