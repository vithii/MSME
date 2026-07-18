window.initCourseApp = () => {
    // State management
    const appState = {
        currentView: 'home', // 'home', 'guide', 'scorecard'
        currentSectionId: ebookData.sections[0].id,
        currentPointId: null,
        progress: JSON.parse(localStorage.getItem('msmeCourseProgress')) || {}
    };

    const sidebarRoot = document.getElementById('sidebar-root');
    const viewRoot = document.getElementById('view-root');
    const navPercentage = document.getElementById('nav-percentage');
    const navProgressBar = document.getElementById('nav-progress-bar');
    const navStatusText = document.getElementById('nav-status');

    // Dynamically set course title from ebookData
    if (navStatusText && typeof ebookData !== 'undefined' && ebookData.title) {
        navStatusText.innerText = ebookData.title;
        document.title = `${ebookData.title} | MSMEgrowth`;
    }

    // Utility: Update overall progress UI
    function updateProgressUI() {
        let completed = 0;
        let total = 0;
        
        ebookData.sections.forEach(section => {
            total += section.points.length;
            section.points.forEach(point => {
                if(appState.progress[point.id]) completed++;
            });
        });

        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        if(navPercentage) navPercentage.innerText = `${percentage}%`;
        if(navProgressBar) navProgressBar.style.width = `${percentage}%`;
    }

    // Toggle checkbox
    window.toggleCheck = (pointId) => {
        appState.progress[pointId] = !appState.progress[pointId];
        localStorage.setItem('msmeCourseProgress', JSON.stringify(appState.progress));
        updateProgressUI();
        
        const cb = document.getElementById(`cb-${pointId}`);
        if(cb) cb.checked = appState.progress[pointId];
        
        renderSidebar();
        if(appState.currentView === 'scorecard') {
            renderScorecard();
        }
    };

    // Routing
    window.app = {
        navigate: (view, sectionId = null, pointId = null) => {
            if (window.courseAccess === 'pending' && sectionId && sectionId > 2) {
                if (typeof showToast === 'function') {
                    showToast("⚠️ Verification Pending. Please wait for admin approval to unlock this module.", "error");
                } else {
                    alert("⚠️ Verification Pending. Please wait for admin approval to unlock this module.");
                }
                return;
            }
            appState.currentView = view;
            if (sectionId) appState.currentSectionId = sectionId;
            if (pointId) appState.currentPointId = pointId;
            else appState.currentPointId = null; 
            
            if (pointId && window.innerWidth < 768) {
                document.getElementById('sidebar-container').classList.remove('active');
            }
            
            viewRoot.scrollTo(0, 0);
            renderSidebar();
            renderView();
            updateProgressUI();
        }
    };

    function renderSidebar() {
        if (!sidebarRoot) return;
        
        let html = `
            <div style="padding: 24px;">
                <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 20px;">Course Modules</h3>
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
        `;
        
        ebookData.sections.forEach((section, sIndex) => {
            let completed = section.points.filter(p => appState.progress[p.id]).length;
            let isExpanded = appState.currentSectionId === section.id;
            let borderColor = isExpanded ? 'var(--primary)' : 'rgba(255,255,255,0.05)';
            
            // Check if section is locked for pending users
            const isLocked = window.courseAccess === 'pending' && section.id > 2;
            let clickAction = isLocked 
                ? `if(typeof showToast==='function') showToast('⚠️ Verification Pending. Please wait for admin approval to unlock this module.', 'error');`
                : `app.navigate('${appState.currentView === 'scorecard' ? 'home' : appState.currentView}', ${section.id}, null)`;
            
            let statusBadge = isLocked 
                ? `🔒 Locked`
                : `${completed}/${section.points.length}`;
            
            html += `
                <div style="background: rgba(255,255,255,0.02); border: 1px solid ${borderColor}; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; ${isLocked ? 'opacity: 0.6;' : ''}">
                    <div style="padding: 16px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="${clickAction}">
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 4px;">Module ${sIndex + 1}</div>
                            <h3 style="font-size: 0.95rem; font-weight: 600; color: #fff;">${section.title}</h3>
                        </div>
                        <div style="font-size: 0.8rem; font-weight: 700; color: ${isLocked ? '#feca57' : (completed === section.points.length ? 'var(--secondary)' : 'var(--text-muted)')}; ml-2 whitespace-nowrap">${statusBadge}</div>
                    </div>
            `;
            
            if (isExpanded) {
                html += `<div style="background: rgba(0,0,0,0.3); border-top: 1px solid rgba(255,255,255,0.05); padding: 8px;">`;
                section.points.forEach((point, pIndex) => {
                    const isActive = appState.currentPointId === point.id;
                    const isChecked = appState.progress[point.id] ? 'checked' : '';
                    const itemBg = isActive ? 'rgba(0, 163, 255, 0.1)' : 'transparent';
                    const itemBorder = isActive ? 'rgba(0, 163, 255, 0.3)' : 'transparent';
                    
                    html += `
                        <div style="padding: 12px; border-radius: 6px; display: flex; align-items: flex-start; gap: 12px; cursor: pointer; transition: all 0.2s; background: ${itemBg}; border: 1px solid ${itemBorder}; margin-bottom: 4px;" onclick="app.navigate('guide', ${section.id}, '${point.id}')">
                            <input type="checkbox" style="margin-top: 4px; accent-color: var(--secondary);" ${isChecked} onchange="toggleCheck('${point.id}'); event.stopPropagation();" />
                            <div>
                                <div style="font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: ${isActive ? 'var(--primary)' : 'var(--text-muted)'};">Lesson ${pIndex + 1}</div>
                                <div style="font-size: 0.85rem; color: ${isActive ? '#fff' : 'rgba(255,255,255,0.7)'}; line-height: 1.4;">${point.title}</div>
                            </div>
                        </div>
                    `;
                });
                html += `</div>`;
            }
            
            html += `</div>`;
        });
        
        html += `
                </div>
                <button onclick="app.navigate('scorecard')" class="btn btn-outline" style="width: 100%;">View Business Scorecard</button>
            </div>
        `;
        sidebarRoot.innerHTML = html;
    }

    function getPendingBanner() {
        if (window.courseAccess === 'pending') {
            return `
                <div style="background: rgba(254, 202, 87, 0.05); border: 1px solid rgba(254, 202, 87, 0.2); padding: 16px 24px; border-radius: 8px; margin: 24px 32px 0 32px; display: flex; flex-direction: column; gap: 12px; font-weight: 600; color: #feca57; font-size: 0.85rem; text-align: left;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 1.2rem;">⚠️</span>
                        <div>Payment verification is pending. You currently have preview access to Modules 1 and 2. Once verified, all 10 modules will unlock.</div>
                    </div>
                    <button onclick="simulateAdminApproval()" class="btn btn-outline" style="border-color: #feca57; color: #feca57; padding: 6px 12px; font-size: 0.75rem; width: fit-content; margin-left: 28px;">🔧 Admin Bypass: Verify Payment (Simulate Approved)</button>
                </div>
            `;
        }
        return '';
    }

    function renderView() {
        if (!viewRoot) return;
        
        if (appState.currentView === 'home' || (appState.currentView === 'guide' && !appState.currentPointId)) {
            const section = ebookData.sections.find(s => s.id === appState.currentSectionId);
            if (!section) return;
            
            let completed = section.points.filter(p => appState.progress[p.id]).length;
            if(navStatusText) navStatusText.innerText = section.title;
            
            let html = `
                <div style="min-height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 64px 24px; text-align: center;">
                    <div style="max-width: 700px; width: 100%;">
                        <div style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--primary); margin-bottom: 16px;">Module ${section.id}</div>
                        <h1 style="font-size: 3.5rem; margin-bottom: 16px;">${section.title}</h1>
                        <h2 style="font-size: 1.5rem; color: var(--text-muted); margin-bottom: 32px; font-weight: 500;">${section.subtitle}</h2>
                        <p style="font-size: 1.2rem; color: rgba(255,255,255,0.6); font-style: italic; margin-bottom: 48px;">"${section.description}"</p>
                        
                        <div class="glass" style="padding: 32px; margin-bottom: 48px; text-align: left;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-weight: 600;">
                                <span>Module Progress</span>
                                <span style="color: var(--secondary);">${completed}/${section.points.length} Lessons</span>
                            </div>
                            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; width: ${(completed/section.points.length)*100}%; background: var(--gradient-brand); transition: width 0.5s ease;"></div>
                            </div>
                        </div>

                        <button onclick="app.navigate('guide', ${section.id}, '${section.points[0].id}')" class="btn btn-primary" style="font-size: 1.1rem; padding: 16px 40px;">
                            Commence Lesson
                        </button>
                    </div>
                </div>
            `;
            viewRoot.innerHTML = getPendingBanner() + html;
        } else if (appState.currentView === 'guide' && appState.currentPointId) {
            const section = ebookData.sections.find(s => s.id === appState.currentSectionId);
            const point = section.points.find(p => p.id === appState.currentPointId);
            const pointIndex = section.points.findIndex(p => p.id === appState.currentPointId) + 1;
            const isChecked = appState.progress[appState.currentPointId] ? 'checked' : '';

            if(navStatusText) navStatusText.innerText = `Module ${section.id} / Lesson ${pointIndex}`;

            let html = `
                <div style="max-width: 800px; margin: 0 auto; padding: 64px 32px 120px 32px;">
                    <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); margin-bottom: 12px;">Lesson ${pointIndex}</div>
                    <h1 style="font-size: 2.5rem; margin-bottom: 48px; line-height: 1.2;">${point.title}</h1>
                    
                    <div class="glass" style="padding: 32px; margin-bottom: 40px;">
                        <h2 style="font-size: 1.3rem; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
                            <span style="display: block; width: 12px; height: 12px; border-radius: 50%; background: var(--secondary);"></span> Why This Matters
                        </h2>
                        <p style="color: var(--text-muted); font-size: 1.1rem;">${point.implementation.why}</p>
                    </div>

                    <div style="margin-bottom: 40px;">
                        <h2 style="font-size: 1.4rem; margin-bottom: 24px; padding-left: 16px; border-left: 4px solid var(--primary);">Implementation Protocol</h2>
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${point.implementation.steps.map(step => `
                                <div style="background: rgba(255,255,255,0.02); padding: 24px; border-radius: 8px; border-left: 1px solid rgba(255,255,255,0.1); color: var(--text-main); font-size: 1.05rem;">${step}</div>
                            `).join('')}
                        </div>
                    </div>

                    <div style="background: rgba(6, 217, 160, 0.05); border: 1px solid rgba(6, 217, 160, 0.2); padding: 32px; border-radius: 12px; margin-bottom: 40px;">
                        <h2 style="font-size: 1.2rem; color: var(--secondary); margin-bottom: 16px;">Case Study / Example</h2>
                        <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; font-style: italic;">"${point.implementation.example}"</p>
                    </div>

                    <div style="margin-bottom: 40px;">
                        <h2 style="font-size: 1.3rem; margin-bottom: 20px; color: #ff6b6b;">Critical Failures to Avoid</h2>
                        <ul style="padding-left: 24px; color: var(--text-muted); font-size: 1.05rem; display: flex; flex-direction: column; gap: 12px;">
                            ${point.implementation.mistakes.map(m => `<li>${m}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="glass" style="padding: 40px; margin-bottom: 40px; border-color: rgba(0, 163, 255, 0.3);">
                        <h2 style="font-size: 1.4rem; margin-bottom: 24px;">Execution Tasks</h2>
                        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
                            ${point.implementation.tasks.map(task => `
                                <div style="display: flex; align-items: flex-start; gap: 12px; color: var(--text-main); font-size: 1.05rem;">
                                    <span style="color: var(--primary); margin-top: 4px;">▹</span> <span>${task}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 600; font-size: 1.1rem;">Mark Lesson as Completed</span>
                            <input type="checkbox" id="cb-${point.id}" style="width: 24px; height: 24px; accent-color: var(--secondary); cursor: pointer;" ${isChecked} onchange="toggleCheck('${point.id}')" />
                        </div>
                    </div>

                    <div style="background: rgba(255,255,255,0.02); padding: 32px; border-radius: 12px; border-left: 4px solid var(--primary);">
                        <h2 style="font-size: 1.2rem; margin-bottom: 12px;">Expected Result</h2>
                        <p style="color: var(--text-muted); font-size: 1.1rem;">${point.implementation.result}</p>
                    </div>
                </div>
            `;
            viewRoot.innerHTML = html;
        } else if (appState.currentView === 'scorecard') {
            let totalCompleted = 0;
            let html = `
                <div style="max-width: 900px; margin: 0 auto; padding: 80px 32px 120px 32px;">
                    <div style="text-align: center; margin-bottom: 64px;">
                        <h1 style="font-size: 3.5rem; margin-bottom: 16px;">Business Scorecard</h1>
                        <p style="font-size: 1.2rem; color: var(--text-muted);">Track your overall implementation and strategic health.</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 64px;">
            `;

            ebookData.sections.forEach((section) => {
                const completed = section.points.filter(p => appState.progress[p.id]).length;
                totalCompleted += completed;
                const percentage = Math.round((completed / section.points.length) * 100);
                
                html += `
                        <div class="glass" style="padding: 24px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-weight: 600; font-size: 0.95rem;">
                                <span>${section.title}</span>
                                <span style="color: var(--secondary);">${completed}/${section.points.length}</span>
                            </div>
                            <div style="width: 100%; height: 6px; background: rgba(0,0,0,0.5); border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; width: ${percentage}%; background: var(--gradient-brand);"></div>
                            </div>
                        </div>
                `;
            });
            
            html += `</div>`; 

            let interpretation = "";
            let color = "";
            if(totalCompleted <= 20) { interpretation = "Survival Mode"; color = "#ff6b6b"; }
            else if(totalCompleted <= 40) { interpretation = "Stable Business"; color = "#feca57"; }
            else if(totalCompleted <= 60) { interpretation = "Growth Stage"; color = "#1dd1a1"; }
            else if(totalCompleted <= 80) { interpretation = "Scaling Stage"; color = "var(--secondary)"; }
            else { interpretation = "Market Dominance"; color = "var(--primary)"; }

            html += `
                    <div class="glass" style="padding: 64px; text-align: center; max-width: 600px; margin: 0 auto; border-color: ${color}; box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
                        <h2 style="font-size: 1rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px;">Overall Strategic Score</h2>
                        <div style="font-size: 6rem; font-weight: 800; margin-bottom: 24px; line-height: 1;">${totalCompleted}<span style="font-size: 2rem; color: rgba(255,255,255,0.2);">/100</span></div>
                        <div style="font-size: 1.8rem; font-weight: 700; color: ${color};">${interpretation}</div>
                    </div>
                </div>
            `;
            viewRoot.innerHTML = getPendingBanner() + html;
        }
    }

    // Initialize immediately when called
    if(typeof ebookData !== 'undefined') {
        renderSidebar();
        renderView();
        updateProgressUI();
    } else {
        console.error("ebookData is not defined. Ensure content.js files are loaded before app.js");
    }
};

window.simulateAdminApproval = () => {
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    firebase.firestore().collection('orders')
        .where('clientId', '==', user.uid)
        .where('serviceId', '==', '10x-business-insights')
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                alert("No pending order found to approve.");
                return;
            }
            
            const promises = [];
            snapshot.forEach(doc => {
                promises.push(doc.ref.update({ status: 'Completed' }));
            });
            
            return Promise.all(promises);
        })
        .then(() => {
            if (typeof showToast === 'function') {
                showToast("Payment verified successfully! Reloading...", "success");
            } else {
                alert("Payment verified successfully! Reloading...");
            }
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        })
        .catch(err => {
            console.error("Bypass failed: ", err);
            alert("Approval failed: " + err.message);
        });
};
