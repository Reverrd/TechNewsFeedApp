import { useEffect, useState } from "react"
import './app.scss'
interface Article{
  url: string;
  title: string;
  urlToImage: string;
  articles: string;
}

function App() {
  const [news, setNews] = useState<Article[]>([])
  const [loading, setLoading] =  useState(true)
  const [error, setError] = useState(null);
const fetchUrl= 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=467121d67dbd438da9c1df43e712358c'; 
useEffect(()=>{
  
  fetch(fetchUrl)
  .then(res => res.json())
  .then((data)=>{
    console.log(data)
   setNews(data.articles);
      setLoading(false);
    
  })
  .catch(() => {
    //@ts-expect-error it is a string
    setError(`oops 😢 couldn't load try later `);
    setLoading(false);
  })


},[])
// console.log(news)
  return (
    <div className="bg-slate-700">
    <div className="flex justify-center bg-black text-white h-12 items-center">
     <h1 className="text-2xl">My TechFeeds</h1>
    </div>
     {loading && 
     <div className="flex h-screen w-screen justify-center items-center">
      <div className="loadingCircle w-14 h-14 border-4 border-blue-400 rounded-full">

      </div>
      
    </div>}
    
     {error && 
     <div className="flex justify-center h-screen items-center">
     <p className="text-4xl text-white">{error}</p>
     </div>}
     {!loading && !error && (
     <div className="grid grid-cols-3  gap-16 mt-5 pl-5 ">
      {
        news && (
          news.map((info)=>
             (
              <div key={info.url}>
                <div className=" bg-amber-100 rounded-lg flex flex-col w-10/12 items-center  pb-8">
                  <img className="w-full h-48 rounded-t-lg " src={info.urlToImage} alt={info.title} />
                  <p className="mt-2 font-semibold">{info.title}</p>
                  <div className="mt-1"><a href={info.url} target="_self" className="hover:text-slate-700 ">See more</a></div>
                </div>
              </div>
            )

          )
        )
      }
     </div>
     )}
    </div>
  )
}

export default App
