import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';

function CheckoutPath({ activePath }) {
    const path = [
        {
            label: 'Shipping Details',
            icon: <LocalShipping />
        },
        {
            label: 'Confirm Order',
            icon: <LibraryAddCheck />
        },
        {
            label: 'Payment',
            icon: <AccountBalance />
        }
    ]
    return (
        <div className="flex justify-center items-start gap-2 md:gap-8 mt-16 md:mt-24 py-8 md:py-12 px-4 border-b border-gray-200 max-w-[1000px] mx-auto w-full mb-8">
            {path.map((item, index) => {
                const isPast = index < activePath;
                const isActive = index === activePath;
                
                return (
                    <div className="flex flex-col items-center relative flex-1" key={index}>
                        <div 
                            className={`p-3 md:p-4 rounded-full transition-all duration-300 z-10 flex items-center justify-center shadow-sm 
                                ${isPast ? 'bg-emerald-100 text-emerald-600' : 
                                  isActive ? 'bg-[#5C4A6F] text-white scale-110 shadow-lg ring-4 ring-[#5C4A6F]/20' : 
                                  'bg-gray-100 text-gray-400'}`}
                        >
                            {item.icon}
                        </div>
                        <p className={`text-[10px] md:text-sm text-center mt-3 md:mt-4 transition-colors duration-300 
                            ${isPast ? 'text-emerald-600 font-medium' : 
                              isActive ? 'text-[#4E4A59] font-bold' : 
                              'text-gray-400 font-medium'}`}
                        >
                            {item.label}
                        </p>
                        
                        {index < path.length - 1 && (
                            <>
                                <div className={`hidden md:block absolute top-7 left-[50%] ml-8 w-[calc(100%-4rem)] h-[3px] transition-colors duration-500 rounded-full ${isPast ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                                <div className={`md:hidden absolute top-6 left-[50%] ml-6 w-[calc(100%-3rem)] h-[2px] transition-colors duration-500 rounded-full ${isPast ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                            </>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default CheckoutPath
