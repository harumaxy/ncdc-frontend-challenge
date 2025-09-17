export default function HeaderLogo() {
  return (
    <div className="flex gap-2">
      <div>
        <img src="/icon/logo.svg" width="32px" height="32px" />
      </div>
      <span className="font-bold text-[20px]">ServiceName</span>
    </div>
  );
}
