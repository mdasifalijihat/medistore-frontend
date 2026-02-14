import { Clock } from "lucide-react";

export default function Service24Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-2xl text-center bg-white p-10 rounded-2xl shadow-lg">
        <Clock className="mx-auto text-green-600 mb-6" size={60} />
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          24 Hours Pharmacy Service
        </h1>
        <p className="text-gray-600 mb-6">
          Our pharmacy operates 24/7 to ensure you never run out of essential
          medicines. Fast delivery and trusted service guaranteed.
        </p>
        <p className="text-lg font-semibold text-gray-800">
          🕒 Open: 24 Hours | 7 Days a Week
        </p>
      </div>
    </div>
  );
}
