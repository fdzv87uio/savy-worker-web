
export default function Paginator({ totalPages, currentPage, setCurrentPage, scrollToTop }: { totalPages: number, currentPage: number, setCurrentPage: any, scrollToTop: any }) {
    const array = Array.from({ length: totalPages }, (_, i) => i + 1)
    function handlePageChange(value: number) {
        setCurrentPage(value);
        scrollToTop();
    }

    return (
        <div className="w-full h-[70px] mt-[60px] mx-[5px] my-[5px] flex flex-col justify-center items-center">
            <div className="w-auto h-[70px] flex flex-row justify-between">
                <div onClick={(e: any) => {
                    e.stopPropagation();
                    if (currentPage !== 1) {
                        handlePageChange(currentPage - 1)
                    }
                }} className="w-[50px] h-[50px] flex flex-col justify-center items-center">
                    <div className="cursor-pointer flex flex-col justify-center items-center">
                        <img src="/icons/chevron-left.svg" width={17} height={17} />
                    </div>
                </div>
                {array.map((x: any, key: number) => {
                    return (
                        <div onClick={(e: any) => {
                            e.stopPropagation();
                            handlePageChange(x);
                        }} key={`button_${key}`} className={`${currentPage === x ? 'bg-primary-1/50' : ''} w-[50px] h-[50px] flex flex-col justify-center items-center cursor-pointer rounded-full`}>
                            <div className="flex flex-col justify-center items-center hover:bg-white-400/50">
                                <p className="text-[16px] text-[#ffffff] font-bolder">{x}</p>
                            </div>
                        </div>
                    )
                })}
                <div onClick={(e: any) => {
                    e.stopPropagation();
                    if (currentPage !== totalPages) {
                        handlePageChange(currentPage + 1)
                    }
                }} className="w-[50px] h-[50px] flex flex-col justify-center items-center">
                    <div className="cursor-pointer flex flex-col justify-center items-center">
                        <img src="/icons/chevron-right.svg" width={17} height={17} />
                    </div>
                </div>
            </div>
        </div >
    )
}