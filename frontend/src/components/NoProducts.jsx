function NoProducts({ keyword }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-gray-50/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 my-8 mx-auto max-w-[800px] w-[95%] md:w-[90%] transition-all duration-300 hover:shadow-md">
      <div className="text-5xl text-gray-400 mb-6 drop-shadow-sm animate-pulse">⚠️</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">No Products Found</h3>
      <p className="text-base text-gray-500 max-w-[450px] leading-relaxed">
        {keyword ? `We couldn't find any products matching "${keyword}". Try using different keywords or browse our complete catalog.` : 'No products are available. Please check back later'}
      </p>
    </div>
  )
}

export default NoProducts

