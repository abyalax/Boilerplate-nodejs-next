import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFoundPage() {
  const { back, reload, push } = useRouter();
  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <h1 className="text-4xl font-extrabold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-10">The page you are looking for doesn&apos;t exist or has been moved.</p>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => back()}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 bg-gray-50"
        >
          <FaArrowLeft size={16} />
          Go Back
        </button>

        <button
          onClick={() => push('/')}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Go Home
        </button>

        <button onClick={() => reload()} type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">
          Refresh Page
        </button>
      </div>
    </div>
  );
}
