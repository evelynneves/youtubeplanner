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
 * Calculates the video schedule based on daily available time
 * 
 * @param {Array} videos - List of videos with title and duration
 * @param {Array} weeklyAvailability - Hours available per day of the week
 * @returns {Object} Schedule containing days, videos, and statistics
 */
export function calculateSchedule(videos, weeklyAvailability) {
    const schedule = [];
    let currentDay = 0;
    let currentDayVideos = [];
    let remainingTimeToday = weeklyAvailability[0];

    const maxDailyTime = Math.max(...weeklyAvailability);
    const validVideos = videos.filter(video => video.duration <= maxDailyTime);

    for (const video of validVideos) {
        while (true) {
            if (currentDay >= weeklyAvailability.length) {
                if (currentDayVideos.length > 0) {
                    schedule.push({
                        day: currentDay,
                        videos: [...currentDayVideos]
                    });
                }
                currentDay = 0;
                currentDayVideos = [];
                remainingTimeToday = weeklyAvailability[0];
            }

            if (video.duration <= remainingTimeToday) {
                currentDayVideos.push(video);
                remainingTimeToday -= video.duration;
                break;
            } else {
                if (currentDayVideos.length > 0) {
                    schedule.push({
                        day: currentDay,
                        videos: [...currentDayVideos]
                    });
                }
                currentDay++;
                currentDayVideos = [];
                remainingTimeToday = weeklyAvailability[currentDay] || weeklyAvailability[0];
            }
        }
    }

    if (currentDayVideos.length > 0) {
        schedule.push({
            day: currentDay,
            videos: currentDayVideos
        });
    }

    return {
        schedule,
        totalDays: Math.ceil(schedule.length),
        totalWeeks: Math.ceil(schedule.length / 7),
        unwatchableVideos: videos.length - validVideos.length
    };
}