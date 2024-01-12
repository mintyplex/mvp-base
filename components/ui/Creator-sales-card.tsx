const CreatorsCard = ({ product, value, graph, bgColor ,border,width }: any) => {
  return (
    <div className={`p-4 w-full ${width} border-white border-[1px] rounded-md shadow-lg ${bgColor}`}>
      <div className='flex flex-col gap-5'>
        <h1 className='text-[16px] leading-[20px] font-semibold'>{product}</h1>
        <div className='flex gap-4'>
          <h1 className='text-[31px] font-semibold'>{value}</h1>
          <button className={`${border} rounded-lg  py-2 px-3  text-[rgba(0,128,0,1)]`}>{graph}</button>
        </div>
      </div>
    </div>
  );
};

export default CreatorsCard;
