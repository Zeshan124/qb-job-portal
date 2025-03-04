import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-4">
      <div className="max-w-md">
        <Image
          src="https://illustrations.popsy.co/white/error.svg"
          alt="404 Not Found"
          width={240}
          height={240}
          className="w-60 mx-auto mb-6"
        />

        <h1 className="text-5xl font-bold text-gray-800">Oops!</h1>
        <p className="text-lg text-gray-600 mt-2">
          We can not seem to find the page you are looking for.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-300"
        >
          <ArrowLeft size={20} /> Go Back Home
        </Link>
      </div>
    </div>
  );
}
