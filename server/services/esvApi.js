import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const ESV_API_BASE = 'https://api.esv.org/v3/passage/text/';

export async function getChapter(book, chapter) {
    try {
        const passage = `${book} ${chapter}`;
        const response = await axios.get(ESV_API_BASE, {
            params: {
                q: passage,
                'include-passage-references': false,
                'include-verse-numbers': true,
                'include-first-verse-numbers': true,
                'include-footnotes': false,
                'include-headings': false,
                'include-short-copyright': false,
            },
            headers: {
                'Authorization': `Token ${process.env.ESV_API_KEY}`
            }
        });

        return {
            book,
            chapter,
            text: response.data.passages[0],
            reference: response.data.canonical,
        };
    } catch (error) {
        console.error('ESV API Error:', error.response?.data || error.message);
    }
}
