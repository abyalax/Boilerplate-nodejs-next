'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function ForbiddenPage() {
  const { push, refresh } = useRouter();

  return (
    <div className="max-w-2xl mx-auto py-20 text-center">
      <h1 className="text-4xl font-extrabold mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-500 mb-10">You do not have permission to access this page.</p>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => push('/auth/login')}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <FaArrowLeft size={16} />
          Login
        </button>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 bg-gray-50"
        >
          <FaArrowLeft size={16} />
          Go Back
        </button>

        <button onClick={() => push('/')} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
          Go Home
        </button>

        <button onClick={() => refresh()} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">
          Refresh Page
        </button>
      </div>
    </div>
  );
}
