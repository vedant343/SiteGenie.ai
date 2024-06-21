"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import "../../styles/globals.css";
import Image from "next/image";
import WhiteLogo from "@/components/white-logo";

import {
  ArrowLeft,
  BotIcon,
  LoaderCircleIcon,
  SendHorizontalIcon,
  User2Icon,
} from "lucide-react";
import Tempchatlogo from "@/components/tempchatlogo";
import Loadingsvg from "./loadingsvg";
import GenieLogo from "@/components/genie-logo";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  var router = useSearchParams();
  useEffect(() => {
    setQuestion(router.get("url") || "");
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: question },
    ]);

    const raw = JSON.stringify({
      url: "https://portfolio-react-jaya.vercel.app/",
      prompt: question,
    });
    setQuestion("");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3001/chatbotprompt",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json(); // Parse the response as JSON
      console.log(result);

      const textData = result.text;
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { type: "bot", message: textData },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false after receiving the result
    }
  };
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <section className="flex flex-col w-full h-full">
          <nav className="chatbot-header bg-gradient-to-r from-violet-800 to-violet-600  text-white py-1 fixed top-0 w-full z-50">
            <div className="flex items-center justify-between px-4">
              <Button
                variant="primary"
                className="flex items-centerbg-gradient-to-r from-violet-800 to-violet-600  text-white hover:bg-violet-600"
              >
                <a href="/preview" className="flex items-center space-x-2">
                  <ArrowLeft className="text-bold" />
                  <div className="flex items-center">
                    <span className="text-xl  ml-4">Your </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50%"
                      x="0"
                      y="0"
                      version="1.1"
                      viewBox="0 0 770 208"
                      xmlSpace="preserve"
                    >
                      <path
                        fill="white"
                        d="M417.25 106.241c-6.567 9.013-11.887 18.46-19.477 26.328-8.418 8.724-18.21 13.427-30.393 11.522-16.474-2.575-24.516-19.786-17.384-36.41 6.685-15.582 23.55-16.584 33.679-12.08 5.507 2.449 7.568 7.572 7.682 13.536.058 3.013-1.165 4.156-4.134 4.121-7.658-.09-15.325.194-22.974-.083-4.184-.152-5.315 1.615-4.904 5.338.853 7.73 2.85 14.73 10.707 18.406 7.833 3.666 14.584 1.259 20.85-3.646 3.941-3.086 7.313-6.78 10.656-10.503 1.79-1.994 2.541-4.18 2.483-6.815-.081-3.66.011-7.325.014-10.988.003-3.914.11-7.885-4.96-9.894 5.322-1.736 10.49-1.82 15.445-.72 2.655.59.824 4.247 2.137 6.292 2.243-.034 3.252-2.04 4.77-3.162 9.759-7.209 22.653-4.89 27.418 4.976 1.118 2.314 1.485 4.721 1.472 7.26-.037 7.326-.015 14.652 0 21.978.015 6.662.235 7.111 5.906 11.545-7.924 1.208-15.05 1.055-22.893-.456 6.638-2.243 5.377-7.355 5.4-11.913.035-7.16-.053-14.32-.001-21.478.02-2.747-.606-5.28-1.938-7.644-2.62-4.648-7.36-5.868-11.872-3.054-3.01 1.876-5.418 4.391-7.688 7.544m-46.754 3.56c1.995-.016 3.99-.015 5.984-.053 1.393-.027 2.808-.257 3.027-1.937.448-3.436-.046-6.83-2.707-9.19-2.475-2.197-5.716-2.04-8.436-.484-4.173 2.386-6.805 6.037-7.48 11.02 3.045 1.135 5.893.433 9.612.643zM324.907 90.185c-6.5-14.343-21.982-17.216-32.853-6.436-14.169 14.049-12.893 39.541 2.604 52.036 7.066 5.697 21.382 6.571 28.83 1.78 1.008-.65 1.767-1.362 2.103-2.618 2.712-10.143-.464-17.743-9.94-22.873 3.512-2.236 7.194-1.256 10.615-1.244 12.843.045 10.883-1.638 11.08 11.132.017 1.166-.203 2.375.035 3.49 1.845 8.644-2.94 12.913-10.162 15.634-17.334 6.53-37.531 4.69-50.356-11.364-8.412-10.53-9.81-22.538-4.38-34.75 5.747-12.926 16.304-19.94 30.35-21.192 9.57-.854 18.938.467 27.687 4.777 5.319 2.62 7.593 6.286 6.667 10.467-.873 3.94-4.642 6.32-10.457 6.586-1.581-1.334-.755-3.5-1.823-5.425zM94.693 133.011c-1.136-8.633 2.176-13.462 9.786-14.727 1.1 1.214.341 2.474.134 3.75-1.188 7.314 1.465 14.032 6.678 17.026 5.48 3.147 14.516 2.197 19.776-2.079 4.646-3.776 5.18-9.463 1.194-14.062-3.135-3.615-7.378-5.59-11.637-7.538-4.99-2.283-10.082-4.41-14.85-7.099-7.303-4.118-12.148-10.033-10.87-19.055 1.12-7.89 6.79-13.132 16.576-14.914 8.462-1.54 16.98-1.456 24.689 3.178 3.91 2.351 6.729 5.895 5.87 10.697-.719 4.023-3.126 7.192-7.845 8.182-.538-2.719-.935-5.157-1.51-7.553-3.223-13.45-16.02-13.784-23.542-9.236-5.874 3.552-6.45 10.05-1.393 14.65 4.109 3.737 9.156 6.03 14.138 8.344 4.538 2.107 8.867 4.556 13.123 7.183 6.047 3.734 10.668 8.68 9.963 16.056-.757 7.91-5.842 13.554-13.149 16.26-10.166 3.767-20.55 3.602-30.61-.85-3.37-1.492-5.473-4.254-6.52-8.213zM561.71 57.426c-.547-3.6 1.57-4.892 4.184-5.373 1.576-.29 3.58-.39 4.888.333 8.329 4.604 16.33 2.603 24.37-.703 2.642-1.087 5.373-1.79 8.28-1.125 2.914.666 4.756 2.23 4.874 5.426.12 3.242-1.593 4.67-4.576 5.52-6.217 1.769-12.187-.172-18.23-.905-.994 6.298.325 7.84 6.295 8.04 7.48.25 14.95.789 22.43.981 3.085.08 4.526 1.532 5.121 4.328 3.503 16.44 5.968 33.003 5.986 49.86.005 4.899-2.452 8.535-6.085 11.5-5.74 4.683-12.378 7.765-19.154 10.588-2.453 1.022-4.936.783-7.305-.126-9.633-3.696-19.27-7.386-28.584-11.855-1.9-.911-3.122-2.082-3.572-4.368-3.149-15.977-5.033-32.123-6.756-48.295-.271-2.546.802-3.953 3.405-4.612 6.93-1.757 13.763-3.903 20.712-5.574 4.12-.99 5.32-2.885 4.3-7.096-1.085-4.473-3.287-4.335-6.87-3.15-4.981 1.647-9.891 1.657-13.712-3.394m47.99 18.853c-3.984 2.058-7.806 4.568-11.99 6.061-5.303 1.892-5.802 5.448-5.128 10.153 1.689 11.793 3.356 23.593 4.687 35.429.412 3.662 1.626 4.31 4.726 2.899 5.6-2.552 11.027-5.374 16.095-8.916 3.707-2.59 5.012-5.877 4.427-10.283-1.09-8.204-1.677-16.488-3.087-24.632-.77-4.441-.857-9.218-3.355-13.22-2.412-.073-3.93 1.413-6.376 2.51M558.287 96.49c.497 4.283 1.594 8.598 1.368 12.842-.493 9.275 5.197 12.527 12.67 14.975 7.18 2.353 14.083 5.556 21.344 7.178 1.49-2.137 1.12-4.057.914-5.789-1.332-11.189-2.905-22.35-4.202-33.542-.56-4.827-2.971-6.626-7.77-6.9-4.77-.273-9.461-1.72-14.22-2.424-3.84-.567-7.555-2.221-12.098-1.712.663 5.031 1.286 9.753 1.994 15.372m42.355-18.383l9.555-5.32c-5.353-2.144-10.024-1.247-14.575-1.4-4.001-.135-9.005-1.544-8.315 5.882-2.834-1.068-2.535-5.296-5.442-4.477-6.067 1.711-12.473 2.467-19.443 6.124 13.513 2.14 25.588 8.288 38.22-.809m-5.07 58.932c-.09-2.158-1.714-2.452-3.352-2.996-5.972-1.982-11.91-4.068-17.834-6.193-3.793-1.36-7.539-2.857-11.477-4.358-.29 5.769.287 7.106 4.358 8.864 7.909 3.415 15.875 6.699 23.862 9.927 1.268.512 2.682 1.49 4.21.42.891-1.593.19-3.262.234-5.664m16.065-7.722c-3.664 1.516-7.346 2.992-10.988 4.561-3.645 1.571-2.637 4.898-1.93 7.301.865 2.947 3.328 1.114 4.936.349 5.833-2.775 11.606-5.693 16-10.648 1.993-2.247 3.677-4.592 2.35-8.295-3.443 2.26-6.58 4.32-10.368 6.732m-16.33-74.498c-1.87.893-4.152.784-6.085 2.505 2.4 1.87 5.106 1.566 7.581 1.604 2.84.044 6.059.924 8.217-1.936.68-.902.306-2-.562-2.615-2.815-1.994-5.64-.83-9.15.442m-24.267 3.86c1.226-.163 2.618.075 3.51-1.673-2.909-1.146-5.592-2.9-8.924-.692 1.147 2.202 2.875 2.401 5.414 2.365zM510.302 134.747c9.939 8.048 17.262 2.196 23.966-4.49 1.534 1.49 1.123 2.493.537 3.28-5.94 7.976-13.83 11.67-23.813 10.78-8.235-.736-14.185-4.794-17.13-12.497-5.714-14.94-1.377-36.263 20.35-38.505 12.933-1.335 21.017 4.028 21.235 15.707.063 3.39-1.227 4.321-4.378 4.264-7.658-.138-15.324.097-22.98-.081-3.806-.089-5.113 1.526-4.733 5.094.646 6.064 1.969 11.83 6.946 16.448m.483-24.946c3.162-.016 6.324-.019 9.485-.055 1.357-.015 2.64-.142 3.279-1.69 1.95-4.72-2.514-11.077-7.634-10.82-5.318.267-9.7 5.057-10.778 11.817 1.428 1.204 3.163.564 5.648.748zM256.465 137.51c-8.806 7.57-19.913 9.19-28.477 4.362-9.589-5.404-13.732-19.152-9.6-31.85 3.657-11.234 14.328-18.143 25.89-16.762 11.288 1.348 15.045 4.97 16.443 15.127.499 3.629-.644 4.884-4.143 4.843-7.657-.09-15.318.085-22.973-.064-3.937-.076-5.48 1.311-4.79 5.363.642 3.766.865 7.581 2.652 11.084 5.211 10.208 16.341 12.003 24.443 3.972 1.169-1.16 1.813-3.37 4.55-2.716.538 3.192-2.233 4.456-3.995 6.64m-15.107-27.693c2.437-.22 4.981.517 7.284-.72.622-7.909-1.414-11.697-6.345-11.915-6.058-.269-11.482 5.324-11.776 12.635h10.837zM197.264 124.953c0 1.99-.007 3.488.002 4.987.053 9.58 3.784 12.37 13.337 10.015.574-.142 1.213-.018 2.002-.018-2.649 4.272-8.585 5.704-14.661 3.782-7.482-2.367-12.16-8.506-12.262-16.39-.102-7.991-.174-15.988.028-23.975.098-3.896-.478-6.627-5.24-6.241-1.025.083-1.938-.437-2.364-2.439 8.096-1.403 13.888-6.19 16.863-14.365 3.325 2.719 2.302 5.595 2.203 8.014-.163 3.998 1.062 5.96 5.34 5.542 1.493-.145 3.455-.519 4.05 1.8-.932 2.043-2.843 1.641-4.352 1.495-4.143-.4-5.11 1.594-5.005 5.325.205 7.32.06 14.65.059 22.468zM153.654 96.488c-2.236-2.065-.464-2.529.806-2.582 3.82-.162 7.656-.168 11.48-.044 3.418.11 3.203 2.795 3.21 5.12.032 11.654.051 23.308.003 34.962-.015 3.638.003 7.15 4.623 8.968-7.174 1.428-14.021 1.087-21.434.267 5.775-2.808 4.692-7.712 4.705-12.201.028-9.157-.002-18.313-.012-27.47-.003-2.727-.135-5.402-3.381-7.02zM467.683 104.347c.95-4.785-2.072-6.978-6.025-9.772 5.968-1.254 10.858-.969 15.678-.439 2.476.272 1.974 2.74 1.981 4.476.049 11.474.122 22.948-.014 34.42-.049 4.106.421 7.676 5.034 9.697-7.217 2.01-14.2 1.23-21.75.412 6.617-3.183 5.027-8.837 5.073-13.896.073-8.147.022-16.295.023-24.898zM601.71 159.037c7.693 1.102 15.282.078 22.45 3.365-5.932 6.407-52.493 6.634-60.718-.107 12.935-3.642 25.38-3.346 38.268-3.258z"
                        opacity="1"
                      ></path>
                      <path
                        fill="white"
                        d="M416.512 144.035c-5.964-.3-11.574.533-18.734-.847 6.039-2.687 6.58-6.577 6.301-10.929-.38-5.927 3.674-9.878 7.057-13.79 2.267-2.621 4.385-.518 4.65 2.253.378 3.958.371 7.974.23 11.954-.145 4.065.38 7.647 4.715 9.49-.772 2.145-2.442 1.652-4.219 1.869zM475.502 73.927c5.395 3.18 6.699 6.706 4.291 10.616-2.221 3.608-6.943 4.643-10.404 2.204-2.977-2.097-3.67-5.125-2.63-8.378 1.279-3.993 4.497-4.975 8.743-4.442zM161.38 73.855c4.61-.48 7.629 1.2 8.687 5.346.861 3.377-.26 6.244-3.527 7.947-3.894 2.03-7.709.91-9.807-2.833-2.287-4.08-.896-7.481 4.646-10.46zM563.385 96.4c.404-2.128.225-4.411 2.789-4.363 1.954.036 2.576 1.857 3.052 3.455.954 3.2 1.574 6.431.314 9.714-.422 1.1-.878 2.26-2.243 2.324-1.334.061-2.009-.974-2.55-2.033-1.404-2.743-1.474-5.709-1.362-9.096zM579.47 94.963c3.285 3.671 3.016 7.845 2.715 11.98-.11 1.516-.724 3.054-2.52 3.242-1.582.165-2.255-1.188-2.822-2.392-1.626-3.453-1.394-7.114-.908-10.73.216-1.608 1.309-2.668 3.535-2.1z"
                        opacity="1"
                      ></path>
                    </svg>
                  </div>
                </a>
              </Button>
            </div>
          </nav>
          <div className="flex-1 overflow-y-auto h-full py-14 pb-16 px-6">
            <div className="block mt-4 mb-8 clear-both">
              <div className="pt-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 p-1 border-gray-500">
                    <Image
                      src="/sitegenie-small.png"
                      alt="Description of the image"
                      layout="responsive"
                      width={60}
                      height={60}
                      objectFit="contain"
                    />
                  </div>
                  <span className="bg-gradient-to-r from-violet-600 to-violet-400  text-white rounded-2xl p-3 max-w-sm">
                    Hello, how can I assist you today?
                  </span>
                </div>
              </div>
              {chatLog.map((message, index) => (
                <div
                  key={index}
                  className={`flex space-x-2 py-1 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full border-2 p-1 border-gray-500">
                    {message.type === "user" ? (
                      <User2Icon className="text-black" />
                    ) : (
                      <Image
                        src="/sitegenie-small.png"
                        alt="Description of the image"
                        layout="responsive"
                        width={12}
                        height={12}
                        objectFit="contain"
                      />
                    )}
                  </div>
                  <div
                    className={`${
                      message.type === "user"
                        ? "bg-gradient-to-l from-gray-600 to-gray-400 text-white"
                        : "bg-gradient-to-r from-violet-600 to-violet-400 text-white "
                    } rounded-2xl p-3 max-w-2xl text-justify break-words`}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start py-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-2 p-0.5 border-gray-300">
                      <Image
                        src="/sitegenie-small.png"
                        alt="Description of the image"
                        layout="responsive"
                        width={12}
                        height={12}
                        objectFit="contain"
                      />
                    </div>
                    <span className="bg-white text-white rounded-t-full rounded-b-full p-1 max-w-sm">
                      <Loadingsvg />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="chatbot-footer bg-gray-200 fixed bottom-0 w-full">
            <div className="relative">
              <form
                className="flex items-center pb-2 px-3"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  placeholder="Please type here....."
                  className="px-4 flex-1 py-2 border border-gray-300 rounded-lg focus:border-violet-500 focus:outline-none"
                  id="inputField"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                  type="submit"
                  id="submitButton"
                  className="ml-2 bg-violet-600 text-white p-2 rounded-full"
                >
                  <SendHorizontalIcon />
                </button>
              </form>
            </div>
            <div className="chatbot-header bg-gradient-to-t from-violet-800 to-violet-600  text-white ">
              <div className="flex items-center justify-center">
                <Button
                  variant="primary"
                  className="bg-gradient-to-t from-violet-800 to-violet-600  text-white hover:bg-violet-600"
                >
                  Powered by ©
                  <a href="/" className="font-semibold ml-1">
                    SiteGenie
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Chatbot;
