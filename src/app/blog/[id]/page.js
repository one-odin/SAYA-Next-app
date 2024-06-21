import connectToDB from "@/configs/db";
import Blog from "@/models/Blog";
import DOMPurify from "isomorphic-dompurify";

export default async function postDetail({params}) {
  connectToDB();
  const post = await Blog.findById({_id: params.id});

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 antialiased flex-grow">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article className="mx-auto w-full max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            {post.length === 0 ? (
              <div role="status" className="p-4 space-y-4 animate-pulse">
                <div className="px-6 py-4">
                  <div className="h-10 w-1/2 bg-gray-300 rounded-md"></div>
                </div>
                <div className="px-6 py-4">
                  <div className="h-5 w-full bg-gray-300 rounded-md"></div>
                </div>
                <div className="px-6 py-4">
                  <div className="h-5 w-full bg-gray-300 rounded-md"></div>
                </div>
                <div className="px-6 py-4">
                  <div className="h-5 w-full bg-gray-300 rounded-md"></div>
                </div>
              </div>
            ) : (
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">{post.title}</h1>
                <div className="content leading-10 break-all" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.body, {USE_PROFILES: {html: true}})}}></div>
              </header>
            )}
          </article>
        </div>
      </main>
    </>
  );
}
