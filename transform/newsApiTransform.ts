import { getImageUrl } from "../utils/helper.ts";

interface NewsApiTransform {
  id: number;
  title: string;
  content: string;
  image: string;
}

class NewsApiTransform {
  static transform(news: NewsApiTransform) {
    return {
      id: news.id,
      title: news.title,
      content: news.content,
      image: getImageUrl(news.image),
    };
  }
}

export default NewsApiTransform;
