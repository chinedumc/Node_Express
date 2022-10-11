const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;
// const listDBs = async () => {
// 	const response = await notion.databases.retrieve({
// 		database_id
// 	});
// 	console.log(response);
// };
// listDBs();

const getBooks = async () => {
	const payload = {
		path: `databases/${database_id}/query`,
		method: "POST",
	};

	const { results } = await notion.request(payload);
	// console.log(results);
	const books = results.map((book) => {
		// console.log("title", book.properties.Name.title[0].text.content);

		return {
			id: book.id,
			title: book.properties.Name.title[0].text.content,
			author: book.properties.Author.rich_text[0].plain_text,
			pages: book.properties.Pages.number,
			date: book.properties.Date.date.start,
		};
	});

	return books;
};

module.exports = getBooks