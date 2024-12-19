# YouTube Planner

## Overview

**YouTube Planner** is a system designed to help you organize and plan which YouTube videos to watch based on your available time for each day of the week and specific search keywords. The system optimizes the video sequence and provides useful insights, such as the most frequent words in the titles and descriptions of the returned videos.

## Features

1. **Video Search**  
   - Returns videos based on the provided search keyword.  
   - Limits the results to the first **200 videos**.

2. **Top Keywords**  
   - Displays the 5 most common words in the titles and descriptions of the returned videos.

3. **Watch Time Management**  
   - Calculates how many days are needed to watch all videos, following these rules:
     - Users specify how much time they have available each day of the week.
     - Users will not spend more time watching videos than their daily maximum.
     - A video will only be started if it can be finished on the same day.
     - Videos longer than the longest available day will be ignored.
     - Videos are watched in the exact order they were returned.

### Example Usage

#### Input:
- Time available per day of the week: `[15, 120, 30, 150, 20, 40, 90]` (in minutes).  
- Video durations returned: `[20, 30, 60, 90, 200, 30, 40, 20, 60, 15]`.

#### Result:  
| Day  | Videos Watched           |
|------|--------------------------|
| Day 1| No videos watched        |
| Day 2| `[20, 30, 60]`           |
| Day 3| No videos watched        |
| Day 4| `[90, 30]` (ignores `200`)|
| Day 5| No videos watched        |
| Day 6| `[40]`                   |
| Day 7| `[20, 60]`               |
| Day 8| `[15]`                   |

## Setup Instructions

1. Clone the repository:  
   ```bash
   git clone https://github.com/evelynneves/youtubeplanner.git

2. Install dependencies:  
   ```bash
   npm install

3. Create a .env file with the following content:  
   ```bash
   API_KEY=your_youtube_api_key
   Note: Replace your_youtube_api_key with your actual API key.

4. Start the server:  
   ```bash
   npm start

5. Access the application at http://localhost:3000


## How to Obtain a YouTube API Key
- Go to the Google Cloud Console.
- Create a project (e.g., "YouTube Planner").
- Navigate to APIs & Services > Credentials.
- Click Create Credentials and select API Key.
- Copy the generated API key and paste it into the .env file.
- For further assistance, refer to the YouTube Data API documentation.