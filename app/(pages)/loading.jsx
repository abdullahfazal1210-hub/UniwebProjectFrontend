export default function PagesLoading() {
    return (
        <div className="min-h-screen bg-[#141414] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-[#262626] rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-[#703bf7] rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-[#999999] font-medium text-lg">Loading page...</p>
            </div>
        </div>
    );
}
