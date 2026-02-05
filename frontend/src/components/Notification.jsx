import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification);

  if (!message) return null;

  const bgStyles =
    type === "error"
      ? "border-red-500/50 bg-red-500/10 text-red-400"
      : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        className={`px-6 py-3 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 ${bgStyles}`}
      >
        <div
          className={`w-2 h-2 rounded-full animate-pulse ${type === "error" ? "bg-red-400" : "bg-emerald-400"}`}
        />
        <span className="font-medium tracking-wide">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
