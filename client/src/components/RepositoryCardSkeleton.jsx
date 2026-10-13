function RepositoryCardSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-md animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="bg-slate-200 rounded h-5 w-1/2"></div>
        <div className="bg-slate-200 rounded h-3 w-1/4"></div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="bg-slate-200 rounded h-4 w-full"></div>
        <div className="bg-slate-200 rounded h-4 w-3/4"></div>
      </div>

      <div className="flex items-center gap-5 mt-4">
        <div className="bg-slate-200 rounded h-4 w-12"></div>
        <div className="bg-slate-200 rounded h-4 w-12"></div>
        <div className="bg-slate-200 rounded h-4 w-16"></div>
        <div className="bg-slate-200 rounded h-4 w-12"></div>
      </div>
    </div>
  );
}

export default RepositoryCardSkeleton;