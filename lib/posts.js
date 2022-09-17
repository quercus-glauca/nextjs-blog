import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostsDataSorted() {

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {

    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter tp parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return { id, ...matterResult.data };

  });

  // Reverse sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    }
    else if (a > b) {
      return -1;
    }
    else {
      return 0;
    }
  });

}

export function getAllPostsId() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Return an Array of Objects (a Next MUST)
  // each /w a 'params' Object (a Next MUST)
  // each /w an 'id' key-member (for our [id] in the file name)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter t parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    ...matterResult.data,
    contentHtml,
  };
}