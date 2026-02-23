let jobs = [
    { 
        id: 1, 
        companyName: "Google", 
        position: "Frontend Developer", 
        location: "Remote", 
        type: "Full-time", 
        salary: "$120k", 
        description: "Develop high-quality web applications using modern JavaScript frameworks.", 
        status: "all" 
    },
    { 
        id: 2, 
        companyName: "Meta", 
        position: "Product Designer", 
        location: "USA", 
        type: "Full-time", 
        salary: "$110k", 
        description: "Design intuitive user interfaces for social media platforms.", 
        status: "all" 
    },
    { 
        id: 3, 
        companyName: "Amazon", 
        position: "Software Engineer", 
        location: "Remote", 
        type: "Full-time", 
        salary: "$130k", 
        description: "Build scalable cloud services and infrastructure.", 
        status: "all" 
    },
    { 
        id: 4, 
        companyName: "Microsoft", 
        position: "QA Engineer", 
        location: "Hybrid", 
        type: "Full-time", 
        salary: "$95k", 
        description: "Test and ensure quality for enterprise software products.", 
        status: "all" 
    },
    { 
        id: 5, 
        companyName: "Netflix", 
        position: "Backend Developer", 
        location: "Remote", 
        type: "Contract", 
        salary: "$140k", 
        description: "Optimize server performance for global content delivery.", 
        status: "all" 
    },
    { 
        id: 6, 
        companyName: "Apple", 
        position: "iOS Developer", 
        location: "USA", 
        type: "Full-time", 
        salary: "$125k", 
        description: "Create innovative mobile apps for the iOS ecosystem.", 
        status: "all" 
    },
    { 
        id: 7, 
        companyName: "Tesla", 
        position: "Data Scientist", 
        location: "Hybrid", 
        type: "Full-time", 
        salary: "$115k", 
        description: "Analyze data to improve autonomous vehicle performance.", 
        status: "all" 
    },
    { 
        id: 8, 
        companyName: "Airbnb", 
        position: "Full Stack Engineer", 
        location: "Remote", 
        type: "Part-time", 
        salary: "$105k", 
        description: "Work on both server and client side features.", 
        status: "all" 
    }
];

let activeTab = 'all';
function render() {
    const container = document.getElementById('job-container');
    const template = document.getElementById('job-card-template');
    const emptyState = document.getElementById('empty-state')
    const filtered = (activeTab === 'all') 
        ? jobs 
        : jobs.filter(j => j.status === activeTab);

    document.getElementById('total-count').innerText = jobs.length;
    
    document.getElementById('interview-count').innerText = jobs.filter(
        j => j.status === 'interview'
    ).length;
    
    document.getElementById('rejected-count').innerText = jobs.filter(
        j => j.status === 'rejected'
    ).length;
    
    document.getElementById('tab-count').innerText = filtered.length;

    container.innerHTML = '';

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        filtered.forEach(job => {
            const clone = template.content.cloneNode(true);
            const isApplied = (job.status !== 'all');

            clone.querySelector('.company-name').innerText = job.companyName;
            clone.querySelector('.position-text').innerText = job.position;
            clone.querySelector('.info-row').innerText = `${job.location} | ${job.type} | ${job.salary}`;
            clone.querySelector('.desc').innerText = job.description;
            
            const badge = clone.querySelector('.status-badge');
            badge.innerText = isApplied ? 'Applied' : 'Not Applied';
            badge.className = `status-badge ${isApplied ? 'applied' : 'not-applied'}`;

            clone.querySelector('.delete-btn').onclick = function() {
                deleteJob(job.id);
            };
            
            const intBtn = clone.querySelector('.btn-int');
            if (job.status === 'interview') {
                intBtn.classList.add('active');
            }
            intBtn.onclick = function() {
                updateStatus(job.id, 'interview');
            };

            const rejBtn = clone.querySelector('.btn-rej');
            if (job.status === 'rejected') {
                rejBtn.classList.add('active');
            }
            rejBtn.onclick = function() {
                updateStatus(job.id, 'rejected');
            };

            container.appendChild(clone);
        });
    }
}

function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    job.status = (job.status === newStatus) ? 'all' : newStatus;
    render();
}

function deleteJob(id) {
    if (confirm("Confirm Delete?")) {
        jobs = jobs.filter(j => j.id !== id);
        render();
    }
}

function switchTab(tab) {
    activeTab = tab;
    
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });
    
    document.getElementById(`tab-${tab}`).classList.add('active');
    render();
}

render();