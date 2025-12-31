document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load Data
    const data = await Store.init();
    if (!data) return;

    // 2. Check which page we are on
    const path = window.location.pathname;
    
    // Index Page Logic
    if (path.endsWith('index.html') || path.endsWith('/')) {
        Render.dashboard(data.days);
    }

    // Day Detail Logic
    if (path.includes('day.html')) {
        const dayId = parseInt(Router.getParam('id'));
        const day = data.days.find(d => d.id === dayId);
        
        if (day) {
            Render.dayDetail(day);
            
            // Completion Logic
            document.getElementById('complete-btn').addEventListener('click', (e) => {
                Store.markComplete(dayId);
                e.target.textContent = "✓ Completed";
                e.target.disabled = true;
                
                // Optional: Celebration Alert
                if (dayId % 7 === 0) {
                    alert("Congratulations! Weekly Milestone Achieved.");
                }
                
                // Return to dash after short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            });
        } else {
            window.location.href = 'index.html';
        }
    }
});
