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
 * Finds the most frequent keywords from the videos
 * 
 * @param {Array} videos - List of videos containing title and description
 * @returns {Array} Array of the top 5 keywords with their counts
 */
export function findTopKeywords(videos) {
    // List of words to ignore
    const stopWords = new Set([
        // Articles and prepositions
        'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'com',
        'and', 'or', 'but', 'nor', 'yet', 'so', 'as', 'que', 'de', 'do', 'da',
        // Common words to exclude
        'how', 'what', 'why', 'when', 'where', 'who', 'which', 'this', 'that',
        'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
        'have', 'has', 'had', 'will', 'would', 'shall', 'should', 'may', 'might',
        'must', 'can', 'could',
        // URLs and common web terms
        'http', 'https', 'www', 'com', 'org', 'net', 'edu', 'gov', 'io',
        // Numbers
        'one', 'two', 'three', 'four', 'five', 'first', 'second', 'third',
        // Common YouTube-related terms
        'video', 'channel', 'subscribe', 'like', 'comment', 'watch', 'playlist',
        'youtube', 'youtu', 'view', 'views', 'new', 'official'
    ]);

    const wordCounts = {};

    videos.forEach(video => {
        const text = `${video.title} ${video.description}`.toLowerCase();

        text.split(/\s+/).forEach(word => {
            const cleanedWord = word.replace(/[^a-z0-9]/g, '');
            if (
                cleanedWord.length > 2 &&
                !stopWords.has(cleanedWord) &&
                isNaN(cleanedWord)
            ) {
                wordCounts[cleanedWord] = (wordCounts[cleanedWord] || 0) + 1;
            }
        });
    });

    // Ordena as palavras por frequência e retorna as 5 principais
    return Object.entries(wordCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
        .map(([word, count]) => ({ word, count }));
}