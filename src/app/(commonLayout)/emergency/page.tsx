import { Ambulance } from "lucide-react";

export default function EmergencyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-2xl text-center bg-white p-10 rounded-2xl shadow-lg">
        <Ambulance className="mx-auto text-red-500 mb-6" size={60} />
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          Emergency Medical Support
        </h1>
        <p className="text-gray-600 mb-6">
          In case of urgent medical needs, MEDISTORE ensures rapid delivery of
          life-saving medicines and essential healthcare products.
        </p>
        <p className="text-lg font-semibold text-gray-800">
          📞 Emergency Hotline: +880 1234 567890
        </p>
      </div>
    </div>
  );
}
