export default function HeaderLogo() {
  return (
    <div className="flex items-center">
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs">S</span>
      </div>
      <span className="font-medium">ServiceName</span>
    </div>
  );
}
