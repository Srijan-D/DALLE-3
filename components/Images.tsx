"use client"
import Image from "next/image"
import useSWR from "swr"
import fetchImages from "../lib/fetchImages"

type ImageType = {
    name: string
    url: string
}

function Images() {
    const {
        data: images,
        isLoading,
        mutate: refreshImages,
        isValidating,
    } = useSWR("images", fetchImages, {
        revalidateOnFocus: false,
    });
    
    return <div>
        <button onClick={() => refreshImages(images)} className="fixed bottom-10 right-10 bg-violet-400/90 text-white px-5 py-3 rounded-md hover:bg-violet-500 focus:outline-none focus:ring-2 font-bold z-20">
            {/* images is passed inside for optimistic updation */}
            {(!isLoading && isValidating) ? "Refreshing..." : "Refresh Images"}
        </button>

        {isLoading && (
            <p className="text-center pb-8 font-extralight">
                Loading <span className="text-violet-400">AI</span> Generated Images...
            </p>
        )}

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-0 md:px-10">
            {images?.imageUrls?.map((image: ImageType, num: Number) => (
                <div key={image.name} className={`relative cursor-help 
                ${num === 0 && "md:col-span-2 md:row-span-2"}
                hover:scale-[104%] transition transform duration-300 ease-in-out
                `}> {/* div for hovering effect like in DALLE.2 */}
                    <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
                        <p className="text-center font-light text-lg p-5">
                            {image.name.split("_").shift()?.toString().split(".").shift()}
                        </p>
                    </div>
                    <Image
                         unoptimized={true}
                        src={image.url}
                        alt={image.name}
                        width={500}
                        height={500}
                        className="w-full rounded-sm shadow-2xl drop-shadow-lg z-10"
                    />
                </div>
            ))}
        </div>
    </div>
}

export default Images
