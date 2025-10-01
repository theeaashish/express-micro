import { getImageUrl } from "../utils/helper.ts";

interface NewsApiTransform {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  Users: {
    id: number;
    name: string;
    profile: string | null;
  } | null;
}

class NewsApiTransform {
  static transform(news: NewsApiTransform) {
    return {
      id: news.id,
      title: news.title,
      content: news.content,
      image: getImageUrl(news.image),
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
      reporter: news?.Users,
    };
  }
}

export default NewsApiTransform;
