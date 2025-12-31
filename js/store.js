const Store = {
    data: null,

    async init() {
        if (this.data) return this.data;
        
        try {
            const [daysRes, siteRes] = await Promise.all([
                fetch('data/days.json'),
                fetch('data/site.json')
            ]);
            
            const days = await daysRes.json();
            const site = await siteRes.json();
            
            this.data = { days, site };
            return this.data;
        } catch (e) {
            console.error("Data load failed", e);
            document.body.innerHTML = "<h1>Error loading training data. Check console.</h1>";
        }
    },

    getCompletedDays() {
        const stored = localStorage.getItem('moonshine_progress');
        return stored ? JSON.parse(stored) : [];
    },

    markComplete(dayId) {
        const current = this.getCompletedDays();
        if (!current.includes(dayId)) {
            current.push(dayId);
            localStorage.setItem('moonshine_progress', JSON.stringify(current));
        }
        return current;
    },

    getProgressPercent() {
        const completed = this.getCompletedDays().length;
        // Hardcoded 30 days for now
        return Math.round((completed / 30) * 100);
    }
};
