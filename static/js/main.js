// Auto-hide flash messages after 5 seconds
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.5s';
            setTimeout(() => alert.remove(), 500);
        }, 5000);
    });
});

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger)';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}

// Confirm before logout
const logoutBtn = document.querySelector('.btn-logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        if (!confirm('Are you sure you want to logout?')) {
            e.preventDefault();
        }
    });
}

// Table sorting functionality
function sortTable(table, column, asc = true) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aVal = a.cells[column].textContent.trim();
        const bVal = b.cells[column].textContent.trim();
        
        // Try to parse as number
        const aNum = parseFloat(aVal);
        const bNum = parseFloat(bVal);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return asc ? aNum - bNum : bNum - aNum;
        }
        
        return asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
    
    rows.forEach(row => tbody.appendChild(row));
}

// Add click-to-sort functionality to table headers
document.querySelectorAll('.report-table th').forEach((th, index) => {
    th.style.cursor = 'pointer';
    th.title = 'Click to sort';
    
    let asc = true;
    th.addEventListener('click', function() {
        const table = this.closest('table');
        sortTable(table, index, asc);
        asc = !asc;
        
        // Update header indicators
        table.querySelectorAll('th').forEach(header => {
            header.textContent = header.textContent.replace(' ↑', '').replace(' ↓', '');
        });
        this.textContent += asc ? ' ↓' : ' ↑';
    });
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Print functionality for reports
function printReport() {
    window.print();
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + D = Dashboard
    if (e.altKey && e.key === 'd') {
        window.location.href = '/dashboard';
    }
    // Alt + A = Mark Attendance
    if (e.altKey && e.key === 'a') {
        window.location.href = '/mark-attendance';
    }
    // Alt + R = Reports
    if (e.altKey && e.key === 'r') {
        window.location.href = '/reports';
    }
});