import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

interface News {
  id: string;
  imageUrl: string;
  titleNews: string;
  descriptionNews: string;
  writterNews: string;
  dateCreated: string;
}

interface BeritaCardProps {
  news: News;
}

const BeritaCard: React.FC<BeritaCardProps> = ({ news }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <Link
      href={`/berita/${news.id}`}
      className="group flex flex-col h-full border border-gray-200 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5"
    >
      <div
        className="relative aspect-w-12 aspect-h-11"
        style={{ height: "0", paddingBottom: "68.75%" }}
      >
        <Image
          className="w-full object-cover rounded-xl"
          src={news.imageUrl}
          alt={news.titleNews}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="my-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {news.titleNews}
        </h3>
        <p className="mt-5 text-gray-600">
          {news.descriptionNews.length > 100
            ? `${news.descriptionNews.substring(0, 100)}...`
            : news.descriptionNews}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-x-3">
        <FaUser className="size-8 rounded-full text-gray-800" />
        <div>
          <h5 className="text-sm text-gray-800">By {news.writterNews}</h5>
          <p className="text-sm text-gray-600">
            {formatDate(news.dateCreated)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BeritaCard;
