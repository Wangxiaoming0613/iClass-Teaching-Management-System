// 侧边栏折叠
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-sidebar');
const iframeContainer = document.getElementById('iframe-container');
const breadcrumbContainer = document.getElementById('breadcrumb-container');
const tagsContainer = document.getElementById('tags-view-container');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const userMenu = document.getElementById('user-menu');
const userMenuDropdown = document.getElementById('user-menu-dropdown');

// 侧边栏状态
let isCollapsed = false;

// 页面标签状态
let openTags = [];
// 格式: { title: '首页', path: 'pages/dashboard.html', active: true }

// 页面配置 (用于面包屑和标签)
const pageConfig = {
    'pages/dashboard.html': { title: '首页' },
    'pages/data-display.html': { title: '数据展示' },
    'pages/organization-management.html': { title: '组织管理' },
    'pages/course-management.html': { title: '课程管理' },
    'pages/schedule.html': { title: '排课管理' },
    'pages/semester.html': { title: '学期管理' },
    'pages/user/teacher.html': { title: '教师管理', parent: '用户管理' },
    'pages/user/student.html': { title: '学生管理', parent: '用户管理' },
    'pages/ai/course.html': { title: 'AI课程', parent: 'AI管理' },
    'pages/ai/knowledge.html': { title: '知识库管理', parent: 'AI管理' },
    'pages/system.html': { title: '系统管理' }
};

// 1. 侧边栏交互逻辑
toggleBtn.addEventListener('click', () => {
    isCollapsed = !isCollapsed;
    updateSidebarState();
});

function updateSidebarState() {
    if (isCollapsed) {
        sidebar.classList.add('sidebar-collapsed');
    } else {
        sidebar.classList.remove('sidebar-collapsed');
    }
}

// 子菜单切换
window.toggleSubmenu = function(id) {
    if (isCollapsed) return; // 折叠状态下禁用或通过 hover 处理（目前简单处理为禁用点击展开）
    
    const submenu = document.getElementById(id);
    const arrow = document.getElementById(id + '-arrow');
    
    if (submenu.classList.contains('hidden')) {
        submenu.classList.remove('hidden');
        arrow.classList.add('rotate-180');
    } else {
        submenu.classList.add('hidden');
        arrow.classList.remove('rotate-180');
    }
}

// 2. 多标签页与 Iframe 管理逻辑
window.openPage = function(path, title) {
    // 规范化路径
    // 确保 path 与 pageConfig key 匹配
    // 如果 title 未传，尝试从 pageConfig 获取
    if (!title && pageConfig[path]) {
        title = pageConfig[path].title;
    }

    // 1. 处理标签数据
    const existingTag = openTags.find(t => t.path === path);
    
    // 重置所有 active
    openTags.forEach(t => t.active = false);

    if (existingTag) {
        existingTag.active = true;
    } else {
        openTags.push({
            title: title || '未命名页面',
            path: path,
            active: true
        });
    }

    // 2. 处理 Iframe (显示/隐藏/创建)
    const existingIframe = document.querySelector(`iframe[data-path="${path}"]`);
    const activeIframe = document.querySelector('#iframe-container iframe.iframe-active');

    if (activeIframe && activeIframe.dataset.path !== path) {
        activeIframe.classList.remove('iframe-enter-right');
        activeIframe.classList.add('iframe-exit-left');
        activeIframe.classList.remove('iframe-active');
        setTimeout(() => {
            activeIframe.style.display = 'none';
            activeIframe.classList.remove('iframe-exit-left');
        }, 240);
    }

    if (existingIframe) {
        existingIframe.style.display = 'block';
        existingIframe.classList.remove('iframe-exit-left');
        existingIframe.classList.add('iframe-enter-right', 'iframe-active');
        existingIframe.addEventListener('animationend', () => {
            existingIframe.classList.remove('iframe-enter-right');
        }, { once: true });
    } else {
        const iframe = document.createElement('iframe');
        iframe.src = path;
        iframe.setAttribute('data-path', path);
        iframe.className = 'w-full h-full border-none rounded-lg shadow-sm bg-white/50 backdrop-blur-sm transition-all duration-300';

        iframeContainer.appendChild(iframe);
        iframe.style.display = 'block';
        iframe.classList.add('iframe-enter-right', 'iframe-active');
        iframe.addEventListener('animationend', () => {
            iframe.classList.remove('iframe-enter-right');
        }, { once: true });
    }

    // 3. 更新 UI
    renderTags();
    updateBreadcrumb(path, title);
    updateSidebarActiveState(path);
}

// 关闭标签
window.closeTag = function(path) {
    const index = openTags.findIndex(t => t.path === path);
    if (index === -1) return;

    const isDashboard = path.includes('dashboard.html');
    if (isDashboard) return; // 首页不可关闭

    const wasActive = openTags[index].active;
    
    // 移除数据
    openTags.splice(index, 1);
    
    // 移除 iframe DOM
    const iframeToRemove = document.querySelector(`iframe[data-path="${path}"]`);
    if (iframeToRemove) {
        iframeToRemove.remove();
    }

    // 如果关闭的是当前激活的标签，跳转到相邻标签 (优先后一个，没有则前一个)
    if (wasActive) {
        const nextTag = openTags[index] || openTags[index - 1];
        if (nextTag) {
            openPage(nextTag.path, nextTag.title);
        }
    } else {
        // 仅重新渲染标签栏
        renderTags();
    }
}

// 渲染标签栏
function renderTags() {
    tagsContainer.innerHTML = '';
    
    openTags.forEach(tag => {
        const isDashboard = tag.path.includes('dashboard.html');
        const isActive = tag.active;
        
        const div = document.createElement('div');
        // tag-item class defined in css/style.css
        div.className = `tag-item flex items-center px-3 py-1 text-sm rounded cursor-pointer border shrink-0 group ${
            isActive ? 'active' : 'bg-white text-gray-600 border-gray-200'
        }`;
        
        div.onclick = () => {
            if (!isActive) {
                openPage(tag.path, tag.title);
            }
        };

        let html = '';
        if (isActive) {
            html += `<span class="mr-2 relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>`;
        }
        html += `<span>${tag.title}</span>`;
        
        if (!isDashboard) {
            html += `<i class="fas fa-times ml-2 text-gray-400 hover:text-red-500 rounded-full p-0.5 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); closeTag('${tag.path}')"></i>`;
        }
        
        div.innerHTML = html;
        tagsContainer.appendChild(div);
    });
}

// 3. 面包屑交互逻辑
function updateBreadcrumb(path, title) {
    const config = pageConfig[path];
    let html = `<span>教学管理平台</span><i class="fas fa-chevron-right text-xs mx-2 text-gray-400"></i>`;
    
    if (config && config.parent) {
        // 父级不可点击，因为没有对应的父级概览页，或者我们可以定义点击父级展开菜单？
        // 这里按需求："点击面包屑父级节点，可返回对应上级页面"。
        // 但目前父级（如用户管理）只是菜单组，没有页面。
        // 如果有父级页面，可以 href="javascript:openPage(...)"
        // 这里仅展示文本，因为没有定义父级页面 url
        html += `<span class="text-gray-500">${config.parent}</span><i class="fas fa-chevron-right text-xs mx-2 text-gray-400"></i>`;
    }
    
    html += `<span class="text-gray-800 font-medium">${title}</span>`;
    
    breadcrumbContainer.innerHTML = html;
}

// 初始化：默认打开首页
openPage('pages/dashboard.html', '首页');

// 4. 全屏逻辑
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            // 进入全屏自动折叠侧边栏
            if (!isCollapsed) {
                isCollapsed = true;
                updateSidebarState();
            }
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

if (userMenu && userMenuDropdown) {
    userMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenuDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            userMenuDropdown.classList.add('hidden');
        }
    });
}

// 初始化：打开首页
document.addEventListener('DOMContentLoaded', () => {
    openPage('pages/dashboard.html', '首页');
});

// 5. 更新侧边栏选中状态
function updateSidebarActiveState(path) {
    // 移除所有激活状态
    const allLinks = document.querySelectorAll('#menu-list a');
    allLinks.forEach(link => {
        // 恢复默认样式
        if (link.closest('.submenu')) {
            // 二级菜单
            link.classList.remove('text-blue-600', 'bg-blue-50');
            link.classList.add('text-gray-600');
        } else {
            // 一级菜单
            link.classList.remove('bg-blue-50', 'text-blue-600');
            link.classList.add('text-gray-700');
        }
    });

    // 激活当前项
    const activeLink = document.querySelector('#menu-list a[data-path="' + path + '"]');
    if (activeLink) {
        if (activeLink.closest('.submenu')) {
            // 二级菜单激活
            activeLink.classList.remove('text-gray-600');
            activeLink.classList.add('text-blue-600', 'bg-blue-50');
            
            // 确保父级菜单展开
            const submenu = activeLink.closest('.submenu');
            const arrowId = submenu.id + '-arrow';
            const arrow = document.getElementById(arrowId);
            
            if (submenu.classList.contains('hidden')) {
                submenu.classList.remove('hidden');
                if (arrow) arrow.classList.add('rotate-180');
            }
        } else {
            // 一级菜单激活
            activeLink.classList.remove('text-gray-700');
            activeLink.classList.add('bg-blue-50', 'text-blue-600');
        }
    }
}
