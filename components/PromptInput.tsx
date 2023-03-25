"use client"
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT"
import { useState } from "react"
import useSWR from "swr"
function PromptInput() {
    const [input, setInput] = useState("")
    const { data:suggestion, error, isLoading,mutate,isValidating } = useSWR('/api/suggestion', fetchSuggestionFromChatGPT, {
        revalidateOnFocus: false,
    })
    return (
        <div className="m-10">
            <form className="flex flex-col lg:flex-row lg:divide-x-2 shadow-md shadow-slate-400/10 rounded-md">
                <textarea className="flex-1 outline-none rounded-md p-4"
                    placeholder="Enter a prompt"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit"
                    className={`p-4 font-bold ${input
                        ? "bg-violet-400 text-white transition-colors duration 200"
                        : "text-gray-300 cursor-not-allowed"
                        }`}
                    disabled={!input}> Generate </button>

                <button className="p-4 bg-violet-400 text-white  transition-colors duration-200 font-bold disabled:bg-gray-400 disabled:cursor-not-allowed
                disable:text-gray-300
                " type="button">Use suggestion</button>

                <button type="button"
                    className="text-violet-400 bg-white p-4 transition-colors duration-200 rounded-b-md font-bold
                ">New suggestion</button>
            </form>

        </div >
    )
}

export default PromptInput