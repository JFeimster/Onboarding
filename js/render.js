const Render = {
    // Renders the Bento Grid on Index
    dashboard(days) {
        const completed = Store.getCompletedDays();
        
        // Group by weeks
        const weeks = { 1: [], 2: [], 3: [], 4: [] };
        days.forEach(day => {
            if (weeks[day.week]) weeks[day.week].push(day);
        });

        // Render each week container
        [1, 2, 3, 4].forEach(weekNum => {
            const container = document.getElementById(`grid-week-${weekNum}`);
            if (!container) return;

            container.innerHTML = weeks[weekNum].map(day => {
                const isDone = completed.includes(day.id);
                return `
                    <a href="day.html?id=${day.id}" class="bento-item ${isDone ? 'completed' : ''}">
                        <span class="day-number">Day ${day.id}</span>
                        <h3 class="day-title">${day.title}</h3>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${day.duration}</div>
                    </a>
                `;
            }).join('');
        });

        // Update progress UI
        const percent = Store.getProgressPercent();
        const progEl = document.getElementById('progress-display');
        if(progEl) progEl.textContent = `${percent}% Deployment`;
    },

    // Renders single day view
    dayDetail(day) {
        document.getElementById('day-badge').textContent = `Phase ${day.week} | Day ${day.id}`;
        document.getElementById('day-title').textContent = day.title;
        document.getElementById('day-summary').textContent = day.summary;
        document.getElementById('day-body').innerHTML = `<p>${day.content}</p>`;
        
        // Tasks
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = day.tasks.map(t => `
            <li><input type="checkbox"> <span>${t}</span></li>
        `).join('');

        document.title = `${day.title} | Moonshine Capital`;
        
        // Handle loading state
        document.getElementById('day-content-loader').classList.add('hidden');
        document.getElementById('day-container').classList.remove('hidden');

        // Button State
        const completed = Store.getCompletedDays();
        const btn = document.getElementById('complete-btn');
        if (completed.includes(day.id)) {
            btn.textContent = "✓ Completed";
            btn.disabled = true;
            btn.style.opacity = "0.5";
        }
    },

    resources(list) {
        const grid = document.getElementById('resources-grid');
        grid.innerHTML = list.map(item => `
            <div class="bento-item">
                <span class="day-number">${item.type}</span>
                <h3 class="day-title">${item.name}</h3>
                <a href="${item.url}" class="btn" style="margin-top:auto">Download</a>
            </div>
        `).join('');
    }
};
