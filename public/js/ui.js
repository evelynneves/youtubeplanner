/******************************************************************************
*                                                                             *
* Creation Date : 25/11/2024                                                  *
*                                                                             *
* Property : (c) This program, code or item is the Intellectual Property of   *
* Evelyn Neves Barreto. Any use or copy of this code is prohibited without    *
* the express written authorization of Evelyn. All rights reserved.           *
*                                                                             *
*******************************************************************************/

/**
 * Renders the list of videos to the UI by creating and appending video cards
 * 
 * @param {Array} videos - Array of video objects containing the video details (title, thumbnail, duration)
 * @returns {void}
 */
export function renderVideos(videos) {
    const grid = document.getElementById('videosGrid');
    grid.innerHTML = '';

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';

        card.innerHTML = `
            <img class="video-thumbnail" src="${video.thumbnail}" alt="${video.title}">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span class="video-duration">${video.duration} minutes</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/**
 * Renders the weekly schedule to the UI with the details of videos assigned to each day
 * 
 * @param {Object} scheduleData - The schedule data object containing videos, total days, weeks, and unwatchable videos
 * @returns {void}
 */
export function renderSchedule(scheduleData) {
    const container = document.getElementById('scheduleSummary');
    container.innerHTML = '';
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (!scheduleData.schedule || scheduleData.schedule.length === 0) {
        container.innerHTML = '<p>No videos scheduled. Try adjusting your daily time limits.</p>';
        return;
    }

    // Add summary section
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'schedule-summary-header';
    summaryDiv.innerHTML = `
        <div class="summary-stats">
            <p>Total time to watch: ${scheduleData.totalDays} days (${scheduleData.totalWeeks} weeks)</p>
            ${scheduleData.unwatchableVideos > 0 ?
            `<p>Videos too long to watch: ${scheduleData.unwatchableVideos}</p>` :
            ''}
        </div>
    `;
    container.appendChild(summaryDiv);

    console.log("scheduleData.schedule", scheduleData.schedule)

    // Add daily schedule
    scheduleData.schedule.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'schedule-day';
        dayElement.innerHTML = `
            <h3>${days[day.day % 7]}</h3>
            <p>${day.videos.length} videos (${day.videos.reduce((acc, v) => acc + v.duration, 0)} minutes)</p>
            <ul>
                ${day.videos.map(video => `
                    <li>${video.title} (${video.duration} min)</li>
                `).join('')}
            </ul>
        `;
        container.appendChild(dayElement);
    });
}

/**
 * Renders a list of keywords and their occurrences to the UI
 * 
 * @param {Array} keywords - Array of keyword objects with 'word' and 'count' properties
 * @returns {void}
 */
export function renderKeywords(keywords) {
    const list = document.getElementById('keywordsList');
    list.innerHTML = keywords.length > 0
        ? keywords.map(keyword => `<li>${keyword.word} (${keyword.count} occurrences)</li>`).join('')
        : '<li>No keywords found</li>';
}

/**
 * Displays an error message to the user
 * 
 * @param {string} message - The error message to display
 * @returns {void}
 */
export function showError(message) {
    const errorDiv = document.getElementById('error-message') || createErrorDiv();
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

/**
 * Clears any displayed error message from the UI
 * 
 * @returns {void}
 */
export function clearError() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

/**
 * Creates an error message div element and inserts it into the DOM
 * 
 * @returns {HTMLElement} The created error message div element
 */
function createErrorDiv() {
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-message';
    errorDiv.className = 'error-message';
    document.querySelector('.main-content').insertBefore(
        errorDiv,
        document.querySelector('.schedule-summary')
    );
    return errorDiv;
}