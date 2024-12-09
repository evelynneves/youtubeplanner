/******************************************************************************
*                                                                             *
* Creation Date : 25/11/2024                                                  *
*                                                                             *
* Property : (c) This program, code or item is the Intellectual Property of   *
* Evelyn Neves Barreto. Any use or copy of this code is prohibited without    *
* the express written authorization of Evelyn. All rights reserved.           *
*                                                                             *
*******************************************************************************/

import express from 'express';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const config = {
    API_KEY: process.env.API_KEY || '',
    MAX_RESULTS: 200,
    TOTAL_RESULTS: 200,
};
const youtube = google.youtube({
    version: 'v3',
    auth: config.API_KEY,
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

app.get('/api/youtube', async (req, res) => {
    const query = req.query.q;

    if (!config.API_KEY) {
        return res.status(400).json({ error: 'YouTube API key is not configured. Please set API_KEY in your .env file.' });
    }

    try {

        let videos = [];
        let nextPageToken = null;

        while (videos.length < config.TOTAL_RESULTS) {
            const searchResponse = await youtube.search.list({
                part: 'snippet',
                q: query,
                maxResults: config.MAX_RESULTS,
                type: 'video',
            });
    
            if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
                return [];
            }
    
            const videoIds = searchResponse.data.items.map(item => item.id.videoId);
    
            const detailsResponse = await youtube.videos.list({
                part: 'contentDetails,snippet',
                id: videoIds.join(','),
            });
    
            const newVideos = detailsResponse.data.items.map(item => ({
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.medium.url,
                duration: parseDuration(item.contentDetails.duration),
            }));
            videos = [...videos, ...newVideos];
            nextPageToken = searchResponse.data.nextPageToken;
    
            if (!nextPageToken) break;
        }
        videos = videos.slice(0, config.TOTAL_RESULTS);
        return res.status(200).json(videos);
    } catch (error) {
        console.error('API Error:', error.message);
        return res.status(500).json({ error: `Failed to fetch videos: ${error.message}` });
    }
});

/**
 * Parses a duration string (in ISO 8601 format) and converts it into minutes
 * 
 * @param {string} duration - The duration string to be parsed
 * @returns {number} - The duration in minutes
 */
function parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    let minutes = 0;

    if (match) {
        if (match[1]) minutes += parseInt(match[1].replace('H', '')) * 60;
        if (match[2]) minutes += parseInt(match[2].replace('M', ''));
        if (match[3]) minutes += Math.ceil(parseInt(match[3].replace('S', '')) / 60);
    }

    return minutes;
}

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});