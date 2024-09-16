function CustomFormCard({ children }: { children: any }) {
    return (
        <div className='w-[250px] md:w-[530px] flex-grow h-auto pt-8 px-6 border relative rounded-2xl border-primary bg-primary/10  mb-4 '>
            {children}
        </div>
    );
};

export default CustomFormCard;