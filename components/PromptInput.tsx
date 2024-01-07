"use client";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import fetchImages from "@/lib/fetchImages";
import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
function PromptInput() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });
  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");
    console.log(inputPrompt);

    const p = useSuggestion ? suggestion : inputPrompt;
    const notificationPrompt = p.length > 20 ? `${p.slice(0, 20)}...` : p;

    const notification = toast.loading(
      `DALLE3 is generating an image for "${notificationPrompt}"`
    );

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: p }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error, {
        id: notification,
      });
    } else {
      toast.success(`Your AI image has been generated!`, {
        id: notification,
      });
    }

    updateImages();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row lg:divide-x-2 shadow-md shadow-slate-400/10 rounded-md"
      >
        <textarea
          className="flex-1 outline-none rounded-md p-4 overflow-hidden"
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Enter a prompt"
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className={`p-4 font-bold ${
            input
              ? "bg-violet-400 text-white transition-colors duration 200"
              : "text-gray-300 cursor-not-allowed"
          }`}
          disabled={!input}
        >
          {" "}
          Generate{" "}
        </button>

        <button
          className="p-4 bg-violet-400 text-white  transition-colors duration-200 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed
                disable:text-gray-300
                "
          type="button"
          onClick={() => submitPrompt(true)}
        >
          Use suggestion
        </button>

        <button
          type="button"
          className="text-violet-400 bg-white p-4 transition-colors duration-200 rounded-b-md font-bold
                "
          onClick={mutate}
        >
          New suggestion
        </button>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "ChatGPT is thinking of a suggestion..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
