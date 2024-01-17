import { FaFacebookF } from "react-icons/fa6";
import logoBlue from "~/public/lgo-blue.png";
import { Button } from "~/components/ui/button";
import { TypographyH4 } from "~/utils/typography";
import Image from "next/image";

export function Footer() {
  return (
    <div className="container p-3 mx-auto mt-auto">
      <footer className="relative bg-[#2C2D2E] rounded-lg overflow-hidden px-4 py-8">
        <div className="relative z-10 flex flex-col items-center space-y-12">
          <TypographyH4 className="text-center">
            Do you have a feedback or feature request? Feel free to share or
            connect with us on social media!
          </TypographyH4>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 border rounded-full transition-all duration-300 hover:bg-mintyplex-primary border-mintyplex-border/50">
                <TwitterIcon />
              </div>
              <div className="p-2 border rounded-full border-mintyplex-border/50 transition-all duration-300 hover:bg-mintyplex-primary">
                <FaFacebookF />
              </div>
              <div className="p-2 border rounded-full border-mintyplex-border/50 transition-all duration-300 hover:bg-mintyplex-primary">
                <TelegramIcon />
              </div>
            </div>
            <Button
              asChild
              className="py-4 text-white rounded-full duration-300 transition-all bg-mintyplex-primary"
            >
              <button className="py-5 bg-mintyplex-primary">
                Request a Feature
              </button>
            </Button>
            <div className="mt-5">
              Built With <span>❤️</span> by{" "}
              <span className="text-mintyplex-primary">Mintyplex</span>.
            </div>
          </div>
        </div>
        <div className="relative z-10 mt-6">
          <Image
            alt="Mintyplex logo"
            src={logoBlue}
            width={160}
            className="mx-auto"
          />
        </div>
        <div className="absolute top-0 rounded-full bg-[#2063F2]/40  [filter:blur(1500px)] w-full h-full" />
      </footer>
    </div>
  );
}

function TwitterIcon() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="pajamas:x">
        <path
          id="Vector"
          d="M12.6976 9.093L19.3428 1.3125H17.7678L11.9993 8.06794L7.38984 1.3125H2.07422L9.04359 11.529L2.07422 19.6875H3.64922L9.74184 12.5528L14.6099 19.6875H19.9255L12.6976 9.093ZM10.5412 11.6182L9.83503 10.6011L4.21622 2.50687H6.63516L11.1685 9.03919L11.8747 10.0564L17.7691 18.5483H15.3502L10.5412 11.6182Z"
          fill="#E9E9E9"
        />
      </g>
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Solid/Brands/Telegram">
        <path
          id="Subtract"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.1883 18.6996L17.1889 18.6981L17.2046 18.6588L19.9118 5.00962V4.96529C19.9118 4.62521 19.7862 4.32833 19.5127 4.15024C19.2734 3.99437 18.9983 3.98327 18.8053 3.99791C18.6013 4.0134 18.4089 4.06433 18.2757 4.10672C18.2072 4.12853 18.1498 4.14955 18.1088 4.16544C18.0882 4.17342 18.0716 4.18019 18.0594 4.18523L18.0475 4.19025L2.95322 10.1115L2.94906 10.113C2.94091 10.116 2.93013 10.12 2.91711 10.1251C2.89115 10.1352 2.85582 10.1496 2.81431 10.1684C2.7328 10.2054 2.62019 10.2624 2.50599 10.3406C2.31203 10.4734 1.94269 10.7879 2.00505 11.2864C2.05671 11.6993 2.34136 11.9616 2.53326 12.0974C2.63613 12.1702 2.73455 12.2227 2.80661 12.257C2.84313 12.2744 2.87415 12.2877 2.89725 12.2971C2.90883 12.3018 2.91851 12.3056 2.926 12.3084L2.93559 12.312L2.94173 12.3143L5.58257 13.2033C5.57366 13.369 5.59009 13.538 5.63403 13.7046L6.95686 18.7226C7.1137 19.3176 7.65196 19.7321 8.26727 19.7316C8.8188 19.7312 9.30795 19.3976 9.51576 18.8998L11.581 16.6915L15.128 19.4109L15.1785 19.4329C15.5007 19.5735 15.8018 19.6181 16.0771 19.5805C16.352 19.5429 16.5704 19.4276 16.7345 19.2964C16.896 19.1672 17.0066 19.0214 17.0762 18.9116C17.1116 18.8558 17.1379 18.8068 17.1562 18.7699C17.1654 18.7514 17.1727 18.7357 17.1781 18.7235L17.1849 18.7078L17.1873 18.702L17.1883 18.6996ZM6.94342 13.3594C6.91335 13.2454 6.96055 13.125 7.06012 13.0618L16.0175 7.37345C16.0175 7.37345 16.5443 7.0536 16.5255 7.37345C16.5255 7.37345 16.6195 7.42994 16.3372 7.6933C16.0694 7.94344 9.95306 13.8486 9.33418 14.4461C9.29845 14.4806 9.27713 14.5202 9.26454 14.5682L8.26624 18.3774L6.94342 13.3594Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
