import React, { useState, ReactNode } from "react";

interface AccordiumProps {
  title: string;
  children: ReactNode;
}

const Accordium: React.FC<AccordiumProps> = ({
  title,
  children,
}: AccordiumProps) => {
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const toggleAccordion = () => setAccordionOpen(!isAccordionOpen);


  
  return (
    <div className="bg-[rgb(49,50,51)] px-4 py-3 mt-6 rounded-md transition-transform duration-500 ">
      <div
        className="flex justify-between  rounded-md  gap-4 w-full bg-[rgb(49,50,51)]"
        onClick={toggleAccordion}
      >
        <h3 className="text-xl font-semibold md:text-2xl">{title}</h3>
        {isAccordionOpen ? (
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </p>
        ) : (
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </p>
        )}
      </div>
      {isAccordionOpen && <div className="bg-[rgb(49,50,51)]">{children}</div>}
    </div>
  );
};

export default Accordium;
