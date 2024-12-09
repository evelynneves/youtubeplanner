/******************************************************************************
*                                                                             *
* Creation Date : 25/11/2024                                                  *
*                                                                             *
* Property : (c) This program, code or item is the Intellectual Property of   *
* Evelyn Neves Barreto. Any use or copy of this code is prohibited without    *
* the express written authorization of Evelyn. All rights reserved.           *
*                                                                             *
*******************************************************************************/

import { calculateSchedule } from './scheduler.js';
import { findTopKeywords } from './keywords.js';
import { renderVideos, renderSchedule, renderKeywords, showError, clearError } from './ui.js';

let videos = [];
let scheduleData = null;

/**
 * Retrieves weekly availability data from the form inputs
 * 
 * @returns {Array} - Array of availability values for each day of the week
 */
function getWeeklyAvailability() {
    return [
        parseInt(document.getElementById('monday').value) || 0,
        parseInt(document.getElementById('tuesday').value) || 0,
        parseInt(document.getElementById('wednesday').value) || 0,
        parseInt(document.getElementById('thursday').value) || 0,
        parseInt(document.getElementById('friday').value) || 0,
        parseInt(document.getElementById('saturday').value) || 0,
        parseInt(document.getElementById('sunday').value) || 0
    ];
}

/**
 * Handles YouTube video search and displays the results
 * 
 * @async
 * @returns {void}
 */
async function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) {
        showError('Please enter a search term');
        return;
    }

    try {
        clearError();
        const response = await fetch(`/api/youtube?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch videos: ${response.statusText}`);
        }

        videos = await response.json();

        if (videos.length === 0) {
            showError('No videos found for your search term');
            return;
        }

        const weeklyTime = getWeeklyAvailability();
        scheduleData = calculateSchedule(videos, weeklyTime);
        const topKeywords = findTopKeywords(videos);

        renderVideos(videos);
        renderSchedule(scheduleData);
        renderKeywords(topKeywords);
    } catch (error) {
        console.error('Error during search:', error.message);
        showError(error.message);
    }
}

document.getElementById('searchButton').addEventListener('click', handleSearch);
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});